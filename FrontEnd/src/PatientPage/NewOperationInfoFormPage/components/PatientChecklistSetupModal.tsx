import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import { CHECKLIST_SECTION_KEYS } from '../../../models/CheckListsType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import PatientCheckCard from './PatientCheckCard';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
import { useEffect, useState } from 'react';
import DropBoxCheckListSetupContainer from './DropBoxCheckListSetupContainer';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../../models/AxiosResponseType';
import Loading from '../../../components/common/Loading';
import DisplayEmptyData from '../../../components/common/DisplayEmptyData';
type Props = {
    values: CheckListSetupType;
    handleSubmit?: (newCheckListSetup: CheckListSetupType) => void;
    onClose: () => void;
    title?: string;
    isPending?: boolean;
    error?: AxiosError<ErrorResponseType, any> | null;
};

function PatientChecklistSetupModal({ handleSubmit, values, onClose, title, isPending, error }: Props) {
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
        painControlMethod: true, //수수술 중 통증 조절 종류
        //-------------------------수술당일

        gumChewing: true, //하루 3번 15분동안 껌씹기
        giStimulant: true, //수술 후 GI stimulant 사용 여부
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

    const isEditPage = Boolean(handleSubmit); // handleSubmit이 있으면 editPage 없으면 viewPage

    const onChangeCheckListSetup = (checkItem: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckListSetup({ ...checkListSetup, [checkItem]: event.target.checked });
    };
    useEffect(() => {
        setCheckListSetup(values);
        console.log('valuessss', values);
    }, [values]); //초기 값 설정

    return (
        <ModalFullScreenContainer
            maxWidthClassName="max-w-screen-tablet"
            maxHeightClassName="max-h-[100dvh]"
            title={`
            ${title ? title : '체크리스트 설정'}
        `}
            onClose={onClose}
            isDraggable={false}
            roundedClassName=""
        >
            {isPending && <Loading />}
            <DisplayEmptyData
                isRender={Boolean(error)}
                label={`
                ${error?.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.'}
                `}
            />
            <div className={`mx-auto flex flex-1 flex-col p-6`}>
                <DropBoxCheckListSetupContainer label="수술전">
                    <div
                        className={`grid w-full grid-cols-1 gap-1 ${isEditPage ? '' : 'pointer-events-none'} py-4 mobile:grid-cols-2`}
                    >
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
                </DropBoxCheckListSetupContainer>
                <DropBoxCheckListSetupContainer label="수술중">
                    <div
                        className={`grid w-full grid-cols-1 gap-1 ${isEditPage ? '' : 'pointer-events-none'} py-4 mobile:grid-cols-2`}
                    >
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
                </DropBoxCheckListSetupContainer>
                <DropBoxCheckListSetupContainer label="수술후">
                    <div
                        className={`grid w-full grid-cols-1 gap-1 ${isEditPage ? '' : 'pointer-events-none'} py-4 mobile:grid-cols-2`}
                    >
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
                </DropBoxCheckListSetupContainer>
            </div>
            {isEditPage && handleSubmit && (
                <FixedSubmitButton className="p-3" onClick={() => handleSubmit(checkListSetup)} label="저장하기" />
            )}
        </ModalFullScreenContainer>
    );
}

export default PatientChecklistSetupModal;
