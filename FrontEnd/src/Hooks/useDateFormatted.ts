import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko'); // 기본 로케일을 한국어로 설정합니다.

export const useDateFormatted = (date: Date | '') => {
    if (!date)
        return {
            allDate: '',
            relativeDate: '',
            onlyDate: '',
            onlyTime: '',
        };
    const allDate = dayjs(date).format('YYYY년 MM월 DD일 HH시 mm분'); // 날짜와 시간을 표시합니다.
    const relativeDate = dayjs(date).fromNow(); // 상대적인 시간을 표시합니다.
    const onlyDate = dayjs(date).format('YYYY년 MM월 DD일'); // 날짜만 표시합니다.
    const onlyTime = dayjs(date).format('HH시 mm분'); // 시간만 표시합니다.

    return {
        allDate,
        relativeDate,
        onlyDate,
        onlyTime,
    };
};
