export const useOperationMethodFormatted = ({ operationMethod }: { operationMethod: string[] | '' }) => {
    const combinedString = Array.isArray(operationMethod) ? operationMethod.join(', ') : '';

    return combinedString;
};
