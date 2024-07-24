import {
    CheckListsAfterItemType,
    CheckListsBeforeItemType,
    CheckListsDuringItemType,
    checkListFormType,
} from '../../../models/CheckListsType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import YesOrNoViewButton from '../../../components/common/form/viewInput/YesOrNoViewButton';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
import { useSearchParams } from 'react-router-dom';
import { CHECKLIST_ITEMS_NAME } from '../../../utils/mappingNames';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import CalendarIcon from '../../../icons/CalendarIcon';
import MultiViewInput from '../../../components/common/form/viewInput/MultiViewInput';
import { useFluidRestrictionQuery } from '../../_lib/checkListsService';
import Loading from '../../../components/common/Loading';

type Props = {
    formValues?: checkListFormType;
    prevValues?: CheckListsBeforeItemType;
    todayValues?: CheckListsDuringItemType;
    postValues?: CheckListsAfterItemType;

    onSubmit?: () => void;
    existFields: CheckListSetupType;
    fluidRestriction?: number;
};

function ConfirmComplianceForm({
    formValues,
    prevValues,
    todayValues,
    postValues,
    onSubmit,
    existFields,
    fluidRestriction,
}: Props) {
    const [searchParams] = useSearchParams();
    const operationId = searchParams.get('id'); //수술ID
    const dateStatus = searchParams.get('dateStatus'); //수술전, 당일, 후인지
    const diffDay = searchParams.get('diffDay'); //몇일차인지
    const isPostOp = diffDay === '0'; //수술 후인지 여부
    const isPod1 = diffDay === '-1'; //POD 1일차인지 여부
    const isPod2 = diffDay === '-2'; //POD 2일차인지 여부
    const isPod3 = diffDay === '-3'; //POD 3일차인지 여부
    // const statusTitle = dateStatus === 'PREV' ? '수술 전' : dateStatus === 'POST' ? '수술 후' : '수술 당일';
    const dateComparison =
        dateStatus === 'PREV'
            ? '수술전'
            : dateStatus === 'TODAY'
              ? '수술당일'
              : `수술후(D+${Math.abs(Number(diffDay))})`;

    const fluidRestrictionQuery = useFluidRestrictionQuery({
        operationId: Number(operationId),
        enabled: Boolean(!fluidRestriction),
    });
    const { data: fluidRestrictionData, isPending: isFluidRestrictionPending } = fluidRestrictionQuery;

    let values = {
        ...formValues,
        ...prevValues,
        ...todayValues,
        ...postValues,
    };
    const { onlyDate: jpDrainRemovalDate } = useDateFormatted(values.jpDrainRemovalDate || '');
    const { onlyDate: catheterRemovalDate } = useDateFormatted(values.catheterRemovalDate || '');
    const { onlyDate: ivLineRemovalDate } = useDateFormatted(values.ivLineRemovalDate || '');

    if (isFluidRestrictionPending) {
        return <Loading />;
    }
    if (!fluidRestrictionData && !fluidRestriction) {
        return <div>fluidRestriction를 불러오는데 실패했습니다.</div>;
    }
    return (
        <>
            <div className="flex flex-col w-full h-full gap-3 px-4">
                <span className="flex flex-row mx-auto text-lg font-bold text-center w-fit">{dateComparison}</span>

                <div
                    className={`${dateStatus === 'PREV' ? 'grid' : 'hidden'} w-full grid-cols-1 flex-col gap-3 tablet:grid-cols-2 tablet:gap-x-20`}
                >
                    {/* 수술전 */}

                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.explainedPreOp}
                        isRender={existFields.explainedPreOp}
                        value={values.explainedPreOp}
                        remark={values.explainedPreOp_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.onsPreOp2hr}
                        isRender={existFields.onsPreOp2hr}
                        value={values.onsPreOp2hr}
                        remark={values.onsPreOp2hr_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.onsPostBowelPrep}
                        isRender={existFields.onsPostBowelPrep}
                        value={values.onsPostBowelPrep}
                        remark={values.onsPostBowelPrep_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.dvtPrevention}
                        isRender={existFields.dvtPrevention}
                        value={values.dvtPrevention}
                        remark={values.dvtPrevention_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.antibioticPreIncision}
                        isRender={existFields.antibioticPreIncision}
                        value={values.antibioticPreIncision}
                        remark={values.antibioticPreIncision_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.painMedPreOp}
                        isRender={existFields.painMedPreOp}
                        value={values.painMedPreOp}
                        remark={values.painMedPreOp_remarks}
                    />
                </div>

                <div
                    className={`${dateStatus === 'TODAY' ? 'grid' : 'hidden'} w-full grid-cols-1 gap-3 tablet:grid-cols-2 tablet:gap-x-20`}
                >
                    {/* 수술당일 */}
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.maintainTemp}
                        isRender={existFields.maintainTemp}
                        value={values.maintainTemp}
                        remark={values.maintainTemp_remarks}
                    />
                    <YesOrNoViewButton
                        label={`
                                수술 중 수액 ${fluidRestriction ? `${fluidRestriction.toFixed(2)}` : `${(fluidRestrictionData ?? 0).toFixed(2)}`} cc/kg/hr 으로 제한
                            `}
                        isRender={existFields.fluidRestriction}
                        value={values.fluidRestriction}
                        remark={values.fluidRestriction_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.antiNausea}
                        isRender={existFields.antiNausea}
                        value={values.antiNausea}
                        remark={values.antiNausea_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.painControl}
                        isRender={existFields.painControl}
                        value={values.painControl}
                        remark={values.painControl_remarks}
                    />
                </div>

                <div
                    className={`${dateStatus === 'POST' ? 'grid' : 'hidden'} w-full grid-cols-1 flex-col gap-3 tablet:grid-cols-2 tablet:gap-x-20`}
                >
                    {/* 수술후 */}
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.giStimulant}
                        isRender={existFields.giStimulant}
                        value={values.giStimulant}
                        remark={values.giStimulant_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.gumChewing}
                        isRender={existFields.gumChewing}
                        value={values.gumChewing}
                        remark={values.gumChewing_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.antiNauseaPostOp}
                        isRender={existFields.antiNauseaPostOp}
                        value={values.antiNauseaPostOp}
                        remark={values.antiNauseaPostOp_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.ivFluidRestrictionPostOp}
                        isRender={existFields.ivFluidRestrictionPostOp}
                        value={values.ivFluidRestrictionPostOp}
                        remark={values.ivFluidRestrictionPostOp_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.nonOpioidPainControl}
                        isRender={existFields.nonOpioidPainControl}
                        value={values.nonOpioidPainControl}
                        remark={values.nonOpioidPainControl_remarks}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.jpDrainRemoval}
                        isRender={existFields.jpDrainRemoval}
                        value={values.jpDrainRemoval}
                        remark={values.jpDrainRemoval_remarks}
                        etcComponent={
                            <span
                                className={`${values.jpDrainRemoval === 'YES' ? 'flex' : 'hidden'} flex-row items-center gap-2 text-sm text-gray-700`}
                            >
                                <span className="text-red-500">*</span>
                                <CalendarIcon className="w-4 h-4 text-blue-500" />
                                제거한날: {jpDrainRemovalDate}
                            </span>
                        }
                    />

                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.catheterRemoval}
                        isRender={existFields.catheterRemoval}
                        value={values.catheterRemoval}
                        remark={values.catheterRemoval_remarks}
                        etcComponent={
                            <>
                                <span
                                    className={`${values.catheterRemoval === 'YES' ? 'flex' : 'hidden'} flex-row items-center gap-2 text-sm text-gray-700`}
                                >
                                    <span className="text-red-500">*</span>
                                    <CalendarIcon className="w-4 h-4 text-blue-500" />
                                    제거한날: {catheterRemovalDate}
                                </span>
                                <div
                                    className={`${values.catheterRemoval === 'YES' ? 'flex' : 'hidden'} flex flex-row items-center gap-1`}
                                >
                                    <span className="text-red-500">*</span>
                                    <YesOrNoViewButton
                                        isDivided={false}
                                        label="Foley cath 재삽입 여부"
                                        value={values.catheterReInsertion}
                                    />
                                </div>
                            </>
                        }
                    />

                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.ivLineRemoval}
                        isRender={existFields.ivLineRemoval}
                        value={values.ivLineRemoval}
                        remark={values.ivLineRemoval_remarks}
                        etcComponent={
                            <span
                                className={`${values.ivLineRemoval === 'YES' ? 'flex' : 'hidden'} flex-row items-center gap-2 text-sm text-gray-700`}
                            >
                                <span className="text-red-500">*</span>
                                <CalendarIcon className="w-4 h-4 text-blue-500" />
                                제거한날: {ivLineRemovalDate}
                            </span>
                        }
                    />
                    {/* ------Day 운동  ------ */}
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.postExercise}
                        value={values.postExercise}
                        remark={values.postExercise_remarks}
                        isRender={existFields.podExercise && isPostOp}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.podOneExercise}
                        value={values.podOneExercise}
                        remark={values.podOneExercise_remarks}
                        isRender={existFields.podExercise && isPod1}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.podTwoExercise}
                        value={values.podTwoExercise}
                        remark={values.podTwoExercise_remarks}
                        isRender={existFields.podExercise && isPod2}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.podThreeExercise}
                        value={values.podThreeExercise}
                        remark={values.podThreeExercise_remarks}
                        isRender={existFields.podExercise && isPod3}
                    />
                    {/* ------Day 식사 ------ */}
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.postMeal}
                        value={values.postMeal}
                        remark={values.postMeal_remarks}
                        isRender={existFields.podMeal && isPostOp}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.podOneMeal}
                        value={values.podOneMeal}
                        remark={values.podOneMeal_remarks}
                        isRender={existFields.podMeal && isPod1}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.podTwoMeal}
                        value={values.podTwoMeal}
                        remark={values.podTwoMeal_remarks}
                        isRender={existFields.podMeal && isPod2}
                    />

                    {/* ------Day 통증 ------ */}
                    <MultiViewInput
                        label={CHECKLIST_ITEMS_NAME.postPain}
                        isRender={existFields.podPain && isPostOp}
                        values={[
                            { value: values.postPain?.day, label: 'Day' },
                            { value: values.postPain?.evening, label: 'Evening' },
                            { value: values.postPain?.night, label: 'Night' },
                        ]}
                    />
                    <MultiViewInput
                        label={CHECKLIST_ITEMS_NAME.podOnePain}
                        isRender={existFields.podPain && isPod1}
                        values={[
                            { value: values.podOnePain?.day, label: 'Day' },
                            { value: values.podOnePain?.evening, label: 'Evening' },
                            { value: values.podOnePain?.night, label: 'Night' },
                        ]}
                    />
                    <MultiViewInput
                        label={CHECKLIST_ITEMS_NAME.podTwoPain}
                        isRender={existFields.podPain && isPod2}
                        values={[
                            { value: values.podTwoPain?.day, label: 'Day' },
                            { value: values.podTwoPain?.evening, label: 'Evening' },
                            { value: values.podTwoPain?.night, label: 'Night' },
                        ]}
                    />
                    <MultiViewInput
                        label={CHECKLIST_ITEMS_NAME.podThreePain}
                        isRender={existFields.podPain && isPod3}
                        values={[
                            { value: values.podThreePain?.day, label: 'Day' },
                            { value: values.podThreePain?.evening, label: 'Evening' },
                            { value: values.podThreePain?.night, label: 'Night' },
                        ]}
                    />
                </div>
                {Boolean(onSubmit) && <FixedSubmitButton onClick={onSubmit} label="제출하기" />}
            </div>
        </>
    );
}

export default ConfirmComplianceForm;
