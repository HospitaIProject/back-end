import { FormikProps } from 'formik';
import InputContainer from './InputContainer';

function MultiInput<T>({
    label,
    htmlFor,
    formik,
    values,
    isRender,
    type,
}: {
    label: string;
    htmlFor: string;
    formik: FormikProps<T>;
    values: { value: string; label: string }[];
    isRender?: boolean;
    type: 'text' | 'number';
}) {
    // 체크박스 상태 변경 핸들러
    const handleChange = ({ value, event }: { value: string; event: React.ChangeEvent<HTMLInputElement> }) => {
        formik.setFieldValue(`${htmlFor}.${value}`, event.target.value);
        formik.setFieldError(`${htmlFor}`, '');
    };
    let isInput = false;

    if (formik.getFieldProps(htmlFor).value) {
        isInput = values.every((item) => formik.getFieldProps(htmlFor).value[item.value] !== ''); // formik의 값
    }
    // const isInput = formik.getFieldProps(htmlFor).value[values[0].value]; // formik의 값
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <InputContainer<T> isRender={isRender} label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div className={`grid grid-rows-3 gap-2 ${isValid ? 'rounded-md border-y-2 border-red-500' : ''} `}>
                {values.map((item, index) => {
                    return (
                        <label key={index} className={`flex h-10 flex-row items-center justify-between gap-4`}>
                            <span className="w-16 text-sm text-gray-600">{item.label}:</span>
                            <input
                                type={type}
                                onChange={(e) =>
                                    handleChange({
                                        value: item.value,
                                        event: e,
                                    })
                                }
                                onKeyDown={(e) => {
                                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                        e.preventDefault();
                                    }
                                }}
                                onWheel={(e) => {
                                    e.currentTarget.blur();
                                }}
                                placeholder={`${type === 'number' ? '숫자를 입력해주세요.' : '텍스트를 입력해주세요.'}`}
                                className={`h-full flex-grow rounded-md border border-gray-300 p-2 outline-blue-500`}
                            />
                        </label>
                    );
                })}
            </div>
        </InputContainer>
    );
}

export default MultiInput;
