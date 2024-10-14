import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';

const getExcel = async (): Promise<Blob> => {
    const reponse = await Axios.get('/excel', {
        responseType: 'blob', // Blob으로 응답받기
    });
    return reponse.data;
};

//----------------------------------------------hooks----------------------------------------------
export const useExcelQuery = ({ enabled = false }: { enabled: boolean }) => {
    const query = useQuery<Blob, AxiosError<ErrorResponseType>>({
        queryKey: ['excel'],
        queryFn: getExcel,
        enabled: enabled,
    });
    return query;
};
