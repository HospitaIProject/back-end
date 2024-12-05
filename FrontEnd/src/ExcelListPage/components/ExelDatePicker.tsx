import DatePicker, { CalendarContainer } from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerHeader from '../../components/common/datePicker/DatePickerHeader';
import ExelDatePickerInput from './ExelDatePickerInput';

function ExelDatePicker({ onChange, date }: { date: Date | null; onChange: (date: Date | null) => void }) {
    const defaultEndDate = new Date();

    const handleChange = (newStartDate: Date | null) => {
        onChange(newStartDate);
    };
    return (
        <div className="w-full max-w-52">
            <DatePicker
                selected={date}
                // startDate={startDate}
                // endDate={endDate}
                maxDate={defaultEndDate}
                onChange={handleChange}
                withPortal
                locale={ko}
                dateFormat="yyyy-MM-dd"
                placeholderText="전체"
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
                        startYear={new Date().getFullYear() - 50}
                        endYear={new Date().getFullYear()}
                    />
                )}
                customInput={
                    <ExelDatePickerInput
                        value={date ? date.toLocaleDateString() : ''}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    />
                }
                calendarContainer={({ children }) => (
                    <CalendarContainer className="overflow-hidden rounded-lg border border-gray-300 bg-white p-2 shadow-lg">
                        {children}
                    </CalendarContainer>
                )}
                monthClassName={() => 'text-lg rounded-md border  py-2'}
                // showIcon
                // icon={
                //     <svg
                //         className="text-gray-500"
                //         xmlns="http://www.w3.org/2000/svg"
                //         width="0.9em"
                //         height="0.9em"
                //         viewBox="-2 -2 48 48"
                //     >
                //         <mask id="ipSApplication0">
                //             <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                //                 <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                //                 <path
                //                     fill="#fff"
                //                     d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                //                 ></path>
                //             </g>
                //         </mask>
                //         <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSApplication0)"></path>
                //     </svg>
                // }
            />
        </div>
    );
}

export default ExelDatePicker;
