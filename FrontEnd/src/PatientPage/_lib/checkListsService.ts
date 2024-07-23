import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import {
    CheckListsBeforeItemType,
    CheckListsDuringItemType,
    ResponseCheckListsType,
} from '../../models/CheckListsType';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';

const getCheckListBefore = async (operationId: number): Promise<CheckListsBeforeItemType> => {
    const response = await Axios.get(`api/checkListBeforeDetail/${operationId}`);
    return response.data.data.checkListBeforeDTO;
}; // 수술전 체크리스트

const getCheckListDuring = async (operationId: number): Promise<CheckListsDuringItemType> => {
    const response = await Axios.get(`api/checkListDuringDetail/${operationId}`);
    return response.data.data.checkListDuringDTO;
}; // 수술당일 체크리스트

const getCheckLists = async (operationId: number): Promise<ResponseCheckListsType> => {
    const response = await Axios.get(`api/checkLists/${operationId}`);
    return response.data.data;
}; // 전체 체크리스트

const getFluidRestriction = async (operationId: number): Promise<number> => {
    const response = await Axios.get(`api/checkListDuring/${operationId}/fluid-restriction`);
    return response.data.data;
}; //수술 중 수액 용량 제한 조회

//--------------------------------------------

export const useCheckListBeforeQuery = ({
    operationId,
    enabled = false,
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

export const useCheckListDuringQuery = ({
    operationId,
    enabled = false,
}: {
    operationId: number;
    enabled?: boolean;
}) => {
    const query = useQuery<CheckListsDuringItemType, AxiosError<ErrorResponseType>>({
        queryKey: ['checkListDuringOperation', operationId],
        queryFn: () => getCheckListDuring(operationId),
        enabled: enabled,
    });
    return query;
};

export const useCheckListsQuery = ({ operationId }: { operationId: number }) => {
    const query = useQuery<ResponseCheckListsType, AxiosError<ErrorResponseType>>({
        queryKey: ['getCheckListAfterOperation', operationId],
        queryFn: () => getCheckLists(operationId),
    });
    return query;
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
