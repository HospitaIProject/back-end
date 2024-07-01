import React from 'react';

type Props = {
    children: React.ReactNode;
    label: string;
    remark?: string;
};

function InputViewContainer({ children, label, remark }: Props) {
    return (
        <div className="flex flex-col gap-2 border-b p-1 py-4 mobile:flex-row mobile:gap-10 tablet:gap-20">
            <div className="flex flex-row gap-1 tablet:gap-20">
                <span className="text-md inline-block break-words font-semibold text-gray-700 mobile:w-72">
                    {label}
                </span>
                <div
                    className={`flex flex-grow flex-row items-center justify-end gap-2 border-gray-300 text-sm text-gray-500 mobile:flex-grow-0 mobile:items-start`}
                >
                    {children}
                </div>
            </div>
            {remark && (
                <span className="tablet: text-sm text-gray-500">
                    <span className="mr-2 text-red-500">*</span>
                    {remark}
                </span>
            )}
        </div>
    );
}

export default InputViewContainer;
