import React from 'react';
import ArrowIcon from '../../../icons/ArrowIcon';

interface DatePickerProps {
    date: Date;
    changeYear: (year: number) => void;
    changeMonth: (month: number) => void;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
    startYear: number;
    endYear: number;
}

const DatePickerHeader: React.FC<DatePickerProps> = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    startYear,
    endYear,
}) => {
    return (
        <div className="mb-6 flex w-full flex-row justify-center">
            <button className="mr-6" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                <ArrowIcon className="h-8 w-8 rotate-180 transform text-gray-500" />
            </button>
            <select
                className="mr-2 cursor-pointer text-xl font-medium text-green-500"
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(Number(value))}
            >
                {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map((year) => {
                    return (
                        <option key={year} value={year}>
                            {year}년
                        </option>
                    );
                })}
            </select>
            <select
                className="ml-2 cursor-pointer text-xl font-medium text-green-500"
                value={date.getMonth()}
                onChange={({ target: { value } }) => changeMonth(Number(value))}
            >
                {[...Array(12)].map((_, i) => (
                    <option key={i} value={i}>
                        {new Date(0, i).toLocaleString('ko', { month: 'long' })}
                    </option>
                ))}
            </select>
            <button className="ml-6" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                <ArrowIcon className="h-8 w-8 text-gray-500" />
            </button>
        </div>
    );
};

export default DatePickerHeader;
