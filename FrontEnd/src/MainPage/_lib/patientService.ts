import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { PatientType } from '../../models/PatientType';

const getPatientList = async (): Promise<PatientType[]> => {
    const response = await Axios.get('api/patient/all');
    return response.data;
};
export const usePatientListQuery = () => {
    const query = useQuery<PatientType[]>({
        queryKey: ['patient', 'list'],
        queryFn: getPatientList,
    });
    return query;
};
