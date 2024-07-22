// import { useState } from 'react';
// import Navbar from './Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowIcon from '../../icons/ArrowIcon';
import PlusIcon from '../../icons/PlusIcon';
import SearchListIcon from '../../icons/SearchListIcon';
import FilterHeader from '../common/filterModal/FilterHeader';
import { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';

export type ItemName = 'patient' | 'services' | 'contact';

export default function Header() {
    const [visible, setVisible] = useState(true);
    const prevScrollY = useRef(0);

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

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const headerScrollThreshold = 20; // 스크롤 임계값 설정
            const headerRevealThreshold = 2; // 헤더를 다시 보이게 할 스크롤 위치

            if (prevScrollY.current < currentScrollY && currentScrollY > headerScrollThreshold) {
                // 스크롤이 아래로 내려가고 임계값을 초과하면 헤더를 숨깁니다
                setVisible(false);

                // setToggleFilter(false);
            } else if (
                prevScrollY.current > currentScrollY &&
                currentScrollY < prevScrollY.current - headerRevealThreshold
            ) {
                // 스크롤이 위로 올라가고 이전 위치보다 특정 값 이상 올라가면 헤더를 다시 보이게 합니다
                setVisible(true);
                // setToggleFilter(true);
            }

            prevScrollY.current = currentScrollY;
        };
        const throttledHandleScroll = throttle(handleScroll, 100);

        window.addEventListener('scroll', throttledHandleScroll);

        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
        };
    }, []);
    useEffect(() => {
        console.log('toggleFilter', toggleFilter);
    }, [visible]);

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
        <>
            <header
                className={`sticky top-0 z-20 min-w-full transition-all duration-500 ease-in-out ${visible ? '' : 'opacity-30'}`}
            >
                <nav className="z-10 flex h-[70px] items-center justify-between border-b bg-white px-4">
                    <button onClick={handleFilterToggle}>
                        <SearchListIcon className="text-gray-700 h-7 w-7" />
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
                <FilterHeader isRender={toggleFilter} />
            </header>
        </>
    );
}
