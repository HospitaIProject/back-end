import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko'); // 기본 로케일을 한국어로 설정합니다.

enum DateComparison {
    Before = 'PREV',
    Today = 'TODAY',
    After = 'POST',
}

export const useDateFormatted = (date: Date | string | '', FormatType?: 'SIMPLE' | 'DETAIL') => {
    if (typeof date === 'string' && date.includes('T')) {
        date = new Date(date);
    }

    if (!date)
        return {
            allDate: '',
            relativeDate: '',
            onlyDate: '',
            onlyTime: '',
            dateComparison: '', // 기본값 설정
        };
    let allDate; // 날짜와 시간을 표시합니다.
    let onlyDate; // 날짜만 표시합니다.
    let onlyTime; // 시간만 표시합니다.
    const relativeDate = dayjs(date).fromNow(); // 상대적인 시간을 표시합니다.
    if (FormatType === 'DETAIL') {
        allDate = dayjs(date).format('YYYY년 MM월 DD일 HH시 mm분'); // 날짜와 시간을 표시합니다.
        onlyDate = dayjs(date).format('YYYY년 MM월 DD일'); // 날짜만 표시합니다.
        onlyTime = dayjs(date).format('HH시 mm분'); // 시간만 표시합니다.
    } else {
        allDate = dayjs(date).format('YYYY-MM-DD  HH:mm');
        onlyDate = dayjs(date).format('YYYY-MM-DD');
        onlyTime = dayjs(date).format('HH:mm');
    }

    // 오늘 날짜와 비교
    const today = dayjs().startOf('day');
    const comparisonDate = dayjs(date).startOf('day');
    let dateComparison;
    if (today.isBefore(comparisonDate, 'day')) {
        dateComparison = DateComparison.Before; //오늘보다 받은 날짜가 이전이면 PREV
    } else if (today.isAfter(comparisonDate, 'day')) {
        //오늘보다 받은 날짜가 이후이면 POST
        dateComparison = DateComparison.After;
    } else {
        dateComparison = DateComparison.Today;
    }

    return {
        allDate,
        relativeDate,
        onlyDate,
        onlyTime,
        dateComparison, // 비교 결과 추가, 받은 날짜 기준으로 오늘보다 이전이면 PREV, 이후면 POST, 같으면 TODAY
    };
};
