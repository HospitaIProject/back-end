import { CalendarContainer } from 'react-datepicker';

const ExelDatePickerContainer = ({ className, children }: { className?: any; children: React.ReactNode }) => {
    return (
        <CalendarContainer className={className}>
            <div className="flex w-full flex-col">
                <div style={{ position: 'relative' }}>{children}</div>

                {/* <span className="flex flex-row justify-end w-full pr-4">{date.getFullYear()}</span> */}
            </div>
        </CalendarContainer>
    );
}; //날짜 선택 컨테이너

export default ExelDatePickerContainer;
