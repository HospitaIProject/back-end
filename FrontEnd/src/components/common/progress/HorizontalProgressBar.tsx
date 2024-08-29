import React from 'react';

interface HorizontalProgressBarProps {
    percent: number; // 0에서 100 사이의 값
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = ({ percent }) => {
    const isOverHalf = percent >= 15;
    return (
        <div className="h-5 w-full overflow-hidden rounded-full bg-blue-200">
            {percent !== 0 && (
                <div
                    style={{ width: `${percent}%` }}
                    className="relative flex h-full items-center justify-end rounded-full bg-blue-600 pr-3 text-center text-xs font-medium text-blue-100"
                >
                    <span className={`${isOverHalf ? '' : 'hidden'}`}>{percent}%</span>
                    <span className={`${isOverHalf ? 'hidden' : ''} absolute -right-11 font-semibold text-blue-700`}>
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
    );
};

export default HorizontalProgressBar;
