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
    const { operationId, operationMethod } = operationData; //수술명
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        상세정보
                    </button>
                </div>
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="inline-block break-words text-sm text-gray-700">
                            수술 시작 시간:&nbsp;
                            <span className="font-medium text-gray-900">
                                {operationStartTime ? operationStartTime : '없음'}
                            </span>
                        </span>
                        <span className="inline-block break-words text-sm text-gray-700">
                            수술 종료 시간:&nbsp;
                            <span className="font-medium text-gray-900">{operationEndTime}</span>
                        </span>
                        <span className="inline-block break-words text-sm text-gray-700">
                            전체 수술 시간:&nbsp;
                            <span className="font-medium text-gray-900">{operationData.totalOperationTime}분</span>
                        </span>
                    </div>
                </div>

                <div className="my-1 w-full border-t" />

                <div className="flex w-full flex-row justify-end gap-2 text-gray-600">
                    {/* <Link
                        to={`/patient/checkLists?id=${operationId}&name=${patientName}&dateStatus=${dateComparison}`}
                        className="p-2 text-sm font-medium border rounded-md hover:bg-blue-50"
                    >
                        체크리스트
                    </Link> */}
                </div>
            </li>
            {isModalOpen && <OperationDetailModal values={operationData} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}

export default OperationSummaryCard;
