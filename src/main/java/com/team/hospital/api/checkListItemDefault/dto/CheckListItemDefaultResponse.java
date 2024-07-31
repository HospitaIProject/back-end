package com.team.hospital.api.checkListItemDefault.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkListItemDefault.CheckListItemDefault;
import com.team.hospital.api.operation.enumType.OperationMethod;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CheckListItemDefaultResponse {

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

    public static CheckListItemDefaultResponse toEntity(CheckListItemDefault checkListItemDefault) {
        if (checkListItemDefault == null) return null; // Null safety check

        return CheckListItemDefaultResponse.builder()
                .operationMethod(checkListItemDefault.getOperationMethod())
                .giStimulantDefault(checkListItemDefault.getGiStimulantDefault())
                .gumChewingDefault(checkListItemDefault.getGumChewingDefault())
                .antiNauseaPostOpDefault(checkListItemDefault.getAntiNauseaPostOpDefault())
                .ivFluidRestrictionPostOpDefault(checkListItemDefault.getIvFluidRestrictionPostOpDefault())
                .nonOpioidPainControlDefault(checkListItemDefault.getNonOpioidPainControlDefault())
                .jpDrainRemovalDefault(checkListItemDefault.getJpDrainRemovalDefault())
                .catheterRemovalDefault(checkListItemDefault.getCatheterRemovalDefault())
                .ivLineRemovalDefault(checkListItemDefault.getIvLineRemovalDefault())
                .explainedPreOpDefault(checkListItemDefault.getExplainedPreOpDefault())
                .onsPreOp2hrDefault(checkListItemDefault.getOnsPreOp2hrDefault())
                .onsPostBowelPrepDefault(checkListItemDefault.getOnsPostBowelPrepDefault())
                .dvtPreventionDefault(checkListItemDefault.getDvtPreventionDefault())
                .antibioticPreIncisionDefault(checkListItemDefault.getAntibioticPreIncisionDefault())
                .painMedPreOpDefault(checkListItemDefault.getPainMedPreOpDefault())
                .maintainTempDefault(checkListItemDefault.getMaintainTempDefault())
                .fluidRestrictionDefault(checkListItemDefault.getFluidRestrictionDefault())
                .antiNauseaDefault(checkListItemDefault.getAntiNauseaDefault())
                .painControlDefault(checkListItemDefault.getPainControlDefault())
                .podExerciseDefault(checkListItemDefault.getPodExerciseDefault())
                .podMealDefault(checkListItemDefault.getPodMealDefault())
                .podPainDefault(checkListItemDefault.getPodPainDefault())
                .build();
    }
}

