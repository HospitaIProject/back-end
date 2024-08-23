import { getValueLabel } from '../utils/getNameByValue';

export const useOperationMethodFormatted = ({ operationMethod }: { operationMethod: string[] | '' }) => {
    const combinedString = Array.isArray(operationMethod)
        ? operationMethod
              .map((operation: string) =>
                  getValueLabel({
                      value: operation,
                      type: 'operation',
                  }),
              )
              .join(',')
        : '';

    return combinedString;
};
