import React, { useState } from 'react';
import DoubleCheckIcon from '../../../../icons/DoubleCheckIcon';
import ArrowIcon from '../../../../icons/ArrowIcon';
import { FormikProps } from 'formik';
import { debounce } from 'lodash';
import InfoIcons from '../../../../icons/InfoIcons';

type Props<T> = {
    label: string;
    htmlFor: string;
    children: React.ReactNode;
    isInput: boolean;
    formik: FormikProps<T>;
    isRemark?: boolean;
    isRender?: boolean;
};

function InputContainer<T>({ label, htmlFor, children, isInput, formik, isRender = true }: Props<T>) {
    const [isRemarkOpen, setIsRemarkOpen] = useState(false); // 비고 입력창 열림 여부

    const handleOpenRemark = () => {
        setIsRemarkOpen((prev) => !prev);
    }; // 비고 입력창 열기

    let isRemarkButtonRender = false; // 비고 버튼 렌더링 여부
    let remarkValue = ''; // 비고 입력창의 값
    const remarkKey = `${htmlFor}_remark`; // 비고 입력창의 key

    if (typeof formik?.values === 'object' && formik?.values !== null) {
        if (Object.prototype.hasOwnProperty.call(formik.values, remarkKey)) {
            remarkValue = formik.getFieldProps(remarkKey).value; // 비고 입력창의 값
            isRemarkButtonRender = true; // 비고 버튼 렌더링 여부
        }
    }
    const debouncedHandleChange = debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        formik?.setFieldValue(remarkKey, e.target.value);
    }, 300); // 비고 입력창에 입력할 때마다 formik에 값 저장

    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <div
            className={`${isRender ? '' : 'hidden'} mx-auto flex w-full max-w-screen-mobile flex-col items-center px-2`}
        >
            <div className="flex flex-col w-full gap-2 mb-2 mobile:flex-row">
                <label
                    className={`flex items-center gap-2 pr-2 mobile:w-72 mobile:flex-shrink-0 ${isInput ? 'text-blue-500' : 'text-gray-700'}`}
                    htmlFor={htmlFor}
                >
                    {label}
                    {
                        <DoubleCheckIcon
                            className={`inline-block h-5 w-5 flex-shrink-0 text-inherit ${isInput ? '' : 'hidden'}`}
                        />
                    }
                </label>
                <div className="flex flex-row w-full gap-2 mobile:justify-between">
                    <div className="flex flex-col flex-grow gap-1 pr-2">
                        {children}
                        {isValid && (
                            <div className="flex flex-row items-center gap-1 px-2 text-red-500">
                                <InfoIcons className="w-4 h-4 text-inherit" />
                                <small className="text-xs text-inherit">{isValid}</small>
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        //키에remark 없을시 hidden
                        className={` ${isRemarkButtonRender ? '' : 'hidden'} flex w-16 flex-row items-center justify-end gap-1 ${isRemarkOpen ? 'mb-2 text-blue-500' : ` ${remarkValue ? 'font-semibold text-blue-500' : 'text-gray-500'} `}`}
                        onClick={handleOpenRemark}
                    >
                        <span className="text-inherit">{remarkValue && '* '}비고</span>
                        <ArrowIcon
                            className={`h-4 w-4 transform text-inherit ${isRemarkOpen ? '-rotate-90' : 'rotate-90'}`}
                        />
                    </button>
                </div>
            </div>
            <textarea
                onChange={debouncedHandleChange}
                className={`w-full rounded-md border border-gray-300 p-2 text-sm font-medium outline-none ${isRemarkOpen ? '' : 'hidden'}`}
            />
        </div>
    );
}

export default InputContainer;
