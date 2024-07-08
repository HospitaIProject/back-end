import { FormikProps } from 'formik';
import InputContainer from './InputContainer';
import CalendarIcon from '../../../../icons/CalendarIcon';
import DatePickerModal from '../../datePicker/DatePickerModal';
import { useState } from 'react';
import { useDateFormatted } from '../../../../Hooks/useDateFormatted';
import CloseIcon from '../../../../icons/CloseIcon';

function DateInput<T>({ label, htmlFor, formik }: { label: string; htmlFor: string; formik: FormikProps<T> }) {
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

    const { onlyDate } = useDateFormatted(formik.getFieldProps(htmlFor).value); // formik의 날짜 값 변환

    const isInput = formik?.getFieldProps(htmlFor).value; // formik의 값이 있는지 여부 및 값
    const isValid = (formik.errors as Record<string, string>)[htmlFor]; // formik의 에러 여부

    return (
        <>
            <InputContainer<T> label={label} htmlFor={htmlFor} isInput={isInput} formik={formik}>
                <div className="flex flex-row gap-3">
                    <button
                        type="button"
                        onClick={handleOpenModal}
                        className={` ${isValid ? 'border-2 border-red-400' : ''} flex h-12 w-full max-w-60 flex-grow flex-row items-center justify-between gap-2 overflow-hidden rounded-lg border border-gray-300 px-3`}
                    >
                        <input
                            type="text"
                            value={onlyDate}
                            placeholder="날짜를 선택해주세요."
                            className="w-full outline-none cursor-pointer"
                            readOnly
                        />

                        <CalendarIcon className="w-6 h-6 text-gray-400" />
                    </button>
                    <button
                        type="button"
                        className={`my-auto flex flex-row items-center ${isInput ? '' : 'hidden'}`}
                        onClick={() => formik?.setFieldValue(htmlFor, '')}
                    >
                        <span className="text-sm text-red-400">삭제</span>
                        <CloseIcon className="w-5 h-5 text-red-400" />
                    </button>
                </div>
            </InputContainer>
            {isOpenModal && (
                <DatePickerModal initialDate={isInput} onClose={handleCloseModal} onSelectDate={onSelectedDate} />
            )}
        </>
    );
}

export default DateInput;
