import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import { useState } from 'react';

type Props<T> = {
    label: string;
    htmlFor: string;
    formik: FormikProps<T>;
    isRender?: boolean;
};

function TextInput<T>({ label, htmlFor, formik, isRender }: Props<T>) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
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
                    type="text"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="텍스트를 입력 해주세요."
                    className={`h-12 w-full outline-none ${isFocused ? 'border-2 border-blue-400' : ''} rounded-lg border border-gray-300 px-2 ${isValid ? 'border-2 border-red-400' : ''}`}
                />
            </div>
        </InputContainer>
    );
}

export default TextInput;
