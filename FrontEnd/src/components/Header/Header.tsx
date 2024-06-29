import { useState } from 'react';
import Navbar from './Navbar';
import PlusIcon from '../../icons/PlusIcon';
import MenuIcon from '../../icons/MenuIcon';

export type ItemName = 'patient' | 'services' | 'contact';

export default function Header() {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false); // 토글 메뉴 상태

    const handleMenuToggle = () => {
        setToggleMenu(!toggleMenu);
    }; // 토글 메뉴를 열고 닫는 함수

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
                <button className="flex flex-row items-center gap-2 px-4 py-2 font-semibold text-gray-600 border border-gray-300 rounded-sm bg-gray-50">
                    <span className="">환자 등록</span>
                    <PlusIcon className="w-4 h-4" />
                </button>
            </nav>
            <Navbar isOpen={toggleMenu} />
        </header>
    );
}
