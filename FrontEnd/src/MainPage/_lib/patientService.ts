import { useMutation, useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { PatientWithOperationDtoType } from '../../models/PatientType';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import { AxiosError } from 'axios';
import { pushNotification } from '../../utils/pushNotification';

const SC_MATCH_ITEMS: { [key: string]: string | undefined } = {
    // patientName: 'PATIENT_NAME',
    '': 'PATIENT_NAME',

    patientNumber: 'PATIENT_NUMBER',
    operationMethod: 'OPERATION_METHOD',
    // '': undefined,
};
const getPatientDetail = async ({ patientId }: { patientId: number }) => {
    const response = await Axios.get(`/api/patient/${patientId}`);
    return response.data.data;
}; //환자 조회
const deletePatient = async ({ patientId }: { patientId: number }) => {
    const response = await Axios.delete(`/api/patient/${patientId}`);
    return response.data.data;
}; //환자 삭제

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

export const usePatientDetailQuery = ({ patientId, enabled = false }: { patientId: number; enabled: boolean }) => {
    const query = useQuery<PatientWithOperationDtoType, AxiosError<ErrorResponseType>>({
        queryKey: ['patient', 'detail', patientId],
        queryFn: () => getPatientDetail({ patientId }),
        enabled: enabled,
    });

    return query;
};

export const usePatientDeleteMutation = () => {
    const mutation = useMutation({
        mutationFn: deletePatient,
        onError: (error: AxiosError<ErrorResponseType>) => {
            console.log(error);
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        },
        onSuccess: () => {
            pushNotification({
                msg: '삭제되었습니다.',
                type: 'success',
                theme: 'dark',
            });
        },
    });
    return mutation;
};
