import { useEffect, useState } from 'react';
import Loading from '../../components/common/Loading';
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
import HorizontalProgressBar from '../../components/common/progress/HorizontalProgressBar';
import dayjs from 'dayjs';
import PencilIcon from '../../icons/PencilIcon';
import RemoveDateModal from './components/RemoveDateModal';
import { useRefreshAtSpecificTime } from '../../Hooks/useRefreshAtSpecificTime';

function addDaysToDate(operationDate: string, daysToAdd: number): string {
    // day.js로 날짜를 파싱하고 일수를 더함
    const newDate = dayjs(operationDate).add(daysToAdd, 'day');

    // 'YYYY-MM-DD' 형식으로 반환
    return newDate.format('YYYY-MM-DD');
}

function CheckListsPage() {
    const [isRemoveDateModalOpen, setIsRemoveDateModalOpen] = useState(false);
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
        refetch: checkListsRefetch,
    } = checkListsQuery; //체크리스트 목록 데이터
    useRefreshAtSpecificTime({
        refetch: checkListsRefetch,
        targetHour: 0,
        targetMinute: 0,
        text: '자정이 되어 데이터를 새로 요청합니다.',
    }); // 자정에 데이터를 새로 요청

    const { diffDay } = useOperationDayFormat(checkListsData?.operationDateDTO.operationDate || ''); //수술일로부터 몇일이 지났는지
    const { dateComparison } = useDateFormatted(checkListsData?.operationDateDTO.operationDate || ''); //수술일과 현재날짜 비교
    const { onlyDate: operationDate } = useDateFormatted(checkListsData?.operationDateDTO.operationDate || '');

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

    const totalLength = checkListsData?.checkListDTOs?.length || 0; //체크리스트 총 길이

    if (isCheckListsPending || isCheckListSetupPending) return <Loading />;

    if (!checkListsData || !checkListSetupData) {
        return;
    }

    const checkListTotalCompelete =
        checkListsData.checkListDTOs!.filter((item) => item !== null).length +
        (checkListsData?.checkListAfterDTO ? 1 : 0) +
        (checkListsData?.checkListBeforeDTO ? 1 : 0) +
        (checkListsData?.checkListDuringDTO ? 1 : 0);
    const isPreviousCheckListsComplete = Boolean(
        checkListsData?.checkListAfterDTO && checkListsData?.checkListBeforeDTO && checkListsData?.checkListDuringDTO,
    );
    console.log('checkListTotalCompelete', checkListTotalCompelete);

    return (
        <>
            <div className="flex w-full flex-col justify-center">
                <div className="mb-2 flex w-full flex-col items-center gap-3 border-b bg-blue-50 px-4 py-3 mobile:col-span-2">
                    <div className="flex w-full flex-row justify-between gap-3">
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
                    <div className="w-full">
                        <HorizontalProgressBar
                            percent={Number(checkListsData.complianceScoreDTO.compliancePercentage.toFixed(1))}
                            total={checkListsData.complianceScoreDTO.totalCheckListCount}
                            completed={checkListsData.complianceScoreDTO.totalCheckListCompleted}
                            checkListTotalCompeleted={checkListTotalCompelete}
                        />
                    </div>
                </div>
                <DisplayEmptyData label="세팅된 체크리스트가 존재하지 않습니다." isRender={isNoneSeupData} />
                <ul className="grid grid-cols-1 gap-2 pb-2 mobile:grid-cols-2 mobile:px-2">
                    {dateComparison !== 'POST' && (
                        <div className="flex w-full justify-center border-y bg-white p-4 mobile:col-span-2">
                            <span className="text-sm text-gray-700">
                                일일 체크리스트는 수술일 다음 날부터 작성 가능합니다.
                            </span>
                        </div>
                    )}
                    {checkListsData.checkListDTOs === null && (
                        <div className="flex w-full justify-center border-y bg-white p-4 mobile:col-span-2">
                            <span className="text-sm text-gray-700">
                                일일 체크리스트는 퇴원일이 입력된 후에 표시됩니다.
                            </span>
                        </div>
                    )}

                    {checkListsData.checkListDTOs
                        ?.slice(0, Number(diffDay) > 0 ? 0 : Math.abs(Number(diffDay)))
                        .map((data, index) =>
                            data ? (
                                <CheckListsSummaryCard
                                    key={index}
                                    operationDateDTO={checkListsData.operationDateDTO}
                                    checkListData={data}
                                    setupData={checkListSetupData}
                                    type="DAILY"
                                    dailyValues={data}
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
                                    isPreviousCheckListsComplete={isPreviousCheckListsComplete}
                                />
                            ),
                        )}
                </ul>
                <ul className="grid grid-cols-1 gap-2 pb-2 mobile:grid-cols-2 mobile:px-2">
                    {dateComparison === 'PREV' && (
                        <div className="flex w-full justify-center border-y bg-white p-4 mobile:col-span-2">
                            <span className="text-sm text-gray-700">
                                수술 중, 수술 후 체크리스트는 수술일 당일부터 작성 가능합니다.
                            </span>
                        </div>
                    )}
                    {checkListsData.checkListAfterDTO && (
                        <CheckListsSummaryCard
                            operationDateDTO={checkListsData.operationDateDTO}
                            checkListData={checkListsData.checkListAfterDTO}
                            setupData={checkListSetupData}
                            type="POST"
                            postValues={checkListsData.checkListAfterDTO}
                            day={-1}
                        />
                    )}
                    {!checkListsData.checkListAfterDTO && dateComparison !== 'PREV' && (
                        <CheckListsEmptyCard
                            type="POST"
                            id={Number(operationId)}
                            name={patientName ?? '알수없음'}
                            operationDate={operationDate}
                            totalCompleted={checkListTotalCompelete}
                        />
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
                        <CheckListsEmptyCard
                            type="TODAY"
                            id={Number(operationId)}
                            name={patientName ?? '알수없음'}
                            operationDate={operationDate}
                            totalCompleted={checkListTotalCompelete}
                        />
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
                        <CheckListsEmptyCard
                            type="PREV"
                            id={Number(operationId)}
                            name={patientName ?? '알수없음'}
                            operationDate={operationDate}
                            totalCompleted={checkListTotalCompelete}
                        />
                    )}
                    <DisplayEmptyData label="작성된 체크리스트 0건" isRender={Boolean(isNoneData)} />
                </ul>
                <div className="mt-auto flex w-full flex-col items-center border-t bg-white px-4 py-3 mobile:col-span-2">
                    <button
                        onClick={() => setIsRemoveDateModalOpen(true)}
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-400 p-2 text-white shadow-sm"
                    >
                        <span>제거일 등록</span>
                        <PencilIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
            {isRemoveDateModalOpen && (
                <RemoveDateModal
                    onClose={() => setIsRemoveDateModalOpen(false)}
                    od={checkListsData.operationDateDTO.operationDate}
                    catheterRemoval={checkListsData.checkListAfterDTO?.catheterRemoval}
                    catheterRemovalDate={checkListsData.checkListAfterDTO?.catheterRemovalDate}
                    jpDrainRemoval={checkListsData.checkListAfterDTO?.jpDrainRemoval}
                    jpDrainRemovalDate={checkListsData.checkListAfterDTO?.jpDrainRemovalDate}
                    podThreeIvLineRemovalDate={checkListsData.checkListDTOs?.[2]?.podThreeIvLineRemovalDate}
                    checkListAfterId={checkListsData.checkListAfterDTO?.checkListAfterId}
                    checkListId={checkListsData.checkListDTOs?.[2]?.checkListId}
                />
            )}
        </>
    );
}

export default CheckListsPage;
