import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ComplicationFormType } from '../../models/ComplicationType';
import Axios from '../../utils/axiosInstance';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import { pushNotification } from '../../utils/pushNotification';
import { useNavigate } from 'react-router-dom';

const transformObject = (data: ComplicationFormType) => {
    let transformData = Object.keys(data).reduce(
        (
            acc: {
                [key: string]: any;
            },
            key,
        ) => {
            // 값이 빈 문자열이면 null로 설정, 그렇지 않으면 원래 값을 유지
            acc[key] = data[key] === '' ? null : data[key];
            return acc;
        },
        {},
    );
    if (
        transformData.customComplications &&
        transformData.customComplications.length > 0 &&
        (transformData.customComplications[0].cdClassification === '' ||
            transformData.customComplications[0].complicationName === '')
    ) {
        transformData.customComplications[0].cdClassification = null;
        transformData.customComplications[0].complicationName = null;
    }
    return transformData;
};

const postComplicationForm = async ({ data, operationId }: { data: ComplicationFormType; operationId: number }) => {
    const transformData = transformObject(data);
    console.log('transformData', transformData);
    const response = await Axios.post(`api/complication/${operationId}`, transformData);
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
const getComplication = async (operationId: number): Promise<ComplicationFormType> => {
    const response = await Axios.get(`api/complication/${operationId}`);
    return response.data.data;
};
const putComplication = async ({ data, operationId }: { data: ComplicationFormType; operationId: number }) => {
    const transformData = transformObject(data);
    const response = await Axios.put(`api/complication/${operationId}`, transformData);
    return response.data.data;
};

export const useComplicationMutation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
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
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['complication', variables.operationId],
            });
            pushNotification({
                msg: '등록되었습니다.',
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

export const useComplicationQuery = ({ operationId }: { operationId: number }) => {
    const query = useQuery<ComplicationFormType, AxiosError<ErrorResponseType>>({
        queryKey: ['complication', operationId],
        queryFn: () => getComplication(operationId),
    });
    return query;
};

export const useComplicationUpdateMutation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: putComplication,
        onError: (error: AxiosError<ErrorResponseType>) => {
            console.log('error', error);
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['complication', variables.operationId],
            });
            pushNotification({
                msg: '수정되었습니다.',
                type: 'success',
                theme: 'dark',
            });
            navigate(-1);
        },
    });

    return mutation;
};
