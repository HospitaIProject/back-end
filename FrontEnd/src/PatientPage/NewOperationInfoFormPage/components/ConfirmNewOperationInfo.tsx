import { useState } from 'react';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
import NumberViewInput from '../../../components/common/form/viewInput/NumberViewInput';
import ViewInput from '../../../components/common/form/viewInput/ViewInput';
import YesOrNoViewButton from '../../../components/common/form/viewInput/YesOrNoViewButton';
import { OperationInfoFormType } from '../../../models/OperationType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import PatientChecklistSetupModal from './PatientChecklistSetupModal';

const MATCH_ITEMS = {
    COLOSTOMY: 'Colostomy',
    IlEOSTOMY: 'Ileostomy',
    UROSTOMY: 'Urostomy',
    GASTROSTOMY: 'Gastrostomy',
    JEJUNOSTOMY: 'Jejunostomy',
};
function getNameByValue(value: string) {
    const item = MATCH_ITEMS[value as keyof typeof MATCH_ITEMS];
    return item;
}

type Props = {
    values: OperationInfoFormType;
    onSubmit: () => void;
    checkListSetup: CheckListSetupType;
};
function ConfirmNewOperationInfo({ values, onSubmit, checkListSetup }: Props) {
    const { onlyDate: operationDate } = useDateFormatted(values.operationDate);
    const { onlyDate: hospitalizedDate } = useDateFormatted(values.hospitalizedDate);
    const { onlyDate: dischargedDate } = useDateFormatted(values.dischargedDate);
    const [isCheckListSetupModal, setIsCheckListSetupModal] = useState(false);

    const handleOpenCheckListSetup = () => {
        setIsCheckListSetupModal(true);
    }; // 체크리스트 설정 모달 열기
    const handleCloseCheckListSetup = () => {
        setIsCheckListSetupModal(false);
    }; // 체크리스트 설정 모달 닫기
    return (
        <>
            <div className="grid flex-col w-full grid-cols-1 gap-3 px-4 pt-4 tablet:grid-cols-2 tablet:gap-x-20">
                <NumberViewInput label="키(cm)" value={values.height} unit="cm" />
                <NumberViewInput label="몸무게(kg)" value={values.weight} unit="kg" />
                <NumberViewInput label="BMI" value={values.bmi} />
                <ViewInput label="ASA score" value={values.asaScore} />
                <ViewInput label="위치" value={values.location} />
                <ViewInput label="진단" value={values.dignosis} />
                <ViewInput label="수술일" value={operationDate} />
                <ViewInput label="입원일" value={hospitalizedDate} />
                <ViewInput label="퇴원일" value={dischargedDate} />
                <NumberViewInput label="총 재원일수" value={values.totalHospitalizedDays} />
                <ViewInput label="수술방법" value={values.operationMethod} />
                <ViewInput label="수술 approach" value={values.operationApproach} />
                <ViewInput label="Stoma formation" value={getNameByValue(values.stomaFormation)} />
                <ViewInput label="AJCC stage" value={values.ajcCStage} />
                <NumberViewInput label="No. of retrieved LN" value={values.numberOfRetrievedLine} />
                <YesOrNoViewButton label="Complication 발생 여부" value={values.complicationOccurence} />
                <ViewInput label="C-D classification" value={values.cdClassification} />
                <YesOrNoViewButton label="Reoperation within 30days" value={values.reOperationWithIn30Days} />
                <ViewInput label="Reoperation 원인" value={values.reOperationCause} />
                <div className="flex flex-col items-center w-full mt-4 tablet:col-span-2">
                    <span className="mb-2 text-base text-yellow-600">*선택한 Checklist 확인 필수</span>
                    <button
                        type="button"
                        onClick={handleOpenCheckListSetup}
                        className="w-full px-8 py-3 text-gray-600 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-300 mobile:max-w-screen-mobile"
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
