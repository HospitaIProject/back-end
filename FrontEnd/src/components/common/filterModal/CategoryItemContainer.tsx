//test

import React from 'react';

type Props = {
    children: React.ReactNode;
    onClick: () => void;
    isActive: boolean;
};

function CategoryItemContainer({ children, onClick, isActive }: Props) {
    return (
        <button
            onClick={onClick}
            className={`rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${isActive ? 'border border-blue-500 text-blue-500' : 'border border-transparent bg-gray-100 text-gray-700'}`}
        >
            {children}
        </button>
    );
}

export default CategoryItemContainer;
