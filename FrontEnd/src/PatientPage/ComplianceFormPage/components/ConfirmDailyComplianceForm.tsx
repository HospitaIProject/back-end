import { useSearchParams } from 'react-router-dom';
import { CheckListSetupType, CheckListsDailyItemType, DailyCheckListFormType } from '../../../models/CheckListsType';
import YesOrNoViewButton from '../../../components/common/form/viewInput/YesOrNoViewButton';
import { CHECKLIST_ITEMS_NAME } from '../../../utils/mappingNames';
import MultiViewInput from '../../../components/common/form/viewInput/MultiViewInput';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';

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
            <div className="flex flex-col w-full h-full gap-3 px-4">
                <span className="flex flex-row mx-auto text-lg font-bold text-center w-fit">{`D+${diffDay}`}</span>
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

export default ConfirmDailyComplianceForm;
