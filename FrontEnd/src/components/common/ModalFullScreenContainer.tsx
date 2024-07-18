import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '../../icons/CloseIcon';

type ModalWrapperProps = {
    children: React.ReactNode;
    title?: string;

    onClose?: () => void;
    maxWidthClassName?: string; //container className
    bgClassName?: string; //background className
};

function ModalFullScreenContainer({ children, title, onClose, maxWidthClassName, bgClassName }: ModalWrapperProps) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);
    useEffect(() => {
        setIsBrowser(true);
        // 모달이 열릴 때 body의 overflow를 hidden으로 설정
        document.body.style.overflow = 'hidden';
        return () => {
            // 컴포넌트가 언마운트될 때 원래대로 되돌림
            document.body.style.overflow = '';
        };
    }, []);

    if (!open || !isBrowser) return null;

    return ReactDOM.createPortal(
        <div className="bg-modal fixed bottom-0 left-0 right-0 top-0 z-[2000] flex h-dvh w-screen justify-center bg-gray-800 bg-opacity-40 pt-10">
            <div
                className={`flex w-full scroll-smooth ${maxWidthClassName ? maxWidthClassName : 'max-w-screen-tablet'} flex-col rounded-t-lg border-x border-t ${bgClassName ? bgClassName : 'bg-white'}`}
            >
                <header className="flex w-full flex-row justify-between p-6 text-gray-600">
                    <div className="ml-7 flex flex-grow justify-center font-medium">
                        <span className="text-lg">{title}</span>
                    </div>
                    <button onClick={onClose}>
                        <CloseIcon className="h-8 w-8 text-inherit" />
                    </button>
                </header>
                <div className="h-full w-full overflow-y-auto">{children}</div>
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement,
    );
}

export default ModalFullScreenContainer;
