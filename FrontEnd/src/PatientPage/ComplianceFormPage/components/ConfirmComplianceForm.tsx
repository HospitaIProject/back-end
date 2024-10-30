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
import { useFluidRestrictionQuery } from '../../_lib/checkListsService';
import Loading from '../../../components/common/Loading';
import MultiViewInput from '../../../components/common/form/viewInput/MultiViewInput';

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

    // const statusTitle = dateStatus === 'PREV' ? '수술 전' : dateStatus === 'POST' ? '수술 후' : '수술 당일';
    const dateComparison = dateStatus === 'PREV' ? '수술전' : dateStatus === 'TODAY' ? '수술중' : `수술후`;

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
            <div className="flex h-full w-full flex-col gap-3 px-4">
                <span className="mx-auto flex w-fit flex-row text-center text-lg font-bold">{dateComparison}</span>

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
                                <CalendarIcon className="h-4 w-4 text-blue-500" />
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
                                    <CalendarIcon className="h-4 w-4 text-blue-500" />
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
                                <CalendarIcon className="h-4 w-4 text-blue-500" />
                                제거한날: {ivLineRemovalDate}
                            </span>
                        }
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.postExercise}
                        value={values.postExercise}
                        remark={values.postExercise_remarks}
                        isRender={existFields.podExercise}
                    />
                    <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.postMeal}
                        value={values.postMeal}
                        remark={values.postMeal_remarks}
                        isRender={existFields.podMeal}
                    />
                    <MultiViewInput
                        label={CHECKLIST_ITEMS_NAME.postPain}
                        isRender={existFields.podPain}
                        values={[
                            { value: values.postPain?.day, label: 'Day' },
                            { value: values.postPain?.evening, label: 'Evening' },
                            { value: values.postPain?.night, label: 'Night' },
                        ]}
                    />
                </div>
            </div>
            {Boolean(onSubmit) && <FixedSubmitButton className="p-3" onClick={onSubmit} label="확인" />}
        </>
    );
}

export default ConfirmComplianceForm;
