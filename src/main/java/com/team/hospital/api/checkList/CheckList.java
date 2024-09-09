package com.team.hospital.api.checkList;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.converter.DailyPainScoreConverter;
import com.team.hospital.api.checkList.dto.WriteCheckList;
import com.team.hospital.api.checkList.enumType.*;
import com.team.hospital.api.checkListItem.CheckListItem;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

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
    private CheckListFirst podOneMeal; // POD 1day 운동

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pod_two_meal")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pod_two_meal_remarks"))
    })
    private CheckListFirst podTwoMeal; // POD 2day 운동

    // POD Pain


    @Convert(converter = DailyPainScoreConverter.class)
    private DailyPainScore podOnePain; // POD 1day 운동

    @Convert(converter = DailyPainScoreConverter.class)
    private DailyPainScore podTwoPain; // POD 2day 운동

    @Convert(converter = DailyPainScoreConverter.class)
    private DailyPainScore podThreePain; // POD 3day 운동

    private LocalDate dayOfCheckList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_list_item_id", nullable = false)
    private CheckListItem checkListItem;

    public static CheckList createCheckList(WriteCheckList write, CheckListItem checkListItem) {
        return CheckList.builder()

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

                .dayOfCheckList(write.getDayOfCheckList())

                // CheckListItem
                .checkListItem(checkListItem)
                .build();
    }

    public void updateCheckList(WriteCheckList write) {
        if (write.getPodOneExercise() != null) this.podOneExercise.update(write.getPodOneExercise());
        if (write.getPodOneExercise_remarks() != null) this.podOneExercise.update(write.getPodOneExercise_remarks());

        if (write.getPodTwoExercise() != null) this.podTwoExercise.update(write.getPodTwoExercise());
        if (write.getPodTwoExercise_remarks() != null) this.podTwoExercise.update(write.getPodTwoExercise_remarks());


        if (write.getPodThreeExercise() != null) this.podThreeExercise.update(write.getPodThreeExercise());
        if (write.getPodThreeExercise_remarks() != null) this.podThreeExercise.update(write.getPodThreeExercise_remarks());


        if (write.getPodOneMeal() != null) this.podOneMeal.update(write.getPodOneMeal());
        if (write.getPodOneMeal_remarks() != null) this.podOneMeal.update(write.getPodOneMeal_remarks());


        if (write.getPodTwoMeal() != null) this.podTwoMeal.update(write.getPodTwoMeal());
        if (write.getPodTwoMeal_remarks() != null) this.podTwoMeal.update(write.getPodTwoMeal_remarks());


        if (write.getPodOnePain() != null) this.podOnePain = write.getPodOnePain();
        if (write.getPodTwoPain() != null) this.podTwoPain = write.getPodTwoPain();
        if (write.getPodThreePain() != null) this.podThreePain = write.getPodThreePain();
    }
}
