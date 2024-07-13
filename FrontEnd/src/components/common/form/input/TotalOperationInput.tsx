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

function TotalOperationInput<T>({ label, htmlFor, formik }: Props<T>) {
    // const selectedValue = formik?.getFieldProps(htmlFor).value as 'YES' | 'NO' | '';
    const isInput = formik?.getFieldProps(htmlFor).value;
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부
    const totalOperationTime = formik?.getFieldProps('totalOperationTime').value;

    useEffect(() => {
        if (formik?.getFieldProps('operationStartTime').value && formik?.getFieldProps('operationEndTime').value) {
            const startTime = new Date(formik?.getFieldProps('operationStartTime').value);
            const endTime = new Date(formik?.getFieldProps('operationEndTime').value);

            // endTime이 startTime보다 작은 경우, endTime에 24시간을 더합니다.
            if (endTime < startTime) {
                endTime.setTime(endTime.getTime() + 24 * 60 * 60 * 1000); // 24시간을 밀리초로 변환하여 더함
            }

            // 수정된 endTime과 startTime의 차이를 계산합니다.
            const differenceInMilliseconds = endTime.getTime() - startTime.getTime();
            const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

            formik?.setFieldValue('totalOperationTime', differenceInMinutes);
            formik?.setFieldError('totalOperationTime', '');
        } else {
            formik?.setFieldValue('totalOperationTime', '');
        }
    }, [formik?.getFieldProps('operationStartTime').value, formik?.getFieldProps('operationEndTime').value]);

    return (
        <InputContainer<T> label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
            <div
                className={`bg-blue-50 ${isValid ? 'border-2 border-red-400' : ''} flex h-12 flex-grow flex-row items-center gap-2 overflow-hidden rounded-lg border border-gray-300 px-3`}
            >
                <input type="text" disabled value={totalOperationTime} className="w-full outline-none" />
                <span className="mr-2">분</span>
            </div>
        </InputContainer>
    );
}

export default TotalOperationInput;
