import { useState } from 'react';
import DatePickerModal from '../../../components/common/datePicker/DatePickerModal';
import CalendarIcon from '../../../icons/CalendarIcon';

interface Props {
    onSelectedDate: (date: Date) => void;
    minDate?: Date;
    initialDate?: string;
    isDisabled?: boolean;
}

function DatePickerButton({ onSelectedDate, minDate, initialDate, isDisabled }: Props) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const initialDateObj = initialDate ? new Date(initialDate) : null;

    return (
        <>
            <button
                className={` ${isDisabled ? 'pointer-events-none cursor-not-allowed text-gray-400' : 'cursor-pointer text-blue-500'} `}
                onClick={() => setIsOpenModal(true)}
            >
                <CalendarIcon className="w-5 h-5" />
            </button>
            {isOpenModal && (
                <DatePickerModal
                    minDate={minDate}
                    initialDate={initialDateObj || minDate}
                    onClose={() => setIsOpenModal(false)}
                    onSelectDate={onSelectedDate}
                    description={`*수술일 부터 선택 가능합니다.`}
                />
            )}
        </>
    );
}

export default DatePickerButton;
