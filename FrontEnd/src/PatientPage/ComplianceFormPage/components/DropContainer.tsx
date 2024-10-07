import React from 'react';
type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    readOnly?: boolean;
};

function DropContainer({ children, isOpen, readOnly }: Props) {
    return (
        <>
            <div
                className={`flex w-full ${readOnly ? 'pointer-events-none' : ''} flex-col items-center gap-6 ${isOpen ? '' : 'hidden'}`}
            >
                {children}
            </div>
        </>
    );
}

export default DropContainer;
