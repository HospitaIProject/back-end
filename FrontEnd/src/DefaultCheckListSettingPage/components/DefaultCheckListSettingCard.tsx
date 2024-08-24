import { useState } from 'react';
import MethodSubmitModal from './MethodSubmitModal';
import ArrowIcon from '../../icons/ArrowIcon';
import OperationSettingTab from './OperationSettingTab';
// import MethodSettingSelectModal from './MethodSettingSelectModal';

function DefaultCheckListSettingCard({ operationMethod }: { operationMethod: string }) {
    const [isOperationMethodModal, setIsOperationMethodModal] = useState<boolean>(false);
    const [isSettingTabOpen, setIsSettingTabOpen] = useState<boolean>(false);

    const handleToggleOperationMethodModal = (isOpen: boolean) => {
        setIsOperationMethodModal(isOpen);
    }; //수술명 변경 모달 토글

    const handleToggleSettingTab = (isOpen: boolean) => {
        setIsSettingTabOpen(isOpen);
    };

    return (
        <>
            <div
                // onClick={() => setIsSettingOptionModal(true)}
                className="flex flex-col items-start justify-between px-2 py-3 border-b cursor-pointer"
                onClick={() => handleToggleSettingTab(!isSettingTabOpen)}
            >
                <div className="flex flex-row items-center justify-between w-full">
                    <span className="text-sm font-medium break-all">{operationMethod}</span>
                    <button className="px-1 py-1 text-sm text-gray-300 rounded-md hover:bg-gray-100">
                        <ArrowIcon
                            className={`h-6 w-6 rotate-90 ${
                                isSettingTabOpen ? 'rotate-90 transform' : '-rotate-90 transform'
                            }`}
                        />
                    </button>
                </div>
                <div
                    className={`flex w-full justify-end transition-all duration-200 ease-in-out ${isSettingTabOpen ? 'mt-3 max-h-[999px] opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
                >
                    <OperationSettingTab operationMethod={operationMethod} />
                </div>
            </div>
            {isOperationMethodModal && (
                <MethodSubmitModal type="post" onClose={() => handleToggleOperationMethodModal(false)} /> //수술명 추가 모달
            )}
        </>
    );
}

export default DefaultCheckListSettingCard;
