// import { useState } from 'react';
// import Navbar from './Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowIcon from '../../icons/ArrowIcon';
import PlusIcon from '../../icons/PlusIcon';
import SearchListIcon from '../../icons/SearchListIcon';
import FilterHeader from '../common/filterModal/FilterHeader';
import { useState } from 'react';
import { useScrollHeaderControl } from '../../Hooks/useScrollHeaderControl';
import SettingIcon from '../../icons/SettingIcon';
// import Sidebar from '../Sidebar/Sidebar';

export type ItemName = 'patient' | 'services' | 'contact';

export default function Header() {
    const { isVisible } = useScrollHeaderControl();
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
    if (pathname.startsWith('/patient/form/compliance/edit')) {
        label = 'Daily 체크리스트 수정';
    } else if (pathname.startsWith('/patient/form/compliance/daily/edit')) {
        label = 'Daily 체크리스트 수정';
    } else if (pathname.startsWith('/patient/form/compliance')) {
        label = 'Daily 체크리스트';
    } else if (pathname.startsWith('/patient/new/info/')) {
        label = '환자 정보수정';
    } else if (pathname.startsWith('/patient/new/info')) {
        label = '환자 정보등록';
    } else if (pathname.startsWith('/patient/operation/list')) {
        label = '환자 수술이력';
    } else if (pathname.startsWith('/patient/new/operation/')) {
        label = '환자 수술정보수정';
    } else if (pathname.startsWith('/patient/new/operation')) {
        label = '환자 수술정보등록';
    } else if (pathname.startsWith('/patient/new/complication')) {
        label = '환자 합병증등록';
    } else if (pathname.startsWith('/patient/checkLists/preview')) {
        label = '체크리스트 항목';
    } else if (pathname.startsWith('/patient/checkLists')) {
        label = '체크리스트 목록';
    } else if (pathname.startsWith('/operation-checkList/default-setting')) {
        label = '수술별 체크리스트 기본설정';
    }

    if (pathname !== '/') {
        return (
            <header className={`${isVisible ? '' : 'opacity-30'} sticky top-0 z-10 min-w-full bg-white`}>
                <nav className="flex h-[65px] items-center border-b px-4">
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
        <>
            <header
                className={`sticky top-0 z-20 min-w-full transition-all duration-500 ease-in-out ${isVisible ? '' : 'opacity-30'}`}
            >
                <nav className="relative z-10 flex h-[65px] items-center border-b bg-white px-4">
                    <button onClick={handleFilterToggle}>
                        <SearchListIcon className="text-gray-600 h-7 w-7" />
                    </button>
                    <div className="flex flex-row items-center justify-end flex-grow gap-2">
                        <Link
                            to="/patient/new/info"
                            className="flex flex-row items-center gap-2 px-2 py-2 mr-1 text-blue-500 border border-blue-500 rounded-md shadow-sm"
                        >
                            <span className="text-sm font-medium">환자 등록하기</span>
                            <PlusIcon className="w-5 h-5" />
                        </Link>
                        <div className="h-6 border-l border-gray-300" />
                        <Link to="/operation-checkList/default-setting" className="text-sm underline">
                            <SettingIcon className="text-gray-600 h-7 w-7" />
                        </Link>
                    </div>
                    <FilterHeader isRender={toggleFilter && isVisible} />
                </nav>
            </header>
            {/* {toggleFilter && <Sidebar  onClose={() => setToggleFilter(false)} />} */}
        </>
    );
}
