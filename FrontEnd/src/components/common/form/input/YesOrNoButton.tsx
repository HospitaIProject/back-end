import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import { ComplianceValuesType } from '../../../../models/FormType';

function YesOrNoButton({
    label,
    htmlFor,
    formik,
}: {
    label: string;
    htmlFor: string;
    formik: FormikProps<ComplianceValuesType>;
}) {
    const handleChange = (e: string) => {
        formik?.setFieldValue(htmlFor, e);
        formik?.setFieldError(htmlFor, '');
    };

    const selectedValue = formik?.getFieldProps(htmlFor).value as 'YES' | 'NO' | '';
    const isInput = formik?.getFieldProps(htmlFor).value === 'YES' || formik?.getFieldProps(htmlFor).value === 'NO';
    const isError = formik.errors[htmlFor];

    return (
        <InputContainer label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div className={`flex flex-grow overflow-hidden rounded-lg ${isError ? 'border-2 border-red-400' : ''} `}>
                <button
                    type="button"
                    className={`h-12 flex-1 border-r border-gray-300 ${selectedValue === 'YES' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleChange('YES')}
                >
                    Yes
                </button>
                <button
                    type="button"
                    className={`h-12 flex-1 border-l border-gray-300 ${selectedValue === 'NO' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleChange('NO')}
                >
                    No
                </button>
            </div>
        </InputContainer>
    );
}

export default YesOrNoButton;
