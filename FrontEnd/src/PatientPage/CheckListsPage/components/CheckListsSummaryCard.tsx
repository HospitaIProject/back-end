import { useState } from 'react';
// import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import { CheckListSetupDaySectionType, ComplianceValuesType } from '../../../models/FormType';
import CheckListsDetailModal from './CheckListsDetailModal';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import ArrowIcon from '../../../icons/ArrowIcon';
// import { Link } from 'react-router-dom';

type Props = {
    surgeryData: ComplianceValuesType;
    setupData: CheckListSetupDaySectionType;
};

function CheckListsSummaryCard({ surgeryData, setupData }: Props) {
    const { checkListId, createAt, updatedAt } = surgeryData;

    const { allDate: formattedCreateAt } = useDateFormatted(createAt || ''); //작성일
    const { allDate: formattedUpdatedAte } = useDateFormatted(updatedAt || ''); //수정일

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <li
                key={checkListId}
                className="flex flex-row items-center w-full p-4 bg-white cursor-pointer border-y hover:bg-blue-50"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex flex-row items-center w-full gap-4">
                    <span className="text-lg font-semibold text-sky-800">{surgeryData.checkListId}</span>
                    <div className="flex flex-col gap-1">
                        <span className="inline-block text-sm text-gray-700 break-words">
                            작성일:&nbsp;
                            <span className="font-medium text-gray-900">{formattedCreateAt}</span>
                        </span>
                        <span className="inline-block text-sm text-gray-700 break-words">
                            수정일:&nbsp;
                            <span className="font-medium text-gray-900">
                                {formattedCreateAt === formattedUpdatedAte ? '수정일 없음' : formattedUpdatedAte}
                            </span>
                        </span>
                    </div>
                </div>
                <button className="text-sm font-semibold text-blue-600 underline underline-offset-4">
                    <ArrowIcon className="w-5 h-5 text-blue-600" />
                </button>
            </li>
            {isModalOpen && (
                <CheckListsDetailModal
                    setupData={setupData}
                    values={surgeryData}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}

export default CheckListsSummaryCard;
