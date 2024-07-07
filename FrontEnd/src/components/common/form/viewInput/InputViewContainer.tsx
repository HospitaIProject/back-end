import React from 'react';

type Props = {
    children: React.ReactNode;
    label: string;
    remark?: string;
};

function InputViewContainer({ children, label, remark }: Props) {
    return (
        <div className="flex flex-col gap-2 p-1 py-2 border-b border-gray-200 mobile:flex-row mobile:gap-10 tablet:gap-20">
            <div className="flex flex-row gap-3 tablet:gap-10">
                <span className="inline-block font-medium text-gray-700 break-words mobile:w-52">{label}:</span>
                <div
                    className={`flex flex-grow flex-row items-center justify-end gap-2 border-gray-300 text-sm text-gray-500 mobile:flex-grow-0 mobile:items-start`}
                >
                    {children}
                </div>
            </div>
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
