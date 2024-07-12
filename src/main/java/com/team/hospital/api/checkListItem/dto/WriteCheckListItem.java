package com.team.hospital.api.checkListItem.dto;

import lombok.Getter;
@Getter
public class WriteCheckListItem {

    // 수술 전
    private boolean explainBeforeOperation;                       // EAS 수술전 설명
    private boolean takingONSBeforeOperationTwoHours;            // 수술 2시간 전 ONS 복용여부
    private boolean takingAfterBowelPreparation;                  // Bowel preparation 후 ONS 경장영양액 복용여부
    private boolean preventionDVT;                                // DVT 예방
    private boolean antibioticBeforeIncision;                     // 피부 절개 60분전 예방적 항생제 투여
    private boolean painMedBeforeOperation;                         // 수술전 통증 조절약 복용 여부

    // 수술 중
    private boolean maintainTempDuringOperation;                    // 수술 중 환자 체온 유지 여부
    private boolean fluidRestrictionDuringOperation;                // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부
    private boolean antiNauseaDuringOperation;                      // 수술 중 구역구토 방지제 사용 여부
    private boolean painControlDuringOperation;                     // 수술 중 통증 조절을 위한 처치 여부

    // 수술 후
    private boolean giStimulant;                                  // 위장관 촉진 약 복용 여부
    private boolean gumChewing;                                   // 하루 3번 15분동안 껌씹기 여부
    private boolean antiNauseaPostOperation;                        // 수술 후 구역구토방지제 사용 여부
    private boolean ivFluidRestrictionPostOperation;                // 수술 후 IV fluid 제한 여부
    private boolean nonOpioidPainControl;                         // 수술 후 non-opioid pain control 여부
    private boolean jpDrainRemoval;                               // 수술 후 3일이내 JP drain 제거 여부
    private boolean catheterRemoval;                              // 수술 후 수술장에서 소변줄 제거 여부
    private boolean ivLineRemoval;                                // 수술 후 3일이내 IV line 제거 여부

    private boolean podExercise;                                    // 운동
    private boolean podMeal;                                         // 식사
    private boolean podPain;                                         // 통증

//    private boolean complications;                                // 합병증
}
