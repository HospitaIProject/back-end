import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { CheckListsBeforeItemType, CheckListsDuringItemType, ResponseCheckListType } from '../../models/CheckListsType';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';

const getCheckLists = async (operationId: number): Promise<ResponseCheckListType> => {
    const response = await Axios.get(`api/checkLists/${operationId}`);
    return response.data.data;
}; //체크리스트 가져오기

export const useCheckListsQuery = ({ operationId }: { operationId: number }) => {
    const query = useQuery<ResponseCheckListType>({
        queryKey: ['checklists', operationId],
        queryFn: () => getCheckLists(operationId),
    });

    return query;
}; //체크리스트 가져오기 커스텀 훅

const getCheckListBefore = async (operationId: number): Promise<CheckListsBeforeItemType> => {
    const response = await Axios.get(`api/checkListBeforeDetail/${operationId}`);
    return response.data.data;
};
const getCheckListDuring = async (operationId: number): Promise<CheckListsDuringItemType> => {
    const response = await Axios.get(`api/checkListDuringDetail/${operationId}`);
    return response.data.data;
};
// const getCheckListAfter = async (operationId: number): Promise<CheckListsAfterItemType> => {
//     const response = await Axios.get(`api/checkListBefore/${operationId}`);
//     return response.data.data;
// };

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
