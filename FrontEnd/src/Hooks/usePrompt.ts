import { useEffect } from 'react';
import { unstable_usePrompt } from 'react-router-dom';

const usePrompt = (when: boolean) => {
    unstable_usePrompt({
        message: '정말로 이동하시겠습니까?\n작성 중인 내용은 저장되지 않습니다.',
        when: ({ currentLocation, nextLocation }) => when && currentLocation.pathname !== nextLocation.pathname,
    }); // 이동시 경고창

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
};

export default usePrompt;
