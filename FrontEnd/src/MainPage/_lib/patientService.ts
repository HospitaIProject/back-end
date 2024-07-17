import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { PatientWithOperationDtoType } from '../../models/PatientType';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import { AxiosError } from 'axios';

const SC_MATCH_ITEMS: { [key: string]: string | undefined } = {
    // patientName: 'PATIENT_NAME',
    '': 'PATIENT_NAME',

    patientNumber: 'PATIENT_NUMBER',
    operationMethod: 'OPERATION_METHOD',
    // '': undefined,
};

const getPatientList = async ({ q, sc }: { q: string; sc: string }): Promise<PatientWithOperationDtoType[]> => {
    const params = {
        filterType: SC_MATCH_ITEMS[sc],
        query: q,
        size: 20,
    };
    console.log('params', params);

    const response = await Axios.get('api/patients', { params });
    return response.data.data;
};
export const usePatientListQuery = (searchParams: URLSearchParams) => {
    // const page = Number(searchParams.get('page')) || 1;
    const q = searchParams.get('q') || '';
    const sc = searchParams.get('sc') || '';

    // const sort = searchParams.get('sort') || '';

    const query = useQuery<PatientWithOperationDtoType[], AxiosError<ErrorResponseType>>({
        queryKey: ['patient', 'list', q, sc],
        queryFn: () =>
            getPatientList({
                q,
                sc,
            }),
    });

    return query;
};
