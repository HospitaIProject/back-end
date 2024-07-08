import { useState } from 'react';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import { SurgeryType } from '../../../models/SurgeryType';
import SurgeryDetailModal from './SurgeryDetailModal';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
    surgeryData: SurgeryType;
};

function SurgerySummaryCard({ surgeryData }: Props) {
    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name');
    const { onlyDate: formattedOperationDate, dateComparison } = useDateFormatted(surgeryData.opertationDate); //수술일
    const { onlyDate: formattedHospitalizedDate } = useDateFormatted(surgeryData.hospitalizedDate); //입원일
    const { onlyDate: formattedDischargedDate } = useDateFormatted(surgeryData.dischargedDate); //퇴원일
    const { operationId, operationMethod } = surgeryData; //수술명
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <li
                key={operationId}
                className="flex flex-col w-full gap-3 p-4 bg-white border-y"
                // onClick={handleOpenModal}
            >
                <div className="flex flex-row flex-wrap items-center justify-between gap-4 mb-1">
                    <span className="text-lg font-semibold text-sky-800">수술명:&nbsp;{operationMethod}</span>
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
                            수술일:&nbsp;
                            <span className="font-medium text-gray-900">
                                {formattedOperationDate ? formattedOperationDate : '없음'}
                            </span>
                        </span>
                        <span className="inline-block text-sm text-gray-700 break-words">
                            입원일:&nbsp;
                            <span className="font-medium text-gray-900">{formattedHospitalizedDate}</span>
                        </span>
                        <span className="inline-block text-sm text-gray-700 break-words">
                            퇴원일:&nbsp;
                            <span className="font-medium text-gray-900">{formattedDischargedDate}</span>
                        </span>
                    </div>
                </div>

                <div className="w-full my-1 border-t" />

                <div className="flex flex-row justify-end w-full gap-2 text-gray-600">
                    <Link
                        to={`/patient/checkLists?id=${operationId}&name=${patientName}&dateStatus=${dateComparison}`}
                        className="p-2 text-sm font-medium border rounded-md hover:bg-blue-50"
                    >
                        체크리스트
                    </Link>
                </div>
            </li>
            {isModalOpen && <SurgeryDetailModal values={surgeryData} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}

export default SurgerySummaryCard;
