import React, { useState, useEffect, ReactNode } from 'react';

interface Props {
    interval?: number;
    values: any[];
    children: (value: any) => ReactNode;
}

const ChangingProgressProvider: React.FC<Props> = ({ interval = 300, values, children }) => {
    const [valuesIndex, setValuesIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setTimeout(() => {
            setValuesIndex((prevIndex) => (prevIndex + 1) % values.length);
        }, interval);

        return () => clearTimeout(intervalId);
    }, [interval, values.length]);

    return children(values[valuesIndex]);
};

export default ChangingProgressProvider;
