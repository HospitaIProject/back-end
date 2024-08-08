import { throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';

export const useScrollHeaderControl = ({ visibleItemHeight = 20 }: { visibleItemHeight?: number }) => {
    const [isVisible, setVisible] = useState(true);
    const prevScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const headerScrollThreshold = visibleItemHeight;
            const headerRevealThreshold = 10;

            if (prevScrollY.current < currentScrollY && currentScrollY > headerScrollThreshold) {
                if (isVisible) setVisible(false); // 스크롤을 내리면 헤더 숨김
            } else if (
                prevScrollY.current > currentScrollY &&
                currentScrollY < prevScrollY.current - headerRevealThreshold
            ) {
                if (!isVisible) setVisible(true); // 스크롤을 올리면 헤더 보임
            }

            prevScrollY.current = currentScrollY;
        };

        const throttledHandleScroll = throttle(handleScroll, 200);
        window.addEventListener('scroll', throttledHandleScroll);

        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
        };
    }, [isVisible, visibleItemHeight]);
    return { isVisible };
};
