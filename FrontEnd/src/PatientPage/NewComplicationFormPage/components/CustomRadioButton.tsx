import { FormikProps } from 'formik';
import CustomRadioButtonContainer from './CustomRadioButtonContainer';

function CustomRadioButton<T>({
    label,
    index,

    htmlFor,
    nameHtmlFor,
    formik,
    values,
    isRender,
}: {
    label: string;
    index: number;
    htmlFor: string;
    nameHtmlFor: string;
    formik: FormikProps<T>;
    values: { value: string; name: string }[];
    isRender?: boolean;
}) {
    const options = values.map((value) => ({ value: value.value, label: value.name }));
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik?.setFieldValue(htmlFor, e.target.value);
        formik?.setFieldError(htmlFor, '');
    };
    const inputValue = formik?.getFieldProps(htmlFor).value;
    const isInput = formik?.getFieldProps(htmlFor).value && formik?.getFieldProps(nameHtmlFor).value;
    // const isInput = false;
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <CustomRadioButtonContainer<T>
            isRender={isRender}
            label={label}
            htmlFor={htmlFor}
            isInput={isInput}
            formik={formik}
            index={index}
            nameHtmlFor={nameHtmlFor}
        >
            <div className={`flex flex-grow gap-[6px] ${isValid ? 'rounded-md border-b border-red-500' : ''}`}>
                {options.map((option, index) => (
                    <label
                        key={index}
                        className={`flex w-[46px] cursor-pointer items-center gap-1 rounded-full border px-1 py-[6px] ${inputValue === option.value ? 'border-blue-400 bg-blue-400' : 'border-gray-400'} `}
                    >
                        <input
                            type="radio"
                            name={htmlFor}
                            value={option.value}
                            checked={inputValue === option.value}
                            onChange={handleChange}
                            className="hidden radio-button-class" // 예시 클래스, 실제로는 적절한 CSS 클래스 사용
                        />
                        <div
                            className={`flex h-3 w-3 rounded-full border p-[2px] ${inputValue === option.value ? 'border-white' : 'border-gray-400'}`}
                        >
                            <div className="w-full h-full bg-white rounded-full"> </div>
                        </div>
                        <span className={`text-xs ${inputValue === option.value ? 'text-white' : 'text-gray-400'}`}>
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>
        </CustomRadioButtonContainer>
    );
}

export default CustomRadioButton;
