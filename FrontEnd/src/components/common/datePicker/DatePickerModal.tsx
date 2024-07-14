import ModalFullScreenContainer from '../ModalFullScreenContainer';

import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import DatePickerHeader from './DatePickerHeader';
import MyContainer from './DatePickerContainer';

type Props = {
    minDate?: Date;
    initialDate?: Date;
    onClose: () => void;
    onSelectDate: (date: Date) => void;
};

function DatePickerModal({ initialDate, onClose, onSelectDate, minDate }: Props) {
    const [selectDate, setSelectDate] = useState<Date | null>(minDate ? minDate : new Date()); //선택된 날짜

    const handleChangeDate = () => {
        if (selectDate === null) return;
        onSelectDate(selectDate);
    };

    useEffect(() => {
        if (initialDate) setSelectDate(initialDate);
    }, [initialDate]);

    return (
        <ModalFullScreenContainer title="날짜 선택" onClose={onClose} maxWidthClassName="max-w-[650px]">
            <div className="flex flex-col w-full">
                <DatePicker
                    selected={selectDate}
                    locale={ko}
                    onChange={(date) => setSelectDate(date)}
                    inline
                    calendarContainer={MyContainer}
                    disabledKeyboardNavigation
                    scrollableYearDropdown
                    showYearDropdown
                    yearDropdownItemNumber={15} // 현재 년도를 중심으로 앞뒤로 15년을 표시
                    minDate={minDate}
                    renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                    }) => (
                        <DatePickerHeader
                            date={date}
                            changeYear={changeYear}
                            changeMonth={changeMonth}
                            decreaseMonth={decreaseMonth}
                            increaseMonth={increaseMonth}
                            prevMonthButtonDisabled={prevMonthButtonDisabled}
                            nextMonthButtonDisabled={nextMonthButtonDisabled}
                        />
                    )}
                />
                <div className="sticky bottom-0 flex justify-end w-full p-5 mt-auto bg-white">
                    <button
                        onClick={handleChangeDate}
                        type="button"
                        className="px-8 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        선택하기
                    </button>
                </div>
            </div>
        </ModalFullScreenContainer>
    );
}

export default DatePickerModal;
