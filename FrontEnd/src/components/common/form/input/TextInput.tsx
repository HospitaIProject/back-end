import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import { useState } from 'react';
import { debounce } from 'lodash';

type Props<T> = {
    label: string;
    htmlFor: string;
    formik: FormikProps<T>;
    isRender?: boolean;
    type?: 'textarea' | 'text';
};

function TextInput<T>({ label, htmlFor, type = 'text', formik, isRender }: Props<T>) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik?.setFieldValue(htmlFor, e.target.value);
        formik?.setFieldError(htmlFor, '');
    };
    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        formik?.setFieldValue(htmlFor, e.target.value);
        formik?.setFieldError(htmlFor, '');
    };
    const debouncedHandleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => handleChange(e), 500);
    const debouncedHandleChangeTextArea = debounce(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => handleChangeTextArea(e),
        500,
    );

    // const selectedValue = formik?.getFieldProps(htmlFor).value as 'YES' | 'NO' | '';
    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <InputContainer<T> isRender={isRender} label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div className="flex flex-grow overflow-hidden">
                {type === 'text' && (
                    <input
                        type="text"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={debouncedHandleChange}
                        defaultValue={formik?.getFieldProps(htmlFor).value}
                        placeholder="텍스트를 입력 해주세요."
                        className={`h-12 w-full outline-none ${isFocused ? 'border-2 border-blue-400' : 'border-gray-300'} rounded-lg border px-2 ${isValid ? 'border-2 border-red-400' : ''}`}
                    />
                )}
                {type === 'textarea' && (
                    <textarea
                        rows={3}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={debouncedHandleChangeTextArea}
                        defaultValue={formik?.getFieldProps(htmlFor).value}
                        placeholder="텍스트를 입력 해주세요."
                        className={`w-full outline-none ${isFocused ? 'border-2 border-blue-400' : ''} rounded-lg border border-gray-300 px-2 ${isValid ? 'border-2 border-red-400' : ''}`}
                    />
                )}
            </div>
        </InputContainer>
    );
}

export default TextInput;
