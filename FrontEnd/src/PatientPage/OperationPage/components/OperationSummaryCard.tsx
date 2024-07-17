import { useState } from 'react';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import { OperationItemType } from '../../../models/OperationType';
import OperationDetailModal from './OperationDetailModal';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useOperationMethodFormatted } from '../../../Hooks/useOperationMethodFormatted';

type Props = {
    operationData: OperationItemType;
};

function OperationSummaryCard({ operationData }: Props) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const patientName = searchParams.get('name');
    const { onlyTime: operationStartTime } = useDateFormatted(operationData.operationStartTime); //수술시작시간
    const { onlyTime: operationEndTime } = useDateFormatted(operationData.operationEndTime); //수술종료시간
    // const { onlyDate: formattedDischargedDate } = useDateFormatted(operationData.dischargedDate); //퇴원일
    const operationMethodFormatted = useOperationMethodFormatted({
        operationMethod: operationData.operationMethod,
        customOperationMethod: operationData.customOperationMethod,
    });
    const { operationId, totalOperationTime } = operationData;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleCompliCationSetting = () => {
        if (
            confirm(
                '                               ✅ 기본 합병증 여부는 No입니다.\n                      👉🏽 합병증 작성페이지로 이동하시겠습니까? 👈🏽',
            )
        ) {
            navigate(`/patient/new/complication?id=${operationId}&name=${patientName}`);
        }
    };

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
                            <span className="font-medium text-gray-900">{totalOperationTime}분</span>
                        </span>
                    </div>
                </div>

                <div className="my-1 w-full border-t" />

                <div className="flex w-full flex-row items-center justify-between gap-2 text-gray-600">
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-md text-gray-600">합병증여부: </span>
                        <button
                            className={`relative flex h-7 w-[50px] flex-row items-center justify-between rounded-full px-1 ${isActive ? 'bg-blue-50' : 'bg-red-50'}`}
                            onClick={() => setIsActive(!isActive)}
                        >
                            <span
                                className={`${isActive ? 'opacity-0' : 'opacity-100'} absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-red-300 text-center text-xs text-white transition-all duration-300 ease-in-out`}
                            >
                                NO
                            </span>
                            <span
                                className={`${isActive ? 'opacity-100' : 'opacity-0'} absolute right-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-400 text-center text-xs text-white transition-all duration-300 ease-in-out`}
                            >
                                Yes
                            </span>
                        </button>
                    </div>

                    <div className="flex flex-row gap-3">
                        <div className="relative">
                            <button onClick={handleCompliCationSetting} className="rounded-md border p-2 text-sm">
                                합병증 관리
                            </button>
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 text-sm text-red-500">
                                !
                            </span>
                        </div>
                        <Link
                            to={`/patient/checkLists?id=${operationId}&name=${patientName}`}
                            className="rounded-md border p-2 text-sm font-medium hover:bg-blue-50"
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
