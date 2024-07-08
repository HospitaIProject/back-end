import InputViewContainer from './InputViewContainer';

type Props = {
    label: string;
    value: string | '' | undefined;
    remark?: string; //비고
    isRender?: boolean;
};

function ViewInput({ label, value, remark, isRender }: Props) {
    return (
        <InputViewContainer label={label} remark={remark} isRender={isRender}>
            <span className="font-medium text-blue-700">{value}</span>
        </InputViewContainer>
    );
}

export default ViewInput;
