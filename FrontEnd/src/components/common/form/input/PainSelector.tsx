import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const options = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
];

function PainSelector<T>({
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
    const animatedComponents = makeAnimated();

    // 체크박스 상태 변경 핸들러
    const handleChange = ({ value, newValue }: { value: string; newValue: any }) => {
        formik.setFieldValue(`${htmlFor}.${value}`, newValue.value);
        formik.setFieldError(`${htmlFor}`, '');
    };
    let isInput = false;

    if (formik.getFieldProps(htmlFor).value) {
        isInput = values.every((item) => formik.getFieldProps(htmlFor).value[item.value] !== ''); // formik의 값
    }
    console.log(type);
    // const isInput = formik.getFieldProps(htmlFor).value[values[0].value]; // formik의 값
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <InputContainer<T> isRender={isRender} label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div className={`$ grid grid-rows-3 gap-2`}>
                {values.map((item, index) => {
                    return (
                        <label key={index} className={`flex h-10 flex-row items-center justify-between gap-4`}>
                            <span className="w-20 text-sm text-gray-600">{item.label}:</span>
                            <Select
                                components={animatedComponents}
                                options={options}
                                value={options.find(
                                    (option) => option.value === formik.getFieldProps(`${htmlFor}.${item.value}`).value,
                                )}
                                isSearchable={false}
                                onChange={(newValue) =>
                                    handleChange({
                                        value: item.value,
                                        newValue: newValue,
                                    })
                                }
                                // value={options.find(
                                //     (option) => option.value === formik.getFieldProps(htmlFor).value[item.value],
                                // )}
                                menuPlacement="auto"
                                classNamePrefix="select"
                                placeholder="선택"
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        width: '100%',
                                        minHeight: '2rem',
                                        borderWidth: '1px', // 원하는 두께로 변경
                                        boxShadow: `none`, // 선택 시 그림자 제거 (선택적)
                                        borderRadius: `0.5rem`, // 원하는 모양으로 변경
                                        '&:hover': {},
                                        border: isValid
                                            ? '2px solid #e53e3e'
                                            : '' || state.isFocused
                                              ? '2px solid rgb(96 165 250) '
                                              : '1px solid rgb(209 213 219) ',
                                        cursor: 'pointer',
                                    }),
                                    container: (provided) => ({
                                        ...provided,
                                        width: '100%',
                                    }),
                                }}
                            />
                        </label>
                    );
                })}
            </div>
        </InputContainer>
    );
}

export default PainSelector;
