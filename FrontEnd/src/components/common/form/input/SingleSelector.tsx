import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import Select, { ActionMeta, SingleValue } from 'react-select';
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
                    components={animatedComponents}
                    options={options}
                    isSearchable={false}
                    onChange={handleChange}
                    classNamePrefix="select"
                    placeholder="선택"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            width: '100%',
                            minHeight: '3rem',
                            borderWidth: '1px', // 원하는 두께로 변경
                            boxShadow: `none`, // 선택 시 그림자 제거 (선택적)
                            borderRadius: `0.5rem`, // 원하는 모양으로 변경
                            '&:hover': {},
                            border: isValid ? '2px solid #e53e3e' : '1px solid #d2d6dc',
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
