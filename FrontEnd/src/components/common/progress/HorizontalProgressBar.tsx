import React from 'react';

interface HorizontalProgressBarProps {
    percent: number; // 0에서 100 사이의 값
    total: number; // 전체 수
    completed: number; // 완료된 수
    checkListTotalCompeleted: number;
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = ({
    percent,
    total,
    completed,
    checkListTotalCompeleted,
}) => {
    const isOverHalf = percent >= 15;
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="h-5 w-full overflow-hidden rounded-full bg-blue-200">
                {percent !== 0 && (
                    <div
                        style={{ width: `${percent}%` }}
                        className="relative flex h-full items-center justify-end rounded-full bg-blue-600 pr-3 text-center text-xs font-medium text-blue-100"
                    >
                        <span className={`${isOverHalf ? '' : 'hidden'}`}>{percent}%</span>
                        <span
                            className={`${isOverHalf ? 'hidden' : ''} absolute -right-11 font-semibold text-blue-700`}
                        >
                            {percent}%
                        </span>
                    </div>
                )}
                {percent === 0 && (
                    <div className="flex h-full w-full items-center justify-center rounded-full text-center text-xs font-medium text-gray-700">
                        <span>0%</span>
                    </div>
                )}
            </div>
            <span className="flex flex-row gap-[2px] text-sm text-gray-600">
                작성된 체크리스트 <span className="font-medium text-blue-600">{checkListTotalCompeleted}</span>
                건,&nbsp;
                <span className="font-medium text-blue-600">
                    {completed} <span className="text-xs">/</span> {total}
                </span>
                {/* 총
                항목 <span className="font-semibold text-blue-600">{total}</span>개 중{' '}
                <span className="font-semibold text-blue-600">{completed}</span>개 완료 */}
            </span>
        </div>
    );
};

export default HorizontalProgressBar;
