import { forwardRef, MouseEventHandler } from 'react';
import CalendarIcon from '../../icons/CalendarIcon';

interface ExampleCustomInputProps {
    value: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

// forwardRef를 사용하여 컴포넌트 생성
const ExampleCustomInput = forwardRef<HTMLButtonElement, ExampleCustomInputProps>(({ value, onClick }, ref) => (
    <button
        className="flex w-full items-center justify-between overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm text-gray-500"
        onClick={onClick}
        ref={ref}
    >
        {value}
        <CalendarIcon className="h-4 w-4" />
    </button>
));

export default ExampleCustomInput;
