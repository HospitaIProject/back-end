import InputViewContainer from './InputViewContainer';

type Props = {
    label: string;
    value: 'YES' | 'NO' | '' | undefined;
    remark?: string;
    isRender?: boolean;
    etcComponent?: React.ReactNode;
    isDivided?: boolean;
};

function YesOrNoViewButton({ label, value, remark, isRender, etcComponent, isDivided }: Props) {
    return (
        <InputViewContainer
            isDivided={isDivided}
            label={label}
            remark={remark}
            isRender={isRender}
            etcComponent={etcComponent}
        >
            <div className={`flex flex-grow justify-end`}>
                <div className="flex flex-row w-20">
                    <button
                        type="button"
                        className={`h-6 flex-1 rounded-l-md border-r border-gray-300 text-sm ${value === 'YES' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        className={`h-6 flex-1 rounded-r-md border-l border-gray-300 text-sm ${value === 'NO' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                        No
                    </button>
                </div>
            </div>
        </InputViewContainer>
    );
}

export default YesOrNoViewButton;
