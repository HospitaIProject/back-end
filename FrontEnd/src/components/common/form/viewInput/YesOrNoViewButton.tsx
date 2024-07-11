// import { checkListFormType } from '../../../../models/FormType';

import InputViewContainer from './InputViewContainer';

type Props = {
    label: string;
    value: 'YES' | 'NO' | '' | undefined;
    remark?: string;
    isRender?: boolean;
};

function YesOrNoViewButton({ label, value, remark, isRender }: Props) {
    return (
        <InputViewContainer label={label} remark={remark} isRender={isRender}>
            {/* <div className={`ml-2 flex flex-grow justify-end gap-1 rounded-lg`}>
                <span className={`text-md h-7 ${value === 'YES' ? 'font-semibold text-blue-500' : 'text-gray-400'}`}>
                    Yes
                </span>
                <span>/</span>
                <span
                    className={`text-md h-7 border-gray-300 ${value === 'NO' ? 'font-semibold text-blue-500' : 'text-gray-400'}`}
                >
                    No
                </span>
            </div> */}
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
