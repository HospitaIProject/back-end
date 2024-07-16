import { useState } from 'react';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import { OperationItemType } from '../../../models/OperationType';
import OperationDetailModal from './OperationDetailModal';
import { Link, useSearchParams } from 'react-router-dom';
import { useOperationMethodFormatted } from '../../../Hooks/useOperationMethodFormatted';

type Props = {
    operationData: OperationItemType;
};

function OperationSummaryCard({ operationData }: Props) {
    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name');
    const { onlyTime: operationStartTime } = useDateFormatted(operationData.operationStartTime); //수술시작시간
    const { onlyTime: operationEndTime } = useDateFormatted(operationData.operationEndTime); //수술종료시간
    // const { onlyDate: formattedDischargedDate } = useDateFormatted(operationData.dischargedDate); //퇴원일
    const operationMethodFormatted = useOperationMethodFormatted({
        operationMethod: operationData.operationMethod,
        customOperationMethod: operationData.customOperationMethod,
    });
    const { operationId, totalOperationTime } = operationData; //수술명
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <div className="flex flex-row items-center justify-between w-full">
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
                </div>

                <div className="w-full my-1 border-t" />

                <div className="flex flex-row justify-end w-full gap-2 text-gray-600">
                    <Link
                        to={`/patient/checkLists?id=${operationId}&name=${patientName}`}
                        className="p-2 text-sm font-medium border rounded-md hover:bg-blue-50"
                    >
                        체크리스트
                    </Link>
                </div>
            </li>
            {isModalOpen && <OperationDetailModal values={operationData} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}

export default OperationSummaryCard;
