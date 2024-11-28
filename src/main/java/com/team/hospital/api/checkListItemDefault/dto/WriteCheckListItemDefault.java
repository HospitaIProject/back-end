package com.team.hospital.api.checkListItemDefault.dto;

import lombok.Getter;

@Getter
public class WriteCheckListItemDefault {

    private String operationTypeName;

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
    private boolean painControlMethod;

    // 수술 후
    private boolean antiNauseaPostOp;
    private boolean ivFluidRestrictionPostOp;
    private boolean nonOpioidPainControl;
    private boolean jpDrainRemoval;
    private boolean catheterRemoval;

    // 데일리
    private boolean giStimulant;
    private boolean gumChewing;
    private boolean ivLineRemoval;

    // POD
    private boolean podExercise;
    private boolean podMeal;
    private boolean podPain;
}
