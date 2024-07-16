import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import {
    CheckListsBeforeItemType,
    CheckListsDuringItemType,
    ResponseCheckListAfterType,
} from '../../models/CheckListsType';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';

const getCheckListBefore = async (operationId: number): Promise<CheckListsBeforeItemType> => {
    const response = await Axios.get(`api/checkListBeforeDetail/${operationId}`);
    return response.data.data;
}; // 수술전 체크리스트

const getCheckListDuring = async (operationId: number): Promise<CheckListsDuringItemType> => {
    const response = await Axios.get(`api/checkListDuringDetail/${operationId}`);
    return response.data.data;
}; // 수술당일 체크리스트

const getCheckListAfter = async (operationId: number): Promise<ResponseCheckListAfterType> => {
    const response = await Axios.get(`api/checkLists/${operationId}`);
    return response.data.data;
}; // 수술후 체크리스트

//--------------------------------------------

export const useCheckListBeforeOperationQuery = ({
    operationId,
    enabled = true,
}: {
    operationId: number;
    enabled?: boolean;
}) => {
    const query = useQuery<CheckListsBeforeItemType, AxiosError<ErrorResponseType>>({
        queryKey: ['checklistBeforeOperation', operationId],
        queryFn: () => getCheckListBefore(operationId),
        enabled: enabled,
    });

    return query;
};

export const useCheckListDuringOperationQuery = ({
    operationId,
    enabled = true,
}: {
    operationId: number;
    enabled?: boolean;
}) => {
    const query = useQuery<CheckListsDuringItemType, AxiosError<ErrorResponseType>>({
        queryKey: ['getCheckListDuringOperation', operationId],
        queryFn: () => getCheckListDuring(operationId),
        enabled: enabled,
    });
    return query;
};

export const useCheckListAfterOperationQuery = ({
    operationId,
    enabled = true,
}: {
    operationId: number;
    enabled?: boolean;
}) => {
    const query = useQuery<ResponseCheckListAfterType, AxiosError<ErrorResponseType>>({
        queryKey: ['getCheckListAfterOperation', operationId],
        queryFn: () => getCheckListAfter(operationId),
        enabled: enabled,
    });
    return query;
};
