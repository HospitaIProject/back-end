import React from 'react';

interface HorizontalProgressBarProps {
    percent: number; // 0에서 100 사이의 값
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = ({ percent }) => {
    return (
        <div className="w-full h-5 overflow-hidden bg-gray-200 rounded-full">
            {percent !== 0 && (
                <div
                    style={{ width: `${percent}%` }}
                    className="flex items-center justify-end h-full pr-2 text-xs font-medium text-center text-blue-100 bg-blue-500 rounded-full"
                >
                    {percent}%
                </div>
            )}
            {percent === 0 && (
                <div className="flex items-center justify-center w-full h-full text-xs font-medium text-center text-gray-700 rounded-full">
                    <span>0%</span>
                </div>
            )}
        </div>
    );
};

export default HorizontalProgressBar;
