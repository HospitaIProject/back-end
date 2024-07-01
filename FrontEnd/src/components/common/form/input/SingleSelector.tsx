import { FormikProps } from 'formik';
import { ComplianceValuesType } from '../../../../models/FormType';
import InputContainer from './InputContainer';

function SingleSelector({
    label,
    htmlFor,
    formik,
    values,
}: {
    label: string;
    htmlFor: string;
    formik: FormikProps<ComplianceValuesType>;
    values: { value: string; name: string }[];
}) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        formik?.setFieldValue(htmlFor, e.target.value);
        formik?.setFieldError(htmlFor, '');
    };

    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = formik.errors[htmlFor];

    return (
        <InputContainer label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div className="flex h-12 flex-grow overflow-hidden">
                <select
                    onChange={handleChange}
                    defaultValue=""
                    className={`w-full rounded-lg border-2 border-gray-300 px-2 ${isValid ? 'border-2 border-red-400' : ''}`}
                    id={htmlFor}
                >
                    <option value="">선택</option>
                    {values.map((value, index) => {
                        return (
                            <option key={index} value={value.value}>
                                {value.name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </InputContainer>
    );
}

export default SingleSelector;
