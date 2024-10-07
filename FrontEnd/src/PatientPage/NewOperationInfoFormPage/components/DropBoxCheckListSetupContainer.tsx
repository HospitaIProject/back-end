import React, { useState } from 'react';
import ArrowIcon from '../../../icons/ArrowIcon';

function DropBoxCheckListSetupContainer({ children, label }: { children: React.ReactNode; label: string }) {
    const [isOpen, setIsOpen] = useState(true);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                type="button"
                className="flex items-center justify-center w-full py-2 pl-8 pr-3 text-gray-700 bg-gray-100 rounded-md"
                onClick={handleToggle}
            >
                <span className="flex justify-center flex-grow">{label}</span>
                <ArrowIcon
                    className={`h-5 w-5 transform text-gray-700 transition-all duration-200 ${isOpen ? '-rotate-90' : 'rotate-90'}`}
                />
            </button>
            <div
                className={`${isOpen ? 'max-h-[999px] opacity-100' : 'max-h-3 overflow-hidden opacity-0'} transition-all duration-200`}
            >
                {children}
            </div>
        </>
    );
}

export default DropBoxCheckListSetupContainer;
