import { CalendarContainer } from 'react-datepicker';

const MyContainer = ({ className, children }: { className?: any; children: React.ReactNode }) => {
    return (
        <CalendarContainer className={className}>
            <div className="flex flex-col w-full">
                <div style={{ position: 'relative' }}>{children}</div>
                <div className="flex flex-row items-center gap-2 pl-5 mt-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-lg" />
                    <span>Today</span>
                </div>
                {/* <span className="flex flex-row justify-end w-full pr-4">최대 3개월 이내의 날짜만 신청 가능합니다.</span> */}
            </div>
        </CalendarContainer>
    );
}; //날짜 선택 컨테이너

export default MyContainer;
