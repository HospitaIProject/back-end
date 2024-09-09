import { FormikProps } from 'formik';
import InputContainer from './InputContainer';

function RadioButton<T>({
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
    const options = values.map((value) => ({ value: value.value, label: value.name }));

    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부
    const handleClick = (value: string) => {
        console.log('handleChange', value);
        if (isInput === value) {
            formik?.setFieldValue(htmlFor, '');
            return;
        }
        formik?.setFieldValue(htmlFor, value);
        formik?.setFieldError(htmlFor, '');
    };

    return (
        <InputContainer<T> isRender={isRender} label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div className={`flex flex-grow gap-[6px] ${isValid ? 'rounded-md border-b border-red-500' : ''}`}>
                {options.map((option, index) => (
                    <label
                        key={index}
                        className={`flex w-[46px] cursor-pointer items-center gap-1 rounded-full border px-1 py-[6px] ${isInput === option.value ? 'border-blue-400 bg-blue-400' : 'border-gray-400'} `}
                    >
                        <input
                            type="radio"
                            name={htmlFor}
                            value={option.value}
                            checked={isInput === option.value}
                            onChange={() => {}}
                            onClick={() => handleClick(option.value)}
                            className="hidden radio-button-class" // 예시 클래스, 실제로는 적절한 CSS 클래스 사용
                        />
                        <div
                            className={`flex h-3 w-3 rounded-full border p-[2px] ${isInput === option.value ? 'border-white' : 'border-gray-400'}`}
                        >
                            <div className="w-full h-full bg-white rounded-full"> </div>
                        </div>
                        <span className={`text-xs ${isInput === option.value ? 'text-white' : 'text-gray-400'}`}>
                            {option.label}
                        </span>
                    </label>
                ))}
                {/* <button className={`ml-auto text-red-500 ${isInput ? '' : 'hidden'}`} type="button">
                    <CloseIcon className="w-4 h-4" />
                </button> */}
            </div>
        </InputContainer>
    );
}

export default RadioButton;
