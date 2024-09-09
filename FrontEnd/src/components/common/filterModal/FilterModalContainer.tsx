import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '../../../icons/CloseIcon';
import RefreshIcon from '../../../icons/RefreshIcon';

type ModalWrapperProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    handleReset: () => void;
};

function FilterModalContainer({ children, onClose, handleReset }: ModalWrapperProps) {
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
        <div className="bg-modal fixed bottom-0 left-0 right-0 top-0 z-[2000] flex h-dvh w-screen items-end justify-center bg-black bg-opacity-70 pt-24">
            <div
                className={`animate-slide-up flex h-full w-full max-w-screen-mobile flex-col scroll-smooth rounded-t-lg border-x border-t bg-white`}
            >
                <header className="flex flex-row items-center justify-between w-full px-4 py-3 text-gray-600 border-b">
                    <span className="text-lg font-semibold">상세 필터</span>
                    <div className="flex gap-4 font-medium text-gray-600">
                        <button onClick={handleReset}>
                            <RefreshIcon className="w-6 h-6 rotate-3 text-inherit" />
                        </button>
                        <button onClick={onClose}>
                            <CloseIcon className="w-8 h-8 text-inherit" />
                        </button>
                    </div>
                </header>
                <div className="flex-grow w-full overflow-y-auto">{children}</div>
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement,
    );
}

export default FilterModalContainer;
