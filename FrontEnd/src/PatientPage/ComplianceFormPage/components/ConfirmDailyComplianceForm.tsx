import { useSearchParams } from 'react-router-dom';
import { CheckListSetupType, CheckListsDailyItemType, DailyCheckListFormType } from '../../../models/CheckListsType';
import YesOrNoViewButton from '../../../components/common/form/viewInput/YesOrNoViewButton';
import { CHECKLIST_ITEMS_NAME } from '../../../utils/mappingNames';
import MultiViewInput from '../../../components/common/form/viewInput/MultiViewInput';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';

const podLabel = ({ isPod1, isPod2, isPod3 }: { isPod1?: boolean; isPod2?: boolean; isPod3?: boolean }) => {
    let podLabel = '';
    if (isPod1) {
        podLabel = ' (POD#1)';
    } else if (isPod2) {
        podLabel = ' (POD#2) ';
    } else if (isPod3) {
        podLabel = ' (POD#3) ';
    }
    return podLabel;
};

function ConfirmDailyComplianceForm({
    values,
    onSubmit,
    existFields,
}: {
    values: DailyCheckListFormType | CheckListsDailyItemType;
    onSubmit?: () => void;
    existFields: CheckListSetupType;
}) {
    const [searchParams] = useSearchParams();
    const diffDay = Math.abs(Number(searchParams.get('diffDay')));
    const isPod1 = diffDay === 1;
    const isPod2 = diffDay === 2;
    const isPod3 = diffDay === 3;

    return (
        <>
            {' '}
            {/* ------Day 운동  ------ */}
            <div className="flex h-full w-full flex-col gap-3 px-4">
                <span className="mx-auto flex w-fit flex-row text-center text-lg font-bold">{`D+${diffDay}`}</span>
                <div className={`grid w-full grid-cols-1 flex-col gap-3 tablet:grid-cols-2 tablet:gap-x-20`}>
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
                        label={isPod1 ? CHECKLIST_ITEMS_NAME.podOneMeal : CHECKLIST_ITEMS_NAME.podTwoMeal}
                        value={isPod1 ? values.podOneMeal : values.podTwoMeal}
                        remark={isPod1 ? values.podOneMeal_remarks : values.podTwoMeal_remarks}
                        isRender={existFields.podMeal && (isPod1 || isPod2)}
                    />
                    {/* <YesOrNoViewButton
                        label={CHECKLIST_ITEMS_NAME.podTwoMeal}
                        value={values.podTwoMeal}
                        remark={values.podTwoMeal_remarks}
                        isRender={existFields.podMeal && isPod2}
                    /> */}

                    {/* ------Day 통증 ------ */}

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

                    {/* ------Day 껌씹기 ------ */}
                    <YesOrNoViewButton
                        label={
                            CHECKLIST_ITEMS_NAME.gumChewing +
                            podLabel({
                                isPod1,
                                isPod2,
                                isPod3,
                            })
                        }
                        value={
                            isPod1
                                ? values.podOneGumChewing
                                : isPod2
                                  ? values.podTwoGumChewing
                                  : values.podThreeGumChewing
                        }
                        remark={
                            isPod1
                                ? values.podOneGumChewing_remarks
                                : isPod2
                                  ? values.podTwoGumChewing_remarks
                                  : values.podThreeGumChewing_remarks
                        }
                        isRender={existFields.gumChewing && (isPod1 || isPod2 || isPod3)}
                    />
                    <YesOrNoViewButton
                        label={
                            CHECKLIST_ITEMS_NAME.ivFluidRestrictionPostOp +
                            podLabel({
                                isPod1,
                                isPod2,
                                isPod3,
                            })
                        }
                        value={
                            isPod1
                                ? values.podOneIvFluidRestriction
                                : isPod2
                                  ? values.podTwoIvFluidRestriction
                                  : values.podThreeIvFluidRestriction
                        }
                        remark={
                            isPod1
                                ? values.podOneIvFluidRestriction_remarks
                                : isPod2
                                  ? values.podTwoIvFluidRestriction_remarks
                                  : values.podThreeIvFluidRestriction_remarks
                        }
                        isRender={existFields.ivFluidRestrictionPostOp && (isPod1 || isPod2 || isPod3)}
                    />
                    <YesOrNoViewButton
                        label={
                            CHECKLIST_ITEMS_NAME.nonOpioidPainControl +
                            podLabel({
                                isPod1,
                                isPod2,
                                isPod3,
                            })
                        }
                        value={
                            isPod1
                                ? values.podOneNonOpioidPainControl
                                : isPod2
                                  ? values.podTwoNonOpioidPainControl
                                  : values.podThreeNonOpioidPainControl
                        }
                        remark={
                            isPod1
                                ? values.podOneNonOpioidPainControl_remarks
                                : isPod2
                                  ? values.podTwoNonOpioidPainControl_remarks
                                  : values.podThreeNonOpioidPainControl_remarks
                        }
                        isRender={existFields.nonOpioidPainControl && (isPod1 || isPod2 || isPod3)}
                    />
                    <YesOrNoViewButton
                        label={
                            CHECKLIST_ITEMS_NAME.jpDrainRemoval +
                            podLabel({
                                isPod1,
                                isPod2,
                                isPod3,
                            })
                        }
                        value={
                            isPod1
                                ? values.podOneJpDrainRemoval
                                : isPod2
                                  ? values.podTwoJpDrainRemoval
                                  : values.podThreeJpDrainRemoval
                        }
                        remark={
                            isPod1
                                ? values.podOneJpDrainRemoval_remarks
                                : isPod2
                                  ? values.podTwoJpDrainRemoval_remarks
                                  : values.podThreeJpDrainRemoval_remarks
                        }
                        isRender={existFields.jpDrainRemoval && (isPod1 || isPod2 || isPod3)}
                    />
                    <YesOrNoViewButton
                        label={
                            CHECKLIST_ITEMS_NAME.ivLineRemoval +
                            podLabel({
                                isPod1,
                                isPod2,
                                isPod3,
                            })
                        }
                        value={
                            isPod1
                                ? values.podOneIvLineRemoval
                                : isPod2
                                  ? values.podTwoIvLineRemoval
                                  : values.podThreeIvLineRemoval
                        }
                        remark={
                            isPod1
                                ? values.podOneIvLineRemoval_remarks
                                : isPod2
                                  ? values.podTwoIvLineRemoval_remarks
                                  : values.podThreeIvLineRemoval_remarks
                        }
                        isRender={existFields.ivLineRemoval && (isPod1 || isPod2 || isPod3)}
                    />
                </div>
            </div>
            {Boolean(onSubmit) && <FixedSubmitButton className="p-3" onClick={onSubmit} label="확인" />}
        </>
    );
}

export default ConfirmDailyComplianceForm;
