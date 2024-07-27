import { getValueLabel } from '../utils/getNameByValue';

export const useOperationMethodFormatted = ({
    operationMethod,
    customOperationMethod,
}: {
    operationMethod: string[] | '';
    customOperationMethod: string[] | '';
}) => {
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
    const combinedString2 = Array.isArray(customOperationMethod)
        ? customOperationMethod
              .map((operation: string) =>
                  getValueLabel({
                      value: operation,
                      type: 'operation',
                  }),
              )
              .join(', ')
        : '';
    const combinedStringFinal = [combinedString, combinedString2].filter((str) => str !== '').join(', ');
    return combinedStringFinal;
};
