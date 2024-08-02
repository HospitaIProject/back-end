package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkList.enumType.DailyPainScore;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class WriteCheckList {

    // Pod Exercise
    private BooleanOption podOneExercise;
    private BooleanOption podTwoExercise;
    private BooleanOption podThreeExercise;

    // Pod Meal
    private BooleanOption podOneMeal;
    private BooleanOption podTwoMeal;

    // Pod Pain
    private DailyPainScore podOnePain;
    private DailyPainScore podTwoPain;
    private DailyPainScore podThreePain;

    // 몇 일차 체크리스트 작성
    private LocalDate dayOfCheckList;

    // 비고 필드
    // Pod Exercise
    private String podOneExercise_remarks;
    private String podTwoExercise_remarks;
    private String podThreeExercise_remarks;

    // Pod Meal
    private String podOneMeal_remarks;
    private String podTwoMeal_remarks;

}
