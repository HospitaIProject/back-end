import { FormikProps } from 'formik';
import { ComplianceValuesType } from '../../../../models/FormType';
import InputContainer from './InputContainer';
type Props = {
    label: string;
    htmlFor: string;
    formik: FormikProps<ComplianceValuesType>;
    unit?: string; // 단위를 나타내는 새로운 prop
    placeholder?: string; // placeholder를 나타내는 새로운 prop
};

function NumberInput({ label, htmlFor, formik, unit }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik?.setFieldValue(htmlFor, e.target.value);
        formik?.setFieldError(htmlFor, '');
    };

    // const selectedValue = formik?.getFieldProps(htmlFor).value as 'YES' | 'NO' | '';
    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = formik.errors[htmlFor];

    return (
        <InputContainer label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div
                className={` ${isValid ? 'border-2 border-red-400' : ''} flex h-12 flex-grow flex-row items-center gap-2 overflow-hidden rounded-lg border-2 border-gray-300 px-3`}
            >
                <input
                    type="number"
                    onChange={handleChange}
                    placeholder="숫자를 입력해주세요."
                    className="w-full outline-none"
                />
                <span className="mr-2 text-xl">{unit}</span>
            </div>
        </InputContainer>
    );
}

export default NumberInput;
