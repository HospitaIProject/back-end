import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import {
    CheckListsAfterItemType,
    CheckListsBeforeItemType,
    CheckListsDuringItemType,
    ResponseCheckListsType,
} from '../../models/CheckListsType';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import { pushNotification } from '../../utils/pushNotification';
import { useSearchParams } from 'react-router-dom';

const getCheckListBefore = async (operationId: number): Promise<CheckListsBeforeItemType> => {
    const response = await Axios.get(`/api/checkListBeforeDetail/${operationId}`);
    return response.data.data.checkListBeforeDTO;
}; // 수술전 체크리스트

const getCheckListDuring = async (operationId: number): Promise<CheckListsDuringItemType> => {
    const response = await Axios.get(`/api/checkListDuringDetail/${operationId}`);
    return response.data.data.checkListDuringDTO;
}; // 수술당일 체크리스트
const getCheckListAfter = async (operationId: number): Promise<CheckListsAfterItemType> => {
    const response = await Axios.get(`/api/checkListAfterDetail/${operationId}`);
    return response.data.data.checkListAfterDTO;
}; // 수술후 체크리스트
const getCheckListDaily = async (checkListId: number): Promise<CheckListsAfterItemType> => {
    const response = await Axios.get(`/api/checkList/${checkListId}`);
    return response.data.data.checkListDTO;
}; // 일일 체크리스트

const getCheckLists = async (operationId: number): Promise<ResponseCheckListsType> => {
    const response = await Axios.get(`/api/checkLists/${operationId}`);
    return response.data.data;
}; // 전체 체크리스트

const getFluidRestriction = async (operationId: number): Promise<number> => {
    const response = await Axios.get(`/api/checkListDuring/${operationId}/fluid-restriction`);
    return response.data.data;
}; //수술 중 수액 용량 제한 조회

const deleteCheckList = async ({
    checkListId,
    type,
}: {
    checkListId: number;
    type: 'PREV' | 'TODAY' | 'POST' | 'DAILY';
}) => {
    if (type === 'PREV') {
        const response = await Axios.delete(`/api/checkListBefore/${checkListId}`);
        return response.data;
    } else if (type === 'TODAY') {
        const response = await Axios.delete(`/api/checkListDuring/${checkListId}`);
        return response.data;
    } else if (type === 'POST') {
        const response = await Axios.delete(`/api/checkListAfter/${checkListId}`);
        return response.data;
    } else if (type === 'DAILY') {
        const response = await Axios.delete(`/api/checkList/${checkListId}`);
        return response.data;
    }
}; //체크리스트 삭제
//--------------------------------------------

export const useCheckListBeforeQuery = ({
    operationId,
    enabled = false,
}: {
    operationId: number;
    enabled?: boolean;
}) => {
    const query = useQuery<CheckListsBeforeItemType, AxiosError<ErrorResponseType>>({
        queryKey: ['checklistBefore', operationId],
        queryFn: () => getCheckListBefore(operationId),
        enabled: enabled,
    });

    return query;
};

export const useCheckListDuringQuery = ({
    operationId,
    enabled = false,
}: {
    operationId: number;
    enabled?: boolean;
}) => {
    const query = useQuery<CheckListsDuringItemType, AxiosError<ErrorResponseType>>({
        queryKey: ['checkListDuring', operationId],
        queryFn: () => getCheckListDuring(operationId),
        enabled: enabled,
    });
    return query;
};

export const useCheckListAfterQuery = ({
    operationId,
    enabled = false,
}: {
    operationId: number;
    enabled?: boolean;
}) => {
    const query = useQuery<CheckListsAfterItemType, AxiosError<ErrorResponseType>>({
        queryKey: ['checkListAfter', operationId],
        queryFn: () => getCheckListAfter(operationId),
        enabled: enabled,
    });
    return query;
};

export const useCheckListDailyQuery = ({ checkListId, enabled = false }: { checkListId: number; enabled: boolean }) => {
    const query = useQuery<CheckListsAfterItemType, AxiosError<ErrorResponseType>>({
        queryKey: ['checkListDaily'],
        queryFn: () => getCheckListDaily(checkListId),
        enabled: enabled,
    });
    return query;
};

export const useCheckListsQuery = ({ operationId }: { operationId: number }) => {
    const query = useQuery<ResponseCheckListsType, AxiosError<ErrorResponseType>>({
        queryKey: ['checkLists', operationId],
        queryFn: () => getCheckLists(operationId),
    });
    return query;
}; //체크리스트 전체 가져오기(수술전,당일,후,일일)

export const useDeleteCheckListMutation = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const operationId = Number(searchParams.get('id'));
    const mutation = useMutation({
        mutationFn: (data: { checkListId: number; type: 'PREV' | 'TODAY' | 'POST' | 'DAILY' }) => deleteCheckList(data),
        onError: (error: AxiosError<ErrorResponseType>) => {
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
            console.log(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['checkLists', operationId],
            });
            pushNotification({
                msg: '삭제되었습니다.',
                type: 'success',
                theme: 'dark',
            });
        },
    });
    return mutation;
};

export const useFluidRestrictionQuery = ({
    operationId,
    enabled = true,
}: {
    operationId: number;
    enabled?: boolean;
}) => {
    const query = useQuery<number, AxiosError<ErrorResponseType>>({
        queryKey: ['fluidRestriction', operationId],
        queryFn: () => getFluidRestriction(operationId),
        enabled,
    });
    return query;
};
