import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { PatientWithOperationDtoType } from '../../models/PatientType';

const getPatientList = async (): Promise<PatientWithOperationDtoType[]> => {
    const response = await Axios.get('api/patients');
    return response.data.data;
};
export const usePatientListQuery = () => {
    const query = useQuery<PatientWithOperationDtoType[]>({
        queryKey: ['patient', 'list'],
        queryFn: getPatientList,
    });
    return query;
};
