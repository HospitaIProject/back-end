import React, { useRef } from 'react';
import { motion } from 'framer-motion';

function ScrollWithDrag({
    children,
    onDragStart,
    onDrag,
    onDragEnd,
}: {
    children: React.ReactNode;
    onDragStart?: (event: PointerEvent, info: any) => void;
    onDrag?: (event: PointerEvent, info: any) => void;
    onDragEnd?: (event: PointerEvent, info: any) => void;
}) {
    const scrollableRef = useRef<HTMLDivElement>(null);

    const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        const scrollableElement = scrollableRef.current;
        if (!scrollableElement) return;

        const { scrollTop } = scrollableElement;

        if (scrollTop === 0 && event.deltaY < 0) {
            // 스크롤이 맨 위에서 위로 이동 시 드래그 우선
            event.preventDefault();
        }
    };

    return (
        <motion.div
            drag="y"
            dragConstraints={{ top: 0 }}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            className="relative w-full h-full"
        >
            <div
                ref={scrollableRef}
                onWheel={handleScroll} // Wheel 이벤트를 사용해 조건부 드래그 활성화
                className="flex h-full overflow-y-auto"
            >
                {children}
            </div>
        </motion.div>
    );
}

export default ScrollWithDrag;
