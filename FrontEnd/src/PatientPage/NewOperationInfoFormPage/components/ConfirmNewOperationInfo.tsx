import { useState } from 'react';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
import NumberViewInput from '../../../components/common/form/viewInput/NumberViewInput';
import ViewInput from '../../../components/common/form/viewInput/ViewInput';
import YesOrNoViewButton from '../../../components/common/form/viewInput/YesOrNoViewButton';
import { OperationInfoFormType } from '../../../models/OperationType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import PatientChecklistSetupModal from './PatientChecklistSetupModal';
import { getValueLabel } from '../../../utils/getNameByValue';
import { useOperationMethodFormatted } from '../../../Hooks/useOperationMethodFormatted';

type Props = {
    values: OperationInfoFormType;
    onSubmit: () => void;
    checkListSetup: CheckListSetupType;
};
function ConfirmNewOperationInfo({ values, onSubmit, checkListSetup }: Props) {
    const { onlyTime: operationStartTime } = useDateFormatted(values.operationStartTime);
    const { onlyTime: operationEndTime } = useDateFormatted(values.operationEndTime);

    const operationMethodFormatted = useOperationMethodFormatted({
        operationMethod: values.operationMethod,
        customOperationMethod: values.customOperationMethod,
    });

    const [isCheckListSetupModal, setIsCheckListSetupModal] = useState(false);

    const handleOpenCheckListSetup = () => {
        setIsCheckListSetupModal(true);
    }; // 체크리스트 설정 모달 열기
    const handleCloseCheckListSetup = () => {
        setIsCheckListSetupModal(false);
    }; // 체크리스트 설정 모달 닫기
    return (
        <div className="flex flex-col h-full px-4">
            <div className="grid flex-col grid-cols-1 gap-3 pt-4 tablet:grid-cols-2 tablet:gap-x-20">
                <ViewInput label="수술방법" value={`${operationMethodFormatted}`} />

                <ViewInput
                    label="수술approach"
                    value={getValueLabel({
                        value: values.operationApproach,
                        type: 'operation',
                    })}
                />
                <YesOrNoViewButton label="장루 조성술 여부" value={values.stomaFormation} />
                <ViewInput label="수술 시작 시간" value={operationStartTime} />
                <ViewInput label="수술 종료 시간" value={operationEndTime} />
                <NumberViewInput unit="분" label="전체 수술 시간 (분)" value={values.totalOperationTime} />
                <NumberViewInput unit="cc" label="수술 중 총 들어간 수액 양 (cc)" value={values.totalFluidsAmount} />

                <NumberViewInput unit="cc" label="수술 중 실혈량 (cc)" value={values.bloodLoss} />

                <div className="flex flex-col items-center w-full mt-4 tablet:col-span-2">
                    <span className="mb-2 text-base text-red-500">*선택한 Checklist 확인 필수</span>
                    <button
                        type="button"
                        onClick={handleOpenCheckListSetup}
                        className="w-full px-8 py-3 text-gray-600 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-300 mobile:max-w-screen-mobile"
                    >
                        체크리스트 확인
                    </button>
                </div>
            </div>
            <FixedSubmitButton className="tablet:col-span-2" onClick={onSubmit} label="확인" />
            {isCheckListSetupModal && (
                <PatientChecklistSetupModal
                    onClose={handleCloseCheckListSetup}
                    values={checkListSetup}
                    title="체크리스트 확인"
                />
            )}
        </div>
    );
}

export default ConfirmNewOperationInfo;
