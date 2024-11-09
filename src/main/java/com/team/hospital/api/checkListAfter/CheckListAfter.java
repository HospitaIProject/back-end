package com.team.hospital.api.checkListAfter;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.converter.DailyPainScoreConverter;
import com.team.hospital.api.checkList.enumType.CheckListFirst;
import com.team.hospital.api.checkList.enumType.CheckListSecond;
import com.team.hospital.api.checkList.enumType.DailyPainScore;
import com.team.hospital.api.checkListAfter.dto.UpdateDateCheckListAfter;
import com.team.hospital.api.checkListAfter.dto.WriteCheckListAfter;
import com.team.hospital.api.checkListItem.CheckListItem;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CheckListAfter extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "check_list_after_id")
    private Long id;

    // 수술 후
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

    ///
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "jp_drain_removal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "jp_drain_removal_remarks")),
            @AttributeOverride(name = "removedDate", column = @Column(name = "jp_drain_removal_removedDate"))
    })
    private CheckListSecond jpDrainRemoval; // 수술 후 1일이내 JP drain 제거 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "catheter_removal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "catheter_removal_remarks")),
            @AttributeOverride(name = "removedDate", column = @Column(name = "catheter_removal_removedDate"))
    })
    private CheckListSecond catheterRemoval; // 수술 후 수술장에서 소변줄 제거 여부

//    @Embedded
//    @AttributeOverrides({
//            @AttributeOverride(name = "option", column = @Column(name = "iv_line_removal")),
//            @AttributeOverride(name = "remarks", column = @Column(name = "iv_line_removal_remarks")),
//            @AttributeOverride(name = "removedDate", column = @Column(name = "iv_line_removal_removedDate"))
//    })
//    private CheckListSecond ivLineRemoval; // 수술 후 3일이내 IV line 제거 여부

    ///
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_exercise")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_exercise_remarks"))
    })
    private CheckListFirst postExercise; // Post OP day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "post_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "post_meal_remarks"))
    })
    private CheckListFirst postMeal; // Post OP day 운동

    @Convert(converter = DailyPainScoreConverter.class)
    private DailyPainScore postPain; // Post OP day pain score

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_list_item_id", nullable = false)
    private CheckListItem checkListItem;

    public static CheckListAfter toEntity(WriteCheckListAfter write, CheckListItem checkListItem) {
        return CheckListAfter.builder()

                // 수술 후
                .antiNauseaPostOp(CheckListFirst.of(write.getAntiNauseaPostOp(), write.getAntiNauseaPostOp_remarks()))
                .ivFluidRestrictionPostOp(CheckListFirst.of(write.getIvFluidRestrictionPostOp(), write.getIvFluidRestrictionPostOp_remarks()))
                .nonOpioidPainControl(CheckListFirst.of(write.getNonOpioidPainControl(), write.getNonOpioidPainControl_remarks()))
                .jpDrainRemoval(CheckListSecond.of(write.getJpDrainRemoval(), write.getJpDrainRemoval_remarks()))
                .catheterRemoval(CheckListSecond.of(write.getCatheterRemoval(), write.getCatheterRemoval_remarks()))
//                .jpDrainRemoval(CheckListSecond.of(write.getJpDrainRemoval(), write.getJpDrainRemoval_remarks(), write.getJpDrainRemovalDate()))
//                .catheterRemoval(CheckListThird.of(write.getCatheterRemoval(), write.getCatheterRemoval_remarks(), write.getCatheterRemovalDate(), write.getCatheterReInsertion()))
//                .ivLineRemoval(CheckListSecond.of(write.getIvLineRemoval(), write.getIvLineRemoval_remarks(), write.getIvLineRemovalDate()))

                .postExercise(CheckListFirst.of(write.getPostExercise(), write.getPostExercise_remarks()))
                .postMeal(CheckListFirst.of(write.getPostMeal(), write.getPostMeal_remarks()))
                .postPain(write.getPostPain())

                .checkListItem(checkListItem)
                .build();
    }

    public void updateCheckListAfter(WriteCheckListAfter write) {
        this.antiNauseaPostOp.update(write.getAntiNauseaPostOp(), write.getAntiNauseaPostOp_remarks());
        this.ivFluidRestrictionPostOp.update(write.getIvFluidRestrictionPostOp(), write.getIvFluidRestrictionPostOp_remarks());
        this.nonOpioidPainControl.update(write.getNonOpioidPainControl(), write.getNonOpioidPainControl_remarks());
        this.jpDrainRemoval.update(write.getJpDrainRemoval(), write.getJpDrainRemoval_remarks());
        this.catheterRemoval.update(write.getCatheterRemoval(), write.getCatheterRemoval_remarks());
//        this.ivLineRemoval.update(write.getIvLineRemoval(), write.getIvLineRemoval_remarks(), write.getIvLineRemovalDate());

        this.postExercise.update(write.getPostExercise(), write.getPostExercise_remarks());
        this.postMeal.update(write.getPostMeal(), write.getPostMeal_remarks());
        this.postPain = write.getPostPain();
    }

    public void updateRemovalDate(UpdateDateCheckListAfter update) {
        this.jpDrainRemoval.update(update.getJpDrainRemovalDate());
        this.catheterRemoval.update(update.getCatheterRemovalDate());
    }
}
