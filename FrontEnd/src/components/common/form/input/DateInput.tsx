import { FormikProps } from 'formik';
import CalendarIcon from '../../../../icons/CalendarIcon';
import DatePickerModal from '../../datePicker/DatePickerModal';
import { useState } from 'react';

type Props<T> = {
    label: string;
    htmlFor: string;
    formik: FormikProps<T>;
    placeHolder?: string;
    isRender?: boolean;
};

function DateInput<T>({ htmlFor, formik, isRender }: Props<T>) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = () => {
        setIsOpenModal(true);
    };
    const handleCloseModal = () => {
        setIsOpenModal(false);
    };
    const onSelectedDate = (date: Date) => {
        formik?.setFieldValue(htmlFor, date);
        formik?.setFieldError(htmlFor, '');
        setIsOpenModal(false);
    };

    const isInput = formik?.getFieldProps(htmlFor).value; // formik의 값이 있는지 여부 및 값
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <>
            <div className={`flex flex-row items-center gap-3 ${isRender ? '' : 'hidden'}`}>
                <button
                    type="button"
                    onClick={handleOpenModal}
                    className={` ${isValid ? 'border-2 border-red-400' : ''} flex h-fit ${isInput ? 'text-blue-500' : 'text-gray-400'} w-fit flex-row items-center justify-between gap-2 overflow-hidden rounded-lg bg-white p-1`}
                >
                    <CalendarIcon className="h-6 w-6 text-inherit" />
                </button>
                {/* <button
                        type="button"
                        className={`my-auto flex flex-row items-center ${isInput ? '' : 'hidden'}`}
                        onClick={() => formik?.setFieldValue(htmlFor, '')}
                    >
                        <span className="text-sm text-red-400">삭제</span>
                        <CloseIcon className="w-5 h-5 text-red-400" />
                    </button> */}
            </div>

            {isOpenModal && (
                <DatePickerModal initialDate={isInput} onClose={handleCloseModal} onSelectDate={onSelectedDate} />
            )}
        </>
    );
}

export default DateInput;
