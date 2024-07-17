import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import CreatableSelect from 'react-select/creatable'; // CreatableSelect 임포트
import makeAnimated from 'react-select/animated';

function MultiSelector<T>({
    label,
    htmlFor,
    customFor,
    formik,
    values,
    isRender,
}: {
    label: string;
    htmlFor: string;
    customFor: string;
    formik: FormikProps<T>;
    values: { value: string; name: string }[];
    isRender?: boolean;
}) {
    const animatedComponents = makeAnimated();

    const handleChange = (selectedOptions: any) => {
        // 커스텀으로 입력된 옵션과 기존에 선택된 옵션을 분리
        const customValues = selectedOptions
            .filter((option: any) => option.__isNew__)
            .map((option: any) => option.value);
        const selectedValues = selectedOptions
            .filter((option: any) => !option.__isNew__)
            .map((option: any) => option.value);

        // 커스텀 필드에 커스텀으로 입력된 옵션 추가
        if (customValues.length > 0) {
            formik.setFieldValue(`${customFor}`, [...customValues]);
            formik.setFieldError(`${customFor}`, '');
            formik.setFieldError(htmlFor, '');
        } else {
            formik.setFieldValue(`${customFor}`, '');
        }

        // 선택 필드에 기존에 선택된 옵션 추가
        if (selectedValues.length > 0) {
            formik.setFieldValue(htmlFor, [...selectedValues]);
            formik.setFieldError(htmlFor, '');
            formik.setFieldError(`${customFor}`, '');
        } else {
            formik.setFieldValue(htmlFor, '');
        }
    };

    const options = values.map((value) => ({ value: value.value, label: value.name }));
    const isInput = formik?.getFieldProps(htmlFor).value || formik?.getFieldProps(customFor).value;
    const isValid =
        (formik.errors as Record<string, string>)[htmlFor] || (formik.errors as Record<string, string>)[customFor]; // formik의 에러 여부

    return (
        <InputContainer<T> isRender={isRender} label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div className="flex flex-grow">
                <CreatableSelect
                    components={animatedComponents}
                    isMulti
                    options={options}
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
