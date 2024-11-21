import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion'; // 추가

import CloseIcon from '../../icons/CloseIcon';

type ModalWrapperProps = {
    children: React.ReactNode;
    title?: string;

    onClose?: () => void;
    maxWidthClassName?: string; //container className
    maxHeightClassName?: string; //container className
    bgClassName?: string; //background className
    isDraggable?: boolean;
    roundedClassName?: string;
};

function ModalFullScreenContainer({
    children,
    title,
    onClose,
    maxWidthClassName,
    maxHeightClassName,
    bgClassName,
    isDraggable = true,
    roundedClassName = 'rounded-t-lg',
}: ModalWrapperProps) {
    const [isBrowser, setIsBrowser] = useState(false);
    const [yPosition, setYPosition] = useState(0); // 현재 Y축 위치 상태

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
            className="bg-modal fixed bottom-0 left-0 right-0 top-0 z-[2000] flex h-dvh w-screen justify-center bg-gray-800 bg-opacity-40"
            onClick={onClose}
        >
            {/* Framer-motion 사용 */}
            <motion.div
                className={`mt-auto ${maxHeightClassName ? maxHeightClassName : 'max-h-[98dvh]'} flex h-full w-full scroll-smooth ${
                    maxWidthClassName ? maxWidthClassName : 'max-w-screen-tablet'
                } flex-col ${roundedClassName} border-x border-t ${bgClassName ? bgClassName : 'bg-white'}`}
                drag={isDraggable ? 'y' : false} // Y축 드래그 활성화
                dragConstraints={{ top: 0 }} // 위로 드래그 금지
                onDrag={(_, info) => setYPosition(info.offset.y)} // 현재 드래그 위치 저장
                onDragEnd={(_, info) => {
                    const dragThreshold = 200; // 특정 높이 기준
                    if (info.offset.y > dragThreshold) {
                        // 임계값 이상이면 닫음
                        onClose?.();
                    } else {
                        // 임계값 미만이면 원래 위치로 복귀
                        setYPosition(0);
                    }
                }}
                initial={{ y: '100%' }} // 모달 초기 위치
                animate={{ y: yPosition }} // 현재 Y 위치에 따라 애니메이션
                exit={{ y: '100%' }} // 닫힐 때 애니메이션
                transition={{
                    type: 'tween',
                    duration: 0.3, // 부드러운 복귀 애니메이션
                }}
                onClick={(e) => e.stopPropagation()} // 부모 배경 클릭 방지
            >
                {isDraggable && <div className="w-1/6 mx-auto my-1 border-gray-300 rounded-full border-y-2" />}
                <header className="flex flex-row justify-between w-full py-3 pl-10 pr-3 text-gray-600">
                    <div className="flex justify-center flex-grow font-medium">
                        <span className="text-lg">{title}</span>
                    </div>
                    <button onClick={onClose}>
                        <CloseIcon className="h-7 w-7 text-inherit" />
                    </button>
                </header>

                <div className={`h-full w-full ${isDraggable ? '' : 'overflow-y-auto'}`}>{children}</div>
            </motion.div>
        </div>,
        document.getElementById('modal-root') as HTMLElement,
    );
}

export default ModalFullScreenContainer;
