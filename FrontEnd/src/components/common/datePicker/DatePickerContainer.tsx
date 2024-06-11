import { CalendarContainer } from 'react-datepicker';

const MyContainer = ({ className, children }: { className?: any; children: React.ReactNode }) => {
    return (
        <CalendarContainer className={className}>
            <div className="flex w-full flex-col">
                <div style={{ position: 'relative' }}>{children}</div>
                <div className="mt-2 flex flex-row items-center gap-2 pl-5">
                    <div className="h-3 w-3 rounded-lg bg-blue-500" />
                    <span>Today</span>
                </div>
                {/* <span className="flex flex-row justify-end w-full pr-4">최대 3개월 이내의 날짜만 신청 가능합니다.</span> */}
            </div>
        </CalendarContainer>
    );
}; //날짜 선택 컨테이너

export default MyContainer;
