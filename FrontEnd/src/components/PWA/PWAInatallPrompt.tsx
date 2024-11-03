import { useState } from 'react';

function PWAInatallPrompt({ handleInstall }: { handleInstall: () => void }) {
    const [modal, setModal] = useState(true);

    if (localStorage.getItem('PWAmodal') === '1' || !modal) {
        return (
            <div className="fixed bottom-0 flex w-full max-w-[1298px] flex-row items-center justify-between gap-2 bg-black bg-opacity-80 p-3">
                {/* <div className="text-lg text-white">앱 설치</div> */}
                <span className="text-sm text-white">홈 화면에 추가하여 앱처럼 사용할 수 있습니다.</span>

                <button
                    className="shrink-0 rounded-lg bg-blue-500 px-4 py-3 text-sm text-white"
                    onClick={handleInstall}
                >
                    앱 설치
                </button>
            </div>
        );
    } else {
        return (
            <div className="bg-modal fixed bottom-0 left-0 right-0 top-0 z-[2000] flex h-dvh w-screen items-center justify-center bg-gray-800 bg-opacity-40 px-4">
                <div className="z-20 flex h-full max-h-52 w-full max-w-96 transform flex-col items-center justify-center rounded-lg bg-white shadow-lg">
                    <div className="text-lg">앱 설치</div>
                    <div className="text-sm text-gray-500">홈 화면에 추가하여 앱처럼 사용할 수 있습니다.</div>
                    <div className="mt-4 flex flex-col gap-2">
                        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white" onClick={handleInstall}>
                            설치 없이 앱으로 이용
                        </button>
                        <button
                            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-500"
                            onClick={() => {
                                localStorage.setItem('PWAmodal', '1');
                                setModal(false);
                            }}
                        >
                            나중에
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PWAInatallPrompt;
