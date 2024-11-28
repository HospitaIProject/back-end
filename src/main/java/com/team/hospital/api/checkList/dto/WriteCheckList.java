package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkList.enumType.DailyPainScore;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class WriteCheckList {

    // 위장관 촉진약 복용 여부
    private BooleanOption podOneGiStimulant; // POD 1day 위장관 촉진약 복용 여부
    private BooleanOption podTwoGiStimulant; // POD 2day 위장관 촉진약 복용 여부
    private BooleanOption podThreeGiStimulant; // POD 3day 위장관 촉진약 복용 여부

    // 껌씹기 여부
    private BooleanOption podOneGumChewing; // POD 1day 껌씹기 여부
    private BooleanOption podTwoGumChewing; // POD 2day 껌씹기 여부
    private BooleanOption podThreeGumChewing; // POD 3day 껌씹기 여부

    // 수술 후 IV fluid 제한 여부
    private BooleanOption podOneIvFluidRestriction; // POD 1day IV fluid 제한 여부
    private BooleanOption podTwoIvFluidRestriction; // POD 2day IV fluid 제한 여부
    private BooleanOption podThreeIvFluidRestriction; // POD 3day IV fluid 제한 여부

    // 수술 후 non-opioid pain control 여부
    private BooleanOption podOneNonOpioidPainControl; // POD 1day non-opioid pain control 여부
    private BooleanOption podTwoNonOpioidPainControl; // POD 2day non-opioid pain control 여부
    private BooleanOption podThreeNonOpioidPainControl; // POD 3day non-opioid pain control 여부

    // 수술 후 3일이내 JP drain 제거 여부
//    private BooleanOption podOneJpDrainRemoval; // POD 1day 3일이내 JP drain 제거 여부
//    private BooleanOption podTwoJpDrainRemoval; // POD 2day 3일이내 JP drain 제거 여부
//    private BooleanOption podThreeJpDrainRemoval; // POD 3day 3일이내 JP drain 제거 여부

    // 수술 후 3일이내 IV line 제거 여부
//    private BooleanOption podOneIvLineRemoval; // POD 1day 3일이내 IV line 제거 여부
//    private BooleanOption podTwoIvLineRemoval; // POD 2day 3일이내 IV line 제거 여부
    private BooleanOption podThreeIvLineRemoval; // POD 3day 3일이내 IV line 제거 여부

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
    // 위장관 촉진약 복용 여부
    private String podOneGiStimulant_remarks; // POD 1day 위장관 촉진약 복용 여부
    private String podTwoGiStimulant_remarks; // POD 2day 위장관 촉진약 복용 여부
    private String podThreeGiStimulant_remarks; // POD 3day 위장관 촉진약 복용 여부

    // 껌씹기 여부
    private String podOneGumChewing_remarks; // POD 1day 껌씹기 여부
    private String podTwoGumChewing_remarks; // POD 2day 껌씹기 여부
    private String podThreeGumChewing_remarks; // POD 3day 껌씹기 여부

    // 수술 후 IV fluid 제한 여부
    private String podOneIvFluidRestriction_remarks; // POD 1day IV fluid 제한 여부
    private String podTwoIvFluidRestriction_remarks; // POD 2day IV fluid 제한 여부
    private String podThreeIvFluidRestriction_remarks; // POD 3day IV fluid 제한 여부

    // 수술 후 non-opioid pain control 여부
    private String podOneNonOpioidPainControl_remarks; // POD 1day non-opioid pain control 여부
    private String podTwoNonOpioidPainControl_remarks; // POD 2day non-opioid pain control 여부
    private String podThreeNonOpioidPainControl_remarks; // POD 3day non-opioid pain control 여부

    // 수술 후 3일이내 JP drain 제거 여부
//    private String podOneJpDrainRemoval_remarks; // POD 1day 3일이내 JP drain 제거 여부
//    private String podTwoJpDrainRemoval_remarks; // POD 2day 3일이내 JP drain 제거 여부
//    private String podThreeJpDrainRemoval_remarks; // POD 3day 3일이내 JP drain 제거 여부

    // 수술 후 3일이내 IV line 제거 여부
//    private String podOneIvLineRemoval_remarks; // POD 1day 3일이내 IV line 제거 여부
//    private String podTwoIvLineRemoval_remarks; // POD 2day 3일이내 IV line 제거 여부
    private String podThreeIvLineRemoval_remarks; // POD 3day 3일이내 IV line 제거 여부

    // Pod Exercise
    private String podOneExercise_remarks;
    private String podTwoExercise_remarks;
    private String podThreeExercise_remarks;

    // Pod Meal
    private String podOneMeal_remarks;
    private String podTwoMeal_remarks;

}
