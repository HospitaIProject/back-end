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

    private LocalDate dayOfCheckList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_list_item_id")
    private CheckListItem checkListItem;

    public static CheckList createCheckList(WriteCheckList write, CheckListItem checkListItem) {
        return CheckList.builder()

                // POD Exercise
                .postExercise(CheckListFirst.of(write.getPostExercise(), write.getPostExercise_remarks()))
                .podOneExercise(CheckListFirst.of(write.getPodOneExercise(), write.getPodOneExercise_remarks()))
                .podTwoExercise(CheckListFirst.of(write.getPodTwoExercise(), write.getPodTwoExercise_remarks()))
                .podThreeExercise(CheckListFirst.of(write.getPodThreeExercise(), write.getPodThreeExercise_remarks()))

                // POD Meal
                .postMeal(CheckListFirst.of(write.getPostMeal(), write.getPostMeal_remarks()))
                .podOneMeal(CheckListFirst.of(write.getPodOneMeal(), write.getPodOneMeal_remarks()))
                .podTwoMeal(CheckListFirst.of(write.getPodTwoMeal(), write.getPodTwoMeal_remarks()))

                // POD Pain
                .postPain(write.getPostPain())
                .podOnePain(write.getPodOnePain())
                .podTwoPain(write.getPodTwoPain())
                .podThreePain(write.getPodThreePain())

                .dayOfCheckList(write.getDayOfCheckList())

                // CheckListItem
                .checkListItem(checkListItem)
                .build();
    }

    public void updateCheckList(WriteCheckList write) {
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

        this.dayOfCheckList = write.getDayOfCheckList();
    }
}
