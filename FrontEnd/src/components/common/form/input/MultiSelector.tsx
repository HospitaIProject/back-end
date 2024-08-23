import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import makeAnimated from 'react-select/animated';
import { useEffect } from 'react';
import Select from 'react-select';
function MultiSelector<T>({
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
    const animatedComponents = makeAnimated();

    const handleChange = (selectedOptions: any) => {
        // 커스텀으로 입력된 옵션과 기존에 선택된 옵션을 분리
        console.log('selectedOptions', selectedOptions);

        const selectedValues = selectedOptions.map((option: any) => option.value);

        // 선택 필드에 기존에 선택된 옵션 추가
        if (selectedValues.length > 0) {
            formik.setFieldValue(htmlFor, [...selectedValues]);
            formik.setFieldError(htmlFor, '');
        } else {
            formik.setFieldValue(htmlFor, '');
        }
    };

    useEffect(() => {
        console.log('formik.values', formik.values);
    }, [formik.values]);

    const options = values.map((value) => ({ value: value.value, label: value.name }));
    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    const selectedOptions = options.filter((option) => formik?.getFieldProps(htmlFor).value.includes(option.value)); // 선택된 옵션

    const currentValues = [...selectedOptions]; // 현재 선택된 옵션

    return (
        <InputContainer<T> isRender={isRender} label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div className="flex flex-grow">
                <Select
                    components={animatedComponents}
                    isMulti
                    options={options}
                    value={currentValues}
                    onChange={handleChange}
                    classNamePrefix="select"
                    placeholder="선택 혹은 직접 입력해주십시오."
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            width: '100%',
                            minHeight: '3rem',
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
            </div>
            <div className="hidden cursor-pointer min-h-12"></div>
        </InputContainer>
    );
}

export default MultiSelector;
