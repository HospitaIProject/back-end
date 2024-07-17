import InputViewContainer from './InputViewContainer';

type Props = {
    label: string;
    unit?: string;
    value: number | '' | undefined;
    remark?: string; //비고
    isRender?: boolean;
};

function NumberViewInput({ label, unit, value, remark, isRender }: Props) {
    return (
        <InputViewContainer isRender={isRender} label={label} remark={remark}>
            <div
                className={`flex flex-grow flex-row items-center justify-end gap-2 border-gray-300 text-sm text-gray-500`}
            >
                <span className="font-medium text-blue-700">
                    {value} <span className={`text-gray-600 ${unit ? '' : 'hidden'}`}>{unit}</span>
                </span>
            </div>
        </InputViewContainer>
    );
}

export default NumberViewInput;
