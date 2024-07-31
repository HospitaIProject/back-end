package com.team.hospital.api.checkListItemDefault.dto;


import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.operation.enumType.OperationMethod;
import lombok.Getter;

@Getter
public class WriteCheckListItemDefault {

    private OperationMethod operationMethod;

    private BooleanOption giStimulantDefault;
    private BooleanOption gumChewingDefault;
    private BooleanOption antiNauseaPostOpDefault;
    private BooleanOption ivFluidRestrictionPostOpDefault;
    private BooleanOption nonOpioidPainControlDefault;
    private BooleanOption jpDrainRemovalDefault;
    private BooleanOption catheterRemovalDefault;
    private BooleanOption ivLineRemovalDefault;

    // 수술 전
    private BooleanOption explainedPreOpDefault;
    private BooleanOption onsPreOp2hrDefault;
    private BooleanOption onsPostBowelPrepDefault;
    private BooleanOption dvtPreventionDefault;
    private BooleanOption antibioticPreIncisionDefault;
    private BooleanOption painMedPreOpDefault;

    // 수술 중
    private BooleanOption maintainTempDefault;
    private BooleanOption fluidRestrictionDefault;
    private BooleanOption antiNauseaDefault;
    private BooleanOption painControlDefault;

    // POD
    private BooleanOption podExerciseDefault;
    private BooleanOption podMealDefault;
    private BooleanOption podPainDefault;
}
