import React from 'react';

interface Props {
    children: React.ReactNode;
    deleteHandler?: () => void;
    updateHandler?: () => void;
    deleteButton?: boolean;
}

function DetailViewContainer({ children, deleteHandler, updateHandler, deleteButton = true }: Props) {
    return (
        <div className="flex w-full flex-col gap-1 bg-gray-100 pt-1">
            <div className="flex w-full flex-row items-center justify-between gap-3 border-y bg-white px-5 py-2">
                <span className="text-gray-600">{/* 환자명:&nbsp;<span className="">{patientName}</span> */}</span>
                <div className="flex flex-row items-center gap-3">
                    {deleteButton && (
                        <button className="text-gray-400" onClick={deleteHandler}>
                            <span>삭제</span>
                        </button>
                    )}
                    <span className="text-gray-400">|</span>

                    <button className="text-green-500" onClick={updateHandler}>
                        <span>수정</span>
                    </button>
                </div>
            </div>
            <div className="flex w-full flex-col bg-white px-4 py-2">{children}</div>
        </div>
    );
}

export default DetailViewContainer;
