import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

function HeaderLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('jwtToken');

        if (!token) {
            navigate('/login');
        }
    }, []);

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
