import { useState } from 'react';
import Navbar from './Navbar';
import PlusIcon from '../../icons/PlusIcon';

export type ItemName = 'patient' | 'services' | 'contact';

type MenuItem = {
    title: string;
    name: ItemName;
};

const MENU_ITEMS: MenuItem[] = [
    {
        title: 'Menu',
        name: 'patient',
    },
    // {
    //     title: '체크리스트',
    //     name: 'services',
    // },
    // {
    //     title: '메시지 발송',
    //     name: 'contact',
    // },
];

export default function Header() {
    const [toggleMenu, setToggleMenu] = useState<ItemName | undefined>(); // 토글 메뉴 상태

    const handleMenuToggle = (name: ItemName) => {
        setToggleMenu(name === toggleMenu ? undefined : name);
    }; // 토글 메뉴를 열고 닫는 함수

    return (
        <header className="sticky top-0 min-w-full bg-white shadow-sm">
            <nav className="flex items-center justify-between py-4 border-b px-7">
                <ul className="flex gap-3">
                    {MENU_ITEMS.map((item) => (
                        <li key={item.title} onClick={() => handleMenuToggle(item.name)}>
                            {item.title}
                        </li>
                    ))}
                </ul>
                <a href="/" className="logo">
                    {/* <img src="/logo.png" alt="Logo" /> */}
                    <span>logo</span>
                </a>
                <button className="flex flex-row items-center gap-2 px-4 py-2 font-semibold text-gray-600 border border-gray-300 rounded-sm bg-gray-50">
                    <span className="">환자 등록</span>
                    <PlusIcon className="w-4 h-4" />
                </button>
            </nav>
            <Navbar itemName={toggleMenu} />
        </header>
    );
}
