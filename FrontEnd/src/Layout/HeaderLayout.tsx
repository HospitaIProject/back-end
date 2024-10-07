import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

function HeaderLayout() {
    return (
        <div className="flex flex-col w-full min-h-dvh">
            <Header />
            <main className="flex flex-1">
                <Outlet />
            </main>
        </div>
    );
}

export default HeaderLayout;
