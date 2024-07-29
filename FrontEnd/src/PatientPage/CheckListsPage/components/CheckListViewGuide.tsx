import { useState } from 'react';
import SearchIcon from '../../../icons/SearchIcon';
import { CHECKLIST_SECTION_KEYS, CheckListSetupType } from '../../../models/CheckListsType';
import { CHECKLIST_ITEMS_NAME } from '../../../utils/mappingNames';

function CheckListViewGuide({ patientName, existFields }: { patientName: string; existFields: CheckListSetupType }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className="flex flex-col items-center px-4 py-3 mb-4 border-b rounded-md bg-gray-50 text-neutral-700"
            onClick={handleToggle}
        >
            <div className="flex flex-row w-full pl-24">
                <span className="mx-auto text-lg font-semibold text-center text-blue-500">{patientName}</span>
                <div className="flex flex-row items-center justify-end w-24 gap-2 text-gray-700">
                    <span className="text-sm">제외 항목</span>
                    <SearchIcon className="w-3 h-3 text-gray-500" />
                </div>
            </div>
            <div
                className={`flex w-full flex-col gap-3 border-t px-4 transition-all duration-200 ${
                    isOpen ? 'max-h-[999px] py-2 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                }`}
            >
                <div className="flex flex-col items-center text-sm text-gray-700">
                    <span className="px-1 mb-1 font-semibold bg-yellow-100">수술전</span>
                    {Object.keys(existFields)
                        .filter((key) => CHECKLIST_SECTION_KEYS.PREV.includes(key) && !existFields[key])
                        .map((patientKey, index, array) => (
                            <span
                                key={patientKey}
                            >{`${CHECKLIST_ITEMS_NAME[patientKey]}${index === array.length - 1 ? '' : ', '} `}</span>
                        ))}
                </div>
                <div className="flex flex-col items-center text-sm text-gray-700">
                    <span className="px-1 mb-1 font-semibold bg-yellow-100">수술당일</span>
                    {Object.keys(existFields)
                        .filter((key) => CHECKLIST_SECTION_KEYS.TODAY.includes(key) && !existFields[key])
                        .map((patientKey, index, array) => (
                            <span
                                key={patientKey}
                            >{`${CHECKLIST_ITEMS_NAME[patientKey]}${index === array.length - 1 ? '' : ', '} `}</span>
                        ))}
                </div>
                <div className="flex flex-col items-center text-sm text-gray-700">
                    <span className="px-1 mb-1 font-semibold bg-yellow-100">수술후</span>
                    {Object.keys(existFields)
                        .filter((key) => CHECKLIST_SECTION_KEYS.POST.includes(key) && !existFields[key])
                        .map((patientKey, index, array) => (
                            <span key={patientKey}>
                                {`${CHECKLIST_ITEMS_NAME[patientKey]}${index === array.length - 1 ? '' : ', '} `}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default CheckListViewGuide;
