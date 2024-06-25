package com.team.hospital.check;

import com.team.hospital.check.dto.WriteCompliance;
import com.team.hospital.check.enumType.*;
import com.team.hospital.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Compliance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "compliance_id")
    private Long id;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "explain_before_operation")),
            @AttributeOverride(name = "remarks", column = @Column(name = "explain_before_operation_remarks"))
    })
    private ComplianceDetail_1 explainBeforeOperation;  // ERAS 수술 전 설명

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "taking_ons_before_operation_two_hours")),
            @AttributeOverride(name = "remarks", column = @Column(name = "taking_ons_before_operation_two_hours_remarks"))
    })
    private ComplianceDetail_1 takingONSBeforeOperationTwo_Hours;  // 수술 2시간 전 ONS 복용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "taking_after_bowel_preparation")),
            @AttributeOverride(name = "remarks", column = @Column(name = "taking_after_bowel_preparation_remarks"))
    })
    private ComplianceDetail_1 takingAfterBowelPreparation;  // Bowel Preparation 후 경장영양액 복용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "prevention_dvt")),
            @AttributeOverride(name = "remarks", column = @Column(name = "prevention_dvt_remarks"))
    })
    private ComplianceDetail_1 preventionDVT;  // DVT 예방

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "taking_laxatives")),
            @AttributeOverride(name = "remarks", column = @Column(name = "taking_laxatives_remarks"))
    })
    private ComplianceDetail_1 takingLaxatives;  // Laxatives 복용

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "chewing_gum")),
            @AttributeOverride(name = "remarks", column = @Column(name = "chewing_gum_remarks"))
    })
    private ComplianceDetail_1 chewingGum;  // 껌

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "day_of_remove_jp_drain_delay")),
            @AttributeOverride(name = "remarks", column = @Column(name = "day_of_remove_jp_drain_delay_remarks"))
    })
    private ComplianceDetail_2 dayOfRemoveJP_Drain;  // JP drain 제거일

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "reason_by_remove_jp_drain_delay")),
            @AttributeOverride(name = "remarks", column = @Column(name = "reason_by_remove_jp_drain_delay_remarks"))
    })
    private ComplianceDetail_1 reasonByRemoveJP_DrainDelay;  // JP drain 제거 지연 이유

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "day_of_remove_urinary_catheter")),
            @AttributeOverride(name = "remarks", column = @Column(name = "day_of_remove_urinary_catheter_remarks"))
    })
    private ComplianceDetail_1 dayOfRemoveUrinary_Catheter;  // Urinary catheter 제거일

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "reason_by_remove_urinary_catheter_delay")),
            @AttributeOverride(name = "remarks", column = @Column(name = "reason_by_remove_urinary_catheter_delay_remarks"))
    })
    private ComplianceDetail_1 reasonByRemoveUrinary_CatheterDelay;  // Urinary catheter 제거 지연 이유

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "after_operation_limit_iv_fluid")),
            @AttributeOverride(name = "remarks", column = @Column(name = "after_operation_limit_iv_fluid_remarks"))
    })
    private ComplianceDetail_1 afterOperationLimitIV_Fluid;  // 수술 후 IV fluid 제한

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "day_of_remove_iv_fluid")),
            @AttributeOverride(name = "remarks", column = @Column(name = "day_of_remove_iv_fluid_remarks"))
    })
    private ComplianceDetail_1 dayOfRemoveIV_Fluid;  // IV fluid 제거일

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "reason_by_remove_iv_fluid_delay")),
            @AttributeOverride(name = "remarks", column = @Column(name = "reason_by_remove_iv_fluid_delay_remarks"))
    })
    private ComplianceDetail_1 reasonByRemoveIV_FluidDelay;  // IV fluid 제거 지연 이유

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_nausea_vomiting")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_nausea_vomiting_remarks"))
    })
    private ComplianceDetail_1 post_Nausea_Vomiting;  // Post OP Nausea & Vomiting prophylaxis

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_op_day_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_op_day_exercise_remarks"))
    })
    private ComplianceDetail_1 postOpDayExercise;  // Post OP day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_1_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_1_exercise_remarks"))
    })
    private ComplianceDetail_1 pod_1Exercise;  // POD#1 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_2_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_2_exercise_remarks"))
    })
    private ComplianceDetail_1 pod_2Exercise;  // POD#2 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_3_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_3_exercise_remarks"))
    })
    private ComplianceDetail_1 pod_3Exercise;  // POD#3 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_op_day_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_op_day_meal_remarks"))
    })
    private ComplianceDetail_1 postOpDayMeal;  // Post OP day 식사

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_1_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_1_meal_remarks"))
    })
    private ComplianceDetail_1 pod_1Meal;  // POD#1 식사

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_2_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_2_meal_remarks"))
    })
    private ComplianceDetail_1 pod_2Meal;  // POD#2 식사

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "before_operation_medicine")),
            @AttributeOverride(name = "remarks", column = @Column(name = "before_operation_medicine_remarks"))
    })
    private ComplianceDetail_1 beforeOperationMedicine;  // 수술 전 통증 조절약

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "silt_itm")),
            @AttributeOverride(name = "remarks", column = @Column(name = "silt_itm_remarks"))
    })
    private ComplianceDetail_5 silt_Itm;  // 수술 중 SILT or ITM

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_op_effective_pain_control")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_op_effective_pain_control_remarks"))
    })
    private ComplianceDetail_1 postOpEffectivePainControl;  // Post op Effective Pain Control

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_1_pain_score")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_1_pain_score_remarks"))
    })
    private ComplianceDetail_3 pod_1PainScore;  // POD#1 pain score

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_2_pain_score")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_2_pain_score_remarks"))
    })
    private ComplianceDetail_3 pod_2PainScore;  // POD#2 pain score

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_3_pain_score")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_3_pain_score_remarks"))
    })
    private ComplianceDetail_3 pod_3PainScore;  // POD#3 pain score

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "before_sixty_minute")),
            @AttributeOverride(name = "remarks", column = @Column(name = "before_sixty_minute_remarks"))
    })
    private ComplianceDetail_1 beforeSixtyMinute;  // 피부 절개 60분 전 예방적 항생제 투여

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "maintain_temperature")),
            @AttributeOverride(name = "remarks", column = @Column(name = "maintain_temperature_remarks"))
    })
    private ComplianceDetail_1 maintainTemperature;  // 수술 중 환자 체온 유지

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "volume_of_intraoperative_infusion")),
            @AttributeOverride(name = "remarks", column = @Column(name = "volume_of_intraoperative_infusion_remarks"))
    })
    private ComplianceDetail_1 volumeOfIntraoperativeInfusion;  // Volume of intraoperative infusion(ml)

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "blood_loss")),
            @AttributeOverride(name = "remarks", column = @Column(name = "blood_loss_remarks"))
    })
    @Column(name = "blood_loss")
    private ComplianceDetail_4 bloodLoss;  // Blood loss(cc)

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "urine_output")),
            @AttributeOverride(name = "remarks", column = @Column(name = "urine_output_remarks"))
    })
    @Column(name = "urine_output")
    private ComplianceDetail_4 urineOutput;  // Urine output(cc)

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "operation_time")),
            @AttributeOverride(name = "remarks", column = @Column(name = "operation_time_remarks"))
    })
    @Column(name = "operation_time")
    private ComplianceDetail_4 operationTime;  // Operation time (min)

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "is_post_nausea_vomiting")),
            @AttributeOverride(name = "remarks", column = @Column(name = "is_post_nausea_vomiting_remarks"))
    })
    private ComplianceDetail_1 isPost_Nausea_Vomiting;  // Pot OP Nausea & Vomiting prophylaxis 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "locate")),
            @AttributeOverride(name = "remarks", column = @Column(name = "locate_remarks"))
    })
    private ComplianceDetail_5 locate;  // 입원 병동

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
