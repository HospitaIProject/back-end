import React, { useEffect, useRef, useState } from 'react';
import DoubleCheckIcon from '../../../icons/DoubleCheckIcon';
import { FormikProps } from 'formik';
import InfoIcons from '../../../icons/InfoIcons';
import PencilIcon from '../../../icons/PencilIcon';
import CloseIcon from '../../../icons/CloseIcon';
type Props<T> = {
    label: string;
    htmlFor: string;
    nameHtmlFor: string;
    children: React.ReactNode;
    isInput: boolean;
    formik: FormikProps<T>;
    isRender?: boolean;
    index: number;

    etcComponent?: React.ReactNode;
    isNameValid?: string;
};

function CustomRadioButtonContainer<T>({
    label,
    htmlFor,
    index,
    nameHtmlFor,
    children,
    isInput,
    formik,
    isRender = true,
}: Props<T>) {
    const [isInputOpen, setIsInputOpen] = useState(false);
    const customLabelValueRef = useRef<HTMLInputElement | null>(null);
    const customComplication = formik.getFieldProps(nameHtmlFor).value;

    const handleInputOpen = () => {
        setIsInputOpen(true);
    }; //인풋창 열기

    const onSubmitCustomLabel = () => {
        formik?.setFieldValue(nameHtmlFor, customLabelValueRef.current?.value);
        formik?.setFieldError(nameHtmlFor, '');
        setIsInputOpen(false);
    }; // 커스텀 라벨 항목 저장

    const onRemoveCustomComplication = () => {
        formik?.setFieldValue(
            'customComplications',
            formik.getFieldProps('customComplications').value.filter((_: any, i: any) => i !== index),
        );
    }; // 커스텀 라벨 항목 삭제

    useEffect(() => {
        if (customLabelValueRef.current && isInputOpen) {
            customLabelValueRef.current.focus();
        }
    }, [isInputOpen]); //인풋창이 열리면 포커스를 준다.

    const isLabelValid = formik.getFieldMeta(nameHtmlFor).error;
    const isValid = formik.getFieldMeta(nameHtmlFor).error || formik.getFieldMeta(htmlFor).error;

    return (
        <div
            className={`${isRender ? '' : 'hidden'} mx-auto flex w-full max-w-screen-mobile flex-col items-center px-2`}
        >
            <div className="flex flex-col w-full gap-2 mb-2 mobile:flex-row">
                <label
                    className={`flex items-center pr-2 text-sm font-medium mobile:w-72 mobile:flex-shrink-0 ${isInput ? 'text-blue-500' : 'text-gray-700'}`}
                    htmlFor={htmlFor}
                >
                    {label && <span className="mr-1">{label}</span>}

                    <button
                        type="button"
                        className={`${isInputOpen ? 'hidden' : ''} mr-2 ${isLabelValid ? 'rounded-md border-2 border-red-500' : ''} flex flex-row items-center rounded-md p-1`}
                        onClick={handleInputOpen}
                    >
                        {!isInputOpen && customComplication && <span className={`mr-2`}>{customComplication}</span>}
                        {!isInputOpen && !customComplication && (
                            <span className={`mr-2 text-sm text-gray-400`}>{'항목입력'}</span>
                        )}

                        <PencilIcon className={`h-4 w-4 flex-shrink-0 text-gray-400`} />
                    </button>
                    <div className={` ${isInputOpen ? '' : 'hidden'} flex flex-row items-center gap-1`}>
                        <div className="border-b">
                            <input
                                ref={customLabelValueRef}
                                defaultValue={customComplication}
                                className="p-1 text-sm text-gray-700 rounded-md outline-none"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={onSubmitCustomLabel}
                            className="rounded-md border bg-gray-400 px-3 py-[6px] text-sm text-white"
                        >
                            저장
                        </button>
                    </div>

                    {
                        <DoubleCheckIcon
                            className={`inline-block h-5 w-5 flex-shrink-0 text-inherit ${isInput && !isInputOpen ? '' : 'hidden'}`}
                        />
                    }
                    <div className={`flex flex-grow items-center justify-end ${index === 0 ? 'hidden' : ''} `}>
                        <button type="button" onClick={onRemoveCustomComplication}>
                            <CloseIcon className="w-4 h-4 text-red-500" />
                        </button>
                    </div>
                </label>

                <div className="flex flex-row w-full gap-2 mobile:justify-between">
                    <div className="flex flex-col flex-grow gap-1 pr-2">
                        {children}
                        {isValid && (
                            <div className="flex flex-row items-center gap-1 mt-1 text-red-500">
                                <InfoIcons className="w-4 h-4 text-inherit" />
                                <small className="text-xs text-inherit">{isValid}</small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomRadioButtonContainer;
