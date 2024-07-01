import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="h-dvh w-dvw overflow-y-auto">
            <div className="mx-auto w-full max-w-[1300px]">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
