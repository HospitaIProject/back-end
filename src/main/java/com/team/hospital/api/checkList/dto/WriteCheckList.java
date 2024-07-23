package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkList.enumType.DailyPainScore;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class WriteCheckList {



    // 수술 후
    private BooleanOption giStimulant;                   // 위장관 촉진 약 복용 여부
    private BooleanOption gumChewing;                    // 하루 3번 15분동안 껌씹기 여부
    private BooleanOption antiNauseaPostOp;              // 수술 후 구역구토방지제 사용 여부
    private BooleanOption ivFluidRestrictionPostOp;      // 수술 후 IV fluid 제한 여부
    private BooleanOption nonOpioidPainControl;          // 수술 후 non-opioid pain control 여부

    private BooleanOption jpDrainRemoval;                // 수술 후 3일이내 JP drain 제거 여부
    private LocalDate jpDrainRemovalDate;

    private BooleanOption catheterRemoval;               // 수술 후 수술장에서 소변줄 제거 여부
    private LocalDate catheterRemovalDate;
    private BooleanOption catheterReInsertion;

    private BooleanOption ivLineRemoval;                 // 수술 후 3일이내 IV line 제거 여부
    private LocalDate ivLineRemovalDate;


    // Pod Exercise
    private BooleanOption postExercise;
    private BooleanOption podOneExercise;
    private BooleanOption podTwoExercise;
    private BooleanOption podThreeExercise;

    // Pod Meal
    private BooleanOption postMeal;
    private BooleanOption podOneMeal;
    private BooleanOption podTwoMeal;

    // Pod Pain
    private DailyPainScore postPain;
    private DailyPainScore podOnePain;
    private DailyPainScore podTwoPain;
    private DailyPainScore podThreePain;

    // 몇 일차 체크리스트 작성
    private LocalDate dayOfCheckList;


    // 비고 필드
    // 수술 후
    private String giStimulant_remarks;                   // 위장관 촉진 약 복용 여부
    private String gumChewing_remarks;                    // 하루 3번 15분동안 껌씹기 여부
    private String antiNauseaPostOp_remarks;              // 수술 후 구역구토방지제 사용 여부
    private String ivFluidRestrictionPostOp_remarks;      // 수술 후 IV fluid 제한 여부
    private String nonOpioidPainControl_remarks;          // 수술 후 non-opioid pain control 여부
    private String jpDrainRemoval_remarks;                // 수술 후 3일이내 JP drain 제거 여부
    private String catheterRemoval_remarks;               // 수술 후 수술장에서 소변줄 제거 여부
    private String ivLineRemoval_remarks;                 // 수술 후 3일이내 IV line 제거 여부

    // Pod Exercise
    private String postExercise_remarks;
    private String podOneExercise_remarks;
    private String podTwoExercise_remarks;
    private String podThreeExercise_remarks;

    // Pod Meal
    private String postMeal_remarks;
    private String podOneMeal_remarks;
    private String podTwoMeal_remarks;

}
