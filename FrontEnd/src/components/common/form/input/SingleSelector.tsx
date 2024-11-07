import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function SingleSelector<T>({
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

    const options = values.map((value) => ({ value: value.value, label: value.name }));
    const handleChange = (newValue: any) => {
        console.log('newValue', newValue);
        formik?.setFieldValue(htmlFor, newValue.value);
        formik?.setFieldError(htmlFor, '');
    };

    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <InputContainer<T> isRender={isRender} label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div className="flex flex-grow">
                <Select
                    menuPlacement="auto" // 자동으로 위아래 공간 파악
                    components={animatedComponents}
                    options={options}
                    isSearchable={false}
                    onChange={handleChange}
                    classNamePrefix="select"
                    placeholder="선택"
                    value={options.find((option) => option.value === formik?.getFieldProps(htmlFor).value)}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            width: '100%',
                            minHeight: '3rem',
                            borderWidth: '1px', // 원하는 두께로 변경
                            boxShadow: `none`, // 선택 시 그림자 제거 (선택적)
                            borderRadius: `0.5rem`, // 원하는 모양으로 변경
                            '&:hover': {},
                            border: isValid
                                ? '2px solid #e53e3e'
                                : state.isFocused
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
        </InputContainer>
    );
}

export default SingleSelector;
