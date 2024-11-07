import { useState } from 'react';
import SearchIcon from '../../../icons/SearchIcon';
import {
    CHECKLIST_SECTION_KEYS,
    CheckListSetupType,
    DAILY_CHECKLIST_SECTION_KEYS,
} from '../../../models/CheckListsType';
import { CHECKLIST_ITEMS_NAME } from '../../../utils/mappingNames';
import { useLocation } from 'react-router-dom';

function CheckListViewGuide({
    patientName,
    existFields,
    dateStatus,
    // date,
}: {
    patientName: string;
    existFields: CheckListSetupType;
    dateStatus?: string;
    date?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const isViewPage = Boolean(dateStatus);
    const isDailyPage = Boolean(dateStatus?.startsWith('D+'));
    console.log('existFields', existFields);

    return (
        <div
            className="mb-4 flex flex-col items-center rounded-md border-b bg-gray-50 px-4 py-3 text-neutral-700"
            onClick={handleToggle}
        >
            <div className="flex w-full flex-row items-center">
                <div className={`flex w-24 flex-col ${isViewPage ? '' : 'opacity-0'} `}>
                    <span className="w-fit rounded-md bg-yellow-200 px-2 text-sm font-medium text-gray-700">
                        {dateStatus ?? ''}
                    </span>
                </div>
                <span className="mx-auto text-center text-lg font-semibold text-blue-500">{patientName}</span>
                <div className="flex w-24 flex-row items-center justify-end gap-2 text-gray-700">
                    <span className="text-sm">제외 항목</span>
                    <SearchIcon className="h-3 w-3 text-gray-500" />
                </div>
            </div>

            <div
                className={`flex w-full flex-col gap-3 border-t px-4 transition-all duration-200 ${
                    isOpen ? 'max-h-[999px] py-2 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                }`}
            >
                <div className={`flex flex-col items-center text-sm text-gray-700 ${isDailyPage ? 'hidden' : ''}`}>
                    <span className="mb-1 bg-yellow-100 px-1 font-semibold">수술전</span>
                    {Object.keys(existFields)
                        .filter((key) => CHECKLIST_SECTION_KEYS.PREV.includes(key) && !existFields[key])
                        .map((patientKey, index, array) => (
                            <span
                                key={patientKey}
                            >{`${CHECKLIST_ITEMS_NAME[patientKey]}${index === array.length - 1 ? '' : ', '} `}</span>
                        ))}
                </div>
                <div className={`flex flex-col items-center text-sm text-gray-700 ${isDailyPage ? 'hidden' : ''}`}>
                    <span className="mb-1 bg-yellow-100 px-1 font-semibold">수술당일</span>
                    {Object.keys(existFields)
                        .filter((key) => CHECKLIST_SECTION_KEYS.TODAY.includes(key) && !existFields[key])
                        .map((patientKey, index, array) => (
                            <span
                                key={patientKey}
                            >{`${CHECKLIST_ITEMS_NAME[patientKey]}${index === array.length - 1 ? '' : ', '} `}</span>
                        ))}
                </div>
                <div className={`${isDailyPage ? 'hidden' : ''} flex flex-col items-center text-sm text-gray-700`}>
                    <span className="mb-1 bg-yellow-100 px-1 font-semibold">수술후</span>
                    {Object.keys(existFields)
                        .filter((key) => CHECKLIST_SECTION_KEYS.POST.includes(key) && !existFields[key])
                        .map((patientKey, index, array) => (
                            <span key={patientKey}>
                                {`${CHECKLIST_ITEMS_NAME[patientKey]}${index === array.length - 1 ? '' : ', '} `}
                            </span>
                        ))}
                </div>

                <div
                    className={`${isDailyPage || pathname.startsWith('/patient/checkLists/preview') ? '' : 'hidden'} flex flex-col items-center text-sm text-gray-700`}
                >
                    <span className="mb-1 bg-yellow-100 px-1 font-semibold">Daily</span>
                    {Object.keys(existFields)
                        .filter((key) => DAILY_CHECKLIST_SECTION_KEYS.includes(key) && !existFields[key])
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
