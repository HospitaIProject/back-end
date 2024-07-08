import { useState } from 'react';
import Navbar from './Navbar';
import MenuIcon from '../../icons/MenuIcon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowIcon from '../../icons/ArrowIcon';
import PlusIcon from '../../icons/PlusIcon';

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
    let label;
    if (pathname.startsWith('/patient/form/compliance')) {
        label = 'Rectal ERAS compliance checklist';
    } else if (pathname.startsWith('/patient/new/info')) {
        label = '환자 정보등록';
    } else if (pathname.startsWith('/patient/surgery/list')) {
        label = '환자 수술이력';
    } else if (pathname.startsWith('/patient/new/surgery')) {
        label = '환자 수술정보등록';
    } else if (pathname.startsWith('/patient/checkLists')) {
        label = '체크리스트 목록';
    }

    if (pathname !== '/') {
        return (
            <header className="sticky top-0 z-10 min-w-full bg-white">
                <nav className="flex h-[70px] items-center border-b px-4">
                    <button
                        className="flex flex-row items-center gap-1 font-semibold text-gray-700"
                        onClick={handleBack}
                    >
                        <ArrowIcon className="w-8 h-8 transform rotate-180 text-inherit" />
                        {label ? label : '뒤로가기'}
                    </button>
                </nav>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-10 min-w-full bg-white">
            <nav className="flex h-[70px] items-center justify-between border-b px-4">
                <button onClick={handleMenuToggle}>
                    <MenuIcon className="text-gray-700 h-7 w-7" />
                </button>
                <a href="/" className="logo">
                    {/* <img src="/logo.png" alt="Logo" /> */}
                    {/* <span>logo</span> */}
                </a>
                <Link
                    to="/patient/new/info"
                    className="flex flex-row items-center gap-2 px-4 py-2 bg-gray-100 border rounded-sm shadow-sm"
                >
                    <span className="font-semibold text-gray-600">환자 등록하기</span>
                    <PlusIcon className="w-5 h-5 text-gray-600" />
                </Link>
            </nav>
            <Navbar isOpen={toggleMenu} />
        </header>
    );
}
