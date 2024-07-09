import React from 'react';
import { Link } from 'react-router-dom';

function DetailViewContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full gap-1 pt-1 bg-gray-100">
            <div className="flex flex-row items-center justify-between w-full gap-3 px-5 py-2 bg-white border-y">
                <span className="text-gray-600">{/* 환자명:&nbsp;<span className="">{patientName}</span> */}</span>
                <div className="flex flex-row gap-3">
                    <button className="text-gray-400">
                        <span>삭제</span>
                    </button>
                    <span className="text-gray-400">|</span>

                    <button className="text-green-500">
                        <span>수정</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-full p-4 bg-white">{children}</div>
        </div>
    );
}

export default DetailViewContainer;
