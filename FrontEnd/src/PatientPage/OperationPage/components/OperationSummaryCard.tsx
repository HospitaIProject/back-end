import { useEffect, useState } from 'react';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import { OperationItemType } from '../../../models/OperationType';
import OperationDetailModal from './OperationDetailModal';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useOperationMethodFormatted } from '../../../Hooks/useOperationMethodFormatted';
import { useComplicationStatusMutation } from '../../_lib/complicationService';
import DonutProgressbar from '../../../components/common/progress/DonutProgressbar';
import { useTranslation } from 'react-i18next';

type Props = {
    operationData: OperationItemType;
};

function OperationSummaryCard({ operationData }: Props) {
    const { t } = useTranslation();
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
        operationMethod: operationData.operationTypeNames,
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
                className="flex w-full flex-col gap-3 border-y bg-white p-4"
                // onClick={handleOpenModal}
            >
                <div className="mb-1 flex flex-row flex-wrap items-center justify-between gap-4">
                    <span className="text-lg font-semibold text-sky-800">{operationMethodFormatted}</span>
                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                        className="text-sm font-semibold text-blue-600 underline underline-offset-4"
                    >
                        {t("details")}
                    </button>
                </div>
                <div className="flex w-full flex-row">
                    <div className="flex flex-col gap-1">
                        <span className="inline-block break-words text-sm text-gray-700">
                            {t("opStartTime")}:&nbsp;
                            <span className="font-medium text-gray-900">
                                {operationStartTime ? operationStartTime : '없음'}
                            </span>
                        </span>
                        <span className="inline-block break-words text-sm text-gray-700">
                            {t("opEndTime")}:&nbsp;
                            <span className="font-medium text-gray-900">{operationEndTime}</span>
                        </span>
                        <span className="inline-block break-words text-sm text-gray-700">
                            {t("totalOpTime")}:&nbsp;
                            <span className="font-medium text-gray-900">{totalOperationTime} {t("totalOpTimeUnit")}</span>
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
                        <div className="flex translate-y-1 flex-col items-center gap-1">
                            <DonutProgressbar
                                className="h-[45px] w-[45px]"
                                percent={Number(operationData.complianceScoreDTO.compliancePercentage.toFixed(1))}
                                unit="%"
                                color="Third"
                                textClassName="text-[0.65rem]"
                            />
                            <span className="text-[0.65rem] text-blue-500">Compliance</span>
                        </div>
                    </div>
                </div>

                <div className="w-full border-t" />

                <div className="flex w-full flex-row items-center justify-between gap-2 text-gray-600">
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-md text-gray-600">{t("complicationStatus")}: </span>
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
                            <button onClick={handleCompliCationSetting} className="rounded-md border p-2 text-sm">
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
                            className="rounded-md border p-2 text-sm font-medium hover:bg-blue-50"
                        >
                            {t("checkList")}
                        </Link>
                    </div>
                </div>
            </li>
            {isModalOpen && <OperationDetailModal values={operationData} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}

export default OperationSummaryCard;
