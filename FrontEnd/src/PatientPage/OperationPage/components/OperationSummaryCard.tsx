import { useEffect, useState } from 'react';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import { OperationItemType } from '../../../models/OperationType';
import OperationDetailModal from './OperationDetailModal';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useOperationMethodFormatted } from '../../../Hooks/useOperationMethodFormatted';
import { useComplicationStatusMutation } from '../../_lib/complicationService';
import DonutProgressbar from '../../../components/common/progress/DonutProgressbar';

type Props = {
    operationData: OperationItemType;
};

function OperationSummaryCard({ operationData }: Props) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const patientName = searchParams.get('name');
    const patientId = searchParams.get('id');
    const operationDate = searchParams.get('od');
    const complicationStatusMutation = useComplicationStatusMutation({
        patientId: Number(patientId),
    });
    const { onlyTime: operationStartTime } = useDateFormatted(operationData.operationStartTime); //수술시작시간
    const { onlyTime: operationEndTime } = useDateFormatted(operationData.operationEndTime); //수술종료시간
    const { dateComparison } = useDateFormatted(operationDate || ''); //수술날짜 비교
    const { onlyDate: todayDate } = useDateFormatted(new Date()); //오늘 날짜

    const operationMethodFormatted = useOperationMethodFormatted({
        operationMethod: operationData.operationMethod,
        customOperationMethod: operationData.customOperationMethod,
    }); //수술명(수술명+커스텀 수술명 합침 )
    const { operationId, totalOperationTime } = operationData;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const isComplicationStatus = operationData.complicationStatus === 'YES' ? true : false; //합병증 여부
    const isComplicationRegistered = operationData.complicationRegistered; //합병증 등록 여부

    const handleCompliCationSetting = () => {
        navigate(`/patient/new/complication?id=${operationId}&name=${patientName}`);
    }; //합병증 작성페이지로 이동
    const handleComplicationStatus = () => {
        if (isComplicationStatus) {
            if (confirm('합병증 여부를 No로 변경하시겠습니까?\n‼️ 변경 시 등록된 합병증 정보가 삭제됩니다.')) {
                complicationStatusMutation.mutate({
                    operationId,
                    status: 'NO',
                    isComplicationRegistered: isComplicationRegistered,
                });
            }
        } else {
            if (dateComparison !== 'POST') {
                alert(
                    `수술 날짜 이후부터 합병증 여부를 변경할 수 있습니다.\n오늘 날짜: ${todayDate}\n수술 날짜: ${operationDate}`,
                );
                return;
            }
            if (confirm('합병증 여부를 Yes로 변경하시겠습니까?')) {
                complicationStatusMutation.mutate({ operationId, status: 'YES' });
            }
        }
    }; //합병증 여부 변경
    useEffect(() => {
        if (operationData) {
            console.log('operationData', operationData);
        }
    }, [operationData]);

    return (
        <>
            <li
                key={operationId}
                className="flex flex-col w-full gap-3 p-4 bg-white border-y"
                // onClick={handleOpenModal}
            >
                <div className="flex flex-row flex-wrap items-center justify-between gap-4 mb-1">
                    <span className="text-lg font-semibold text-sky-800">{operationMethodFormatted}</span>
                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                        className="text-sm font-semibold text-blue-600 underline underline-offset-4"
                    >
                        상세정보
                    </button>
                </div>
                <div className="flex flex-row w-full">
                    <div className="flex flex-col gap-1">
                        <span className="inline-block text-sm text-gray-700 break-words">
                            수술 시작 시간:&nbsp;
                            <span className="font-medium text-gray-900">
                                {operationStartTime ? operationStartTime : '없음'}
                            </span>
                        </span>
                        <span className="inline-block text-sm text-gray-700 break-words">
                            수술 종료 시간:&nbsp;
                            <span className="font-medium text-gray-900">{operationEndTime}</span>
                        </span>
                        <span className="inline-block text-sm text-gray-700 break-words">
                            전체 수술 시간:&nbsp;
                            <span className="font-medium text-gray-900">{totalOperationTime}분</span>
                        </span>
                    </div>

                    <div className={`flex flex-grow flex-row items-end justify-end gap-2`}>
                        <div
                            className={`flex translate-y-1 flex-col items-center gap-1 ${
                                operationData.complicationStatus === 'YES' ? '' : 'hidden'
                            }`}
                        >
                            <DonutProgressbar
                                className="h-[45px] w-[45px]"
                                percent={Number(operationData.complicationScore.toFixed(1))}
                                unit="점"
                                color="Sixth"
                                textClassName="text-[0.65rem]"
                            />
                            <span className="text-[0.65rem] text-red-500">CCI Score</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 translate-y-1">
                            <DonutProgressbar
                                className="h-[45px] w-[45px]"
                                percent={Number(operationData.compliancePercentage.toFixed(1))}
                                unit="%"
                                color="Third"
                                textClassName="text-[0.65rem]"
                            />
                            <span className="text-[0.65rem] text-blue-500">Compliance</span>
                        </div>
                    </div>
                </div>

                <div className="w-full border-t" />

                <div className="flex flex-row items-center justify-between w-full gap-2 text-gray-600">
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-gray-600 text-md">합병증여부: </span>
                        <button
                            className={`relative flex h-7 w-[50px] flex-row items-center justify-between rounded-full px-1 ${isComplicationStatus ? 'bg-blue-50' : 'bg-red-50'}`}
                            onClick={handleComplicationStatus}
                        >
                            <span
                                className={`${isComplicationStatus ? 'opacity-0' : 'opacity-100'} absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-red-300 text-center text-xs text-white transition-all duration-300 ease-in-out`}
                            >
                                NO
                            </span>
                            <span
                                className={`${isComplicationStatus ? 'opacity-100' : 'opacity-0'} absolute right-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-400 text-center text-xs text-white transition-all duration-300 ease-in-out`}
                            >
                                Yes
                            </span>
                        </button>
                    </div>

                    <div className="flex flex-row gap-3">
                        <div className={`relative ${isComplicationStatus ? '' : 'hidden'}`}>
                            <button onClick={handleCompliCationSetting} className="p-2 text-sm border rounded-md">
                                {isComplicationRegistered ? '합병증 관리' : '합병증 등록'}
                            </button>
                            <span
                                className={`absolute -right-2 -top-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 text-sm text-red-500 ${isComplicationRegistered ? 'hidden' : ''}`}
                            >
                                !
                            </span>
                        </div>
                        <Link
                            to={`/patient/checkLists?id=${operationId}&name=${patientName}`}
                            className="p-2 text-sm font-medium border rounded-md hover:bg-blue-50"
                        >
                            체크리스트
                        </Link>
                    </div>
                </div>
            </li>
            {isModalOpen && <OperationDetailModal values={operationData} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}

export default OperationSummaryCard;
