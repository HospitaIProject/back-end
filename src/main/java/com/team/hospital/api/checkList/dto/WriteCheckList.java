package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkList.enumType.DailyPainScore;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class WriteCheckList {

    // 수술 전
    private BooleanOption explainedPreOp;                // EAS 수술전 설명
    private BooleanOption onsPreOp2hr;                   // 수술 2시간 전 ONS 복용여부
    private BooleanOption onsPostBowelPrep;              // Bowel preparation 후 ONS 경장영양액 복용여부
    private BooleanOption dvtPrevention;                 // DVT 예방
    private BooleanOption antibioticPreIncision;         // 피부 절개 60분전 예방적 항생제 투여
    private BooleanOption painMedPreOp;                  // 수술전 통증 조절약 복용 여부

    // 수술 중
    private BooleanOption maintainTemp;                  // 수술 중 환자 체온 유지 여부
    private BooleanOption fluidRestriction;              // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부
    private BooleanOption antiNausea;                    // 수술 중 구역구토 방지제 사용 여부
    private BooleanOption painControl;                   // 수술 중 통증 조절을 위한 처치 여부

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


    // 비고 필드
    // 수술 전
    private String explainedPreOp_remarks;                // EAS 수술전 설명
    private String onsPreOp2hr_remarks;                   // 수술 2시간 전 ONS 복용여부
    private String onsPostBowelPrep_remarks;              // Bowel preparation 후 ONS 경장영양액 복용여부
    private String dvtPrevention_remarks;                 // DVT 예방
    private String antibioticPreIncision_remarks;         // 피부 절개 60분전 예방적 항생제 투여
    private String painMedPreOp_remarks;                  // 수술전 통증 조절약 복용 여부

    // 수술 중
    private String maintainTemp_remarks;                  // 수술 중 환자 체온 유지 여부
    private String fluidRestriction_remarks;              // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부
    private String antiNausea_remarks;                    // 수술 중 구역구토 방지제 사용 여부
    private String painControl_remarks;                   // 수술 중 통증 조절을 위한 처치 여부

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

    // Pod Pain
//    private String postPain_remarks;
//    private String podOnePain_remarks;
//    private String podTwoPain_remarks;
//    private String podThreePain_remarks;

}
