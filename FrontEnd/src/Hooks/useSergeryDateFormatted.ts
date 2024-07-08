import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko'); // 기본 로케일을 한국어로 설정합니다.

// D-day 계산 및 형식 지정하는 커스텀 훅
const useSurgeryDayFormat = (date: string) => {
    if (!date)
        return {
            diffDay: '',
        }; // date가 없으면 빈 문자열 반환
    const today = dayjs(); // 현재 날짜
    const surgeryDay = dayjs(date); // 수술 날짜

    const diffDay = surgeryDay.diff(today, 'day'); // 수술 날짜와 현재 날짜의 차이

    return {
        diffDay: diffDay,
    };
};

export default useSurgeryDayFormat;
