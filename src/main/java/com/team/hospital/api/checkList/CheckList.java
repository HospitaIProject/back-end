package com.team.hospital.api.checkList;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.dto.WriteCheckList;
import com.team.hospital.api.checkList.enumType.*;
import com.team.hospital.api.checkListItem.CheckListItem;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CheckList extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "check_list_id")
    private Long id;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "explain_before_operation")),
            @AttributeOverride(name = "remarks", column = @Column(name = "explain_before_operation_remarks"))
    })
    private CheckListDetail_1 explainBeforeOperation;  // ERAS 수술 전 설명

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "taking_ons_before_operation_two_hours")),
            @AttributeOverride(name = "remarks", column = @Column(name = "taking_ons_before_operation_two_hours_remarks"))
    })
    private CheckListDetail_1 takingONSBeforeOperationTwo_Hours;  // 수술 2시간 전 ONS 복용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "taking_after_bowel_preparation")),
            @AttributeOverride(name = "remarks", column = @Column(name = "taking_after_bowel_preparation_remarks"))
    })
    private CheckListDetail_1 takingAfterBowelPreparation;  // Bowel Preparation 후 경장영양액 복용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "prevention_dvt")),
            @AttributeOverride(name = "remarks", column = @Column(name = "prevention_dvt_remarks"))
    })
    private CheckListDetail_1 preventionDVT;  // DVT 예방

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "taking_laxatives")),
            @AttributeOverride(name = "remarks", column = @Column(name = "taking_laxatives_remarks"))
    })
    private CheckListDetail_1 takingLaxatives;  // Laxatives 복용

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "chewing_gum")),
            @AttributeOverride(name = "remarks", column = @Column(name = "chewing_gum_remarks"))
    })
    private CheckListDetail_1 chewingGum;  // 껌

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "day_of_remove_jp_drain_delay")),
            @AttributeOverride(name = "remarks", column = @Column(name = "day_of_remove_jp_drain_delay_remarks"))
    })
    private CheckListDetail_2 dayOfRemoveJP_Drain;  // JP drain 제거일

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "reason_by_remove_jp_drain_delay")),
            @AttributeOverride(name = "remarks", column = @Column(name = "reason_by_remove_jp_drain_delay_remarks"))
    })
    private CheckListDetail_1 reasonByRemoveJP_DrainDelay;  // JP drain 제거 지연 이유

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "day_of_remove_urinary_catheter")),
            @AttributeOverride(name = "remarks", column = @Column(name = "day_of_remove_urinary_catheter_remarks"))
    })
    private CheckListDetail_1 dayOfRemoveUrinary_Catheter;  // Urinary catheter 제거일

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "reason_by_remove_urinary_catheter_delay")),
            @AttributeOverride(name = "remarks", column = @Column(name = "reason_by_remove_urinary_catheter_delay_remarks"))
    })
    private CheckListDetail_1 reasonByRemoveUrinary_CatheterDelay;  // Urinary catheter 제거 지연 이유

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "after_operation_limit_iv_fluid")),
            @AttributeOverride(name = "remarks", column = @Column(name = "after_operation_limit_iv_fluid_remarks"))
    })
    private CheckListDetail_1 afterOperationLimitIV_Fluid;  // 수술 후 IV fluid 제한

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "day_of_remove_iv_fluid")),
            @AttributeOverride(name = "remarks", column = @Column(name = "day_of_remove_iv_fluid_remarks"))
    })
    private CheckListDetail_1 dayOfRemoveIV_Fluid;  // IV fluid 제거일

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "reason_by_remove_iv_fluid_delay")),
            @AttributeOverride(name = "remarks", column = @Column(name = "reason_by_remove_iv_fluid_delay_remarks"))
    })
    private CheckListDetail_1 reasonByRemoveIV_FluidDelay;  // IV fluid 제거 지연 이유

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_nausea_vomiting")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_nausea_vomiting_remarks"))
    })
    private CheckListDetail_1 post_Nausea_Vomiting;  // Post OP Nausea & Vomiting prophylaxis

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_op_day_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_op_day_exercise_remarks"))
    })
    private CheckListDetail_1 postOpDayExercise;  // Post OP day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_1_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_1_exercise_remarks"))
    })
    private CheckListDetail_1 pod_1Exercise;  // POD#1 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_2_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_2_exercise_remarks"))
    })
    private CheckListDetail_1 pod_2Exercise;  // POD#2 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_3_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_3_exercise_remarks"))
    })
    private CheckListDetail_1 pod_3Exercise;  // POD#3 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_op_day_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_op_day_meal_remarks"))
    })
    private CheckListDetail_1 postOpDayMeal;  // Post OP day 식사

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_1_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_1_meal_remarks"))
    })
    private CheckListDetail_1 pod_1Meal;  // POD#1 식사

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_2_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_2_meal_remarks"))
    })
    private CheckListDetail_1 pod_2Meal;  // POD#2 식사

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "before_operation_medicine")),
            @AttributeOverride(name = "remarks", column = @Column(name = "before_operation_medicine_remarks"))
    })
    private CheckListDetail_1 beforeOperationMedicine;  // 수술 전 통증 조절약

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "silt_itm")),
            @AttributeOverride(name = "remarks", column = @Column(name = "silt_itm_remarks"))
    })
    private CheckListDetail_5 silt_Itm;  // 수술 중 SILT or ITM

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_op_effective_pain_control")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_op_effective_pain_control_remarks"))
    })
    private CheckListDetail_1 postOpEffectivePainControl;  // Post op Effective Pain Control

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_1_pain_score")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_1_pain_score_remarks"))
    })
    private CheckListDetail_3 pod_1PainScore;  // POD#1 pain score

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_2_pain_score")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_2_pain_score_remarks"))
    })
    private CheckListDetail_3 pod_2PainScore;  // POD#2 pain score

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_3_pain_score")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_3_pain_score_remarks"))
    })
    private CheckListDetail_3 pod_3PainScore;  // POD#3 pain score

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "before_sixty_minute")),
            @AttributeOverride(name = "remarks", column = @Column(name = "before_sixty_minute_remarks"))
    })
    private CheckListDetail_1 beforeSixtyMinute;  // 피부 절개 60분 전 예방적 항생제 투여

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "maintain_temperature")),
            @AttributeOverride(name = "remarks", column = @Column(name = "maintain_temperature_remarks"))
    })
    private CheckListDetail_1 maintainTemperature;  // 수술 중 환자 체온 유지

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "volume_of_intraoperative_infusion")),
            @AttributeOverride(name = "remarks", column = @Column(name = "volume_of_intraoperative_infusion_remarks"))
    })
    private CheckListDetail_1 volumeOfIntraoperativeInfusion;  // Volume of intraoperative infusion(ml)

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "blood_loss")),
            @AttributeOverride(name = "remarks", column = @Column(name = "blood_loss_remarks"))
    })
    @Column(name = "blood_loss")
    private CheckListDetail_4 bloodLoss;  // Blood loss(cc)

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "urine_output")),
            @AttributeOverride(name = "remarks", column = @Column(name = "urine_output_remarks"))
    })
    @Column(name = "urine_output")
    private CheckListDetail_4 urineOutput;  // Urine output(cc)

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "operation_time")),
            @AttributeOverride(name = "remarks", column = @Column(name = "operation_time_remarks"))
    })
    @Column(name = "operation_time")
    private CheckListDetail_4 operationTime;  // Operation time (min)

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "is_post_nausea_vomiting")),
            @AttributeOverride(name = "remarks", column = @Column(name = "is_post_nausea_vomiting_remarks"))
    })
    private CheckListDetail_1 isPost_Nausea_Vomiting;  // Pot OP Nausea & Vomiting prophylaxis 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "locate")),
            @AttributeOverride(name = "remarks", column = @Column(name = "locate_remarks"))
    })
    private CheckListDetail_5 locate;  // 입원 병동


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_list_item_id")
    private CheckListItem checkListItem;

    public static CheckList toEntity(WriteCheckList write, CheckListItem checkListItem) {
        return CheckList.builder()
                .explainBeforeOperation(CheckListDetail_1.buildComplianceDetail(write.getExplainBeforeOperation(), write.getExplainBeforeOperation_remark()))
                .takingONSBeforeOperationTwo_Hours(CheckListDetail_1.buildComplianceDetail(write.getTakingONSBeforeOperationTwo_Hours(), write.getTakingONSBeforeOperationTwo_Hours_remark()))
                .takingAfterBowelPreparation(CheckListDetail_1.buildComplianceDetail(write.getTakingAfterBowelPreparation(), write.getTakingAfterBowelPreparation_remark()))
                .preventionDVT(CheckListDetail_1.buildComplianceDetail(write.getPreventionDVT(), write.getPreventionDVT_remark()))
                .takingLaxatives(CheckListDetail_1.buildComplianceDetail(write.getTakingLaxatives(), write.getTakingLaxatives_remark()))
                .chewingGum(CheckListDetail_1.buildComplianceDetail(write.getChewingGum(), write.getChewingGum_remark()))
                .dayOfRemoveJP_Drain(CheckListDetail_2.buildComplianceDetail(write.getDayOfRemoveJP_Drain(), write.getDayOfRemoveJP_Drain_remark()))
                .reasonByRemoveJP_DrainDelay(CheckListDetail_1.buildComplianceDetail(write.getReasonByRemoveJP_DrainDelay(), write.getReasonByRemoveJP_DrainDelay_remark()))
                .dayOfRemoveUrinary_Catheter(CheckListDetail_1.buildComplianceDetail(write.getDayOfRemoveUrinary_Catheter(), write.getDayOfRemoveUrinary_Catheter_remark()))
                .reasonByRemoveUrinary_CatheterDelay(CheckListDetail_1.buildComplianceDetail(write.getReasonByRemoveUrinary_CatheterDelay(), write.getReasonByRemoveUrinary_CatheterDelay_remark()))
                .afterOperationLimitIV_Fluid(CheckListDetail_1.buildComplianceDetail(write.getAfterOperationLimitIV_Fluid(), write.getAfterOperationLimitIV_Fluid_remark()))
                .dayOfRemoveIV_Fluid(CheckListDetail_1.buildComplianceDetail(write.getDayOfRemoveIV_Fluid(), write.getDayOfRemoveIV_Fluid_remark()))
                .reasonByRemoveIV_FluidDelay(CheckListDetail_1.buildComplianceDetail(write.getReasonByRemoveIV_FluidDelay(), write.getReasonByRemoveIV_FluidDelay_remark()))
                .post_Nausea_Vomiting(CheckListDetail_1.buildComplianceDetail(write.getPost_Nausea_Vomiting(), write.getPost_Nausea_Vomiting_remark()))
                .postOpDayExercise(CheckListDetail_1.buildComplianceDetail(write.getPostOpDayExercise(), write.getPostOpDayExercise_remark()))
                .pod_1Exercise(CheckListDetail_1.buildComplianceDetail(write.getPod_1Exercise(), write.getPod_1Exercise_remark()))
                .pod_2Exercise(CheckListDetail_1.buildComplianceDetail(write.getPod_2Exercise(), write.getPod_2Exercise_remark()))
                .pod_3Exercise(CheckListDetail_1.buildComplianceDetail(write.getPod_3Exercise(), write.getPod_3Exercise_remark()))
                .postOpDayMeal(CheckListDetail_1.buildComplianceDetail(write.getPostOpDayMeal(), write.getPostOpDayMeal_remark()))
                .pod_1Meal(CheckListDetail_1.buildComplianceDetail(write.getPod_1Meal(), write.getPod_1Meal_remark()))
                .pod_2Meal(CheckListDetail_1.buildComplianceDetail(write.getPod_2Meal(), write.getPod_2Meal_remark()))
                .beforeOperationMedicine(CheckListDetail_1.buildComplianceDetail(write.getBeforeOperationMedicine(), write.getBeforeOperationMedicine_remark()))
                .silt_Itm(CheckListDetail_5.buildComplianceDetail(write.getSilt_Itm(), write.getSilt_Itm_remark()))
                .postOpEffectivePainControl(CheckListDetail_1.buildComplianceDetail(write.getPostOpEffectivePainControl(), write.getPostOpEffectivePainControl_remark()))
                .pod_1PainScore(CheckListDetail_3.buildComplianceDetail(write.getPod_1PainScore(), write.getPod_1PainScore_remark()))
                .pod_2PainScore(CheckListDetail_3.buildComplianceDetail(write.getPod_2PainScore(), write.getPod_2PainScore_remark()))
                .pod_3PainScore(CheckListDetail_3.buildComplianceDetail(write.getPod_3PainScore(), write.getPod_3PainScore_remark()))
                .beforeSixtyMinute(CheckListDetail_1.buildComplianceDetail(write.getBeforeSixtyMinute(), write.getBeforeSixtyMinute_remark()))
                .maintainTemperature(CheckListDetail_1.buildComplianceDetail(write.getMaintainTemperature(), write.getMaintainTemperature_remark()))
                .volumeOfIntraoperativeInfusion(CheckListDetail_1.buildComplianceDetail(write.getVolumeOfIntraoperativeInfusion(), write.getVolumeOfIntraoperativeInfusion_remark()))
                .bloodLoss(CheckListDetail_4.buildComplianceDetail(write.getBloodLoss(), write.getBloodLoss_remark()))
                .urineOutput(CheckListDetail_4.buildComplianceDetail(write.getUrineOutput(), write.getUrineOutput_remark()))
                .operationTime(CheckListDetail_4.buildComplianceDetail(write.getOperationTime(), write.getOperationTime_remark()))
                .isPost_Nausea_Vomiting(CheckListDetail_1.buildComplianceDetail(write.getIsPost_Nausea_Vomiting_2(), write.getIsPost_Nausea_Vomiting_remark_2()))
                .locate(CheckListDetail_5.buildComplianceDetail(write.getLocate(), write.getLocate_remark()))
                .checkListItem(checkListItem)
                .build();
    }

    public void updateCheckList(WriteCheckList write) {
        explainBeforeOperation.update(write.getExplainBeforeOperation(), write.getExplainBeforeOperation_remark());
        takingONSBeforeOperationTwo_Hours.update(write.getTakingONSBeforeOperationTwo_Hours(), write.getTakingONSBeforeOperationTwo_Hours_remark());
        takingONSBeforeOperationTwo_Hours.update(write.getTakingAfterBowelPreparation(), write.getTakingAfterBowelPreparation_remark());
        preventionDVT.update(write.getPreventionDVT(), write.getPreventionDVT_remark());
        takingLaxatives.update(write.getTakingLaxatives(), write.getTakingLaxatives_remark());
        chewingGum.update(write.getChewingGum(), write.getChewingGum_remark());
        dayOfRemoveJP_Drain.update(write.getDayOfRemoveJP_Drain(), write.getDayOfRemoveJP_Drain_remark());
        reasonByRemoveJP_DrainDelay.update(write.getReasonByRemoveJP_DrainDelay(), write.getReasonByRemoveJP_DrainDelay_remark());
        dayOfRemoveUrinary_Catheter.update(write.getDayOfRemoveUrinary_Catheter(), write.getDayOfRemoveUrinary_Catheter_remark());
        reasonByRemoveUrinary_CatheterDelay.update(write.getReasonByRemoveUrinary_CatheterDelay(), write.getReasonByRemoveUrinary_CatheterDelay_remark());
        afterOperationLimitIV_Fluid.update(write.getAfterOperationLimitIV_Fluid(), write.getAfterOperationLimitIV_Fluid_remark());
        dayOfRemoveIV_Fluid.update(write.getDayOfRemoveIV_Fluid(), write.getDayOfRemoveIV_Fluid_remark());
        reasonByRemoveIV_FluidDelay.update(write.getReasonByRemoveIV_FluidDelay(), write.getReasonByRemoveIV_FluidDelay_remark());
        post_Nausea_Vomiting.update(write.getPost_Nausea_Vomiting(), write.getPost_Nausea_Vomiting_remark());
        postOpDayExercise.update(write.getPostOpDayExercise(), write.getPostOpDayExercise_remark());
        pod_1Exercise.update(write.getPod_1Exercise(), write.getPod_1Exercise_remark());
        pod_2Exercise.update(write.getPod_2Exercise(), write.getPod_2Exercise_remark());
        pod_3Exercise.update(write.getPod_3Exercise(), write.getPod_3Exercise_remark());
        postOpDayMeal.update(write.getPostOpDayMeal(), write.getPostOpDayMeal_remark());
        pod_1Meal.update(write.getPod_1Meal(), write.getPod_1Meal_remark());
        pod_2Meal.update(write.getPod_2Meal(), write.getPod_2Meal_remark());
        beforeOperationMedicine.update(write.getBeforeOperationMedicine(), write.getBeforeOperationMedicine_remark());
        silt_Itm.update(write.getSilt_Itm(), write.getSilt_Itm_remark());
        postOpEffectivePainControl.update(write.getPostOpEffectivePainControl(), write.getPostOpEffectivePainControl_remark());
        pod_1PainScore.update(write.getPod_1PainScore(), write.getPod_1PainScore_remark());
        pod_2PainScore.update(write.getPod_2PainScore(), write.getPod_2PainScore_remark());
        pod_3PainScore.update(write.getPod_3PainScore(), write.getPod_3PainScore_remark());
        beforeSixtyMinute.update(write.getBeforeSixtyMinute(), write.getBeforeSixtyMinute_remark());
        maintainTemperature.update(write.getMaintainTemperature(), write.getMaintainTemperature_remark());
        volumeOfIntraoperativeInfusion.update(write.getVolumeOfIntraoperativeInfusion(), write.getVolumeOfIntraoperativeInfusion_remark());
        bloodLoss.update(write.getBloodLoss(), write.getBloodLoss_remark());
        urineOutput.update(write.getUrineOutput(), write.getUrineOutput_remark());
        operationTime.update(write.getOperationTime(), write.getOperationTime_remark());
        isPost_Nausea_Vomiting.update(write.getIsPost_Nausea_Vomiting_2(), write.getIsPost_Nausea_Vomiting_remark_2());
        locate.update(write.getLocate(), write.getLocate_remark());
    }
}
