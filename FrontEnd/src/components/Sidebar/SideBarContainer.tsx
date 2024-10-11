import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '../../icons/CloseIcon';

type ModalWrapperProps = {
    children: React.ReactNode;
    title?: string;
    onClose?: () => void;
};

function SideBarContainer({ children, title, onClose }: ModalWrapperProps) {
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
        <div
            className="bg-modal fixed bottom-0 left-0 right-0 top-0 z-[2000] flex h-dvh w-screen justify-start bg-gray-800 bg-opacity-40"
            onClick={onClose}
        >
            <div
                onClick={(event) => event.stopPropagation()} // 이 부분을 추가합니다.
                className={`animate-slide-right flex w-64 flex-col scroll-smooth border-x border-t bg-white`}
            >
                <header className="flex flex-row justify-between w-full p-4 text-gray-600">
                    <div className="flex items-center justify-center flex-grow font-medium ml-7">
                        <span className="">{title}</span>
                    </div>
                    <button onClick={onClose}>
                        <CloseIcon className="w-6 h-6 text-inherit" />
                    </button>
                </header>
                <div className="w-full h-full overflow-y-auto">{children}</div>
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement,
    );
}

export default SideBarContainer;
