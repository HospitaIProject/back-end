import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import { CHECKLIST_SECTION_KEYS } from '../../../models/CheckListsType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import PatientCheckCard from './PatientCheckCard';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
import { useEffect, useState } from 'react';
type Props = {
    values: CheckListSetupType;
    handleSubmit?: (newCheckListSetup: CheckListSetupType) => void;
    onClose: () => void;
    title?: string;
};
const defaultHandleSubmit = () => {
    console.warn('handleSubmit 함수가 정의되지 않았습니다.');
};

function PatientChecklistSetupModal({ handleSubmit = defaultHandleSubmit, values, onClose, title }: Props) {
    const [checkListSetup, setCheckListSetup] = useState<CheckListSetupType>({
        explainedPreOp: true, // EAS 수술전 설명
        onsPreOp2hr: true, // 수술 2시간 전 ONS 복용여부
        onsPostBowelPrep: true, // Bowel preparation 후 경장영양액 복용여부
        dvtPrevention: true, // DVT 예방
        antibioticPreIncision: true, // 피부 절개 60분 전 예방적 항생제 투여
        painMedPreOp: true, // 수술전 통증 조절약 복용 여부
        //-------------------------수술전

        maintainTemp: true, // 수술 중 환자 체온 유지
        fluidRestriction: true, //수술 중 수액  2-4cc/kg/hr 으로 제한
        antiNausea: true, //수술 중 구역구토 방지제 사용 여부
        painControl: true, //수술 중 통증 조절을 위한 처치 여부
        //-------------------------수술당일

        giStimulant: true, //위장관 촉진 약 복용
        gumChewing: true, //하루 3번 15분동안 껌씹기
        antiNauseaPostOp: true, //수술 후 구역구토방지제 사용 여부
        ivFluidRestrictionPostOp: true, //수술 후 IV fluid 제한
        nonOpioidPainControl: true, //수술 후 non-opioid pain control 여부
        jpDrainRemoval: true, //수술 후 3일이내 JP drain 제거 여부
        catheterRemoval: true, //수술 후 수술장에서 소변줄 제거 여부
        ivLineRemoval: true, //수술 후 3일이내 IV line 제거 여부
        podExercise: true, //Post OP day 운동, POD 1day 운동, POD 2day 운동, POD 3day 운동
        podMeal: true, //Post OP day 식사, POD 1day 식사, POD 2day 식사, POD 3day 식사
        podPain: true, //수술 후 통증
    });
    const onChangeCheckListSetup = (checkItem: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckListSetup({ ...checkListSetup, [checkItem]: event.target.checked });
    };
    useEffect(() => {
        setCheckListSetup(values);
    }, [values]);

    return (
        <ModalFullScreenContainer
            maxWidthClassName="max-w-screen-tablet"
            title={`
            ${title ? title : '체크리스트 설정'}
        `}
            onClose={onClose}
        >
            <div className="mx-auto flex flex-1 flex-col px-6">
                <div className="flex w-full justify-center rounded-md bg-gray-100 py-2 text-gray-700">-수술전-</div>

                <div className="grid w-full grid-cols-1 gap-1 py-4 mobile:grid-cols-2">
                    {Object.keys(checkListSetup)
                        .filter((key) => CHECKLIST_SECTION_KEYS.PREV.includes(key))
                        .map((patientKey) => (
                            <>
                                <PatientCheckCard
                                    patientKey={patientKey}
                                    values={checkListSetup}
                                    handleChange={onChangeCheckListSetup}
                                    key={patientKey}
                                />
                            </>
                        ))}
                </div>
                <div className="flex w-full justify-center rounded-md bg-gray-100 py-2 text-gray-700">-수술당일-</div>
                <div className="mx-auto grid w-full grid-cols-1 gap-1 py-4 mobile:grid-cols-2">
                    {Object.keys(checkListSetup)
                        .filter((key) => CHECKLIST_SECTION_KEYS.TODAY.includes(key))
                        .map((patientKey) => (
                            <>
                                <PatientCheckCard
                                    patientKey={patientKey}
                                    values={checkListSetup}
                                    handleChange={onChangeCheckListSetup}
                                    key={patientKey}
                                />
                            </>
                        ))}
                </div>
                <div className="flex w-full justify-center rounded-md bg-gray-100 py-2 text-gray-700">-수술후-</div>
                <div className="mx-auto grid w-full grid-cols-1 gap-1 py-4 mobile:grid-cols-2">
                    {Object.keys(checkListSetup)
                        .filter((key) => CHECKLIST_SECTION_KEYS.POST.includes(key))
                        .map((patientKey) => (
                            <>
                                <PatientCheckCard
                                    patientKey={patientKey}
                                    values={checkListSetup}
                                    handleChange={onChangeCheckListSetup}
                                    key={patientKey}
                                />
                            </>
                        ))}
                </div>
                {Boolean(handleSubmit) && (
                    <FixedSubmitButton onClick={() => handleSubmit(checkListSetup)} label="저장하기" />
                )}
            </div>
        </ModalFullScreenContainer>
    );
}

export default PatientChecklistSetupModal;
