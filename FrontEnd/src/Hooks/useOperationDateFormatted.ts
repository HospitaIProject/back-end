import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko'); // 기본 로케일을 한국어로 설정합니다.

// D-day 계산 및 형식 지정하는 커스텀 훅
const useOperationDayFormat = (date: string, writeDate?: string) => {
    if (!date)
        return {
            diffDay: '',
        }; // date가 없으면 빈 문자열 반환
    const today = dayjs().startOf('day'); // 현재 날짜의 시간을 제거
    const operationDay = dayjs(date).startOf('day'); // 수술 날짜의 시간을 제거

    const diffDay = operationDay.diff(today, 'day'); // 수술 날짜와 현재 날짜의 차이

    if (writeDate) {
        const writeDay = dayjs(writeDate).startOf('day'); // 글쓴 날짜의 시간을 제거
        const writeDiffDay = operationDay.diff(writeDay, 'day'); // 글쓴 날짜와 수술 날짜의 차이

        return {
            writeDiffDay: writeDiffDay,
        };
    }
    return {
        diffDay: diffDay,
    };
};

export default useOperationDayFormat;
