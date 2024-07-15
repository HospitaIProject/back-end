import { FormikProps } from 'formik';
import InputContainer from './InputContainer';

type Props<T> = {
    label: string;
    htmlFor: string;
    formik: FormikProps<T>;
    isRender?: boolean;
    isDisabled?: boolean;
    etcComponent?: React.ReactNode;
};

function YesOrNoButton<T>({ label, htmlFor, formik, isDisabled = false, isRender = true, etcComponent }: Props<T>) {
    const handleChange = (e: string) => {
        formik?.setFieldValue(htmlFor, e);
        formik?.setFieldError(htmlFor, '');
    };

    const selectedValue = formik?.getFieldProps(htmlFor).value as 'YES' | 'NO' | '';
    let isInput = false;

    const isError = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    if (formik?.getFieldProps(htmlFor).value === 'YES' && etcComponent) {
        isInput = formik?.getFieldProps(htmlFor).value === 'YES' && formik?.getFieldProps(`${htmlFor}Date`).value;
    } else {
        isInput = formik?.getFieldProps(htmlFor).value === 'YES' || formik?.getFieldProps(htmlFor).value === 'NO';
    }
    return (
        <InputContainer<T>
            isRender={isRender}
            etcComponent={etcComponent}
            label={label}
            htmlFor={htmlFor}
            isInput={isInput}
            formik={formik}
        >
            <div
                className={`flex h-12 max-w-60 flex-grow overflow-hidden rounded-lg border bg-gray-100 ${isError ? 'border-2 border-red-400' : ''} `}
            >
                <button
                    type="button"
                    disabled={isDisabled}
                    className={`flex-1 border-r ${selectedValue === 'YES' ? 'bg-blue-500 text-white' : 'text-blue-400'}`}
                    onClick={() => handleChange('YES')}
                >
                    Yes
                </button>
                <button
                    type="button"
                    disabled={isDisabled}
                    className={`flex-1 border-l ${selectedValue === 'NO' ? 'bg-blue-500 text-white' : 'text-red-400'}`}
                    onClick={() => handleChange('NO')}
                >
                    No
                </button>
            </div>
        </InputContainer>
    );
}

export default YesOrNoButton;
