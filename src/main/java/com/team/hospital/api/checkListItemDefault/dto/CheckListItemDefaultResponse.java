package com.team.hospital.api.checkListItemDefault.dto;

import com.team.hospital.api.checkListItemDefault.CheckListItemDefault;
import com.team.hospital.api.operation.enumType.OperationMethod;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CheckListItemDefaultResponse {

    private OperationMethod operationMethod;

    private boolean giStimulant;
    private boolean gumChewing;
    private boolean antiNauseaPostOp;
    private boolean ivFluidRestrictionPostOp;
    private boolean nonOpioidPainControl;
    private boolean jpDrainRemoval;
    private boolean catheterRemoval;
    private boolean ivLineRemoval;

    // 수술 전
    private boolean explainedPreOp;
    private boolean onsPreOp2hr;
    private boolean onsPostBowelPrep;
    private boolean dvtPrevention;
    private boolean antibioticPreIncision;
    private boolean painMedPreOp;

    // 수술 중
    private boolean maintainTemp;
    private boolean fluidRestriction;
    private boolean antiNausea;
    private boolean painControl;

    // POD
    private boolean podExercise;
    private boolean podMeal;
    private boolean podPain;

    public static CheckListItemDefaultResponse toEntity(CheckListItemDefault checkListItemDefault) {
        if (checkListItemDefault == null) return null; // Null safety check

        return CheckListItemDefaultResponse.builder()
                .operationMethod(checkListItemDefault.getOperationMethod())

                // 수술 전
                .explainedPreOp(checkListItemDefault.isExplainedPreOp())
                .onsPreOp2hr(checkListItemDefault.isOnsPreOp2hr())
                .onsPostBowelPrep(checkListItemDefault.isOnsPostBowelPrep())
                .dvtPrevention(checkListItemDefault.isDvtPrevention())
                .antibioticPreIncision(checkListItemDefault.isAntibioticPreIncision())
                .painMedPreOp(checkListItemDefault.isPainMedPreOp())

                // 수술 중
                .maintainTemp(checkListItemDefault.isMaintainTemp())
                .fluidRestriction(checkListItemDefault.isFluidRestriction())
                .antiNausea(checkListItemDefault.isAntiNausea())
                .painControl(checkListItemDefault.isPainControl())

                // 수술 후
                .giStimulant(checkListItemDefault.isGiStimulant())
                .gumChewing(checkListItemDefault.isGumChewing())
                .antiNauseaPostOp(checkListItemDefault.isAntiNauseaPostOp())
                .ivFluidRestrictionPostOp(checkListItemDefault.isIvFluidRestrictionPostOp())
                .nonOpioidPainControl(checkListItemDefault.isNonOpioidPainControl())
                .jpDrainRemoval(checkListItemDefault.isJpDrainRemoval())
                .catheterRemoval(checkListItemDefault.isCatheterRemoval())
                .ivLineRemoval(checkListItemDefault.isIvLineRemoval())

                .podExercise(checkListItemDefault.isPodExercise())
                .podMeal(checkListItemDefault.isPodMeal())
                .podPain(checkListItemDefault.isPodPain())

                .build();
    }
}

