import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from './ChangingProgressProvider';

const COLORS = {
    First: {
        pathColor: '#5F81FF',
        trailColor: '#DFE8FF',
    },
    Second: {
        trailColor: '#EAE3FF',
        pathColor: '#8161DB',
    },
    Third: {
        trailColor: '#E3F7FF',
        pathColor: '#6183DB',
    },
    Fourth: {
        trailColor: '#E3FFF3',
        pathColor: '#61DBB7',
    },
    Fifth: {
        trailColor: '#E3FAFF',
        pathColor: '#61CDDB',
    },
    Sixth: {
        trailColor: '#FFE3E3',
        pathColor: '#DB6161',
    },
};

function DonutProgressbar({
    percent,
    className,
    unit,
    color,
    textClassName,
}: {
    percent: number;
    className: string;
    unit: string;
    color: string;
    textClassName: string;
}) {
    const progressColor = COLORS[color as keyof typeof COLORS];
    return (
        <div className={`className relative flex items-center justify-center ${className}`}>
            <ChangingProgressProvider values={[0, percent]}>
                {(percentage) => (
                    <CircularProgressbar
                        value={percentage}
                        strokeWidth={13}
                        className="h-full w-full"
                        styles={buildStyles({
                            strokeLinecap: 'round',
                            pathTransitionDuration: 0.5,

                            textColor: '#2B2D36',
                            pathColor: progressColor.pathColor,
                            trailColor: progressColor.trailColor,
                        })}
                    />
                )}
            </ChangingProgressProvider>
            <span className={`absolute ${textClassName} font-medium text-gray-700`}>
                {percent}
                {unit}
            </span>
        </div>
    );
}

export default DonutProgressbar;
