import { ComplianceValuesType } from '../../../models/FormType';
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
    values: ComplianceValuesType;
    onSubmit: () => void;
};

function getNameByValue(value: string) {
    const item = MATCH_ITEMS[value as keyof typeof MATCH_ITEMS];
    return item;
}

function ConfirmComplianceForm({ values, onSubmit }: Props) {
    return (
        <div className="flex w-full flex-col px-4 pt-4">
            <YesOrNoViewButton
                value={values.explainBeforeOperation}
                label="EAS 수술전 설명"
                remark={values.explainBeforeOperation_remark}
            />
            <YesOrNoViewButton
                value={values.takingONSBeforeOperationTwo_Hours}
                label="수술 2시간 전 ONS 복용여부"
                remark={values.takingONSBeforeOperationTwo_Hours_remark}
            />
            <YesOrNoViewButton
                value={values.takingAfterBowelPreparation}
                label="Bowel preparation 후 ONS 경장영양액 복용여부"
                remark={values.takingAfterBowelPreparation_remark}
            />
            <YesOrNoViewButton value={values.preventionDVT} label="DVT 예방" remark={values.preventionDVT_remark} />
            <YesOrNoViewButton
                value={values.takingLaxatives}
                label="Laxatives 복용"
                remark={values.takingLaxatives_remark}
            />
            <YesOrNoViewButton value={values.chewingGum} label="Chewing gum" remark={values.chewingGum_remark} />
            <ViewInput
                label="JP Drain 제거일"
                value={getNameByValue(values.dayOfRemoveJP_Drain)}
                remark={values.dayOfRemoveJP_Drain_remark}
            />
            <YesOrNoViewButton
                value={values.reasonByRemoveJP_DrainDelay}
                label="JP Drain 제거 지연 사유"
                remark={values.reasonByRemoveJP_DrainDelay_remark}
            />
            <YesOrNoViewButton
                value={values.dayOfRemoveUrinary_Catheter}
                label="Urinary catheter 제거일"
                remark={values.dayOfRemoveUrinary_Catheter_remark}
            />
            <YesOrNoViewButton
                value={values.reasonByRemoveUrinary_CatheterDelay}
                label="Urinary catheter 제거 지연 사유"
                remark={values.reasonByRemoveUrinary_CatheterDelay_remark}
            />
            <YesOrNoViewButton
                value={values.afterOperationLimitIV_Fluid}
                label="수술 후 IV fluid 제한"
                remark={values.afterOperationLimitIV_Fluid_remark}
            />
            <YesOrNoViewButton
                value={values.dayOfRemoveIV_Fluid}
                label="IV fluid 제거일"
                remark={values.dayOfRemoveIV_Fluid_remark}
            />
            <YesOrNoViewButton
                value={values.reasonByRemoveIV_FluidDelay}
                label="IV fluid 제거 지연 이유"
                remark={values.reasonByRemoveIV_FluidDelay_remark}
            />
            <YesOrNoViewButton
                value={values.post_Nausea_Vomiting}
                label="Post OP Nausea & Vomiting prophylaxis"
                remark={values.post_Nausea_Vomiting_remark}
            />
            <YesOrNoViewButton
                value={values.postOpDayExercise}
                label="Post OP day 운동"
                remark={values.postOpDayExercise_remark}
            />
            <YesOrNoViewButton value={values.pod_1Exercise} label="POD#1 운동" remark={values.pod_1Exercise_remark} />
            <YesOrNoViewButton value={values.pod_2Exercise} label="POD#2 운동" remark={values.pod_2Exercise_remark} />
            <YesOrNoViewButton value={values.pod_3Exercise} label="POD#3 운동" remark={values.pod_3Exercise_remark} />
            <YesOrNoViewButton
                value={values.postOpDayMeal}
                label="Post OP day 식사"
                remark={values.postOpDayMeal_remark}
            />
            <YesOrNoViewButton value={values.pod_1Meal} label="POD#1 식사" remark={values.pod_1Meal_remark} />
            <YesOrNoViewButton value={values.pod_2Meal} label="POD#2 식사" remark={values.pod_2Meal_remark} />
            <YesOrNoViewButton
                value={values.beforeOperationMedicine}
                label="수술 전 통증 조절약"
                remark={values.beforeOperationMedicine_remark}
            />
            <ViewInput label="수술중 SILT or ITM" value={values.silt_Itm} remark={values.silt_Itm_remark} />
            <YesOrNoViewButton
                value={values.postOpEffectivePainControl}
                label="Post op Effective pain control"
                remark={values.postOpEffectivePainControl_remark}
            />
            <ViewInput
                label="POD#1 pain score"
                value={getNameByValue(values.pod_1PainScore)}
                remark={values.pod_1PainScore_remark}
            />
            <ViewInput
                label="POD#2 pain score"
                value={getNameByValue(values.pod_2PainScore)}
                remark={values.pod_2PainScore_remark}
            />
            <ViewInput
                label="POD#3 pain score"
                value={getNameByValue(values.pod_3PainScore)}
                remark={values.pod_3PainScore_remark}
            />
            <YesOrNoViewButton
                value={values.beforeSixtyMinute}
                label="피부 절개 60분 전 예방적 항생제 투여"
                remark={values.beforeSixtyMinute_remark}
            />
            <YesOrNoViewButton
                value={values.maintainTemperature}
                label="수술 중 환자 체온 유지"
                remark={values.maintainTemperature_remark}
            />
            <YesOrNoViewButton
                value={values.volumeOfIntraoperativeInfusion}
                label="Volume of intraoperative infusion (ml)"
                remark={values.volumeOfIntraoperativeInfusion_remark}
            />
            <NumberViewInput
                label="Blood loss (cc)"
                value={values.bloodLoss}
                remark={values.bloodLoss_remark}
                unit="cc"
            />
            <NumberViewInput
                label="Urine output (cc)"
                value={values.urineOutput}
                remark={values.urineOutput_remark}
                unit="cc"
            />
            <NumberViewInput
                label="Operation time (min)"
                value={values.operationTime}
                remark={values.operationTime_remark}
                unit="min"
            />
            <YesOrNoViewButton
                value={values.isPost_Nausea_Vomiting}
                label="Post OP Nausea & Vomiting prophylaxis 여부"
                remark={values.isPost_Nausea_Vomiting_remark}
            />
            <ViewInput label="입원병동" value={values.locate} remark={values.locate_remark} />
            <FixedSubmitButton onClick={onSubmit} label="제출하기" />
        </div>
    );
}

export default ConfirmComplianceForm;
