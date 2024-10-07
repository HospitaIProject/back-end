import { CheckListSetupType } from '../../../../models/CheckListsType';

type Props = {
    values: CheckListSetupType;
};

export const validateCheckListSetup = ({ values }: Props) => {
    const preOpFields = [
        'explainedPreOp',
        'onsPreOp2hr',
        'onsPostBowelPrep',
        'dvtPrevention',
        'antibioticPreIncision',
        'painMedPreOp',
    ];
    const intraOpFields = ['maintainTemp', 'fluidRestriction', 'antiNausea', 'painControl'];
    const postOpFields = [
        'giStimulant',
        'gumChewing',
        'antiNauseaPostOp',
        'ivFluidRestrictionPostOp',
        'nonOpioidPainControl',
        'jpDrainRemoval',
        'catheterRemoval',
        'ivLineRemoval',
        'podExercise',
        'podMeal',
        'podPain',
    ];
    const isPreOpValid = preOpFields.some((field) => values[field]);
    const isIntraOpValid = intraOpFields.some((field) => values[field]);
    const isPostOpValid = postOpFields.some((field) => values[field]);
    console.log(isPreOpValid, isIntraOpValid, isPostOpValid);

    return isPreOpValid && isIntraOpValid && isPostOpValid;
};
