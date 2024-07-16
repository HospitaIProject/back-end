import { FormikProps, useFormik } from 'formik';
import YesOrNoButton from '../../components/common/form/input/YesOrNoButton';
import { checkListFormType } from '../../models/CheckListsType';
import { useEffect, useState } from 'react';
import ComfirmComplianceFormModal from './components/ComfirmComplianceFormModal';
import { useCheckListSetupQuery, useComplianceFormMutation } from '../_lib/complianceFormSevice';
import SubmitButton from '../../components/common/form/SubmitButton';
import { CHECKLIST_ITEMS_NAME } from '../../utils/mappingNames';
import DropContainer from './components/DropContainer';
import { useSearchParams } from 'react-router-dom';
import { useDateFormatted } from '../../Hooks/useDateFormatted';
import Loading from '../../components/common/Loading';
import { useInitialValues } from './utils/useInitialValues';
import MultiInput from '../../components/common/form/input/MultiInput';
import DateInput from '../../components/common/form/input/DateInput';
import { validateFields } from './utils/validateFields';
import { pushNotification } from '../../utils/pushNotification';

type Button = {
    day: 'PREV' | 'TODAY' | 'POST';
    label: string;
};

const buttons: Button[] = [
    { day: 'PREV', label: '수술 전' },
    { day: 'TODAY', label: '수술 당일' },
    { day: 'POST', label: '수술 후' },
];

