import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 플러그인 등록
dayjs.extend(utc);
dayjs.extend(timezone);

// 날짜 비교용 상수
export const DateComparison = {
    Before: 'PREV',
    After: 'POST',
    Today: 'TODAY',
};

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

    // 한국 시간(Asia/Seoul) 기준으로 날짜 처리
    const seoulTime = dayjs.tz(date, 'Asia/Seoul');
    let allDate;
    let onlyDate;
    let onlyTime;
    const relativeDate = seoulTime.fromNow(); // 상대적인 시간

    if (FormatType === 'DETAIL') {
        allDate = seoulTime.format('YYYY년 MM월 DD일 HH시 mm분'); // 날짜와 시간을 표시
        onlyDate = seoulTime.format('YYYY년 MM월 DD일'); // 날짜만 표시
        onlyTime = seoulTime.format('HH시 mm분'); // 시간만 표시
    } else {
        allDate = seoulTime.format('YYYY-MM-DD  HH:mm');
        onlyDate = seoulTime.format('YYYY-MM-DD');
        onlyTime = seoulTime.format('HH:mm');
    }

    // 오늘 날짜와 비교 (한국 시간 기준)
    const today = dayjs().tz('Asia/Seoul').startOf('day');
    const comparisonDate = seoulTime.startOf('day');

    let dateComparison;
    if (today.isBefore(comparisonDate, 'day')) {
        dateComparison = DateComparison.Before; // 오늘보다 받은 날짜가 이후면 'POST'
    } else if (today.isAfter(comparisonDate, 'day')) {
        dateComparison = DateComparison.After; // 오늘보다 받은 날짜가 이전이면 'PREV'
    } else {
        dateComparison = DateComparison.Today; // 같으면 'TODAY'
    }

    return {
        allDate,
        relativeDate,
        onlyDate,
        onlyTime,
        dateComparison, // 비교 결과 추가
    };
};
