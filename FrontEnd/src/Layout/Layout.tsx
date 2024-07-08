import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';

const WHITE_BG_PAGES = ['/login', '/patient/new/info', '/patient/new/surgery', '/patient/form/compliance'];

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
            <div className={`h-dvh w-dvw overflow-y-auto ${bgColor} `}>
                <div className="mx-auto h-full w-full max-w-[1300px]">
                    <Outlet />
                </div>
            </div>
            <Toaster />
        </>
    );
}

export default Layout;
