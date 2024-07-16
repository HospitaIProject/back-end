import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
type Props<T> = {
    label: string;
    htmlFor: string;
    formik: FormikProps<T>;
    unit?: string; // 단위를 나타내는 새로운 prop
    placeholder?: string; // placeholder를 나타내는 새로운 prop
    isRender?: boolean; // 렌더 여부를 나타냄
};

function NumberInput<T>({ label, htmlFor, formik, unit, isRender }: Props<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik?.setFieldValue(htmlFor, e.target.value);
        formik?.setFieldError(htmlFor, '');
    };

    // const selectedValue = formik?.getFieldProps(htmlFor).value as 'YES' | 'NO' | '';
    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <InputContainer<T> isRender={isRender} label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div
                className={` ${isValid ? 'border-2 border-red-400' : ''} flex h-12 flex-grow flex-row items-center gap-2 overflow-hidden rounded-lg border border-gray-300 px-3`}
            >
                <input
                    type="number"
                    onChange={handleChange}
                    placeholder="숫자를 입력해주세요."
                    className="w-full outline-none"
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                            e.preventDefault();
                        }
                    }}
                    onWheel={(e) => {
                        e.currentTarget.blur();
                    }}
                />
                <span className="mr-2">{unit}</span>
            </div>
        </InputContainer>
    );
}

export default NumberInput;
