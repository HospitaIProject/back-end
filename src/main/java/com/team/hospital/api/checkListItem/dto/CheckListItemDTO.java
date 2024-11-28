package com.team.hospital.api.checkListItem.dto;

import com.team.hospital.api.checkListItem.CheckListItem;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CheckListItemDTO {

    private Long checkListItemId;

    // 수술 전
    private boolean explainedPreOp;                // EAS 수술전 설명
    private boolean onsPreOp2hr;                   // 수술 2시간 전 ONS 복용여부
    private boolean onsPostBowelPrep;              // Bowel preparation 후 ONS 경장영양액 복용여부
    private boolean dvtPrevention;                 // DVT 예방
    private boolean antibioticPreIncision;         // 피부 절개 60분전 예방적 항생제 투여
    private boolean painMedPreOp;                  // 수술전 통증 조절약 복용 여부

    // 수술 중
    private boolean maintainTemp;                  // 수술 중 환자 체온 유지 여부
    private boolean fluidRestriction;              // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부
    private boolean antiNausea;                    // 수술 중 구역구토 방지제 사용 여부
    private boolean painControl;                   // 수술 중 통증 조절을 위한 처치 여부
    private boolean painControlMethod;                   // 수술 중 통증 조절을 위한 처치 여부

    // 수술 후
    private boolean giStimulant;                   // 위장관 촉진 약 복용 여부
    private boolean gumChewing;                    // 하루 3번 15분동안 껌씹기 여부
    private boolean antiNauseaPostOp;              // 수술 후 구역구토방지제 사용 여부
    private boolean ivFluidRestrictionPostOp;      // 수술 후 IV fluid 제한 여부
    private boolean nonOpioidPainControl;          // 수술 후 non-opioid pain control 여부
    private boolean jpDrainRemoval;                // 수술 후 3일이내 JP drain 제거 여부
    private boolean catheterRemoval;               // 수술 후 수술장에서 소변줄 제거 여부
    private boolean ivLineRemoval;                 // 수술 후 3일이내 IV line 제거 여부

    private boolean podExercise;                   // 운동
    private boolean podMeal;                       // 식사
    private boolean podPain;                       // 통증

//    private boolean complications;                 // 합병증

    public static CheckListItemDTO toEntity(CheckListItem checkListItem) {
        return CheckListItemDTO.builder()
                .checkListItemId(checkListItem.getId())

                // 수술 전
                .explainedPreOp(checkListItem.isExplainedPreOp())
                .onsPreOp2hr(checkListItem.isOnsPreOp2hr())
                .onsPostBowelPrep(checkListItem.isOnsPostBowelPrep())
                .dvtPrevention(checkListItem.isDvtPrevention())
                .antibioticPreIncision(checkListItem.isAntibioticPreIncision())
                .painMedPreOp(checkListItem.isPainMedPreOp())

                // 수술 중
                .maintainTemp(checkListItem.isMaintainTemp())
                .fluidRestriction(checkListItem.isFluidRestriction())
                .antiNausea(checkListItem.isAntiNausea())
                .painControl(checkListItem.isPainControl())
                .painControlMethod(checkListItem.isPainControlMethod())

                // 수술 중
                .giStimulant(checkListItem.isGiStimulant())
                .gumChewing(checkListItem.isGumChewing())
                .antiNauseaPostOp(checkListItem.isAntiNauseaPostOp())
                .ivFluidRestrictionPostOp(checkListItem.isIvFluidRestrictionPostOp())
                .nonOpioidPainControl(checkListItem.isNonOpioidPainControl())
                .jpDrainRemoval(checkListItem.isJpDrainRemoval())
                .catheterRemoval(checkListItem.isCatheterRemoval())
                .ivLineRemoval(checkListItem.isIvLineRemoval())

                // 수술 후
                .podExercise(checkListItem.isPodExercise())
                .podMeal(checkListItem.isPodMeal())
                .podPain(checkListItem.isPodPain())
//                .complications(checkListItem.isComplications)
                .build();
    }
}
