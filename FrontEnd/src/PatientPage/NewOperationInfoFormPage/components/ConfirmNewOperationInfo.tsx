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
        <>
            <div className="grid grid-cols-1 flex-col gap-3 px-4 pt-4 tablet:grid-cols-2 tablet:gap-x-20">
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

                <div className="mt-4 flex w-full flex-col items-center tablet:col-span-2">
                    <span className="mb-2 text-base text-yellow-600">*선택한 Checklist 확인 필수</span>
                    <button
                        type="button"
                        onClick={handleOpenCheckListSetup}
                        className="w-full rounded-md border border-gray-200 bg-gray-100 px-8 py-3 text-gray-600 hover:bg-gray-300 mobile:max-w-screen-mobile"
                    >
                        체크리스트 확인
                    </button>
                </div>
                <FixedSubmitButton className="tablet:col-span-2" onClick={onSubmit} label="저장하기" />
            </div>
            {isCheckListSetupModal && (
                <PatientChecklistSetupModal
                    onClose={handleCloseCheckListSetup}
                    values={checkListSetup}
                    title="체크리스트 확인"
                />
            )}
        </>
    );
}

export default ConfirmNewOperationInfo;
