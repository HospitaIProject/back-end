// import { useState } from 'react';
// import Navbar from './Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowIcon from '../../icons/ArrowIcon';
import PlusIcon from '../../icons/PlusIcon';
import SearchListIcon from '../../icons/SearchListIcon';
import FilterHeader from '../common/filterModal/FilterHeader';
import { useState } from 'react';

export type ItemName = 'patient' | 'services' | 'contact';

export default function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [toggleFilter, setToggleFilter] = useState<boolean>(false); // 토글 메뉴 상태

    const handleBack = () => {
        navigate(-1);
    }; // 뒤로가기 함수

    const handleFilterToggle = () => {
        setToggleFilter(!toggleFilter);
    }; // 토글 메뉴를 열고 닫는 함수
    let label;
    if (pathname.startsWith('/patient/form/compliance')) {
        label = 'Daily 체크리스트';
    } else if (pathname.startsWith('/patient/new/info')) {
        label = '환자 정보등록';
    } else if (pathname.startsWith('/patient/operation/list')) {
        label = '환자 수술이력';
    } else if (pathname.startsWith('/patient/new/operation')) {
        label = '수술정보등록';
    } else if (pathname.startsWith('/patient/checkLists')) {
        label = '체크리스트 목록';
    } else if (pathname.startsWith('/patient/new/complication')) {
        label = '합병증 등록';
    }

    if (pathname !== '/') {
        return (
            <header className="sticky top-0 z-10 min-w-full bg-white">
                <nav className="flex h-[70px] items-center border-b px-4">
                    <button
                        className="flex flex-row items-center gap-1 font-semibold text-gray-700"
                        onClick={handleBack}
                    >
                        <ArrowIcon className="h-8 w-8 rotate-180 transform text-inherit" />
                        {label ? label : '뒤로가기'}
                    </button>
                </nav>
            </header>
        );
    }

    return (
        <>
            <header className="sticky top-0 z-10 min-w-full bg-white">
                <nav className="flex h-[70px] items-center justify-between border-b px-4">
                    <button onClick={handleFilterToggle}>
                        <SearchListIcon className="h-7 w-7 text-gray-700" />
                    </button>
                    <a href="/" className="logo">
                        {/* <img src="/logo.png" alt="Logo" /> */}
                        {/* <span>logo</span> */}
                    </a>
                    <Link
                        to="/patient/new/info"
                        className="flex flex-row items-center gap-2 rounded-sm border bg-gray-100 px-4 py-2 shadow-sm"
                    >
                        <span className="font-semibold text-gray-600">환자 등록하기</span>
                        <PlusIcon className="h-5 w-5 text-gray-600" />
                    </Link>
                </nav>
                {toggleFilter && <FilterHeader />}
            </header>
        </>
    );
}
