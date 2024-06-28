import { Link } from 'react-router-dom';
import ArrowIcon from '../../icons/ArrowIcon';

const CATEGORY_LIST = [
    { title: '환자 정보', path: '/about' },
    { title: '환자 정보 입력', path: '/services' },
    { title: '환자 정보 수정', path: '/contact' },
];

function Navbar({ isOpen }: { isOpen: boolean }) {
    return (
        <nav
            className={`absolute flex w-full items-center justify-between border-b bg-white transition-all ${isOpen ? '' : 'h-0 overflow-hidden'}`}
        >
            <ul className={`flex flex-col gap-3 p-4`}>
                {CATEGORY_LIST.map((category) => (
                    <li key={category.title}>
                        <Link to={category.path} className="flex flex-row items-center gap-1">
                            <span>{category.title}</span>
                            <ArrowIcon className="w-5 h-5" />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
