import { useMutation } from '@tanstack/react-query';
import { ComplicationFormType } from '../../models/ComplicationType';
import Axios from '../../utils/axiosInstance';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import { pushNotification } from '../../utils/pushNotification';
import { useNavigate } from 'react-router-dom';

const postComplication = async ({ data, operationId }: { data: ComplicationFormType; operationId: number }) => {
    const response = await Axios.post(`api/complication/${operationId}`, data);
    return response.data.data;
};

export const useComplicationMutation = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: postComplication,
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
