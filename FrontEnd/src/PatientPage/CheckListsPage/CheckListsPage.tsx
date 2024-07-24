import { useEffect } from 'react';
import Loading from '../../components/common/Loading';
import ResponsivePagination from '../../components/common/ResponsivePagination';
import CheckListsSummaryCard from './components/CheckListsSummaryCard';
import { Link, useSearchParams } from 'react-router-dom';
import { useCheckListSetupQuery } from '../_lib/complianceFormSevice';
import useOperationDayFormat from '../../Hooks/useOperationDateFormatted';
import { pushNotification } from '../../utils/pushNotification';
import { useCheckListsQuery } from '../_lib/checkListsService';
import CheckListsEmptyCard from './components/CheckListsEmptyCard';
import DisplayEmptyData from '../../components/common/DisplayEmptyData';
import CheckListsPostEmptyCard from './components/CheckListsPostEmptyCard';
import { useDateFormatted } from '../../Hooks/useDateFormatted';

function addDaysToDate(operationDate: string, daysToAdd: number): string {
    // 서버에서 받은 날짜 문자열을 Date 객체로 파싱
    const date = new Date(operationDate);

    // 일수를 더함
    date.setDate(date.getDate() + daysToAdd);

    // 결과 날짜를 'YYYY-MM-DD' 형식의 문자열로 변환하여 반환
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function CheckListsPage() {
    // const [searchParams] = useSearchParams();
    // const page = Number(searchParams.get('page')) || 1;
    const [searchParams] = useSearchParams();
    // const navigation = useNavigate();
    const operationId = searchParams.get('id'); //수술ID
    const patientName = searchParams.get('name'); //환자명
    const checkListsQuery = useCheckListsQuery({ operationId: Number(operationId) });
    const checkListSetupQuery = useCheckListSetupQuery({ operationId: Number(operationId) }); //체크리스트 세팅

    const {
        data: checkListSetupData,
        isPending: isCheckListSetupPending,
        // isSuccess: isCheckListSetupSuccess,
        error: checkListSetupError,
    } = checkListSetupQuery; //체크리스트 세팅 데이터
    const {
        data: checkListsData,
        isPending: isCheckListsPending,
        isSuccess: isCheckListsSuccess,
        error: checkListsError,
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
    const isNoneSeupData = !checkListsData; // setupData가 없을때
    useEffect(() => {
        console.log(checkListsError);
        if (checkListSetupError) {
            pushNotification({
                msg: checkListSetupError.response?.data.message || '체크리스트 목록을 불러오는 중 오류가 발생했습니다.',
                type: 'error',
                theme: 'dark',
            });
        }
    }, [checkListsError, checkListSetupError]);

    // const handleRouteCheckListForm = () => {
    //     if (checkListsData?.checkListCreatedToday) {
    //         pushNotification({
    //             msg: '오늘 이미 작성된 체크리스트가 있습니다.',
    //             type: 'error',
    //             theme: 'dark',
    //         });
    //         return;
    //     }
    //     navigation(
    //         `/patient/form/compliance?id=${operationId}&name=${patientName}&dateStatus=${dateComparison}&diffDay=${diffDay}`,
    //     );
    // };
    console.log(checkListsData);
    const totalLength = checkListsData?.checkListDTOs?.length || 0;
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

                    <Link
                        to={`/patient/checkLists/preview?id=${operationId}&name=${patientName}`}
                        className={`flex flex-row items-center gap-2 rounded-md border border-blue-400 px-2 py-1 text-blue-400`}
                    >
                        <span className="text-sm font-medium">항목 미리보기</span>
                    </Link>
                </div>

                <DisplayEmptyData label="세팅된 체크리스트가 존재하지 않습니다." isRender={isNoneSeupData} />
                <ul className="grid grid-cols-1 gap-2 pb-2 mobile:grid-cols-2 mobile:px-2">
                    {dateComparison !== 'POST' && (
                        <div className="flex justify-center w-full p-4 bg-white border-y mobile:col-span-2">
                            <span className="text-sm text-gray-700">
                                수술후 체크리스트는 수술일 다음날부터 작성가능합니다.
                            </span>
                        </div>
                    )}

                    {checkListsData.checkListDTOs
                        ?.slice(0, Number(diffDay) > 0 ? 0 : Math.abs(Number(diffDay)))
                        .map((data, index) =>
                            data ? (
                                <CheckListsSummaryCard
                                    key={data.checkListId}
                                    operationDateDTO={checkListsData.operationDateDTO}
                                    checkListData={data}
                                    setupData={checkListSetupData}
                                    type="POST"
                                    postValues={data}
                                    order={totalLength - index - 1}
                                    day={-(index + 1)}
                                />
                            ) : (
                                <CheckListsPostEmptyCard
                                    key={index}
                                    day={index + 1}
                                    id={Number(operationId)}
                                    name={patientName ?? '알수없음'}
                                    order={totalLength - index - 1}
                                    today={index === Math.abs(Number(diffDay)) - 1}
                                    queryDate={addDaysToDate(checkListsData.operationDateDTO.operationDate, index + 1)}
                                />
                            ),
                        )}
                </ul>

                <ul className="grid grid-cols-1 gap-2 pb-2 mobile:grid-cols-2 mobile:px-2">
                    {dateComparison === 'PREV' && (
                        <div className="flex justify-center w-full p-4 bg-white border-y mobile:col-span-2">
                            <span className="text-sm text-gray-700">
                                수술중 체크리스트는 수술일 당일부터 작성 가능합다.
                            </span>
                        </div>
                    )}
                    {checkListsData.checkListDuringDTO && (
                        <CheckListsSummaryCard
                            operationDateDTO={checkListsData.operationDateDTO}
                            checkListData={checkListsData.checkListDuringDTO}
                            setupData={checkListSetupData}
                            type="TODAY"
                            todayValues={checkListsData.checkListDuringDTO}
                            day={0}
                        />
                    )}
                    {!checkListsData.checkListDuringDTO && dateComparison !== 'PREV' && (
                        <CheckListsEmptyCard type="TODAY" id={Number(operationId)} name={patientName ?? '알수없음'} />
                    )}

                    {checkListsData.checkListBeforeDTO && (
                        <CheckListsSummaryCard
                            operationDateDTO={checkListsData.operationDateDTO}
                            checkListData={checkListsData.checkListBeforeDTO}
                            setupData={checkListSetupData}
                            type="PREV"
                            prevValues={checkListsData.checkListBeforeDTO}
                            day={1}
                        />
                    )}
                    {!checkListsData.checkListBeforeDTO && (
                        <CheckListsEmptyCard type="PREV" id={Number(operationId)} name={patientName ?? '알수없음'} />
                    )}
                    <DisplayEmptyData label="작성된 체크리스트 0건" isRender={Boolean(isNoneData)} />
                </ul>

                <ResponsivePagination />
            </div>
        </>
    );
}

export default CheckListsPage;
