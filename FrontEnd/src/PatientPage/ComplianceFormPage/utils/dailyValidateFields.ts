import { FormikProps } from 'formik';
import { DailyCheckListFormType } from '../../../models/CheckListsType';

interface Props {
    formik: FormikProps<DailyCheckListFormType>;
    values: DailyCheckListFormType;
}
const validationRules = [
    'podOneExercise',
    'podTwoExercise',
    'podThreeExercise',
    'podOneMeal',
    'podTwoMeal',
    'podOnePain',
    'podTwoPain',
    'podThreePain',
];

export const dailyValidateFields = ({ formik, values }: Props) => {
    let isError = false;
    const fieldsToCheck = validationRules;

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

    if (
        values['podOnePain']?.day === '' ||
        values['podOnePain']?.evening === '' ||
        values['podOnePain']?.night === ''
    ) {
        formik.setFieldError('podOnePain', '필수 입력 항목입니다.');
        isError = true;
    }
    if (
        values['podTwoPain']?.day === '' ||
        values['podTwoPain']?.evening === '' ||
        values['podTwoPain']?.night === ''
    ) {
        formik.setFieldError('podTwoPain', '필수 입력 항목입니다.');
        isError = true;
    }
    if (
        values['podThreePain']?.day === '' ||
        values['podThreePain']?.evening === '' ||
        values['podThreePain']?.night === ''
    ) {
        formik.setFieldError('podThreePain', '필수 입력 항목입니다.');
        isError = true;
    }

    return isError;
};
