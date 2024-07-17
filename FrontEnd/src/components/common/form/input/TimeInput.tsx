import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import { useState } from 'react';

const convertToDateTime = (timeString: string) => {
    const hours = parseInt(timeString.substring(0, 2), 10);
    const minutes = parseInt(timeString.substring(2, 4), 10);
    const now = new Date();
    const dateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    return dateTime;
};
type Props<T> = {
    label: string;
    htmlFor: string;
    formik: FormikProps<T>;
    unit?: string; // 단위를 나타내는 새로운 prop
    placeholder?: string; // placeholder를 나타내는 새로운 prop
    isRender?: boolean; // 렌더 여부를 나타냄
};

function TimeInput<T>({ label, htmlFor, formik, isRender }: Props<T>) {
    const [displayValue, setDisplayValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/:/g, ''); // 기존의 ':' 문자를 제거

        if (/^\d*$/.test(value) && value.length <= 4) {
            let formattedValue = '';

            if (value.length === 1 || value.length === 2) {
                // 1자리 또는 2자리 숫자일 때는 그대로 표시
                formattedValue = value;
            } else if (value.length >= 3) {
                // 3자리 이상이면 시간과 분으로 나눔
                formattedValue = `${value.slice(0, 2)}:${value.slice(2)}`;
            }

            setDisplayValue(formattedValue);

            if (value.length === 4) {
                // 4자리 모두 입력되었을 때
                const hours = parseInt(value.slice(0, 2), 10);
                const minutes = parseInt(value.slice(2, 4), 10);

                // 유효한 시간인지 확인
                if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                    const date = convertToDateTime(value);
                    formik.setFieldValue(htmlFor, date);
                    formik?.setFieldError(htmlFor, '');
                } else {
                    formik.setFieldError(htmlFor, '유효하지 날짜형식입니다.');
                }
            } else {
                formik.setFieldValue(htmlFor, '');
            }
        } else {
            setDisplayValue(value); // 비정상적인 값이 들어올 경우를 대비한 처리
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
                    placeholder="ex) 08:10은 0810으로 입력해주세요."
                    onChange={handleChange}
                    className="w-full outline-none"
                    maxLength={5} // 최대 입력 길이를 5로 설정
                />
            </div>
        </InputContainer>
    );
}

export default TimeInput;
