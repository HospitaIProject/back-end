import InputViewContainer from './InputViewContainer';

type Props = {
    label: string;
    value: string | '';
    remark?: string; //비고
};

function ViewInput({ label, value, remark }: Props) {
    return (
        <InputViewContainer label={label} remark={remark}>
            <div
                className={`flex flex-grow flex-row items-center justify-end gap-2 border-gray-300 text-sm text-gray-500`}
            >
                <span className="font-medium text-red-700">{value}</span>
            </div>
        </InputViewContainer>
    );
}

export default ViewInput;
