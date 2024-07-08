import React from 'react';
type Props = {
    children: React.ReactNode;
    isOpen: boolean;
};

function DropContainer({ children, isOpen }: Props) {
    return (
        <>
            <div className={`flex w-full flex-col items-center gap-6 ${isOpen ? '' : 'hidden'}`}>{children}</div>
        </>
    );
}

export default DropContainer;
