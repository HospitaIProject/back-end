import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { CheckListsItemType } from '../../models/CheckListsType';

const getCheckLists = async (surgeryId: number): Promise<CheckListsItemType[]> => {
    const response = await Axios.get(`api/checkLists/${surgeryId}`);
    return response.data.data;
};
export const useCheckListsQuery = ({ surgeryId }: { surgeryId: number }) => {
    const query = useQuery<CheckListsItemType[]>({
        queryKey: ['checklists', surgeryId],
        queryFn: () => getCheckLists(surgeryId),
    });
    return query;
};
