import InputViewContainer from './InputViewContainer';

type Props = {
    label: string;
    value: string | '';
    remark?: string; //비고
};

function ViewInput({ label, value, remark }: Props) {
    return (
        <InputViewContainer label={label} remark={remark}>
            <span className="font-medium text-blue-700">{value}</span>
        </InputViewContainer>
    );
}

export default ViewInput;
