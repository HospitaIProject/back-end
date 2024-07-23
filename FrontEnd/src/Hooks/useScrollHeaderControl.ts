import { throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';

export const useScrollHeaderControl = () => {
    const [isVisible, setVisible] = useState(true);
    const prevScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const headerScrollThreshold = 20;
            const headerRevealThreshold = 10;

            if (prevScrollY.current < currentScrollY && currentScrollY > headerScrollThreshold) {
                setVisible(false);
            } else if (
                prevScrollY.current > currentScrollY &&
                currentScrollY < prevScrollY.current - headerRevealThreshold
            ) {
                setVisible(true);
            }

            prevScrollY.current = currentScrollY;
        };

        const throttledHandleScroll = throttle(handleScroll, 100);

        window.addEventListener('scroll', throttledHandleScroll);

        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
        };
    }, []);
    return { isVisible };
};
