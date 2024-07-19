import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ComplicationFormType } from '../../models/ComplicationType';
import Axios from '../../utils/axiosInstance';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import { pushNotification } from '../../utils/pushNotification';
import { useNavigate, useSearchParams } from 'react-router-dom';

const postComplicationForm = async ({ data, operationId }: { data: ComplicationFormType; operationId: number }) => {
    const response = await Axios.post(`api/complication/${operationId}`, data);
    return response.data.data;
};

const postComplicationStatus = async ({ operationId, status }: { operationId: number; status: 'YES' | 'NO' }) => {
    const params = {
        booleanOption: status,
    };
    console.log('params', params);
    const response = await Axios.post(`api/complication/status/${operationId}`, {}, { params });
    return response.data.data;
};

export const useComplicationMutation = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: postComplicationForm,
        onError: (error: AxiosError<ErrorResponseType>) => {
            console.log('error', error);
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        },
        onSuccess: () => {
            pushNotification({
                msg: '제출되었습니다.',
                type: 'success',
                theme: 'dark',
            });
            navigate(-1);
        },
    });

    return mutation;
};

export const useComplicationStatusMutation = ({ patientId }: { patientId: number }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: postComplicationStatus,
        onError: (error: AxiosError<ErrorResponseType>) => {
            console.log('error', error);
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        },
        onSuccess: (_, parameter) => {
            const statusMsg = parameter.status === 'YES' ? 'YES로 변경되었습니다.' : 'NO로 변경되었습니다.';

            queryClient.invalidateQueries({
                queryKey: ['operation', 'list', patientId],
            });
            pushNotification({
                msg: statusMsg,
                type: 'success',
                theme: 'dark',
            });
        },
    });

    return mutation;
};
