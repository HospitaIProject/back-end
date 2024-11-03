package com.team.hospital.api.checkListBefore.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import lombok.Getter;

@Getter
public class WriteCheckListBefore {

    // 수술 전
    private BooleanOption explainedPreOp;                // EAS 수술전 설명
    private BooleanOption onsPreOp2hr;                   // 수술 2시간 전 ONS 복용여부
    private BooleanOption onsPostBowelPrep;              // Bowel preparation 후 ONS 경장영양액 복용여부
    private BooleanOption dvtPrevention;                 // DVT 예방
    private BooleanOption antibioticPreIncision;         // 피부 절개 60분전 예방적 항생제 투여
    private BooleanOption painMedPreOp;                  // 수술전 통증 조절약 복용 여부

    // 수술 전
    private String explainedPreOp_remarks;                // EAS 수술전 설명
    private String onsPreOp2hr_remarks;                   // 수술 2시간 전 ONS 복용여부
    private String onsPostBowelPrep_remarks;              // Bowel preparation 후 ONS 경장영양액 복용여부
    private String dvtPrevention_remarks;                 // DVT 예방
    private String antibioticPreIncision_remarks;         // 피부 절개 60분전 예방적 항생제 투여
    private String painMedPreOp_remarks;                  // 수술전 통증 조절약 복용 여부
}
