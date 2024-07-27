import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';
import FallbackUI from '../components/common/FallbackUI';

const WHITE_BG_PAGES = [
    '/login',
    '/patient/new/info',
    '/patient/new/operation',
    '/patient/form/compliance',
    '/patient/checkLists/preview',
    '/patient/form/compliance/daily',
];

function Layout() {
    const { pathname } = useLocation();

    let bgColor;

    if (WHITE_BG_PAGES.includes(pathname)) {
        bgColor = 'bg-white';
    } else {
        bgColor = 'bg-gray-100';
    }

    return (
        <>
            {/* QueryErrorResetBoundary 컴포넌트를 사용하여 쿼리 에러를 재설정합니다. */}
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    /* ErrorBoundary 컴포넌트를 사용하여 에러가 발생했을 때 에러를 처리합니다. */
                    /* onReset prop에 reset 함수를 전달하여 에러가 발생했을 때 reset 함수를 실행합니다. */
                    /* FallbackComponent prop에 FallbackUI 컴포넌트를 전달하여 에러가 발생했을 때 보여줄 UI를 설정합니다. */
                    <ErrorBoundary onReset={reset} FallbackComponent={FallbackUI}>
                        <div className={` ${bgColor} `}>
                            {/* h-dvh w-dvw overflow-y-auto */}
                            <div className="mx-auto w-full max-w-[1300px]">
                                <Outlet />
                            </div>
                        </div>
                        <Toaster />
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </>
    );
}

export default Layout;
