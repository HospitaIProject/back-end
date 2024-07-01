import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '../../icons/CloseIcon';

type ModalWrapperProps = {
    children: React.ReactNode;
    title?: string;

    onClose?: () => void;
};

function ModalFullScreenContainer({ children, title, onClose }: ModalWrapperProps) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (!open || !isBrowser) return null;

    return ReactDOM.createPortal(
        <div className="bg-modal fixed bottom-0 left-0 right-0 top-0 z-[2000] flex h-full w-screen justify-center overflow-y-auto bg-white">
            <div className="mt-4 flex h-fit w-full max-w-[1300px] flex-col rounded-t-lg border-x border-t">
                <header className="flex w-full flex-row justify-between p-4 text-gray-600">
                    <div className="ml-7 flex flex-grow justify-center font-medium">
                        <span className="text-lg">{title}</span>
                    </div>
                    <button onClick={onClose}>
                        <CloseIcon className="h-7 w-7 text-inherit" />
                    </button>
                </header>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement,
    );
}

export default ModalFullScreenContainer;
