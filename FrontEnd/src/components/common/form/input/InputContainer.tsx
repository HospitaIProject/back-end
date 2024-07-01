import React, { useState } from 'react';
import DoubleCheckIcon from '../../../../icons/DoubleCheckIcon';
import ArrowIcon from '../../../../icons/ArrowIcon';
import { FormikProps } from 'formik';
import { ComplianceValuesType } from '../../../../models/FormType';
import { debounce } from 'lodash';
import InfoIcons from '../../../../icons/InfoIcons';

type Props = {
    label: string;
    htmlFor: string;
    children: React.ReactNode;
    isInput: boolean;
    formik: FormikProps<ComplianceValuesType>;
};

function InputContainer({ label, htmlFor, children, isInput, formik }: Props) {
    const [isRemarkOpen, setIsRemarkOpen] = useState(false); // 비고 입력창 열림 여부

    const remarkKey = `${htmlFor}_remark`; // 비고 입력창의 key

    const handleOpenRemark = () => {
        setIsRemarkOpen((prev) => !prev);
    }; // 비고 입력창 열기

    const debouncedHandleChange = debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        formik?.setFieldValue(remarkKey, e.target.value);
    }, 300); // 비고 입력창에 입력할 때마다 formik에 값 저장

    const remarkValue = formik?.getFieldProps(remarkKey).value; // 비고 입력창의 값
    const isValid = formik.errors[htmlFor]; // formik의 에러 여부

    return (
        <div className="mb-4 flex flex-col gap-2 px-2">
            <label
                className={`flex items-center gap-1 font-medium ${isInput ? 'text-blue-500' : ''}`}
                htmlFor={htmlFor}
            >
                {label}
                {isInput && <DoubleCheckIcon className="inline-block h-5 w-5 flex-shrink-0 text-inherit" />}
            </label>
            <div className="flex w-full flex-row gap-2">
                {children}
                <button
                    type="button"
                    className={`flex w-16 flex-row items-center justify-end gap-1 ${isRemarkOpen ? 'mb-2 text-blue-500' : ` ${remarkValue ? 'font-semibold text-blue-500' : 'text-gray-500'} `}`}
                    onClick={handleOpenRemark}
                >
                    <span className="text-inherit">{remarkValue && '* '}비고</span>
                    <ArrowIcon
                        className={`h-4 w-4 transform text-inherit ${isRemarkOpen ? '-rotate-90' : 'rotate-90'}`}
                    />
                </button>
            </div>

            <textarea
                onChange={debouncedHandleChange}
                className={`border border-gray-300 p-2 text-sm font-medium outline-none ${isRemarkOpen ? '' : 'hidden'}`}
            />
            {isValid && (
                <div className="flex flex-row items-center gap-1 px-2 text-red-500">
                    <InfoIcons className="h-4 w-4 text-inherit" />
                    <small className="text-xs text-inherit">{isValid}</small>
                </div>
            )}
        </div>
    );
}

export default InputContainer;
