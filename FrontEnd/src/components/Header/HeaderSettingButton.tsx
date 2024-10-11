import { Link, useNavigate } from 'react-router-dom';
import SettingIcon from '../../icons/SettingIcon';
import { useState } from 'react';
import LogoutIcon from '../../icons/LogoutIcon';
import Cookies from 'js-cookie';
import SideBarContainer from '../Sidebar/SideBarContainer';
import ArrowIcon from '../../icons/ArrowIcon';

function HeaderSettingButton() {
    const navigate = useNavigate();
    const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);

    const onLogout = () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            Cookies.remove('jwtToken');
            navigate('/login');
            window.location.reload();
        }
    };
    return (
        <>
            <div className="relative flex items-center justify-center">
                <button className="my-auto" onClick={() => setIsSettingOpen(!isSettingOpen)}>
                    <SettingIcon className="text-gray-600 h-7 w-7" />
                </button>
            </div>
            {isSettingOpen && (
                <SideBarContainer onClose={() => setIsSettingOpen(false)} title="관리">
                    <div
                        className={`flex h-full w-full flex-col bg-white text-sm text-gray-600 ${isSettingOpen ? 'block' : 'hidden'}`}
                    >
                        <div className="flex flex-col flex-grow w-full">
                            <Link
                                to="/operation-checkList/default-setting"
                                className="flex items-center justify-between p-4 border-y"
                            >
                                수술별 체크리스트 기본설정
                                <ArrowIcon className="w-5 h-5" />
                            </Link>
                            <Link to="/summary/excel" className="flex items-center justify-between p-4 border-b">
                                환자 데이터 액셀 다운로드
                                <ArrowIcon className="w-5 h-5" />
                            </Link>
                        </div>
                        <button
                            onClick={onLogout}
                            className="flex flex-row items-center justify-center gap-2 p-4 text-red-400 border-t"
                        >
                            로그아웃 <LogoutIcon className="w-4 h-4" />
                        </button>
                    </div>
                </SideBarContainer>
            )}
        </>
    );
}

export default HeaderSettingButton;
