import { FormikProps } from 'formik';
import InputContainer from './InputContainer';

function SingleSelector<T>({
    label,
    htmlFor,
    formik,
    values,
    isRender,
}: {
    label: string;
    htmlFor: string;
    formik: FormikProps<T>;
    values: { value: string; name: string }[];
    isRender?: boolean;
}) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        formik?.setFieldValue(htmlFor, e.target.value);
        formik?.setFieldError(htmlFor, '');
    };

    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <InputContainer<T> isRender={isRender} label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div className="flex h-12 flex-grow overflow-hidden mobile:max-w-60">
                <select
                    onChange={handleChange}
                    defaultValue=""
                    className={`w-full rounded-lg border border-gray-300 px-2 ${isValid ? 'border-2 border-red-400' : ''}`}
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
