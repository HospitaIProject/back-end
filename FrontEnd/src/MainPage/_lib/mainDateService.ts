import { AxiosError } from 'axios';
import Axios from '../../utils/axiosInstance';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import { useQuery } from '@tanstack/react-query';

export type MainDateType = {
    [year: string]: number[];
};

const getMainDate = async (): Promise<MainDateType> => {
    const response = await Axios.get(`/api/patients/operationDates`);
    return response.data.data;
};

//-----------------hooks-----------------

export const useMainDateQuery = () => {
    const query = useQuery<MainDateType, AxiosError<ErrorResponseType>>({
        queryKey: ['mainDate'],
        queryFn: getMainDate,
        staleTime: 1000 * 60 * 60 * 1, // 1 hour
        gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return query;
};
