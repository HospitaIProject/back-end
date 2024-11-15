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
            <div className="w-full h-5 overflow-hidden bg-blue-200 rounded-full">
                {percent !== 0 && (
                    <div
                        style={{ width: `${percent}%` }}
                        className="relative flex items-center justify-end h-full pr-3 text-xs font-medium text-center text-blue-100 bg-blue-600 rounded-full"
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
                    <div className="flex items-center justify-center w-full h-full text-xs font-medium text-center text-gray-700 rounded-full">
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
