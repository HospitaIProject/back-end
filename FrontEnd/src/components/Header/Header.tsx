// import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowIcon from '../../icons/ArrowIcon';
import SearchListIcon from '../../icons/SearchListIcon';
import FilterHeader from '../common/filterModal/FilterHeader';
import { useEffect, useState } from 'react';
import { useScrollHeaderControl } from '../../Hooks/useScrollHeaderControl';
import HomeIcon from '../../icons/HomeIcon';
import HeaderSettingButton from './HeaderSettingButton';
import HeaderDateChangeButton from './HeaderDateChangeButton';
import { useTranslation } from 'react-i18next';
export type ItemName = 'patient' | 'services' | 'contact';

export default function Header() {
    const { t } = useTranslation();
    const [isPaddingFilter, setIsPaddingFilter] = useState<boolean>(false); // 토글 메뉴 상태
    const [absFilter, setAbsFilter] = useState<boolean>(false); // 토글 메뉴 상태
    const { isVisible } = useScrollHeaderControl({
        visibleItemHeight: 180,
    });
    const { pathname } = useLocation();
    // const [searchParams] = useSearchParams();
    // const year = searchParams.get('year');
    // const month = searchParams.get('month');

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }; // 뒤로가기 함수
    const handleHomeLink = () => {
        let year = sessionStorage.getItem('year');
        let month = sessionStorage.getItem('month');
        let url = '/patient' + (year ? `?year=${year}` : '') + (month ? `&month=${month}` : '');
        navigate(url);
    }; // 홈으로 이동하는 함수

    const handleFilterToggle = () => {
        setAbsFilter(!absFilter);

        if (absFilter) {
            setIsPaddingFilter(false);
        } else {
            window.scrollTo(0, 0);
            setIsPaddingFilter(true);
        }
    }; // 토글 메뉴를 열고 닫는 함수

    useEffect(() => {
        if (!isVisible) {
            if (isPaddingFilter) {
                setAbsFilter(false);
            }
        } else {
            if (isPaddingFilter) {
                setAbsFilter(true);
            }
        }
    }, [isVisible]); // 헤더가 보이거나 숨겨질 때 토글 메뉴 상태를 변경(헤더가 보이면 토글 메뉴를 닫고, 헤더가 숨겨지면 토글 메뉴를 열어줌) *해당 동작은 스크롤의 높이를 컨트롤 하지 않기때문에 무한루프가 발생 방지
    useEffect(() => {
        if (pathname === '/') {
            setIsPaddingFilter(false);
            setAbsFilter(false);
        }
    }, [pathname]);

    let label;
    if (pathname.startsWith('/patient/form/compliance/edit')) {
        label = t("editDailyChecklist");
    } else if (pathname.startsWith('/patient/form/compliance/daily/edit')) {
        label = t("editDailyChecklist");
    } else if (pathname.startsWith('/patient/form/compliance')) {
        label = t("dailyChecklist");
    } else if (pathname.startsWith('/patient/new/info/')) {
        label = t("editPatientInfo");
    } else if (pathname.startsWith('/patient/new/info')) {
        label = t("registerPatientInfo");
    } else if (pathname.startsWith('/patient/operation/list')) {
        label = t("patientSurgeryHistory");
    } else if (pathname.startsWith('/patient/new/operation/')) {
        label = t("editPatientSurgeryInfo");
    } else if (pathname.startsWith('/patient/new/operation')) {
        label = t("registerPatientSurgeryInfo");
    } else if (pathname.startsWith('/patient/new/complication')) {
        label = t("registerPatientComplications");
    } else if (pathname.startsWith('/patient/checkLists/preview')) {
        label = t("checklistItem");
    } else if (pathname.startsWith('/patient/checkLists')) {
        label = t("checklistList");
    } else if (pathname.startsWith('/operation-checkList/default-setting')) {
        label = t("defaultChecklistSettingsBySurgery");
    } else if (pathname.startsWith('/summary/excel')) {
        label = t("extractPatientDataToExcel");
    }

    if (pathname === '/' || pathname === '/patient') {
        return (
            <header
                className={`sticky top-0 z-20 min-w-full transition-all duration-300 ease-in-out ${isVisible ? '' : 'pointer-events-none opacity-20'} ${isPaddingFilter ? 'pb-[115px]' : ''} `}
            >
                <nav className="relative z-10 flex h-[65px] items-center bg-white px-4">
                    <HeaderDateChangeButton />

                    <div className="flex flex-grow flex-row items-center justify-end gap-2">
                        {/* <Link
                            to="/patient/new/info"
                            className="flex flex-row items-center gap-2 px-2 py-2 mr-1 text-blue-500 border border-blue-500 rounded-md shadow-sm"
                        >
                            <span className="text-sm font-medium">환자 등록하기</span>
                            <PlusIcon className="w-5 h-5" />
                        </Link> */}

                        <button className={` ${pathname === '/' ? 'hidden' : 'block'} `} onClick={handleFilterToggle}>
                            <SearchListIcon className="h-7 w-7 text-gray-600" />
                        </button>
                        <div className="h-6 border-l border-gray-300" />
                        {<HeaderSettingButton />}
                    </div>

                    <FilterHeader isRender={absFilter} />
                </nav>
            </header>
        );
    }

    return (
        <>
            <header className={`${isVisible ? '' : 'opacity-20'} sticky top-0 z-10 min-w-full bg-white`}>
                <nav className="flex h-[65px] items-center justify-between border-b px-4">
                    <button
                        className="flex flex-row items-center gap-1 font-semibold text-gray-700"
                        onClick={handleBack}
                    >
                        <ArrowIcon className="h-8 w-8 rotate-180 transform text-inherit" />
                        {label ? label : '뒤로가기'}
                    </button>
                    <div className="flex items-center gap-2">
                        <HeaderSettingButton />
                        <div className="h-6 border-l border-gray-300" />
                        <button onClick={() => handleHomeLink()}>
                            <HomeIcon className="h-7 w-7 text-gray-600" />
                        </button>
                    </div>
                </nav>
            </header>

            {/* {toggleFilter && <Sidebar onClose={() => setToggleFilter(false)} />} */}
        </>
    );
}
