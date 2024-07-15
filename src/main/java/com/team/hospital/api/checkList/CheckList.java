package com.team.hospital.api.checkList;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.converter.DailyPainScoreConverter;
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

    // 수술 중
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "maintain_temp")),
            @AttributeOverride(name = "remarks", column = @Column(name = "maintain_temp_remarks"))
    })
    private CheckListFirst maintainTemp; // 수술 중 환자 체온 유지 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "fluid_restriction")),
            @AttributeOverride(name = "remarks", column = @Column(name = "fluid_restriction_remarks"))
    })
    private CheckListFirst fluidRestriction; // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "anti_nausea")),
            @AttributeOverride(name = "remarks", column = @Column(name = "anti_nausea_remarks"))
    })
    private CheckListFirst antiNausea; // 수술 중 구역구토 방지제 사용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pain_control")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pain_control_remarks"))
    })
    private CheckListFirst painControl; // 수술 중 통증 조절을 위한 처치 여부

    // 수술 후
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "gi_stimulant")),
            @AttributeOverride(name = "remarks", column = @Column(name = "gi_stimulant_remarks"))
    })
    private CheckListFirst giStimulant; // 위장관 촉진 약 복용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "gum_chewing")),
            @AttributeOverride(name = "remarks", column = @Column(name = "gum_chewing_remarks"))
    })
    private CheckListFirst gumChewing; // 하루 3번 15분동안 껌씹기 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "anti_nausea_post_op")),
            @AttributeOverride(name = "remarks", column = @Column(name = "anti_nausea_post_op_remarks"))
    })
    private CheckListFirst antiNauseaPostOp; // 수술 후 구역구토방지제 사용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "iv_fluid_restriction_post_op")),
            @AttributeOverride(name = "remarks", column = @Column(name = "iv_fluid_restriction_post_op_remarks"))
    })
    private CheckListFirst ivFluidRestrictionPostOp; // 수술 후 IV fluid 제한 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "non_opioid_pain_control")),
            @AttributeOverride(name = "remarks", column = @Column(name = "non_opioid_pain_control_remarks"))
    })
    private CheckListFirst nonOpioidPainControl; // 수술 후 non-opioid pain control 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "jp_drain_removal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "jp_drain_removal_remarks")),
            @AttributeOverride(name = "removedDate", column = @Column(name = "jp_drain_removal_removedDate"))
    })
    private CheckListSecond jpDrainRemoval; // 수술 후 3일이내 JP drain 제거 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "catheter_removal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "catheter_removal_remarks")),
            @AttributeOverride(name = "removedDate", column = @Column(name = "catheter_removal_removedDate")),
            @AttributeOverride(name = "foleyCathReInsertion", column = @Column(name = "catheter_reInsertion"))
    })
    private CheckListThird catheterRemoval; // 수술 후 수술장에서 소변줄 제거 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "iv_line_removal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "iv_line_removal_remarks")),
            @AttributeOverride(name = "removedDate", column = @Column(name = "iv_line_removal_removedDate"))
    })
    private CheckListSecond ivLineRemoval; // 수술 후 3일이내 IV line 제거 여부

    // POD Exercise
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_exercise_remarks"))
    })
    private CheckListFirst postExercise; // Post OP day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_one_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_one_exercise_remarks"))
    })
    private CheckListFirst podOneExercise; // POD 1day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_two_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_exercise_remarks"))
    })
    private CheckListFirst podTwoExercise; // POD 2day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_three_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_three_exercise_remarks"))
    })
    private CheckListFirst podThreeExercise; // POD 3day 운동

    // POD Meal
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_meal_remarks"))
    })
    private CheckListFirst postMeal; // Post OP day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_one_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_one_meal_remarks"))
    })
    private CheckListFirst podOneMeal; // POD 1day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_two_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_meal_remarks"))
    })
    private CheckListFirst podTwoMeal; // POD 2day 운동

    // POD Pain
    @Convert(converter = DailyPainScoreConverter.class)
    private DailyPainScore postPain; // Post OP day 운동

    @Convert(converter = DailyPainScoreConverter.class)
    private DailyPainScore podOnePain; // POD 1day 운동

    @Convert(converter = DailyPainScoreConverter.class)
    private DailyPainScore podTwoPain; // POD 2day 운동

    @Convert(converter = DailyPainScoreConverter.class)
    private DailyPainScore podThreePain; // POD 3day 운동

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_list_item_id")
    private CheckListItem checkListItem;

    public static CheckList createCheckList(WriteCheckList write, CheckListItem checkListItem) {
        return CheckList.builder()
                // 수술 중
                .maintainTemp(CheckListFirst.buildComplianceDetail(write.getMaintainTemp(), write.getMaintainTemp_remarks()))
                .fluidRestriction(CheckListFirst.buildComplianceDetail(write.getFluidRestriction(), write.getFluidRestriction_remarks()))
                .antiNausea(CheckListFirst.buildComplianceDetail(write.getAntiNausea(), write.getAntiNausea_remarks()))
                .painControl(CheckListFirst.buildComplianceDetail(write.getPainControl(), write.getPainControl_remarks()))

                // 수술 후
                .giStimulant(CheckListFirst.buildComplianceDetail(write.getGiStimulant(), write.getGiStimulant_remarks()))
                .gumChewing(CheckListFirst.buildComplianceDetail(write.getGumChewing(), write.getGumChewing_remarks()))
                .antiNauseaPostOp(CheckListFirst.buildComplianceDetail(write.getAntiNauseaPostOp(), write.getAntiNauseaPostOp_remarks()))
                .ivFluidRestrictionPostOp(CheckListFirst.buildComplianceDetail(write.getIvFluidRestrictionPostOp(), write.getIvFluidRestrictionPostOp_remarks()))
                .nonOpioidPainControl(CheckListFirst.buildComplianceDetail(write.getNonOpioidPainControl(), write.getNonOpioidPainControl_remarks()))
                .jpDrainRemoval(CheckListSecond.buildComplianceDetail(write.getJpDrainRemoval(), write.getJpDrainRemoval_remarks(), write.getJpDrainRemovalDate()))
                .catheterRemoval(CheckListThird.buildComplianceDetail(write.getCatheterRemoval(), write.getCatheterRemoval_remarks(), write.getCatheterRemovalDate(), write.getCatheterReInsertion()))
                .ivLineRemoval(CheckListSecond.buildComplianceDetail(write.getIvLineRemoval(), write.getIvLineRemoval_remarks(), write.getIvLineRemovalDate()))

                // POD Exercise
                .postExercise(CheckListFirst.buildComplianceDetail(write.getPostExercise(), write.getPostExercise_remarks()))
                .podOneExercise(CheckListFirst.buildComplianceDetail(write.getPodOneExercise(), write.getPodOneExercise_remarks()))
                .podTwoExercise(CheckListFirst.buildComplianceDetail(write.getPodTwoExercise(), write.getPodTwoExercise_remarks()))
                .podThreeExercise(CheckListFirst.buildComplianceDetail(write.getPodThreeExercise(), write.getPodThreeExercise_remarks()))

                // POD Meal
                .postMeal(CheckListFirst.buildComplianceDetail(write.getPostMeal(), write.getPostMeal_remarks()))
                .podOneMeal(CheckListFirst.buildComplianceDetail(write.getPodOneMeal(), write.getPodOneMeal_remarks()))
                .podTwoMeal(CheckListFirst.buildComplianceDetail(write.getPodTwoMeal(), write.getPodTwoMeal_remarks()))

                // POD Pain
                .postPain(write.getPostPain())
                .podOnePain(write.getPodOnePain())
                .podTwoPain(write.getPodTwoPain())
                .podThreePain(write.getPodThreePain())

                // CheckListItem
                .checkListItem(checkListItem)
                .build();
    }

    public void updateCheckList(WriteCheckList write) {
        this.maintainTemp.update(write.getMaintainTemp(), write.getMaintainTemp_remarks());
        this.fluidRestriction.update(write.getFluidRestriction(), write.getFluidRestriction_remarks());
        this.antiNausea.update(write.getAntiNausea(), write.getAntiNausea_remarks());
        this.painControl.update(write.getPainControl(), write.getPainControl_remarks());

        this.giStimulant.update(write.getGiStimulant(), write.getGiStimulant_remarks());
        this.gumChewing.update(write.getGumChewing(), write.getGumChewing_remarks());
        this.antiNauseaPostOp.update(write.getAntiNauseaPostOp(), write.getAntiNauseaPostOp_remarks());
        this.ivFluidRestrictionPostOp.update(write.getIvFluidRestrictionPostOp(), write.getIvFluidRestrictionPostOp_remarks());
        this.nonOpioidPainControl.update(write.getNonOpioidPainControl(), write.getNonOpioidPainControl_remarks());
        this.jpDrainRemoval.update(write.getJpDrainRemoval(), write.getJpDrainRemoval_remarks(), write.getJpDrainRemovalDate());
        this.catheterRemoval.update(write.getCatheterRemoval(), write.getCatheterRemoval_remarks(), write.getCatheterRemovalDate(), write.getCatheterReInsertion());
        this.ivLineRemoval.update(write.getIvLineRemoval(), write.getIvLineRemoval_remarks(), write.getIvLineRemovalDate());

        this.postExercise.update(write.getPostExercise(), write.getPostExercise_remarks());
        this.podOneExercise.update(write.getPodOneExercise(), write.getPodOneExercise_remarks());
        this.podTwoExercise.update(write.getPodTwoExercise(), write.getPodTwoExercise_remarks());
        this.podThreeExercise.update(write.getPodThreeExercise(), write.getPodThreeExercise_remarks());

        this.postMeal.update(write.getPostMeal(), write.getPostMeal_remarks());
        this.podOneMeal.update(write.getPodOneMeal(), write.getPodOneMeal_remarks());
        this.podTwoMeal.update(write.getPodTwoMeal(), write.getPodTwoMeal_remarks());

        this.postPain = write.getPostPain();
        this.podOnePain = write.getPodOnePain();
        this.podTwoPain = write.getPodTwoPain();
        this.podThreePain = write.getPodThreePain();
    }
}
