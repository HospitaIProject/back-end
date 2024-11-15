import InputViewContainer from './InputViewContainer';

type Props = {
    label: string;
    values: { value?: string | number | ''; label: string | '' }[] | undefined;
    remark?: string; //비고
    isRender?: boolean;
};

function MultiViewInput({ label, values, remark, isRender }: Props) {
    return (
        <InputViewContainer label={label} remark={remark} isRender={isRender}>
            <div className="flex flex-col flex-grow gap-1">
                {values?.map((value, index) => {
                    return (
                        <div key={index} className="flex flex-row items-center gap-2 text-sm">
                            <span className="text-gray-700">{value.label}</span>
                            <span className="font-medium text-blue-700">
                                {value.value === '' || value.value === null ? '미선택' : value.value}
                            </span>
                        </div>
                    );
                })}
            </div>
        </InputViewContainer>
    );
}

export default MultiViewInput;
