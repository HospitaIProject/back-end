import { Link, useNavigate } from 'react-router-dom';
import SettingIcon from '../../icons/SettingIcon';
import { useState } from 'react';
import LogoutIcon from '../../icons/LogoutIcon';
import Cookies from 'js-cookie';
import SideBarContainer from '../Sidebar/SideBarContainer';
import ArrowIcon from '../../icons/ArrowIcon';
import { useTranslation } from 'react-i18next';

function HeaderSettingButton() {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);

    const onLogout = () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            Cookies.remove('jwtToken');
            navigate('/login');
            window.location.reload();
        }
    };

    const changeLanguage = (lang: 'ko' | 'en') => {
        i18n.changeLanguage(lang);
    };
    const isEnglish = i18n.language === 'en'; // 현재 언어가 영어인지 확인

    return (
        <>
            <div className="relative flex items-center justify-center">
                <button className="my-auto" onClick={() => setIsSettingOpen(!isSettingOpen)}>
                    <SettingIcon className="h-7 w-7 text-gray-600" />
                </button>
            </div>
            {isSettingOpen && (
                <SideBarContainer onClose={() => setIsSettingOpen(false)} title="관리">
                    <div
                        className={`flex h-full w-full flex-col bg-white text-sm text-gray-600 ${isSettingOpen ? 'block' : 'hidden'}`}
                    >
                        <div className="flex w-full flex-grow flex-col">
                            <Link to="/patient/new/info" className="flex items-center justify-between border-y p-4">
                                환자 정보 추가
                                <ArrowIcon className="h-5 w-5" />
                            </Link>
                            <Link
                                to="/operation-checkList/default-setting"
                                className="flex items-center justify-between border-b p-4"
                            >
                                수술별 체크리스트 기본설정
                                <ArrowIcon className="h-5 w-5" />
                            </Link>
                            <Link to="/summary/excel" className="flex items-center justify-between border-b p-4">
                                환자 데이터 액셀 다운로드
                                <ArrowIcon className="h-5 w-5" />
                            </Link>
                        </div>
                        <div className={`flex w-full items-center justify-center gap-2 border-t border-gray-200 p-2`}>
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`border p-2 ${isEnglish ? 'bg-blue-100 text-blue-400' : ''}`}
                            >
                                영어
                            </button>
                            <button
                                onClick={() => changeLanguage('ko')}
                                className={`border p-2 ${!isEnglish ? 'bg-blue-100 text-blue-400' : ''}`}
                            >
                                한국어
                            </button>
                        </div>
                        <button
                            onClick={onLogout}
                            className="flex flex-row items-center justify-center gap-2 border-t p-4 text-red-400"
                        >
                            로그아웃 <LogoutIcon className="h-4 w-4" />
                        </button>
                    </div>
                </SideBarContainer>
            )}
        </>
    );
}

export default HeaderSettingButton;
