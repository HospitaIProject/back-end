import React from 'react';
import ArrowIcon from '../../icons/ArrowIcon';

interface DatePickerProps {
    date: Date;
    changeYear: (year: number) => void;
    increaseYear: () => void;
    decreaseYear: () => void;
    prevYearButtonDisabled: boolean;
    nextYearButtonDisabled: boolean;
}

const ExelDatePickerHeader: React.FC<DatePickerProps> = ({
    date,
    changeYear,
    increaseYear,
    decreaseYear,
    prevYearButtonDisabled,
    nextYearButtonDisabled,
}) => {
    return (
        <div className="flex w-full flex-row justify-center py-1">
            <button className="mr-6" onClick={decreaseYear} disabled={prevYearButtonDisabled}>
                <ArrowIcon className="h-8 w-8 rotate-180 transform text-gray-500" />
            </button>
            <select
                className="mr-2 cursor-pointer text-xl font-medium text-green-500"
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(Number(value))}
            >
                {[...Array(20)].map((_, i) => {
                    const year = new Date().getFullYear() - 10 + i;
                    return (
                        <option key={year} value={year}>
                            {year}년
                        </option>
                    );
                })}
            </select>

            <button className="ml-6" onClick={increaseYear} disabled={nextYearButtonDisabled}>
                <ArrowIcon className="h-8 w-8 text-gray-500" />
            </button>
        </div>
    );
};

export default ExelDatePickerHeader;
