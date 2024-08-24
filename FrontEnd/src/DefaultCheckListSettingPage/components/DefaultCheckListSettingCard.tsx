import { useEffect, useState } from 'react';
import {
    useDefaultCheckListSettingQuery,
    useUpdateDefaultCheckListSettingMutation,
} from '../_lib/defaultCheckListSettingService';
import { pushNotification } from '../../utils/pushNotification';
import { CheckListSetupType } from '../../models/CheckListsType';
import Loading from '../../components/common/Loading';
import SettingIcon from '../../icons/SettingIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import PatientChecklistSetupModal from '../../PatientPage/NewOperationInfoFormPage/components/PatientChecklistSetupModal';
import MethodSubmitModal from './MethodSubmitModal';
// import MethodSettingSelectModal from './MethodSettingSelectModal';

function DefaultCheckListSettingCard({ operationMethod }: { operationMethod: string }) {
    const [isCheckListSetupModal, setIsCheckListSetupModal] = useState<string>('');
    const [isOperationMethodModal, setIsOperationMethodModal] = useState<boolean>(false);
    // const [isSettingOptionModal, setIsSettingOptionModal] = useState<boolean>(false);

    const defaultCheckListSettingQuery = useDefaultCheckListSettingQuery({
        enabled: isCheckListSetupModal !== '',
        operationMethod: isCheckListSetupModal,
    }); //모달이 열릴때만 쿼리를 실행
    const {
        data: checkListSetup,
        isPending: isCheckListSetupPending,
        error: checkListSetupError,
    } = defaultCheckListSettingQuery; //수술명에 따른 체크리스트 설정불러오기

    const updateDefaultCheckListSettingMutation = useUpdateDefaultCheckListSettingMutation(); //수술명에 따른 체크리스트 설정 업데이트

    const onSubmitCheckListSetup = (values: CheckListSetupType) => {
        updateDefaultCheckListSettingMutation.mutate({
            data: values,
            operationMethod: isCheckListSetupModal,
        });
        updateDefaultCheckListSettingMutation.isSuccess;
    }; //체크리스트 설정 제출

    const handleOpenCheckListSetting = (value: string) => {
        setIsCheckListSetupModal(value);
    }; //체크리스트 설정 모달 열기
    const handleCloseCheckListSetup = () => {
        setIsCheckListSetupModal('');
    }; //체크리스트 설정 모달 닫기

    const handleOperationMethodDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (window.confirm('삭제하시겠습니까?')) {
            console.log('삭제');
        }
    }; //수술명 삭제

    const handleToggleOperationMethodModal = (isOpen: boolean) => {
        setIsOperationMethodModal(isOpen);
    }; //수술명 변경 모달 토글

    useEffect(() => {
        if (updateDefaultCheckListSettingMutation.isSuccess) {
            setIsCheckListSetupModal('');
            updateDefaultCheckListSettingMutation.reset();
        }
    }, [updateDefaultCheckListSettingMutation.isSuccess]); //수술명에 따른 체크리스트 설정 업데이트 성공시 모달 닫기

    useEffect(() => {
        if (checkListSetupError) {
            pushNotification({
                msg: checkListSetupError.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        }
    }, [checkListSetupError]); //에러 발생시 알림

    if (isCheckListSetupPending && isCheckListSetupModal !== '') {
        return <Loading />;
    }

    return (
        <>
            <div
                // onClick={() => setIsSettingOptionModal(true)}
                onClick={() => handleOpenCheckListSetting(operationMethod)}
                className="flex flex-row items-center justify-between gap-1 px-2 py-3 border-b cursor-pointer hover:bg-gray-50"
            >
                <span className="text-sm font-medium">{operationMethod}</span>
                <div className="flex flex-row gap-1">
                    <button className="px-2 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-100">
                        <SettingIcon className="w-5 h-5" />
                    </button>
                    <div className="my-1 border-l" />
                    <button
                        onClick={handleOperationMethodDelete}
                        className="px-2 py-1 text-sm text-red-300 rounded-md hover:bg-gray-100"
                    >
                        <DeleteIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            {isCheckListSetupModal && checkListSetup && (
                <PatientChecklistSetupModal
                    handleSubmit={onSubmitCheckListSetup}
                    onClose={handleCloseCheckListSetup}
                    values={checkListSetup}
                />
            )}
            {isOperationMethodModal && (
                <MethodSubmitModal type="put" onClose={() => handleToggleOperationMethodModal(false)} /> //수술명 추가 모달
            )}
            {/* {
                isSettingOptionModal && <MethodSettingSelectModal onClose={() => setIsSettingOptionModal(false)} /> //수술명 추가 모달
            } */}
        </>
    );
}

export default DefaultCheckListSettingCard;