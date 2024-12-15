import dayjs from 'dayjs';
import { useEffect } from 'react';
import { pushNotification } from '../utils/pushNotification';

interface Props {
    refetch: () => void;
    targetHour: number;
    targetMinute: number;
    text: string;
}

export const useRefreshAtSpecificTime = ({ refetch, targetHour, targetMinute, text }: Props) => {
    useEffect(() => {
        const interval = setInterval(() => {
            const now = dayjs();
            let targetTime = dayjs().hour(targetHour).minute(targetMinute).second(0); // 목표 시간 설정

            // 목표 시간이 이미 지나면 내일로 설정
            if (now.isAfter(targetTime)) {
                targetTime = targetTime.add(1, 'day');
            }

            const timeToTarget = targetTime.diff(now); // 목표 시간까지 남은 밀리초

            // 목표 시간이 되면 새로고침
            if (timeToTarget <= 0) {
                refetch();
                pushNotification({
                    msg: text,
                    type: 'success',
                    theme: 'dark',
                });
            }
        }, 1000); // 1초마다 확인

        // 컴포넌트 언마운트 시 인터벌 클리어
        return () => clearInterval(interval);
    }, [targetHour, targetMinute, refetch]);
};
