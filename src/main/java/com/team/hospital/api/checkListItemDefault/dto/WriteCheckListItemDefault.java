package com.team.hospital.api.checkListItemDefault.dto;

import lombok.Getter;

@Getter
public class WriteCheckListItemDefault {

    private String operationTypeName;

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
}
