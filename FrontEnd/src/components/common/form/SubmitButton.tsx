type Props = {
    onClick: () => void;
    label: string;
};

function SubmitButton({ onClick, label }: Props) {
    return (
        <div className="mt-4 flex w-full">
            <button
                type="button"
                onClick={onClick}
                className="mx-auto w-full max-w-screen-mobile rounded-md bg-blue-500 px-8 py-3 text-white hover:bg-blue-600"
            >
                {label}
            </button>
        </div>
    );
}

export default SubmitButton;
