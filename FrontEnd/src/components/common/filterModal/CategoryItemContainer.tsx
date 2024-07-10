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
            className={`rounded-full px-4 py-3 text-sm font-medium ${isActive ? 'border border-pink-500 text-pink-500' : 'bg-gray-100 text-gray-700'}`}
        >
            {children}
        </button>
    );
}

export default CategoryItemContainer;
