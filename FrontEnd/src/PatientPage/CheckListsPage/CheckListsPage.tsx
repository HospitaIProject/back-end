import { useEffect } from 'react';
import Loading from '../../components/common/Loading';
import ResponsivePagination from '../../components/common/ResponsivePagination';
import CheckListsSummaryCard from './components/CheckListsSummaryCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PlusIcon from '../../icons/PlusIcon';
import { useCheckListSetupQuery } from '../_lib/complianceFormSevice';
import useOperationDayFormat from '../../Hooks/useOperationDateFormatted';
import { pushNotification } from '../../utils/pushNotification';
import { useDateFormatted } from '../../Hooks/useDateFormatted';
import { useCheckListsQuery } from '../_lib/checkListsService';
import CheckListsEmptyCard from './components/CheckListsEmptyCard';
import DisplayEmptyData from '../../components/common/DisplayEmptyData';

function CheckListsPage() {
    // const [searchParams] = useSearchParams();
    // const page = Number(searchParams.get('page')) || 1;
    const [searchParams] = useSearchParams();
    const navigation = useNavigate();
    const operationId = searchParams.get('id'); //수술ID
    const patientName = searchParams.get('name'); //환자명
    const checkListsQuery = useCheckListsQuery({ operationId: Number(operationId) });
    const checkListSetupQuery = useCheckListSetupQuery({ operationId: Number(operationId) }); //체크리스트 세팅

    const {
        data: checkListSetupData,
        isPending: isCheckListSetupPending,
        isSuccess: isCheckListSetupSuccess,
        // error: checkListSetupError,
    } = checkListSetupQuery; //체크리스트 세팅 데이터
    const {
        data: checkListsData,
        isPending: isCheckListsPending,
        isSuccess: isCheckListsSuccess,
        // error: checkListsError
    } = checkListsQuery; //체크리스트 목록 데이터

    const { diffDay } = useOperationDayFormat(checkListsData?.operationDateDTO.operationDate || ''); //수술일로부터 몇일이 지났는지
    const { dateComparison } = useDateFormatted(checkListsData?.operationDateDTO.operationDate || ''); //수술일과 현재날짜 비교

    useEffect(() => {
        console.log(checkListsData);
    }, [checkListsData]);

    const isNoneData =
        isCheckListsSuccess &&
        checkListsData.checkListDTOs &&
        checkListsData.checkListDTOs.length === 0 &&
        !checkListsData.checkListDuringDTO &&
        !checkListsData.checkListBeforeDTO; // data가 없을때
    // const isNoneSeupData = checkListSetupQuery.isSuccess && !checkListSetupQuery.data; // setupData가 없을때

    const handleRouteCheckListForm = () => {
        if (checkListsData?.checkListCreatedToday) {
            pushNotification({
                msg: '오늘 이미 작성된 체크리스트가 있습니다.',
                type: 'error',
                theme: 'dark',
            });
            return;
        }
        navigation(
            `/patient/form/compliance?id=${operationId}&name=${patientName}&dateStatus=${dateComparison}&diffDay=${diffDay}`,
        );
    };
    if (isCheckListsPending || isCheckListSetupPending) return <Loading />;

    if (!checkListsData || !checkListSetupData) {
        return;
    }

    return (
        <>
            <div className="flex flex-col justify-center w-full">
                <div className="flex flex-row items-center justify-between w-full gap-3 px-4 py-3 mobile:col-span-2">
                    <span className="text-gray-600">
                        환자명:&nbsp;<span className="">{patientName}</span>
                    </span>
                    <div className="relative">
                        <button
                            onClick={handleRouteCheckListForm}
                            className={`flex flex-row items-center gap-2 rounded-md border bg-gray-50 p-2 shadow-sm ${checkListsData.checkListCreatedToday ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                            <span className="text-sm font-semibold">체크리스트</span>
                            <PlusIcon className="w-5 h-5 text-inherit" />
                        </button>
                        <span
                            className={`absolute -top-2 right-0 inline-block rounded-md px-1 text-sm ${
                                checkListsData.checkListCreatedToday
                                    ? 'font-medium text-red-300'
                                    : 'h-5 w-5 bg-yellow-200 text-center text-red-500'
                            }`}
                        >
                            {checkListsData.checkListCreatedToday ? '작성완료 ✔' : '!'}
                        </span>
                    </div>
                </div>
                <DisplayEmptyData label="작성된 체크리스트가 없습니다." isRender={Boolean(isNoneData)} />
                {/* <DisplayEmptyData label="세팅된 체크리스트가 존재하지 않습니다." isRender={isNoneSeupData} /> */}
                <ul className="grid grid-cols-1 gap-2 pb-2 mobile:grid-cols-2 mobile:px-2">
                    {checkListsData.checkListDTOs?.map((data) => (
                        <CheckListsSummaryCard
                            key={data.checkListId}
                            operationDateDTO={checkListsData.operationDateDTO}
                            checkListData={data}
                            setupData={checkListSetupData}
                            type="POST"
                            postValues={data}
                        />
                    ))}

                    {checkListsData.checkListDuringDTO && (
                        <CheckListsSummaryCard
                            operationDateDTO={checkListsData.operationDateDTO}
                            checkListData={checkListsData.checkListDuringDTO}
                            setupData={checkListSetupData}
                            type="TODAY"
                            todayValues={checkListsData.checkListDuringDTO}
                        />
                    )}
                    {!checkListsData.checkListDuringDTO && checkListsData.checkListDTOs?.length !== 0 && (
                        <CheckListsEmptyCard type="TODAY" id={Number(operationId)} name={patientName ?? '알수없음'} />
                    )}
                    {checkListsData.checkListBeforeDTO && (
                        <CheckListsSummaryCard
                            operationDateDTO={checkListsData.operationDateDTO}
                            checkListData={checkListsData.checkListBeforeDTO}
                            setupData={checkListSetupData}
                            type="PREV"
                            prevValues={checkListsData.checkListBeforeDTO}
                        />
                    )}
                    {!checkListsData.checkListBeforeDTO &&
                        (checkListsData.checkListDTOs?.length !== 0 || checkListsData.checkListDuringDTO) && (
                            <CheckListsEmptyCard
                                type="PREV"
                                id={Number(operationId)}
                                name={patientName ?? '알수없음'}
                            />
                        )}
                </ul>
                <ResponsivePagination />
            </div>
        </>
    );
}

export default CheckListsPage;
