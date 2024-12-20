package com.team.hospital.api.checkList;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.converter.DailyPainScoreConverter;
import com.team.hospital.api.checkList.dto.WriteCheckList;
import com.team.hospital.api.checkList.enumType.CheckListFirst;
import com.team.hospital.api.checkList.enumType.CheckListSecond;
import com.team.hospital.api.checkList.enumType.DailyPainScore;
import com.team.hospital.api.checkListItem.CheckListItem;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class CheckList extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "check_list_id")
    private Long id;

    // 하루 3번 15분동안 껌씹기 여부
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_one_giStimulant")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_one_giStimulant_remarks"))
    })
    private CheckListFirst podOneGiStimulant; // POD 1day 위장관 촉진약 복용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_two_giStimulant")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_giStimulant_remarks"))
    })
    private CheckListFirst podTwoGiStimulant; // POD 2day 위장관 촉진약 복용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_three_giStimulant")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_three_giStimulant_remarks"))
    })
    private CheckListFirst podThreeGiStimulant; // POD 3day 위장관 촉진약 복용 여부

    // 하루 3번 15분동안 껌씹기 여부
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_one_gumChewing")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_one_gumChewing_remarks"))
    })
    private CheckListFirst podOneGumChewing; // POD 1day 껌씹기 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_two_gumChewing")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_gumChewing_remarks"))
    })
    private CheckListFirst podTwoGumChewing; // POD 2day 껌씹기 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_three_gumChewing")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_three_gumChewing_remarks"))
    })
    private CheckListFirst podThreeGumChewing; // POD 3day 껌씹기 여부

    // 수술 후 IV fluid 제한 여부
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_one_iv_fluid_restriction")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_one_iv_fluid_restriction_remarks"))
    })
    private CheckListFirst podOneIvFluidRestriction; // POD 1day IV fluid 제한 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_two_iv_fluid_restriction")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_iv_fluid_restriction_remarks"))
    })
    private CheckListFirst podTwoIvFluidRestriction; // POD 2day IV fluid 제한 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_three_iv_fluid_restriction")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_three_iv_fluid_restriction_remarks"))
    })
    private CheckListFirst podThreeIvFluidRestriction; // POD 3day IV fluid 제한 여부

    // 수술 후 non-opioid pain control 여부
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_one_non_opioid_pain_control")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_one_non_opioid_pain_control_remarks"))
    })
    private CheckListFirst podOneNonOpioidPainControl; // POD 1day non-opioid pain control 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_two_non_opioid_pain_control")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_non_opioid_pain_control_remarks"))
    })
    private CheckListFirst podTwoNonOpioidPainControl; // POD 2day non-opioid pain control 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_three_non_opioid_pain_control")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_three_non_opioid_pain_control_remarks"))
    })
    private CheckListFirst podThreeNonOpioidPainControl; // POD 3day non-opioid pain control 여부

    // 수술 후 3일이내 JP drain 제거 여부
