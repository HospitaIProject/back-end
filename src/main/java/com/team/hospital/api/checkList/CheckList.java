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

    // 수술 전
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "explained_pre_op")),
            @AttributeOverride(name = "remarks", column = @Column(name = "explained_pre_op_remarks"))
    })
    private CheckListDetail_1 explainedPreOp; // EAS 수술전 설명

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "ons_pre_op_2hr")),
            @AttributeOverride(name = "remarks", column = @Column(name = "ons_pre_op_2hr_remarks"))
    })
    private CheckListDetail_1 onsPreOp2hr; // 수술 2시간 전 ONS 복용여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "ons_post_bowel_prep")),
            @AttributeOverride(name = "remarks", column = @Column(name = "ons_post_bowel_prep_remarks"))
    })
    private CheckListDetail_1 onsPostBowelPrep; // Bowel preparation 후 ONS 경장영양액 복용여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "dvt_prevention")),
            @AttributeOverride(name = "remarks", column = @Column(name = "dvt_prevention_remarks"))
    })
    private CheckListDetail_1 dvtPrevention; // DVT 예방

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "antibiotic_pre_incision")),
            @AttributeOverride(name = "remarks", column = @Column(name = "antibiotic_pre_incision_remarks"))
    })
    private CheckListDetail_1 antibioticPreIncision; // 피부 절개 60분전 예방적 항생제 투여

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pain_med_pre_op")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pain_med_pre_op_remarks"))
    })
    private CheckListDetail_1 painMedPreOp; // 수술전 통증 조절약 복용 여부

    // 수술 중
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "maintain_temp")),
            @AttributeOverride(name = "remarks", column = @Column(name = "maintain_temp_remarks"))
    })
    private CheckListDetail_1 maintainTemp; // 수술 중 환자 체온 유지 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "fluid_restriction")),
            @AttributeOverride(name = "remarks", column = @Column(name = "fluid_restriction_remarks"))
    })
    private CheckListDetail_1 fluidRestriction; // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "anti_nausea")),
            @AttributeOverride(name = "remarks", column = @Column(name = "anti_nausea_remarks"))
    })
    private CheckListDetail_1 antiNausea; // 수술 중 구역구토 방지제 사용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pain_control")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pain_control_remarks"))
    })
    private CheckListDetail_1 painControl; // 수술 중 통증 조절을 위한 처치 여부

    // 수술 후
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "gi_stimulant")),
            @AttributeOverride(name = "remarks", column = @Column(name = "gi_stimulant_remarks"))
    })
    private CheckListDetail_1 giStimulant; // 위장관 촉진 약 복용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "gum_chewing")),
            @AttributeOverride(name = "remarks", column = @Column(name = "gum_chewing_remarks"))
    })
    private CheckListDetail_1 gumChewing; // 하루 3번 15분동안 껌씹기 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "anti_nausea_post_op")),
            @AttributeOverride(name = "remarks", column = @Column(name = "anti_nausea_post_op_remarks"))
    })
    private CheckListDetail_1 antiNauseaPostOp; // 수술 후 구역구토방지제 사용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "iv_fluid_restriction_post_op")),
            @AttributeOverride(name = "remarks", column = @Column(name = "iv_fluid_restriction_post_op_remarks"))
    })
    private CheckListDetail_1 ivFluidRestrictionPostOp; // 수술 후 IV fluid 제한 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "non_opioid_pain_control")),
            @AttributeOverride(name = "remarks", column = @Column(name = "non_opioid_pain_control_remarks"))
    })
    private CheckListDetail_1 nonOpioidPainControl; // 수술 후 non-opioid pain control 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "jp_drain_removal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "jp_drain_removal_remarks"))
    })
    private CheckListDetail_1 jpDrainRemoval; // 수술 후 3일이내 JP drain 제거 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "catheter_removal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "catheter_removal_remarks"))
    })
    private CheckListDetail_1 catheterRemoval; // 수술 후 수술장에서 소변줄 제거 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "iv_line_removal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "iv_line_removal_remarks"))
    })
    private CheckListDetail_1 ivLineRemoval; // 수술 후 3일이내 IV line 제거 여부

    // POD Exercise
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_exercise_remarks"))
    })
    private CheckListDetail_1 postExercise; // Post OP day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_one_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_one_exercise_remarks"))
    })
    private CheckListDetail_1 podOneExercise; // POD 1day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_two_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_exercise_remarks"))
    })
    private CheckListDetail_1 podTwoExercise; // POD 2day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_three_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_three_exercise_remarks"))
    })
    private CheckListDetail_1 podThreeExercise; // POD 3day 운동

    // POD Meal
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_meal_remarks"))
    })
    private CheckListDetail_1 postMeal; // Post OP day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_one_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_one_meal_remarks"))
    })
    private CheckListDetail_1 podOneMeal; // POD 1day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_two_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_meal_remarks"))
    })
    private CheckListDetail_1 podTwoMeal; // POD 2day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_three_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_three_meal_remarks"))
    })
    private CheckListDetail_1 podThreeMeal; // POD 3day 운동

    // POD Pain
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_pain")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_pain_remarks"))
    })
    private CheckListDetail_1 postPain; // Post OP day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_one_pain")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_one_pain_remarks"))
    })
    private CheckListDetail_1 podOnePain; // POD 1day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_two_pain")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_pain_remarks"))
    })
    private CheckListDetail_1 podTwoPain; // POD 2day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_three_pain")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_three_pain_remarks"))
    })
    private CheckListDetail_1 podThreePain; // POD 3day 운동

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_list_item_id")
    private CheckListItem checkListItem;

    public static CheckList toEntity(WriteCheckList write, CheckListItem checkListItem) {
        return CheckList.builder()
                // 수술 전
                .explainedPreOp(CheckListDetail_1.buildComplianceDetail(write.getExplainedPreOp(), write.getExplainedPreOp_remarks()))
                .onsPreOp2hr(CheckListDetail_1.buildComplianceDetail(write.getOnsPreOp2hr(), write.getOnsPreOp2hr_remarks()))
                .onsPostBowelPrep(CheckListDetail_1.buildComplianceDetail(write.getOnsPostBowelPrep(), write.getOnsPostBowelPrep_remarks()))
                .dvtPrevention(CheckListDetail_1.buildComplianceDetail(write.getDvtPrevention(), write.getDvtPrevention_remarks()))
                .antibioticPreIncision(CheckListDetail_1.buildComplianceDetail(write.getAntibioticPreIncision(), write.getAntibioticPreIncision_remarks()))
                .painMedPreOp(CheckListDetail_1.buildComplianceDetail(write.getPainMedPreOp(), write.getPainMedPreOp_remarks()))

                // 수술 중
                .maintainTemp(CheckListDetail_1.buildComplianceDetail(write.getMaintainTemp(), write.getMaintainTemp_remarks()))
                .fluidRestriction(CheckListDetail_1.buildComplianceDetail(write.getFluidRestriction(), write.getFluidRestriction_remarks()))
                .antiNausea(CheckListDetail_1.buildComplianceDetail(write.getAntiNausea(), write.getAntiNausea_remarks()))
                .painControl(CheckListDetail_1.buildComplianceDetail(write.getPainControl(), write.getPainControl_remarks()))

                // 수술 후
                .giStimulant(CheckListDetail_1.buildComplianceDetail(write.getGiStimulant(), write.getGiStimulant_remarks()))
                .gumChewing(CheckListDetail_1.buildComplianceDetail(write.getGumChewing(), write.getGumChewing_remarks()))
                .antiNauseaPostOp(CheckListDetail_1.buildComplianceDetail(write.getAntiNauseaPostOp(), write.getAntiNauseaPostOp_remarks()))
                .ivFluidRestrictionPostOp(CheckListDetail_1.buildComplianceDetail(write.getIvFluidRestrictionPostOp(), write.getIvFluidRestrictionPostOp_remarks()))
                .nonOpioidPainControl(CheckListDetail_1.buildComplianceDetail(write.getNonOpioidPainControl(), write.getNonOpioidPainControl_remarks()))
                .jpDrainRemoval(CheckListDetail_1.buildComplianceDetail(write.getJpDrainRemoval(), write.getJpDrainRemoval_remarks()))
                .catheterRemoval(CheckListDetail_1.buildComplianceDetail(write.getCatheterRemoval(), write.getCatheterRemoval_remarks()))
                .ivLineRemoval(CheckListDetail_1.buildComplianceDetail(write.getIvLineRemoval(), write.getIvLineRemoval_remarks()))

                // POD Exercise
                .postExercise(CheckListDetail_1.buildComplianceDetail(write.getPostExercise(), write.getPostExercise_remarks()))
                .podOneExercise(CheckListDetail_1.buildComplianceDetail(write.getPodOneExercise(), write.getPodOneExercise_remarks()))
                .podTwoExercise(CheckListDetail_1.buildComplianceDetail(write.getPodTwoExercise(), write.getPodTwoExercise_remarks()))
                .podThreeExercise(CheckListDetail_1.buildComplianceDetail(write.getPodThreeExercise(), write.getPodThreeExercise_remarks()))

                // POD Meal
                .postMeal(CheckListDetail_1.buildComplianceDetail(write.getPostMeal(), write.getPostMeal_remarks()))
                .podOneMeal(CheckListDetail_1.buildComplianceDetail(write.getPodOneMeal(), write.getPodOneMeal_remarks()))
                .podTwoMeal(CheckListDetail_1.buildComplianceDetail(write.getPodTwoMeal(), write.getPodTwoMeal_remarks()))
                .podThreeMeal(CheckListDetail_1.buildComplianceDetail(write.getPodThreeMeal(), write.getPodThreeMeal_remarks()))

                // POD Pain
                .postPain(CheckListDetail_1.buildComplianceDetail(write.getPostPain(), write.getPostPain_remarks()))
                .podOnePain(CheckListDetail_1.buildComplianceDetail(write.getPodOnePain(), write.getPodOnePain_remarks()))
                .podTwoPain(CheckListDetail_1.buildComplianceDetail(write.getPodTwoPain(), write.getPodTwoPain_remarks()))
                .podThreePain(CheckListDetail_1.buildComplianceDetail(write.getPodThreePain(), write.getPodThreePain_remarks()))

                // CheckListItem
                .checkListItem(checkListItem)
                .build();
    }

    public void updateCheckList(WriteCheckList write) {
        explainedPreOp.update(write.getExplainedPreOp(), write.getExplainedPreOp_remarks());
        onsPreOp2hr.update(write.getOnsPreOp2hr(), write.getOnsPreOp2hr_remarks());
        onsPostBowelPrep.update(write.getOnsPostBowelPrep(), write.getOnsPostBowelPrep_remarks());
        dvtPrevention.update(write.getDvtPrevention(), write.getDvtPrevention_remarks());
        antibioticPreIncision.update(write.getAntibioticPreIncision(), write.getAntibioticPreIncision_remarks());
        painMedPreOp.update(write.getPainMedPreOp(), write.getPainMedPreOp_remarks());

        maintainTemp.update(write.getMaintainTemp(), write.getMaintainTemp_remarks());
        fluidRestriction.update(write.getFluidRestriction(), write.getFluidRestriction_remarks());
        antiNausea.update(write.getAntiNausea(), write.getAntiNausea_remarks());
        painControl.update(write.getPainControl(), write.getPainControl_remarks());

        giStimulant.update(write.getGiStimulant(), write.getGiStimulant_remarks());
        gumChewing.update(write.getGumChewing(), write.getGumChewing_remarks());
        antiNauseaPostOp.update(write.getAntiNauseaPostOp(), write.getAntiNauseaPostOp_remarks());
        ivFluidRestrictionPostOp.update(write.getIvFluidRestrictionPostOp(), write.getIvFluidRestrictionPostOp_remarks());
        nonOpioidPainControl.update(write.getNonOpioidPainControl(), write.getNonOpioidPainControl_remarks());
        jpDrainRemoval.update(write.getJpDrainRemoval(), write.getJpDrainRemoval_remarks());
        catheterRemoval.update(write.getCatheterRemoval(), write.getCatheterRemoval_remarks());
        ivLineRemoval.update(write.getIvLineRemoval(), write.getIvLineRemoval_remarks());

        postExercise.update(write.getPostExercise(), write.getPostExercise_remarks());
        podOneExercise.update(write.getPodOneExercise(), write.getPodOneExercise_remarks());
        podTwoExercise.update(write.getPodTwoExercise(), write.getPodTwoExercise_remarks());
        podThreeExercise.update(write.getPodThreeExercise(), write.getPodThreeExercise_remarks());

        postMeal.update(write.getPostMeal(), write.getPostMeal_remarks());
        podOneMeal.update(write.getPodOneMeal(), write.getPodOneMeal_remarks());
        podTwoMeal.update(write.getPodTwoMeal(), write.getPodTwoMeal_remarks());
        podThreeMeal.update(write.getPodThreeMeal(), write.getPodThreeMeal_remarks());

        postPain.update(write.getPostPain(), write.getPostPain_remarks());
        podOnePain.update(write.getPodOnePain(), write.getPodOnePain_remarks());
        podTwoPain.update(write.getPodTwoPain(), write.getPodTwoPain_remarks());
        podThreePain.update(write.getPodThreePain(), write.getPodThreePain_remarks());
    }
}
