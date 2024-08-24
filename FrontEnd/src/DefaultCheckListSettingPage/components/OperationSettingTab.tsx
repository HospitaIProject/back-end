import PencilIcon from '../../icons/PencilIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import { useEffect, useState } from 'react';
import {
    useDefaultCheckListSettingQuery,
    useOperationMethodDeleteMutation,
    useUpdateDefaultCheckListSettingMutation,
} from '../_lib/defaultCheckListSettingService';
import { CheckListSetupType } from '../../models/CheckListsType';
import PatientChecklistSetupModal from '../../PatientPage/NewOperationInfoFormPage/components/PatientChecklistSetupModal';
import FileEditIcon from '../../icons/FileEditIcon';
import OperationMethodSubmitModal from './MethodSubmitModal';

interface Props {
    operationMethod: string;
}

function OperationSettingTab({ operationMethod }: Props) {
    const [isCheckListSetupModal, setIsCheckListSetupModal] = useState<boolean>(false); //체크리스트 설정 모달
    const [isOperationMethodModal, setIsOperationMethodModal] = useState<boolean>(false);

    //----------------------------------
    const defaultCheckListSettingQuery = useDefaultCheckListSettingQuery({
        enabled: isCheckListSetupModal,
        operationMethod: operationMethod,
    }); //모달이 열릴때만 쿼리를 실행
    const {
        data: checkListSetupData,
        isPending: isCheckListSetupPending,
        error: checkListSetupError,
    } = defaultCheckListSettingQuery; //수술명에 따른 체크리스트 설정불러오기

    const updateDefaultCheckListSettingMutation = useUpdateDefaultCheckListSettingMutation(); //수술명에 따른 체크리스트 설정 업데이트
    const operationMethodDeleteMutation = useOperationMethodDeleteMutation(); //수술명 삭제

    //----------------------------------

    const handleOperationMethodDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (window.confirm('삭제하시겠습니까?')) {
            operationMethodDeleteMutation.mutate(operationMethod);
        }
    }; //수술명 삭제 핸들러

    const handleToggleOperationMethodModal = (isOpen: boolean) => {
        setIsOperationMethodModal(isOpen);
    }; //수술명 변경 모달 토글 (열기/닫기)

    const handleToggleCheckListSettingModal = (isOpen: boolean) => {
        setIsCheckListSetupModal(isOpen);
    }; //체크리스트 설정 모달 토글(열기/닫기)

    const onSubmitCheckListSetup = (values: CheckListSetupType) => {
        updateDefaultCheckListSettingMutation.mutate({
            data: values,
            operationMethod: operationMethod,
        });
        updateDefaultCheckListSettingMutation.isSuccess;
    }; //체크리스트 설정 제출

    useEffect(() => {
        if (updateDefaultCheckListSettingMutation.isSuccess) {
            handleToggleCheckListSettingModal(false);
            updateDefaultCheckListSettingMutation.reset();
        }
    }, [updateDefaultCheckListSettingMutation.isSuccess]); //수술명에 따른 체크리스트 설정 업데이트 성공시 모달 닫기

    return (
        <>
            <div
                className="flex flex-row gap-1 bg-white w-fit"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <button
                    className="flex flex-row items-center gap-1 p-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
                    onClick={() => handleToggleCheckListSettingModal(true)}
                >
                    <FileEditIcon className="w-5 h-5" />
                    <span className="text-xs">관리</span>
                </button>
                <div className="my-1 border-l" />
                <button
                    className="flex flex-row items-center gap-1 p-2 text-sm text-green-700 rounded-md hover:bg-gray-100"
                    onClick={() => handleToggleOperationMethodModal(true)}
                >
                    <PencilIcon className="w-5 h-5" />
                    <span className="text-xs">수술명 수정</span>
                </button>
                <div className="my-1 border-l" />
                <button
                    className="flex flex-row items-center gap-1 p-2 text-sm text-red-300 rounded-md hover:bg-gray-100"
                    onClick={handleOperationMethodDelete}
                >
                    <DeleteIcon className="w-5 h-5" />
                    <span className="text-xs">삭제</span>
                </button>
            </div>
            {isCheckListSetupModal && checkListSetupData && (
                <PatientChecklistSetupModal
                    handleSubmit={onSubmitCheckListSetup}
                    onClose={() => handleToggleCheckListSettingModal(false)}
                    values={checkListSetupData}
                    isPending={isCheckListSetupPending}
                    error={checkListSetupError}
                />
            )}
            {/* {
                isSettingOptionModal && <MethodSettingSelectModal onClose={() => setIsSettingOptionModal(false)} /> //수술명 추가 모달
            } */}
            {isOperationMethodModal && (
                <OperationMethodSubmitModal
                    initValue={operationMethod}
                    type="put"
                    onClose={() => handleToggleOperationMethodModal(false)}
                /> //수술명 변경 모달
            )}
        </>
    );
}

export default OperationSettingTab;
