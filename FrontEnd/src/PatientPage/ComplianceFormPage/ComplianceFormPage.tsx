import { useFormik } from 'formik';
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
import DateInput from '../../components/common/form/input/DateInput';
import { validateFields } from './utils/validateFields';
import { pushNotification } from '../../utils/pushNotification';
import { useFluidRestrictionQuery } from '../_lib/checkListsService';
import { useScrollHeaderControl } from '../../Hooks/useScrollHeaderControl';
import PainSelector from '../../components/common/form/input/PainSelector';

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
    const { isVisible } = useScrollHeaderControl();

    const { onlyDate: formattedOnlyDate } = useDateFormatted(new Date(), 'SIMPLE'); // 수술일자 포맷팅
    const complianceFormMutation = useComplianceFormMutation(); //체크리스트 제출
    const checkListSetupQuery = useCheckListSetupQuery({ operationId: Number(operationId) }); //체크리스트 세팅 정보 가져오기
    const fluidRestrictionQuery = useFluidRestrictionQuery({ operationId: Number(operationId) }); //수술 중 수액 제한 정보 가져오기
    const { data: existFields, isPending: isExistFieldsPending } = checkListSetupQuery; //체크리스트 세팅 정보
    const { data: fluidRestriction, isPending: isFluidRestrictionPending } = fluidRestrictionQuery; //수술 중 수액 제한 정보
    const { initialValues, isPending: isInitialValuesPending } = useInitialValues({
        existFields,
        toggleDateStatus: relativeDay,
    }); //초기값 가져오기

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
                complianceFormMutation.mutate({
                    operationId: Number(operationId),
                    data: values,
                    type: relativeDay,
                });
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
    useEffect(() => {
        console.log('podOnePain', formik.values.podOnePain);
    }, [formik.values.podOnePain]);

    if (isExistFieldsPending || isInitialValuesPending || isFluidRestrictionPending) {
        return <Loading />;
    }
    if (!existFields || !fluidRestriction) return;

    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
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

                <div className="flex flex-row items-center gap-1 py-3 pr-4 mb-4 border-b rounded-md bg-gray-50 pl-28 text-neutral-700">
                    <span className="mx-auto text-xl font-bold text-center text-blue-500">{patientName}</span>
                    <div className="flex flex-col items-end w-24 gap-1">
                        <span className="text-sm text-gray-700 text-end">{formattedOnlyDate}</span>

                        <span className="p-1 text-sm font-medium text-gray-700 bg-yellow-200 rounded-md">
                            {dateStatus === 'TODAY' ? '수술중' : dateStatus === 'PREV' ? `수술전` : `수술후`}
                        </span>
                    </div>
                </div>

                <form className="flex flex-col w-full gap-6 p-4 mx-auto rounded">
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
                            label={`
                                수술 중 수액 ${fluidRestriction ? `${fluidRestriction.toFixed(2)}` : ''} cc/kg/hr 으로 제한
                            `}
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
                        <YesOrNoButton
                            htmlFor="postExercise"
                            label={CHECKLIST_ITEMS_NAME.postExercise}
                            formik={formik}
                            isRender={existFields.podExercise}
                        />
                        <YesOrNoButton
                            htmlFor="postMeal"
                            label={CHECKLIST_ITEMS_NAME.postMeal}
                            formik={formik}
                            isRender={existFields.podMeal}
                        />
                        <PainSelector
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
                </form>
                <div className={`mt-auto ${isConfirmButton ? 'block' : 'hidden'}`}>
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
                    fluidRestriction={fluidRestriction}
                />
            )}
        </>
    );
}

export default ComplianceFormPage;
