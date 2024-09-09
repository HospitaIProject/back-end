import React from 'react';

type Props = {
    children: React.ReactNode;
    label: string;
    remark?: string;
    isRender?: boolean;
    etcComponent?: React.ReactNode;
    isDivided?: boolean;
};

function InputViewContainer({ children, label, remark, isRender = true, etcComponent, isDivided = true }: Props) {
    return (
        <div
            className={`flex flex-col gap-2 ${isDivided ? 'border-b' : ''} border-gray-200 p-1 py-2 mobile:flex-row mobile:gap-10 tablet:flex-col tablet:gap-2 ${isRender ? '' : 'hidden'}`}
        >
            <div className="flex flex-row gap-3 tablet:gap-10">
                <span className="inline-block text-sm font-medium text-gray-800 break-words mobile:w-52 mobile:text-base">
                    {label}:
                </span>
                <div
                    className={`flex flex-grow flex-row items-center justify-end gap-2 border-gray-300 text-sm text-gray-500 mobile:flex-grow-0 mobile:items-start`}
                >
                    {children}
                </div>
            </div>
            {etcComponent}
            {remark && (
                <span className="text-sm text-gray-500 tablet:">
                    <span className="mr-2 text-red-500">*</span>
                    {remark}
                </span>
            )}
        </div>
    );
}

export default InputViewContainer;
