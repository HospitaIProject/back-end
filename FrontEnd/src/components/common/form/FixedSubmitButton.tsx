type Props = {
    onClick: () => void;
    label: string;
};

function FixedSubmitButton({ onClick, label }: Props) {
    return (
        <div className="sticky bottom-0 z-10 mt-6 flex w-full bg-white py-2 shadow shadow-transparent">
            {/* 모바일에서 그림자가 sticky속성 사용시 그림자가 생기는 문제 해결 */}

            <button
                type="button"
                className="mx-auto w-full max-w-screen-mobile rounded-md bg-blue-500 px-8 py-3 text-white hover:bg-blue-600"
                onClick={onClick}
            >
                {label}
            </button>
        </div>
    );
}

export default FixedSubmitButton;
