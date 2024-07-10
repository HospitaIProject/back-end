import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import { useEffect } from 'react';
type Props<T> = {
    label: string;
    htmlFor: string;
    formik: FormikProps<T>;
    unit?: string; // 단위를 나타내는 새로운 prop
    placeholder?: string; // placeholder를 나타내는 새로운 prop
};

function TotalHospitalizedInput<T>({ label, htmlFor, formik }: Props<T>) {
    // const selectedValue = formik?.getFieldProps(htmlFor).value as 'YES' | 'NO' | '';
    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    useEffect(() => {
        if (formik?.getFieldProps('hospitalizedDate').value && formik?.getFieldProps('dischargedDate').value) {
            const hospitalizedDate = formik?.getFieldProps('hospitalizedDate').value;
            const dischargedDate = formik?.getFieldProps('dischargedDate').value;
            const diff = dischargedDate.getTime() - hospitalizedDate.getTime();

            formik?.setFieldValue('totalHospitalized', Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
            formik?.setFieldError('totalHospitalized', '');
        } else {
            formik?.setFieldValue('totalHospitalized', '');
        }
    }, [formik?.getFieldProps('hospitalizedDate').value, formik?.getFieldProps('dischargedDate').value]);

    return (
        <InputContainer<T> label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div
                className={`bg-blue-50 ${isValid ? 'border-2 border-red-400' : ''} flex h-12 flex-grow flex-row items-center gap-2 overflow-hidden rounded-lg border border-gray-300 px-3`}
            >
                <input
                    type="text"
                    disabled
                    value={formik?.getFieldProps('totalHospitalized').value || ''}
                    className="w-full outline-none"
                />
                <span className="mr-2">일</span>
            </div>
        </InputContainer>
    );
}

export default TotalHospitalizedInput;
