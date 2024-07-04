import { useState } from 'react';
import Navbar from './Navbar';
import PlusIcon from '../../icons/PlusIcon';
import MenuIcon from '../../icons/MenuIcon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowIcon from '../../icons/ArrowIcon';

export type ItemName = 'patient' | 'services' | 'contact';

export default function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [toggleMenu, setToggleMenu] = useState<boolean>(false); // 토글 메뉴 상태

    const handleBack = () => {
        navigate(-1);
    }; // 뒤로가기 함수

    const handleMenuToggle = () => {
        setToggleMenu(!toggleMenu);
    }; // 토글 메뉴를 열고 닫는 함수
    if (pathname !== '/') {
        return (
            <header className="sticky top-0 min-w-full bg-white">
                <nav className="flex items-center px-3 py-6">
                    <button
                        className="flex flex-row items-center gap-1 font-semibold text-gray-700"
                        onClick={handleBack}
                    >
                        <ArrowIcon className="h-8 w-8 rotate-180 transform text-inherit" />
                        이전
                    </button>
                </nav>
            </header>
        );
    }

    return (
        <header className="sticky top-0 min-w-full bg-white">
            <nav className="flex items-center justify-between px-6 py-4">
                <button onClick={handleMenuToggle}>
                    <MenuIcon className="h-7 w-7" />
                </button>
                <a href="/" className="logo">
                    {/* <img src="/logo.png" alt="Logo" /> */}
                    {/* <span>logo</span> */}
                </a>
                <Link
                    to="/patient/new"
                    className="flex flex-row items-center gap-2 rounded-sm border border-gray-300 bg-gray-50 px-4 py-2 font-semibold text-gray-600"
                >
                    <span className="">환자 등록</span>
                    <PlusIcon className="h-4 w-4" />
                </Link>
            </nav>
            <Navbar isOpen={toggleMenu} />
        </header>
    );
}
