import { useMutation, useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { PatientFormType } from '../../models/PatientType';
import { useDateFormatted } from '../../Hooks/useDateFormatted';
import { pushNotification } from '../../utils/pushNotification';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';

const postPatientNewForm = async ({ data }: { data: PatientFormType }) => {
    const { onlyDate: operationDate } = useDateFormatted(data.operationDate);
    const { onlyDate: hospitalizedDate } = useDateFormatted(data.hospitalizedDate);
    const { onlyDate: dischargedDate } = useDateFormatted(data.dischargedDate);
    const operationDataTransformed = {
        ...data,
        operationDate: operationDate,
        hospitalizedDate: hospitalizedDate,
        dischargedDate: dischargedDate,
    };
    console.log('operationDataTransformed', operationDataTransformed);

    const response = await Axios.post(`api/patient`, operationDataTransformed);
    return response;
}; //환자 정보 등록 폼 서비스

const getPatientDetail = async ({ patientId }: { patientId: number }): Promise<PatientFormType> => {
    const response = await Axios.get(`api/patient/${patientId}`);
    return response.data.data;
}; //환자 정보 상세보기 서비스

const putPatientForm = async ({ data, patientId }: { data: PatientFormType; patientId: number }) => {
    const { onlyDate: operationDate } = useDateFormatted(data.operationDate);
    const { onlyDate: hospitalizedDate } = useDateFormatted(data.hospitalizedDate);
    const { onlyDate: dischargedDate } = useDateFormatted(data.dischargedDate);
    const operationDataTransformed = {
        ...data,
        operationDate: operationDate,
        hospitalizedDate: hospitalizedDate,
        dischargedDate: dischargedDate,
    };
    console.log('operationDataTransformed', operationDataTransformed);

    const response = await Axios.put(`api/patient/${patientId}`, operationDataTransformed);
    return response;
};
const deletePatientForm = async ({ patientId }: { patientId: number }) => {
    const response = await Axios.delete(`api/patient/${patientId}`);
    return response;
};

//-----------------------------------------------------------

export const useNewPatientFormMutation = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: postPatientNewForm,

        onError: (error: AxiosError<ErrorResponseType>) => {
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
            console.log(error);
        },
        onSuccess: (data) => {
            console.log('xxxxx', data);

            alert('제출되었습니다.');
            navigate(-1);
        },
    });
    return mutation;
}; //환자 정보 등록 폼 서비스

export const usePatientDetailQuery = ({ patientId, enabled = false }: { patientId: number; enabled?: boolean }) => {
    const query = useQuery<PatientFormType, AxiosError<ErrorResponseType>>({
        queryKey: ['getPatientDetail', patientId],
        queryFn: () => getPatientDetail({ patientId }),
        enabled: enabled,
    });
    return query;
}; //환자 정보 상세보기 서비스

export const usePutPatientFormMutation = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: putPatientForm,

        onError: (error: AxiosError<ErrorResponseType>) => {
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
            console.log(error);
        },
        onSuccess: () => {
            pushNotification({
                msg: '수정되었습니다.',
                type: 'success',
                theme: 'dark',
            });

            navigate(-1);
        },
    });
    return mutation;
}; //환자 정보 수정 폼 서비스

export const useDeletePatientFormMutation = () => {
    // const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: deletePatientForm,

        onError: (error: AxiosError<ErrorResponseType>) => {
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
            console.log(error);
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
}; //환자 정보 삭제 폼 서비스
