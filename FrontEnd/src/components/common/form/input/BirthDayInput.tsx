import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import { useState } from 'react';
type Props<T> = {
    label: string;
    htmlFor: string;
    formik: FormikProps<T>;
    unit?: string; // 단위를 나타내는 새로운 prop
    placeholder?: string; // placeholder를 나타내는 새로운 prop
    isRender?: boolean; // 렌더 여부를 나타냄
};

function BirthDayInput<T>({ label, htmlFor, formik, isRender }: Props<T>) {
    const [displayValue, setDisplayValue] = useState<string>('');
    const formatValue = (value: string) => {
        if (value.length === 8) {
            return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
        }
        return value;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/-/g, '');

        if (/^\d*$/.test(value) && value.length <= 8) {
            setDisplayValue(formatValue(value));

            if (value.length === 8) {
                const formattedValue = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
                setDisplayValue(formattedValue);

                const dateValue = new Date(formattedValue);
                formik.setFieldValue(htmlFor, dateValue);
                formik?.setFieldError(htmlFor, '');
            } else {
                formik.setFieldValue(htmlFor, '');
            }
        }
    };

    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <InputContainer<T> isRender={isRender} label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div
                className={` ${isValid ? 'border-2 border-red-400' : ''} flex h-12 flex-grow flex-row items-center gap-2 overflow-hidden rounded-lg border border-gray-300 px-3`}
            >
                <input
                    value={displayValue} // 변환된 날짜 형식 또는 초기 값 표시
                    placeholder="ex) 19990810(8자리)"
                    onChange={handleChange}
                    className="w-full outline-none"
                />
            </div>
        </InputContainer>
    );
}

export default BirthDayInput;
