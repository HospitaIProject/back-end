import { useEffect, useState } from 'react';
// import { BeforeInstallPromptEvent } from '../../global';

const usePWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: any) => {
            event.preventDefault();
            setDeferredPrompt(event);
            console.log('beforeinstallprompt 이벤트가 발생했습니다.'); // 확인 로그
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('사용자가 앱 설치를 동의했습니다.');
                } else {
                    console.log('사용자가 앱 설치를 동의하지 않았습니다.');
                }

                setDeferredPrompt(null);
            });
        }
    };

    return { deferredPrompt, handleInstall };
};

export default usePWAInstallPrompt;
