import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from './ChangingProgressProvider';

function DonutProgressbar({ percent, className, unit }: { percent: number; className: string; unit: string }) {
    return (
        <div className={`className relative flex items-center justify-center ${className}`}>
            <ChangingProgressProvider values={[0, percent]}>
                {(percentage) => (
                    <CircularProgressbar
                        value={percentage}
                        strokeWidth={13}
                        className="progressbar"
                        styles={buildStyles({
                            textSize: '1rem',
                            strokeLinecap: 'round',
                            pathTransitionDuration: 0.5,

                            textColor: '#2B2D36',
                            pathColor: '#61DBB7',
                            trailColor: '#E3FFF3',
                        })}
                    />
                )}
            </ChangingProgressProvider>
            <span className="absolute text-xs font-semibold text-gray-700">
                {percent}
                {unit}
            </span>
        </div>
    );
}

export default DonutProgressbar;
