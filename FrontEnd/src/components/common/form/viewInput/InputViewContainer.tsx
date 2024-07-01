import React from 'react';

type Props = {
    children: React.ReactNode;
    label: string;
    remark?: string;
};

function InputViewContainer({ children, label, remark }: Props) {
    return (
        <div className="flex flex-col gap-2 border-b p-1 pb-2">
            <div className="flex flex-row gap-1">
                <span className="text-md inline-block break-words font-semibold text-gray-700">{label}</span>
                {children}
            </div>
            {remark && (
                <span className="text-sm text-gray-500">
                    <span className="mr-2 text-red-500">*</span>
                    {remark}
                </span>
            )}
        </div>
    );
}

export default InputViewContainer;
