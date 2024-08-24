import { useMutation, useQuery } from '@tanstack/react-query';
import { CheckListSetupType } from '../../models/CheckListsType';
import Axios from '../../utils/axiosInstance';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import { pushNotification } from '../../utils/pushNotification';
import { operationMethodItemType } from '../../models/OperationMethod';

const getOperationMethods = async (): Promise<operationMethodItemType[]> => {
    const response = await Axios.get('/api/operationTypes');
    return response.data.data;
}; //수술명 불러오기
const postOperationMethod = async ({
    operationMethod,
    newOperationMethod,
    type,
}: {
    operationMethod: string;
    newOperationMethod?: string;
    type: 'post' | 'put';
}) => {
    if (type === 'post') {
        const response = await Axios.post(`/api/operationType`, { name: newOperationMethod });
        return response.data.data;
    } else {
        const response = await Axios.put(`/api/operationType/${operationMethod}`, { name: newOperationMethod });
        return response.data.data;
    }
}; //수술명 추가 및 변경
const deleteOperationMethod = async (operationMethod: string) => {
    const response = await Axios.delete(`/api/operationType/${operationMethod}`);
    return response.data.data;
}; //수술명 삭제

const getDefaultCheckListSetting = async ({
    operationMethod,
}: {
    operationMethod: string;
}): Promise<CheckListSetupType> => {
    const response = await Axios.get(`/api/checkListItemDefault/${operationMethod}`);
    return response.data.data;
};

const updateDefaultCheckListSetting = async ({
    data,
    operationMethod,
}: {
    data: CheckListSetupType;
    operationMethod: string;
}) => {
    const transformData = {
        ...data,
        operationTypeName: operationMethod,
    };
    const response = await Axios.put(`/api/checkListItemDefault`, transformData);
    return response.data.data;
};
//----------------------------------------------hooks----------------------------------------------

export const useOperationMethodsQuery = () => {
    const query = useQuery<operationMethodItemType[], AxiosError<ErrorResponseType>>({
        queryKey: ['operationMethods'],
        queryFn: getOperationMethods,
    });
    return query;
}; //수술명 불러오기

export const useOperationMethodMutation = () => {
    const mutation = useMutation({
        mutationFn: postOperationMethod,
        onError: (error: AxiosError<ErrorResponseType>) => {
            console.log(error);
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        },
        onSuccess: (_, variables) => {
            pushNotification({
                msg: variables.type === 'post' ? '수술명이 추가되었습니다.' : '수술명이 변경되었습니다.',
                type: 'success',
                theme: 'dark',
            });
        },
    });
    return mutation;
}; //수술명 추가 및 변경

export const useOperationMethodDeleteMutation = () => {
    const mutation = useMutation({
        mutationFn: deleteOperationMethod,
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
                msg: '수술명이 삭제되었습니다.',
                type: 'success',
                theme: 'dark',
            });
        },
    });
    return mutation;
}; //수술명 삭제

export const useDefaultCheckListSettingQuery = ({
    enabled = false,
    operationMethod,
}: {
    enabled: boolean;
    operationMethod: string;
}) => {
    const query = useQuery<CheckListSetupType, AxiosError<ErrorResponseType>>({
        queryKey: ['defaultCheckListSetting', operationMethod],
        queryFn: () => getDefaultCheckListSetting({ operationMethod }),
        enabled: enabled,
    });

    return query;
};

export const useUpdateDefaultCheckListSettingMutation = () => {
    const mutation = useMutation({
        mutationFn: updateDefaultCheckListSetting,
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
                msg: '체크리스트 설정이 변경되었습니다.',
                type: 'success',
                theme: 'dark',
            });
        },
    });
    return mutation;
};
