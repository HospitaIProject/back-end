type Props = {
    onClick: () => void;
    label: string;
};

function SubmitButton({ onClick, label }: Props) {
    return (
        <div className="flex w-full p-3 my-auto">
            <button
                type="button"
                onClick={onClick}
                className="w-full px-8 py-3 mx-auto text-white bg-blue-500 rounded-md max-w-screen-mobile hover:bg-blue-600"
            >
                {label}
            </button>
        </div>
    );
}

export default SubmitButton;
