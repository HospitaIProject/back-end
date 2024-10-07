type Props = {
    onClick?: () => void;
    label: string;
    className?: string;
    buttonColorClassName?: string;
    type?: 'submit' | 'button';
};

function FixedSubmitButton({
    onClick,
    label,
    className,
    type = 'button',
    buttonColorClassName = 'bg-blue-500',
}: Props) {
    return (
        <div
            className={`${className} sticky bottom-0 z-10 mt-auto flex w-full bg-white shadow shadow-transparent tablet:col-span-2`}
        >
            {/* 모바일에서 그림자가 sticky속성 사용시 그림자가 생기는 문제 해결 */}

            <button
                type={type}
                className={`w-full ${buttonColorClassName} mx-auto max-w-screen-mobile rounded-md px-8 py-3 text-white hover:bg-blue-600`}
                onClick={onClick}
            >
                {label}
            </button>
        </div>
    );
}

export default FixedSubmitButton;