//    @Embedded
//    @AttributeOverrides({
//            @AttributeOverride(name = "option", column = @Column(name = "pod_one_jp_drain_removal")),
//            @AttributeOverride(name = "remarks", column = @Column(name = "pod_one_jp_drain_removal_remarks"))
//    })
//    private CheckListFirst podOneJpDrainRemoval; // POD 1day 3일이내 JP drain 제거 여부
//
//    @Embedded
//    @AttributeOverrides({
//            @AttributeOverride(name = "option", column = @Column(name = "pod_two_jp_drain_removal")),
//            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_jp_drain_removal_remarks"))
//    })
//    private CheckListFirst podTwoJpDrainRemoval; // POD 2day 3일이내 JP drain 제거 여부
//
//    @Embedded
//    @AttributeOverrides({
//            @AttributeOverride(name = "option", column = @Column(name = "pod_three_jp_drain_removal")),
//            @AttributeOverride(name = "remarks", column = @Column(name = "pod_three_jp_drain_removal_remarks"))
//    })
//    private CheckListFirst podThreeJpDrainRemoval; // POD 3day 3일이내 JP drain 제거 여부

    // 수술 후 3일이내 IV line 제거 여부
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_three_iv_line_removal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_three_iv_line_removal_remarks")),
            @AttributeOverride(name = "removedDate", column = @Column(name = "iv_line_removal_removedDate"))
    })
    private CheckListSecond podThreeIvLineRemoval; // POD 3day 3일이내 IV line 제거 여부

    // POD Exercise
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
            @AttributeOverride(name = "option", column = @Column(name = "pod_one_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_one_meal_remarks"))
    })
    private CheckListFirst podOneMeal; // POD 1day 식사

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_two_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_meal_remarks"))
    })
    private CheckListFirst podTwoMeal; // POD 2day 식사

    // POD Pain
    @Convert(converter = DailyPainScoreConverter.class)
    private DailyPainScore podOnePain; // POD 1day pain score

    @Convert(converter = DailyPainScoreConverter.class)
    private DailyPainScore podTwoPain; // POD 2day pain score

    @Convert(converter = DailyPainScoreConverter.class)
    private DailyPainScore podThreePain; // POD 3day pain score

    private LocalDate dayOfCheckList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_list_item_id", nullable = false)
    private CheckListItem checkListItem;

    public static CheckList createCheckList(WriteCheckList write, CheckListItem checkListItem) {
        return CheckList.builder()
                // 위장관 촉진 약 복용 여부
                .podOneGiStimulant(CheckListFirst.of(write.getPodOneGiStimulant(), write.getPodOneGiStimulant_remarks()))
                .podTwoGiStimulant(CheckListFirst.of(write.getPodTwoGiStimulant(), write.getPodTwoGiStimulant_remarks()))
                .podThreeGiStimulant(CheckListFirst.of(write.getPodThreeGiStimulant(), write.getPodThreeGiStimulant_remarks()))

                // Gum Chewing 여부
                .podOneGumChewing(CheckListFirst.of(write.getPodOneGumChewing(), write.getPodOneGumChewing_remarks()))
                .podTwoGumChewing(CheckListFirst.of(write.getPodTwoGumChewing(), write.getPodTwoGumChewing_remarks()))
                .podThreeGumChewing(CheckListFirst.of(write.getPodThreeGumChewing(), write.getPodThreeGumChewing_remarks()))

                // IV fluid 제한 여부
                .podOneIvFluidRestriction(CheckListFirst.of(write.getPodOneIvFluidRestriction(), write.getPodOneIvFluidRestriction_remarks()))
                .podTwoIvFluidRestriction(CheckListFirst.of(write.getPodTwoIvFluidRestriction(), write.getPodTwoIvFluidRestriction_remarks()))
                .podThreeIvFluidRestriction(CheckListFirst.of(write.getPodThreeIvFluidRestriction(), write.getPodThreeIvFluidRestriction_remarks()))

                // Non-opioid pain control 여부
                .podOneNonOpioidPainControl(CheckListFirst.of(write.getPodOneNonOpioidPainControl(), write.getPodOneNonOpioidPainControl_remarks()))
                .podTwoNonOpioidPainControl(CheckListFirst.of(write.getPodTwoNonOpioidPainControl(), write.getPodTwoNonOpioidPainControl_remarks()))
                .podThreeNonOpioidPainControl(CheckListFirst.of(write.getPodThreeNonOpioidPainControl(), write.getPodThreeNonOpioidPainControl_remarks()))

                // JP drain 제거 여부
//                .podOneJpDrainRemoval(CheckListFirst.of(write.getPodOneJpDrainRemoval(), write.getPodOneJpDrainRemoval_remarks()))
//                .podTwoJpDrainRemoval(CheckListFirst.of(write.getPodTwoJpDrainRemoval(), write.getPodTwoJpDrainRemoval_remarks()))
//                .podThreeJpDrainRemoval(CheckListFirst.of(write.getPodThreeJpDrainRemoval(), write.getPodThreeJpDrainRemoval_remarks()))

                // IV line 제거 여부
                .podThreeIvLineRemoval(CheckListSecond.of(write.getPodThreeIvLineRemoval(), write.getPodThreeIvLineRemoval_remarks()))

                // POD Exercise
                .podOneExercise(CheckListFirst.of(write.getPodOneExercise(), write.getPodOneExercise_remarks()))
                .podTwoExercise(CheckListFirst.of(write.getPodTwoExercise(), write.getPodTwoExercise_remarks()))
                .podThreeExercise(CheckListFirst.of(write.getPodThreeExercise(), write.getPodThreeExercise_remarks()))

                // POD Meal
                .podOneMeal(CheckListFirst.of(write.getPodOneMeal(), write.getPodOneMeal_remarks()))
                .podTwoMeal(CheckListFirst.of(write.getPodTwoMeal(), write.getPodTwoMeal_remarks()))

                // POD Pain
                .podOnePain(write.getPodOnePain())
                .podTwoPain(write.getPodTwoPain())
                .podThreePain(write.getPodThreePain())

                .dayOfCheckList(convertToKoreanDate(write.getDayOfCheckList()))
//                .dayOfCheckList(write.getDayOfCheckList())

                // CheckListItem
                .checkListItem(checkListItem)
                .build();
    }

    public void updateCheckList(WriteCheckList write) {
        // 위장관 촉진 약 복용 여부
        if (write.getPodOneGiStimulant() != null && this.podOneGiStimulant != null) {
            this.podOneGiStimulant.update(write.getPodOneGiStimulant());
        }
        if (write.getPodOneGiStimulant_remarks() != null && this.podOneGiStimulant != null) {
            this.podOneGiStimulant.update(write.getPodOneGiStimulant_remarks());
        }

        if (write.getPodTwoGiStimulant() != null && this.podTwoGiStimulant != null) {
            this.podTwoGiStimulant.update(write.getPodTwoGiStimulant());
        }
        if (write.getPodTwoGiStimulant_remarks() != null && this.podTwoGiStimulant != null) {
            this.podTwoGiStimulant.update(write.getPodTwoGiStimulant_remarks());
        }

        if (write.getPodThreeGiStimulant() != null && this.podThreeGiStimulant != null) {
            this.podThreeGiStimulant.update(write.getPodThreeGiStimulant());
        }
        if (write.getPodThreeGiStimulant_remarks() != null && this.podThreeGiStimulant != null) {
            this.podThreeGiStimulant.update(write.getPodThreeGiStimulant_remarks());
        }

        // Gum Chewing 여부
        if (write.getPodOneGumChewing() != null && this.podOneGumChewing != null) {
            this.podOneGumChewing.update(write.getPodOneGumChewing());
        }
        if (write.getPodOneGumChewing_remarks() != null && this.podOneGumChewing != null) {
            this.podOneGumChewing.update(write.getPodOneGumChewing_remarks());
        }

        if (write.getPodTwoGumChewing() != null && this.podTwoGumChewing != null) {
            this.podTwoGumChewing.update(write.getPodTwoGumChewing());
        }
        if (write.getPodTwoGumChewing_remarks() != null && this.podTwoGumChewing != null) {
            this.podTwoGumChewing.update(write.getPodTwoGumChewing_remarks());
        }

        if (write.getPodThreeGumChewing() != null && this.podThreeGumChewing != null) {
            this.podThreeGumChewing.update(write.getPodThreeGumChewing());
        }
        if (write.getPodThreeGumChewing_remarks() != null && this.podThreeGumChewing != null) {
            this.podThreeGumChewing.update(write.getPodThreeGumChewing_remarks());
        }

        // IV fluid 제한 여부
        if (write.getPodOneIvFluidRestriction() != null && this.podOneIvFluidRestriction != null) {
            this.podOneIvFluidRestriction.update(write.getPodOneIvFluidRestriction());
        }
        if (write.getPodOneIvFluidRestriction_remarks() != null && this.podOneIvFluidRestriction != null) {
            this.podOneIvFluidRestriction.update(write.getPodOneIvFluidRestriction_remarks());
        }

        if (write.getPodTwoIvFluidRestriction() != null && this.podTwoIvFluidRestriction != null) {
            this.podTwoIvFluidRestriction.update(write.getPodTwoIvFluidRestriction());
        }
        if (write.getPodTwoIvFluidRestriction_remarks() != null && this.podTwoIvFluidRestriction != null) {
            this.podTwoIvFluidRestriction.update(write.getPodTwoIvFluidRestriction_remarks());
        }

        if (write.getPodThreeIvFluidRestriction() != null && this.podThreeIvFluidRestriction != null) {
            this.podThreeIvFluidRestriction.update(write.getPodThreeIvFluidRestriction());
        }
        if (write.getPodThreeIvFluidRestriction_remarks() != null && this.podThreeIvFluidRestriction != null) {
            this.podThreeIvFluidRestriction.update(write.getPodThreeIvFluidRestriction_remarks());
        }
        // Non-opioid pain control 여부
        if (write.getPodOneNonOpioidPainControl() != null && this.podOneNonOpioidPainControl != null) {
            this.podOneNonOpioidPainControl.update(write.getPodOneNonOpioidPainControl());
        }
        if (write.getPodOneNonOpioidPainControl_remarks() != null && this.podOneNonOpioidPainControl != null) {
            this.podOneNonOpioidPainControl.update(write.getPodOneNonOpioidPainControl_remarks());
        }

        if (write.getPodTwoNonOpioidPainControl() != null && this.podTwoNonOpioidPainControl != null) {
            this.podTwoNonOpioidPainControl.update(write.getPodTwoNonOpioidPainControl());
        }
        if (write.getPodTwoNonOpioidPainControl_remarks() != null && this.podTwoNonOpioidPainControl != null) {
            this.podTwoNonOpioidPainControl.update(write.getPodTwoNonOpioidPainControl_remarks());
        }

        if (write.getPodThreeNonOpioidPainControl() != null && this.podThreeNonOpioidPainControl != null) {
            this.podThreeNonOpioidPainControl.update(write.getPodThreeNonOpioidPainControl());
        }
        if (write.getPodThreeNonOpioidPainControl_remarks() != null && this.podThreeNonOpioidPainControl != null) {
            this.podThreeNonOpioidPainControl.update(write.getPodThreeNonOpioidPainControl_remarks());
        }

        // IV line 제거 여부
        if (write.getPodThreeIvLineRemoval() != null && this.podThreeIvLineRemoval != null) {
            this.podThreeIvLineRemoval.update(write.getPodThreeIvLineRemoval());
        }
        if (write.getPodThreeIvLineRemoval_remarks() != null && this.podThreeIvLineRemoval != null) {
            this.podThreeIvLineRemoval.update(write.getPodThreeIvLineRemoval_remarks());
        }
//        if (write.getPodThreeIvLineRemovalDate() != null) this.podThreeIvLineRemoval.update(write.getPodThreeIvLineRemovalDate());

        // POD Exercise
        if (write.getPodOneExercise() != null && this.podOneExercise != null) {
            this.podOneExercise.update(write.getPodOneExercise());
        }
        if (write.getPodOneExercise_remarks() != null && this.podOneExercise != null) {
            this.podOneExercise.update(write.getPodOneExercise_remarks());
        }

        if (write.getPodTwoExercise() != null && this.podTwoExercise != null) {
            this.podTwoExercise.update(write.getPodTwoExercise());
        }
        if (write.getPodTwoExercise_remarks() != null && this.podTwoExercise != null) {
            this.podTwoExercise.update(write.getPodTwoExercise_remarks());
        }

        if (write.getPodThreeExercise() != null && this.podThreeExercise != null) {
            this.podThreeExercise.update(write.getPodThreeExercise());
        }
        if (write.getPodThreeExercise_remarks() != null && this.podThreeExercise != null) {
            this.podThreeExercise.update(write.getPodThreeExercise_remarks());
        }

        // POD Meal
        if (write.getPodOneMeal() != null && this.podOneMeal != null) {
            this.podOneMeal.update(write.getPodOneMeal());
        }
        if (write.getPodOneMeal_remarks() != null && this.podOneMeal != null) {
            this.podOneMeal.update(write.getPodOneMeal_remarks());
        }

        if (write.getPodTwoMeal() != null && this.podTwoMeal != null) {
            this.podTwoMeal.update(write.getPodTwoMeal());
        }
        if (write.getPodTwoMeal_remarks() != null && this.podTwoMeal != null) {
            this.podTwoMeal.update(write.getPodTwoMeal_remarks());
        }

        // POD Pain
        if (write.getPodOnePain() != null && this.getPodOnePain() != null) this.podOnePain = write.getPodOnePain();
        if (write.getPodTwoPain() != null && this.getPodTwoPain() != null) this.podTwoPain = write.getPodTwoPain();
        if (write.getPodThreePain() != null && this.getPodThreePain() != null) this.podThreePain = write.getPodThreePain();
    }

    public void updateRemovalDate(LocalDate update) {
        this.podThreeIvLineRemoval.update(update);
    }

    // 한국 시간으로 변환하는 메서드 추가
    private static LocalDate convertToKoreanDate(LocalDate date) {
        if (date == null) {
            return null;
        }
        // 현재 시스템 기본 시간대를 사용해 ZonedDateTime 생성
        ZonedDateTime zonedDateTime = date.atStartOfDay(ZoneId.systemDefault());

        // 한국 시간대로 변환
        ZonedDateTime koreanZonedDateTime = zonedDateTime.withZoneSameInstant(ZoneId.of("Asia/Seoul"));

        // 변환된 ZonedDateTime을 LocalDate로 변환하여 반환
        return koreanZonedDateTime.toLocalDate();
    }
}
