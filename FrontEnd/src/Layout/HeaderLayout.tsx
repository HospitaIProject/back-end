import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

function HeaderLayout() {
    return (
        <div className="flex flex-col w-full">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}

export default HeaderLayout;
