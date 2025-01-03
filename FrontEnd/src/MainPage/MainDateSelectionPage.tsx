import { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import { useMainDateQuery } from './_lib/mainDateService';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../icons/ArrowIcon';
import DisplayEmptyData from '../components/common/DisplayEmptyData';
import usePWAInstallPrompt from '../components/PWA/usePWAInstallPrompt';
import PWAInatallPrompt from '../components/PWA/PWAInatallPrompt';
import PWAInstallPromptIos from '../components/PWA/PWAInstallPromptIos';

function MainDateSelectionPage() {
    // const thisMonth = String(new Date().getMonth() + 1);
    // const year = sessionStorage.getItem('year');
    const { deferredPrompt, handleInstall } = usePWAInstallPrompt(); // PWA 설치 프롬프트

    const naviate = useNavigate();
    const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);
    const mainDateQuery = useMainDateQuery();
    const { data, isPending, error } = mainDateQuery;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('선택된 년도', e.target.value);
        setSelectedYear(e.target.value);
    };
    const handleLink = ({ month }: { month?: string }) => {
        let url = '';
        if (selectedYear === '전체') url = '/patient';
        else if (month) url = `/patient?year=${selectedYear}&month=${month}`;
        else url = `/patient?year=${selectedYear}`;

        if (selectedYear === '전체') {
            sessionStorage.setItem('year', '');
        } else {
            sessionStorage.setItem('year', selectedYear || '');
        }
        sessionStorage.setItem('month', month || '');
        naviate(url);
    };

    // if (process.env.NODE_ENV === 'production' && location.href.startsWith('https://stmary.site/')) {
    //     if ('serviceWorker' in navigator) {
    //         navigator.serviceWorker
    //             .register('/sw.js')
    //             .then(() => {
    //                 console.log('Service Worker registered successfully.');
    //             })
    //             .catch((err) => {
    //                 console.error('Service Worker registration failed:', err);
    //             });
    //     }
    // }

    useEffect(() => {
        if (data) {
            console.log('환자 년월 목록', data);

            setSelectedYear(Object.keys(data)[0]);
        }
    }, [data]);

    if (isPending) {
        return <Loading text="로딩중.." />;
    }
    if (error) {
        return <DisplayEmptyData isRender label="데이터를 불러오는데 실패했습니다." />;
    }

    return (
        <>
            <div className="mt-2 flex flex-1 flex-col">
                <div className="flex w-full justify-between bg-white p-3 text-gray-600">
                    <div className="relative cursor-pointer">
                        <select
                            id="year-select"
                            onChange={handleChange}
                            value={selectedYear}
                            className="flex cursor-pointer items-center gap-1 pl-2 pr-5 text-lg font-semibold outline-none"
                        >
                            <option value="전체">전체</option>
                            {Object.keys(data).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex-1 bg-white">
                    <div className="grid grid-cols-3 gap-3 p-3 mobile:grid-cols-4">
                        <button
                            onClick={() => handleLink({})}
                            className="relative flex min-h-20 flex-col items-center justify-center gap-1 rounded-md border bg-gray-100 px-2 shadow-sm transition-all duration-300 hover:-translate-y-1"
                        >
                            <span>전체</span>
                            <ArrowIcon className="absolute right-0 top-0 h-4 w-4 -rotate-45 text-blue-500" />
                        </button>
                        {selectedYear &&
                            selectedYear !== '전체' &&
                            Object.keys(data[selectedYear])
                                .reverse()
                                .map((month) => (
                                    <button
                                        onClick={() => handleLink({ month })}
                                        key={month}
                                        className={`relative flex min-h-20 flex-col items-center justify-center gap-1 rounded-md border bg-blue-100 px-2 shadow-sm transition-all duration-300 hover:-translate-y-1`}
                                    >
                                        <span className="font-medium">{month}월</span>
                                        <span className="text-sm text-gray-600">
                                            환자{' '}
                                            <span className="font-medium text-blue-600">
                                                {data[selectedYear][month]}
                                            </span>
                                            명
                                        </span>
                                        <ArrowIcon className="absolute right-0 top-0 h-4 w-4 -rotate-45 text-blue-500" />
                                    </button>
                                ))}
                    </div>
                </div>
            </div>
            {/iPad|iPhone|iPod/.test(window.navigator.userAgent) && <PWAInstallPromptIos />}
            {deferredPrompt && <PWAInatallPrompt handleInstall={handleInstall} />}
        </>
    );
}

export default MainDateSelectionPage;
