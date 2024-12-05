import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import { ExelType } from '../../models/ExelType';

const getExcel = async ({ operationIds }: { operationIds: number[] }): Promise<Blob> => {
    const params = operationIds.map((id) => `operationIds=${id}`).join('&'); // operationIds=3&operationIds=10&operationIds=19
    const response = await Axios.get(`/api/excel?${params}`, { responseType: 'blob' });
    return response.data;
};
const getExcels = async ({ startDate, endDate }: { startDate: string; endDate: string }): Promise<ExelType[]> => {
    const params = {
        startDate: startDate,
        endDate: endDate,
    };
    const response = await Axios.get('/api/excels', { params });
    return response.data.data;
};

//----------------------------------------------hooks----------------------------------------------
export const useExcelQuery = ({ enabled = false, operationIds }: { enabled: boolean; operationIds: number[] }) => {
    const query = useQuery<Blob, AxiosError<ErrorResponseType>>({
        queryKey: ['excel'],
        queryFn: () => getExcel({ operationIds }),
        enabled: enabled,
    });
    return query;
};

export const useExcelsQuery = ({ endDate, startDate }: { startDate: string; endDate: string }) => {
    const query = useQuery<ExelType[], AxiosError<ErrorResponseType>>({
        queryKey: ['excels', startDate, endDate],
        queryFn: () => getExcels({ startDate, endDate }),
    });
    return query;
};
