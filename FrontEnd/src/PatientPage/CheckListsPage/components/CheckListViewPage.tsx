import { useFormik } from 'formik';
import YesOrNoButton from '../../../components/common/form/input/YesOrNoButton';
import { DailyCheckListFormType, checkListFormType } from '../../../models/CheckListsType';
import { useEffect, useState } from 'react';

import { useCheckListSetupQuery } from '../../_lib/complianceFormSevice';
import { CHECKLIST_ITEMS_NAME } from '../../../utils/mappingNames';
import DropContainer from '../../ComplianceFormPage/components/DropContainer';
import { useSearchParams } from 'react-router-dom';
import Loading from '../../../components/common/Loading';
import PainSelector from '../../../components/common/form/input/PainSelector';
import DateInput from '../../../components/common/form/input/DateInput';
import { useFluidRestrictionQuery } from '../../_lib/checkListsService';
import { useScrollHeaderControl } from '../../../Hooks/useScrollHeaderControl';
import CheckListViewGuide from './CheckListViewGuide';
type CombinedType = checkListFormType & DailyCheckListFormType;

const initialValues: CombinedType = {
    explainedPreOp: '', // EAS 수술전 설명
    onsPreOp2hr: '', // 수술 2시간 전 ONS 복용여부
    onsPostBowelPrep: '', // Bowel preparation 후 ONS 경장영양액 복용여부
    dvtPrevention: '', // DVT 예방
    antibioticPreIncision: '', // 피부 절개 60분 전 예방적 항생제 투여
    painMedPreOp: '', // 수술 전 통증 조절약

    explainedPreOp_remarks: '',
    onsPreOp2hr_remarks: '',
    onsPostBowelPrep_remarks: '',
    dvtPrevention_remarks: '',
    antibioticPreIncision_remarks: '',
    painMedPreOp_remarks: '',

    //-------------------------------수술전--------------------------------

    maintainTemp: '', // 수술 중 환자 체온 유지
    fluidRestriction: '', //수술 중 수액  2-4cc/kg/hr 으로 제한 *별도 수치 디스플레이 필요
    antiNausea: '', //수술 중 구역구토 방지제 사용 여부
    painControl: '', //수술 중 통증 조절을 위한 처치 여부

    maintainTemp_remarks: '',
    fluidRestriction_remarks: '',
    antiNausea_remarks: '',
    painControl_remarks: '',
    //------------------------------수술당일-----------------------------------

    giStimulant: '', //위장관 촉진 약 복용
    gumChewing: '', //하루 3번 15분동안 껌씹기
    antiNauseaPostOp: '', //수술 후 구역구토방지제 사용 여부
    ivFluidRestrictionPostOp: '', //수술 후 IV fluid 제한awsas
    nonOpioidPainControl: '', //수술 후 non-opioid pain control 여부
    jpDrainRemoval: '', //수술 후 3일이내 JP drain 제거 여부
    jpDrainRemovalDate: '', //제거한날 기입
    catheterRemoval: '', //수술 후 수술장에서 소변줄 제거 여부
    catheterRemovalDate: '', //제거한날 기입
    catheterReInsertion: '', //Foley cath 재삽입 여부
    ivLineRemoval: '', //수술 후 3일이내 IV line 제거 여부
    ivLineRemovalDate: '', //제거한날 기입
    postExercise: '', //Post OP day 운동
    podOneExercise: '', //POD 1day 운동
    podTwoExercise: '', //POD 2day 운동
    podThreeExercise: '', //POD 3day 운동
    postMeal: '', //Post OP day 식사
    podOneMeal: '', //POD 1day 식사
    podTwoMeal: '', //POD 2day 식사
    postPain: {
        day: 0,
        evening: 0,
        night: 0,
    },
    //수술 후 통증
    podOnePain: {
        day: 0,
        evening: 0,
        night: 0,
    }, //POD 1day 통증
    podTwoPain: {
        day: 0,
        evening: 0,
        night: 0,
    }, //POD 2day 통증
    podThreePain: {
        day: 0,
        evening: 0,
        night: 0,
    }, //POD 3day 통증
    giStimulant_remarks: '',
    gumChewing_remarks: '',
    antiNauseaPostOp_remarks: '',
    ivFluidRestrictionPostOp_remarks: '',
    nonOpioidPainControl_remarks: '',
    jpDrainRemoval_remarks: '',
    catheterRemoval_remarks: '',
    ivLineRemoval_remarks: '',
    postExercise_remarks: '',
    podOneExercise_remarks: '',
    podTwoExercise_remarks: '',
    podThreeExercise_remarks: '',
    postMeal_remarks: '',
    podOneMeal_remarks: '',
    podTwoMeal_remarks: '',
};

