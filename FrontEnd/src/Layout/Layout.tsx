import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="overflow-y-auto h-dvh w-dvw">
            <Outlet />
        </div>
    );
}

export default Layout;