function ComplianceFormPage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const [relativeDay, setRelativeDay] = useState<'PREV' | 'TODAY' | 'POST'>('POST');
    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name'); //환자명
    const operationId = searchParams.get('id'); //수술ID
    const dateStatus = searchParams.get('dateStatus'); //수술전, 당일, 후인지
    const diffDay = searchParams.get('diffDay'); //몇일차인지
    const { onlyDate: formattedOnlyDate } = useDateFormatted(new Date(), 'SIMPLE'); // 수술일자 포맷팅
    const complianceFormMutation = useComplianceFormMutation(); //체크리스트 제출
    const checkListSetupQuery = useCheckListSetupQuery({ operationId: Number(operationId) }); //체크리스트 세팅 정보 가져오기
    const { data: existFields, isPending: isExistFieldsPending } = checkListSetupQuery; //체크리스트 세팅 정보
    const { initialValues, isPending: isInitialValuesPending } = useInitialValues({
        existFields,
        toggleDateStatus: relativeDay,
    }); //초기값 가져오기

    const isPostOp = diffDay === '0'; //수술 후인지 여부
    const isPod1 = diffDay === '-1'; //POD 1일차인지 여부
    const isPod2 = diffDay === '-2'; //POD 2일차인지 여부
    const isPod3 = diffDay === '-3'; //POD 3일차인지 여부
    const isConfirmButton =
        (dateStatus === 'POST' && relativeDay.includes('POST')) ||
        (dateStatus === 'TODAY' && relativeDay.includes('TODAY')) ||
        (dateStatus === 'PREV' && relativeDay.includes('PREV')); //확인하기 버튼 보여주기 여부

    const formik = useFormik({
        initialValues, // 초기값
        enableReinitialize: true, // 초기값이 변경되면 다시 렌더링

        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        onSubmit: (values) => {
            console.log('제출', values);
            if (confirm('제출하시겠습니까?')) {
                complianceFormMutation.mutate({ operationId: Number(operationId), data: values, type: relativeDay });
            } else {
                return;
            }
        },
    });

    const handleOpenConfirm = () => {
        const isError = validateFields({
            formik,
            type: relativeDay,
            values: formik.values,
        });
        if (isError) {
            pushNotification({
                msg: '필수 입력 항목이 누락되었습니다.',
                type: 'error',
                theme: 'dark',
            });
            return;
        } else {
            setIsConfirmPage(true);
        }
    }; //제출하기 버튼 클릭시 확인 페이지로 이동

    const handleCloseConfirm = () => {
        setIsConfirmPage(false);
    };
    const handleToggleField = (day: 'PREV' | 'TODAY' | 'POST') => {
        setRelativeDay(day);
    }; //수술전, 당일, 후 버튼 클릭시 해당하는 필드만 보여주기

    useEffect(() => {
        setRelativeDay(dateStatus as 'PREV' | 'TODAY' | 'POST');
    }, []);

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

    if (isExistFieldsPending || isInitialValuesPending) {
        return <Loading />;
    }
    if (!existFields) return;

    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
                <div className="sticky top-[70px] z-10 flex flex-row border-b shadow-sm">
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

                <div className="mb-4 flex flex-row items-center gap-1 rounded-md border-b bg-gray-50 py-3 pl-28 pr-4 text-neutral-700">
                    <span className="mx-auto text-center text-xl font-bold text-blue-500">{patientName}</span>
                    <div className="flex w-24 flex-col items-end gap-1">
                        <span className="text-sm font-medium text-gray-700">{formattedOnlyDate}</span>

                        <span className="bg-yellow-200 p-1 text-sm font-medium text-gray-700">
                            {dateStatus === 'TODAY'
                                ? 'D-Day'
                                : dateStatus === 'PREV'
                                  ? `D-${diffDay}`
                                  : `D+${Math.abs(Number(diffDay))}`}
                        </span>
                    </div>
                </div>

                <form className="mx-auto flex w-full flex-col gap-6 rounded p-4">
                    {/* 수술전 */}
                    <DropContainer isOpen={relativeDay.includes('PREV') || relativeDay.includes('ALL')}>
                        <YesOrNoButton<checkListFormType>
                            htmlFor="explainedPreOp"
                            label={CHECKLIST_ITEMS_NAME.explainedPreOp}
                            formik={formik}
                            isRender={existFields.explainedPreOp}
                            isDisabled={dateStatus !== 'PREV'}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="onsPreOp2hr"
                            label={CHECKLIST_ITEMS_NAME.onsPreOp2hr}
                            formik={formik}
                            isRender={existFields.onsPreOp2hr}
                            isDisabled={dateStatus !== 'PREV'}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="onsPostBowelPrep"
                            label={CHECKLIST_ITEMS_NAME.onsPostBowelPrep}
                            formik={formik}
                            isRender={existFields.onsPostBowelPrep}
                            isDisabled={dateStatus !== 'PREV'}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="dvtPrevention"
                            label={CHECKLIST_ITEMS_NAME.dvtPrevention}
                            formik={formik}
                            isRender={existFields.dvtPrevention}
                            isDisabled={dateStatus !== 'PREV'}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="antibioticPreIncision"
                            label={CHECKLIST_ITEMS_NAME.antibioticPreIncision}
                            formik={formik}
                            isRender={existFields.antibioticPreIncision}
                            isDisabled={dateStatus !== 'PREV'}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="painMedPreOp"
                            label={CHECKLIST_ITEMS_NAME.painMedPreOp}
                            formik={formik}
                            isRender={existFields.painMedPreOp}
                            isDisabled={dateStatus !== 'PREV'}
                        />
                    </DropContainer>

                    {/* 수술당일 */}
                    <DropContainer
                        readOnly={dateStatus === 'PREV'}
                        isOpen={relativeDay.includes('TODAY') || relativeDay.includes('ALL')}
                    >
                        <YesOrNoButton<checkListFormType>
                            htmlFor="maintainTemp"
                            label={CHECKLIST_ITEMS_NAME.maintainTemp}
                            formik={formik}
                            isRender={existFields.maintainTemp}
                            isDisabled={dateStatus !== 'TODAY'}
                        />
                        <YesOrNoButton<checkListFormType>
                            label={CHECKLIST_ITEMS_NAME.fluidRestriction}
                            htmlFor="fluidRestriction"
                            formik={formik}
                            isRender={existFields.fluidRestriction}
                            isDisabled={dateStatus !== 'TODAY'}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="antiNausea"
                            label={CHECKLIST_ITEMS_NAME.antiNausea}
                            formik={formik}
                            isRender={existFields.antiNausea}
                            isDisabled={dateStatus !== 'TODAY'}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="painControl"
                            label={CHECKLIST_ITEMS_NAME.painControl}
                            formik={formik}
                            isRender={existFields.painControl}
                            isDisabled={dateStatus !== 'TODAY'}
                        />
                    </DropContainer>

                    {/* 수술후 */}
                    <DropContainer
                        readOnly={dateStatus === 'PREV' || dateStatus === 'TODAY'}
                        isOpen={relativeDay.includes('POST') || relativeDay.includes('ALL')}
                    >
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

                        {/* ------Day 운동  ------ */}
                        <YesOrNoButton<checkListFormType>
                            htmlFor="postExercise"
                            label={CHECKLIST_ITEMS_NAME.postExercise}
                            formik={formik}
                            isRender={existFields.podExercise && isPostOp}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="podOneExercise"
                            label={CHECKLIST_ITEMS_NAME.podOneExercise}
                            formik={formik}
                            isRender={existFields.podExercise && isPod1}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="podTwoExercise"
                            label={CHECKLIST_ITEMS_NAME.podTwoExercise}
                            formik={formik}
                            isRender={existFields.podExercise && isPod2}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="podThreeExercise"
                            label={CHECKLIST_ITEMS_NAME.podThreeExercise}
                            formik={formik}
                            isRender={existFields.podExercise && isPod3}
                        />
                        {/* ------Day 식사 ------ */}
                        <YesOrNoButton<checkListFormType>
                            htmlFor="postMeal"
                            label={CHECKLIST_ITEMS_NAME.postMeal}
                            formik={formik}
                            isRender={existFields.podMeal && isPostOp}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="podOneMeal"
                            label={CHECKLIST_ITEMS_NAME.podOneMeal}
                            formik={formik}
                            isRender={existFields.podMeal && isPod1}
                        />
                        <YesOrNoButton<checkListFormType>
                            htmlFor="podTwoMeal"
                            label={CHECKLIST_ITEMS_NAME.podTwoMeal}
                            formik={formik}
                            isRender={existFields.podMeal && isPod2}
                        />
                        {/* ------Day 통증 ------ */}
                        <MultiInput<checkListFormType>
                            type="number"
                            htmlFor="postPain"
                            label={CHECKLIST_ITEMS_NAME.postPain}
                            formik={formik}
                            isRender={existFields.podPain && isPostOp}
                            values={[
                                { value: 'day', label: 'Day' },
                                { value: 'evening', label: 'Evening' },
                                { value: 'night', label: 'Night' },
                            ]}
                        />
                        <MultiInput<checkListFormType>
                            type="number"
                            htmlFor="podOnePain"
                            label={CHECKLIST_ITEMS_NAME.podOnePain}
                            formik={formik}
                            isRender={existFields.podPain && isPod1}
                            values={[
                                { value: 'day', label: 'Day' },
                                { value: 'evening', label: 'Evening' },
                                { value: 'night', label: 'Night' },
                            ]}
                        />
                        <MultiInput<checkListFormType>
                            type="number"
                            htmlFor="podTwoPain"
                            label={CHECKLIST_ITEMS_NAME.podTwoPain}
                            isRender={existFields.podPain && isPod2}
                            formik={formik}
                            values={[
                                { value: 'day', label: 'Day' },
                                { value: 'evening', label: 'Evening' },
                                { value: 'night', label: 'Night' },
                            ]}
                        />
                        <MultiInput<checkListFormType>
                            type="number"
                            htmlFor="podThreePain"
                            label={CHECKLIST_ITEMS_NAME.podThreePain}
                            formik={formik}
                            isRender={existFields.podPain && isPod3}
                            values={[
                                { value: 'day', label: 'Day' },
                                { value: 'evening', label: 'Evening' },
                                { value: 'night', label: 'Night' },
                            ]}
                        />
                    </DropContainer>
                </form>
                <div className={`${isConfirmButton ? 'block' : 'hidden'}`}>
                    <SubmitButton onClick={handleOpenConfirm} label="확인하기" />
                </div>
            </div>

            {/* 작성한 폼을 한번 더확인 */}
            {isConfirmPage && (
                <ComfirmComplianceFormModal
                    values={formik.values}
                    onSubmit={formik.handleSubmit}
                    onClose={handleCloseConfirm}
                    existFields={existFields}
                />
            )}
        </>
    );
}

export default ComplianceFormPage;