type Button = {
    day: 'PREV' | 'TODAY' | 'POST' | 'DAILY';
    label: string;
};

const buttons: Button[] = [
    { day: 'PREV', label: '수술 전' },
    { day: 'TODAY', label: '수술 중' },
    { day: 'POST', label: '수술 후' },
    { day: 'DAILY', label: 'Daily' },
];

function CheckListViewPage() {
    const [relativeDay, setRelativeDay] = useState<Button['day']>('PREV');
    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name'); //환자명
    const operationId = searchParams.get('id'); //수술ID

    const { isVisible } = useScrollHeaderControl({});

    const checkListSetupQuery = useCheckListSetupQuery({ operationId: Number(operationId) }); //체크리스트 세팅 정보 가져오기
    const fluidRestrictionQuery = useFluidRestrictionQuery({ operationId: Number(operationId) }); //수술 중 수액 제한 정보 가져오기
    const { data: existFields, isPending: isExistFieldsPending } = checkListSetupQuery; //체크리스트 세팅 정보
    const { data: fluidRestriction, isPending: isFluidRestrictionPending } = fluidRestrictionQuery; //수술 중 수액 제한 정보

    const formik = useFormik({
        initialValues, // 초기값
        enableReinitialize: true, // 초기값이 변경되면 다시 렌더링

        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        onSubmit: () => {}, // 제출시 실행할 함수
    });

    const handleToggleField = (day: Button['day']) => {
        setRelativeDay(day);
    }; //수술전, 당일, 후 버튼 클릭시 해당하는 필드만 보여주기

    useEffect(() => {
        if (formik.values.jpDrainRemoval === 'NO') {
            formik.setFieldValue('jpDrainRemovalDate', '');
        }
        if (formik.values.catheterRemoval === 'NO') {
            formik.setFieldValue('catheterRemovalDate', '');
            formik.setFieldValue('catheterReInsertion', '');
        }
        if (formik.values.ivLineRemoval === 'NO') {
            formik.setFieldValue('ivLineRemovalDate', '');
        }
    }, [formik.values.jpDrainRemoval, formik.values.catheterRemoval, formik.values.ivLineRemoval]);

    if (isExistFieldsPending || isFluidRestrictionPending) {
        return <Loading />;
    }
    if (!existFields || !fluidRestriction) return;

    return (
        <>
            <div className={`flex w-full flex-col`}>
                <div
                    className={`sticky top-[65px] z-10 flex flex-row border-b shadow-sm transition-all duration-200 ${isVisible ? '' : 'pointer-events-none opacity-0'}`}
                >
                    {buttons.map(({ day, label }) => (
                        <button
                            key={day}
                            className={`flex-1 py-3 text-gray-600 ${relativeDay.includes(day) ? 'bg-green-500 text-white' : 'bg-white'} transition-colors duration-300 ease-in-out`}
                            type="button"
                            onClick={() => handleToggleField(day)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <CheckListViewGuide patientName={patientName || ''} existFields={existFields} />
                <form className="mx-auto flex w-full flex-col gap-6 rounded p-4">
                    {/* 수술전 */}
                    <DropContainer isOpen={relativeDay.includes('PREV')}>
                        <YesOrNoButton<checkListFormType>
                            htmlFor="explainedPreOp"
                            label={CHECKLIST_ITEMS_NAME.explainedPreOp}
                            formik={formik}
                            isRender={existFields.explainedPreOp}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="onsPreOp2hr"
                            label={CHECKLIST_ITEMS_NAME.onsPreOp2hr}
                            formik={formik}
                            isRender={existFields.onsPreOp2hr}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="onsPostBowelPrep"
                            label={CHECKLIST_ITEMS_NAME.onsPostBowelPrep}
                            formik={formik}
                            isRender={existFields.onsPostBowelPrep}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="dvtPrevention"
                            label={CHECKLIST_ITEMS_NAME.dvtPrevention}
                            formik={formik}
                            isRender={existFields.dvtPrevention}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="antibioticPreIncision"
                            label={CHECKLIST_ITEMS_NAME.antibioticPreIncision}
                            formik={formik}
                            isRender={existFields.antibioticPreIncision}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="painMedPreOp"
                            label={CHECKLIST_ITEMS_NAME.painMedPreOp}
                            formik={formik}
                            isRender={existFields.painMedPreOp}
                        />
                    </DropContainer>

                    {/* 수술당일 */}
                    <DropContainer isOpen={relativeDay.includes('TODAY')}>
                        <YesOrNoButton<checkListFormType>
                            htmlFor="maintainTemp"
                            label={CHECKLIST_ITEMS_NAME.maintainTemp}
                            formik={formik}
                            isRender={existFields.maintainTemp}
                        />
                        <YesOrNoButton<checkListFormType>
                            label={`
                                수술 중 수액 ${fluidRestriction ? `${fluidRestriction.toFixed(2)}` : ''} cc/kg/hr 으로 제한
                            `}
                            htmlFor="fluidRestriction"
                            formik={formik}
                            isRender={existFields.fluidRestriction}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="antiNausea"
                            label={CHECKLIST_ITEMS_NAME.antiNausea}
                            formik={formik}
                            isRender={existFields.antiNausea}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="painControl"
                            label={CHECKLIST_ITEMS_NAME.painControl}
                            formik={formik}
                            isRender={existFields.painControl}
                        />
                    </DropContainer>

                    {/* 수술후 */}
                    <DropContainer isOpen={relativeDay.includes('POST')}>
                        <YesOrNoButton<checkListFormType>
                            htmlFor="giStimulant"
                            label={CHECKLIST_ITEMS_NAME.giStimulant}
                            formik={formik}
                            isRender={existFields.giStimulant}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="gumChewing"
                            label={CHECKLIST_ITEMS_NAME.gumChewing}
                            formik={formik}
                            isRender={existFields.gumChewing}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="antiNauseaPostOp"
                            label={CHECKLIST_ITEMS_NAME.antiNauseaPostOp}
                            formik={formik}
                            isRender={existFields.antiNauseaPostOp}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="ivFluidRestrictionPostOp"
                            label={CHECKLIST_ITEMS_NAME.ivFluidRestrictionPostOp}
                            formik={formik}
                            isRender={existFields.ivFluidRestrictionPostOp}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="nonOpioidPainControl"
                            label={CHECKLIST_ITEMS_NAME.nonOpioidPainControl}
                            formik={formik}
                            isRender={existFields.nonOpioidPainControl}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="jpDrainRemoval"
                            label={CHECKLIST_ITEMS_NAME.jpDrainRemoval}
                            formik={formik}
                            isRender={existFields.jpDrainRemoval}
                            etcComponent={
                                <DateInput<checkListFormType>
                                    label=""
                                    htmlFor="jpDrainRemovalDate"
                                    formik={formik}
                                    placeHolder="제거한날 기입"
                                    isRender={formik.values.jpDrainRemoval === 'YES'}
                                />
                            }
                        />

                        <YesOrNoButton<checkListFormType>
                            htmlFor="catheterRemoval"
                            label={CHECKLIST_ITEMS_NAME.catheterRemoval}
                            formik={formik}
                            isRender={existFields.catheterRemoval}
                            etcComponent={
                                <DateInput<checkListFormType>
                                    label=""
                                    htmlFor="catheterRemovalDate"
                                    formik={formik}
                                    placeHolder="제거한날 기입"
                                    isRender={formik.values.catheterRemoval === 'YES'}
                                />
                            }
                        />

                        <YesOrNoButton<checkListFormType>
                            htmlFor="catheterReInsertion"
                            label="* Foley cath 재삽입 여부"
                            formik={formik}
                            isRender={existFields.catheterRemoval && formik.values.catheterRemoval === 'YES'}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="ivLineRemoval"
                            label={CHECKLIST_ITEMS_NAME.ivLineRemoval}
                            formik={formik}
                            isRender={existFields.ivLineRemoval}
                            etcComponent={
                                <DateInput<checkListFormType>
                                    label=""
                                    htmlFor="ivLineRemovalDate"
                                    formik={formik}
                                    placeHolder="제거한날 기입"
                                    isRender={formik.values.ivLineRemoval === 'YES'}
                                />
                            }
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="postExercise"
                            label={CHECKLIST_ITEMS_NAME.postExercise}
                            formik={formik}
                            isRender={existFields.podExercise}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="postMeal"
                            label={CHECKLIST_ITEMS_NAME.postMeal}
                            formik={formik}
                            isRender={existFields.podMeal}
                        />
                        <PainSelector<checkListFormType>
                            type="number"
                            htmlFor="postPain"
                            label={CHECKLIST_ITEMS_NAME.postPain}
                            formik={formik}
                            isRender={existFields.podPain}
                            values={[
                                { value: 'day', label: 'Day' },
                                { value: 'evening', label: 'Evening' },
                                { value: 'night', label: 'Night' },
                            ]}
                        />
                    </DropContainer>
                    <DropContainer isOpen={relativeDay.includes('DAILY')}>
                        {/* ------Day 운동  ------ */}

                        <YesOrNoButton<checkListFormType>
                            htmlFor="podOneExercise"
                            label={CHECKLIST_ITEMS_NAME.podOneExercise}
                            formik={formik}
                            isRender={existFields.podExercise}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="podTwoExercise"
                            label={CHECKLIST_ITEMS_NAME.podTwoExercise}
                            formik={formik}
                            isRender={existFields.podExercise}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="podThreeExercise"
                            label={CHECKLIST_ITEMS_NAME.podThreeExercise}
                            formik={formik}
                            isRender={existFields.podExercise}
                        />

                        {/* ------Day 식사 ------ */}

                        <YesOrNoButton<checkListFormType>
                            htmlFor="podOneMeal"
                            label={CHECKLIST_ITEMS_NAME.podOneMeal}
                            formik={formik}
                            isRender={existFields.podMeal}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="podTwoMeal"
                            label={CHECKLIST_ITEMS_NAME.podTwoMeal}
                            formik={formik}
                            isRender={existFields.podMeal}
                        />
                        {/* ------Day 통증 ------ */}

                        <PainSelector<checkListFormType>
                            type="number"
                            htmlFor="podOnePain"
                            label={CHECKLIST_ITEMS_NAME.podOnePain}
                            formik={formik}
                            isRender={existFields.podPain}
                            values={[
                                { value: 'day', label: 'Day' },
                                { value: 'evening', label: 'Evening' },
                                { value: 'night', label: 'Night' },
                            ]}
                        />
                        <PainSelector<checkListFormType>
                            type="number"
                            htmlFor="podTwoPain"
                            label={CHECKLIST_ITEMS_NAME.podTwoPain}
                            isRender={existFields.podPain}
                            formik={formik}
                            values={[
                                { value: 'day', label: 'Day' },
                                { value: 'evening', label: 'Evening' },
                                { value: 'night', label: 'Night' },
                            ]}
                        />
                        <PainSelector<checkListFormType>
                            type="number"
                            htmlFor="podThreePain"
                            label={CHECKLIST_ITEMS_NAME.podThreePain}
                            formik={formik}
                            isRender={existFields.podPain}
                            values={[
                                { value: 'day', label: 'Day' },
                                { value: 'evening', label: 'Evening' },
                                { value: 'night', label: 'Night' },
                            ]}
                        />
                    </DropContainer>
                </form>
            </div>
        </>
    );
}

export default CheckListViewPage;
