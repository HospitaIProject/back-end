import { FormikProps } from 'formik';
import { checkListFormType } from '../../../models/CheckListsType';

interface Props {
    formik: FormikProps<checkListFormType>;
    type: 'PREV' | 'TODAY' | 'POST';
    values: checkListFormType;
}
const validationRules = {
    PREV: [
        'explainedPreOp',
        'onsPreOp2hr',
        'onsPostBowelPrep',
        'dvtPrevention',
        'antibioticPreIncision',
        'painMedPreOp',
    ],
    TODAY: ['maintainTemp', 'fluidRestriction', 'antiNausea', 'painControl', 'painControlMethod'],
    POST: [
        'antiNauseaPostOp',
        'ivFluidRestrictionPostOp',
        'nonOpioidPainControl',
        'jpDrainRemoval',
        // 'jpDrainRemovalDate', //별도
        'catheterRemoval',
        // 'catheterRemovalDate', //별도
        // 'catheterReInsertion', //별도
        'ivLineRemoval',
        // 'ivLineRemovalDate', //별도
        'postExercise',
        'postMeal',
        // 'postPain', //별도
    ],
};

export const validateFields = ({ formik, type, values }: Props) => {
    let isError = false;
    const fieldsToCheck = validationRules[type];

    if (!fieldsToCheck) {
        console.error('Invalid type for validation');
        return true; // or false, depending on how you handle errors
    }
    fieldsToCheck.forEach((field) => {
        if (values[field] === '') {
            formik.setFieldError(field, '필수 입력 항목입니다.');
            isError = true;
        }
    });
    if (type === 'POST') {
        if (values['jpDrainRemoval'] === 'YES' && values['jpDrainRemovalDate'] === '') {
            formik.setFieldError('jpDrainRemovalDate', '필수 입력 항목입니다.');
            isError = true;
        }
        if (
            values['catheterRemoval'] === 'YES' &&
            values['catheterRemovalDate'] === '' &&
            values['catheterReInsertion'] === ''
        ) {
            formik.setFieldError('catheterRemovalDate', '필수 입력 항목입니다.');
            formik.setFieldError('catheterReInsertion', '필수 입력 항목입니다.');
            isError = true;
        }
        if (values['ivLineRemoval'] === 'YES' && values['ivLineRemovalDate'] === '') {
            formik.setFieldError('ivLineRemovalDate', '필수 입력 항목입니다.');
            isError = true;
        }
        if (values['postPain']?.day === '' || values['postPain']?.evening === '' || values['postPain']?.night === '') {
            formik.setFieldError('postPain', '필수 입력 항목입니다.');
            isError = true;
        }
    }

    return isError;
};
