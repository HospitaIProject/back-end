import { useState } from 'react';
import CloseIcon from '../../icons/CloseIcon';

function PWAInstallPromptIos() {
    const [modal, setModal] = useState(true);

    if (localStorage.getItem('PWAmodal') !== '1' && modal) {
        return (
            <div className="fixed bottom-0 flex w-full max-w-[1298px] flex-col items-center justify-between gap-6 border-y-2 bg-opacity-80 p-5 text-sm shadow-md">
                <div className="flex flex-row justify-between gap-4">
                    <img
                        src="/apple-touch-icon-180x180.png"
                        alt="iOS icon"
                        className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 shadow-md"
                    />
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                            <span className="text-lg font-bold">환자 ERAS</span>
                            <button
                                onClick={() => {
                                    localStorage.setItem('PWAmodal', '1');
                                    setModal(false);
                                }}
                            >
                                <CloseIcon className="h-5 w-5 cursor-pointer" />
                            </button>
                        </div>
                        <span className="font-medium">홈 화면에 추가하여 앱처럼 사용할 수 있습니다.</span>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <img src="/ios-share-icon.png" alt="iOS share" className="h-6 w-6" />
                    <span className="text-sm">공유 버튼을 눌러 홈 화면에 추가하세요.</span>
                </div>
            </div>
        );
    }
}

export default PWAInstallPromptIos;
