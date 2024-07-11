import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { ResponseCheckListType } from '../../models/CheckListsType';

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
