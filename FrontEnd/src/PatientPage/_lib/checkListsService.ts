import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { ComplianceValuesType } from '../../models/FormType';

const getCheckLists = async (surgeryId: number): Promise<ComplianceValuesType[]> => {
    const response = await Axios.get(`api/checkLists/${surgeryId}`);
    return response.data.data;
};
export const useCheckListsQuery = ({ surgeryId }: { surgeryId: number }) => {
    const query = useQuery<ComplianceValuesType[]>({
        queryKey: ['checklists', surgeryId],
        queryFn: () => getCheckLists(surgeryId),
    });

    return query;
};
