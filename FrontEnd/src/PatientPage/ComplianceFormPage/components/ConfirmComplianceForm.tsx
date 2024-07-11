import { checkListFormType } from '../../../models/FormType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import NumberViewInput from '../../../components/common/form/viewInput/NumberViewInput';
import ViewInput from '../../../components/common/form/viewInput/ViewInput';
import YesOrNoViewButton from '../../../components/common/form/viewInput/YesOrNoViewButton';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';

const MATCH_ITEMS = {
    DAY: 'Day',
    EVENING: 'Evening',
    NIGHT: 'Night',
    POD_1: 'POD#1',
    POD_2: 'POD#2',
    POD_3: 'POD#3',
    POD_4: 'POD#4',
    AFTER_POD_5: 'POD#5 이후',
};

type Props = {
    values: checkListFormType;
    onSubmit?: () => void;
    existFields: CheckListSetupType;
};

function getNameByValue(value: string | undefined) {
    const item = MATCH_ITEMS[value as keyof typeof MATCH_ITEMS];
    return item;
}

function ConfirmComplianceForm({ values, onSubmit, existFields }: Props) {
    return (
        <div className="grid flex-col w-full grid-cols-1 gap-3 px-4 pt-4 tablet:grid-cols-2 tablet:gap-x-20">
            <YesOrNoViewButton
                value={values.explainBeforeOperation}
                label="EAS 수술전 설명"
                remark={values.explainBeforeOperation_remark}
                isRender={existFields.explainBeforeOperation}
            />
            <YesOrNoViewButton
                value={values.takingONSBeforeOperationTwo_Hours}
                label="수술 2시간 전 ONS 복용여부"
                remark={values.takingONSBeforeOperationTwo_Hours_remark}
                isRender={existFields.takingONSBeforeOperationTwo_Hours}
            />
            <YesOrNoViewButton
                value={values.takingAfterBowelPreparation}
                label="Bowel preparation 후 ONS 경장영양액 복용여부"
                remark={values.takingAfterBowelPreparation_remark}
                isRender={existFields.takingAfterBowelPreparation}
            />
            <YesOrNoViewButton
                value={values.preventionDVT}
                label="DVT 예방"
                remark={values.preventionDVT_remark}
                isRender={existFields.preventionDVT}
            />
            <YesOrNoViewButton
                value={values.takingLaxatives}
                label="Laxatives 복용"
                remark={values.takingLaxatives_remark}
                isRender={existFields.takingLaxatives}
            />
            <YesOrNoViewButton
                value={values.chewingGum}
                label="Chewing gum"
                isRender={existFields.chewingGum}
                remark={values.chewingGum_remark}
            />
            <ViewInput
                label="JP Drain 제거일"
                value={getNameByValue(values.dayOfRemoveJP_Drain)}
                remark={values.dayOfRemoveJP_Drain_remark}
                isRender={existFields.dayOfRemoveJP_Drain}
            />
            <YesOrNoViewButton
                value={values.reasonByRemoveJP_DrainDelay}
                label="JP Drain 제거 지연 사유"
                remark={values.reasonByRemoveJP_DrainDelay_remark}
                isRender={existFields.reasonByRemoveJP_DrainDelay}
            />
            <YesOrNoViewButton
                value={values.dayOfRemoveUrinary_Catheter}
                label="Urinary catheter 제거일"
                remark={values.dayOfRemoveUrinary_Catheter_remark}
                isRender={existFields.dayOfRemoveUrinary_Catheter}
            />
            <YesOrNoViewButton
                value={values.reasonByRemoveUrinary_CatheterDelay}
                label="Urinary catheter 제거 지연 사유"
                remark={values.reasonByRemoveUrinary_CatheterDelay_remark}
                isRender={existFields.reasonByRemoveUrinary_CatheterDelay}
            />
            <YesOrNoViewButton
                value={values.afterOperationLimitIV_Fluid}
                label="수술 후 IV fluid 제한"
                remark={values.afterOperationLimitIV_Fluid_remark}
                isRender={existFields.afterOperationLimitIV_Fluid}
            />
            <YesOrNoViewButton
                value={values.dayOfRemoveIV_Fluid}
                label="IV fluid 제거일"
                remark={values.dayOfRemoveIV_Fluid_remark}
                isRender={existFields.dayOfRemoveIV_Fluid}
            />
            <YesOrNoViewButton
                value={values.reasonByRemoveIV_FluidDelay}
                label="IV fluid 제거 지연 이유"
                remark={values.reasonByRemoveIV_FluidDelay_remark}
                isRender={existFields.reasonByRemoveIV_FluidDelay}
            />
            <YesOrNoViewButton
                value={values.post_Nausea_Vomiting}
                label="Post OP Nausea & Vomiting prophylaxis"
                remark={values.post_Nausea_Vomiting_remark}
                isRender={existFields.post_Nausea_Vomiting}
            />
            <YesOrNoViewButton
                value={values.postOpDayExercise}
                label="Post OP day 운동"
                remark={values.postOpDayExercise_remark}
                isRender={existFields.postOpDayExercise}
            />
            <YesOrNoViewButton
                value={values.pod_Exercise}
                label="POD#1 운동"
                remark={values.pod_Exercise_remark}
                isRender={existFields.pod_Exercise}
            />

            <YesOrNoViewButton
                value={values.postOpDayMeal}
                label="Post OP day 식사"
                remark={values.postOpDayMeal_remark}
                isRender={existFields.postOpDayMeal}
            />
            <YesOrNoViewButton
                value={values.pod_Meal}
                label="POD#1 식사"
                remark={values.pod_Meal_remark}
                isRender={existFields.pod_Meal}
            />

            <YesOrNoViewButton
                value={values.beforeOperationMedicine}
                label="수술 전 통증 조절약"
                remark={values.beforeOperationMedicine_remark}
                isRender={existFields.beforeOperationMedicine}
            />
            <ViewInput
                label="수술중 SILT or ITM"
                value={values.silt_Itm}
                remark={values.silt_Itm_remark}
                isRender={existFields.silt_Itm}
            />
            <YesOrNoViewButton
                value={values.postOpEffectivePainControl}
                label="Post op Effective pain control"
                remark={values.postOpEffectivePainControl_remark}
                isRender={existFields.postOpEffectivePainControl}
            />
            <ViewInput
                label="POD#1 pain score"
                value={getNameByValue(values.pod_PainScore)}
                remark={values.pod_PainScore_remark}
                isRender={existFields.pod_PainScore}
            />

            <YesOrNoViewButton
                value={values.beforeSixtyMinute}
                label="피부 절개 60분 전 예방적 항생제 투여"
                remark={values.beforeSixtyMinute_remark}
                isRender={existFields.beforeSixtyMinute}
            />
            <YesOrNoViewButton
                value={values.maintainTemperature}
                label="수술 중 환자 체온 유지"
                remark={values.maintainTemperature_remark}
                isRender={existFields.maintainTemperature}
            />
            <YesOrNoViewButton
                value={values.volumeOfIntraoperativeInfusion}
                label="Volume of intraoperative infusion (ml)"
                remark={values.volumeOfIntraoperativeInfusion_remark}
                isRender={existFields.volumeOfIntraoperativeInfusion}
            />
            <NumberViewInput
                label="Blood loss (cc)"
                value={values.bloodLoss}
                remark={values.bloodLoss_remark}
                unit="cc"
                isRender={existFields.bloodLoss}
            />
            <NumberViewInput
                label="Urine output (cc)"
                value={values.urineOutput}
                remark={values.urineOutput_remark}
                unit="cc"
                isRender={existFields.urineOutput}
            />
            <NumberViewInput
                label="Operation time (min)"
                value={values.operationTime}
                remark={values.operationTime_remark}
                unit="min"
                isRender={existFields.operationTime}
            />
            <YesOrNoViewButton
                value={values.hasPost_Nausea_Vomiting}
                label="Post OP Nausea & Vomiting prophylaxis 여부"
                remark={values.hasPost_Nausea_Vomiting_remark}
                isRender={existFields.hasPost_Nausea_Vomiting}
            />
            <ViewInput
                label="입원병동"
                value={values.locate}
                remark={values.locate_remark}
                isRender={existFields.locate}
            />
            {Boolean(onSubmit) && <FixedSubmitButton onClick={onSubmit} label="제출하기" />}
        </div>
    );
}

export default ConfirmComplianceForm;
