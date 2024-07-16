import { FormikProps } from 'formik';
import InputContainer from './InputContainer';

type Props<T> = {
    label: string;
    htmlFor: string;
    formik: FormikProps<T>;
    isRender?: boolean;
};

function TextInput<T>({ label, htmlFor, formik, isRender }: Props<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik?.setFieldValue(htmlFor, e.target.value);
        formik?.setFieldError(htmlFor, '');
    };

    // const selectedValue = formik?.getFieldProps(htmlFor).value as 'YES' | 'NO' | '';
    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <InputContainer<T> isRender={isRender} label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div className="flex flex-grow overflow-hidden">
                <input
                    onChange={handleChange}
                    placeholder="텍스트를 입력 해주세요."
                    className={`h-12 w-full rounded-lg border border-gray-300 px-2 ${isValid ? 'border-2 border-red-400' : ''}`}
                />
            </div>
        </InputContainer>
    );
}

export default TextInput;
