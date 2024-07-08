import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { ResponseComplianceType } from '../../models/FormType';

const getCheckLists = async (surgeryId: number): Promise<ResponseComplianceType> => {
    const response = await Axios.get(`api/checkLists/${surgeryId}`);
    return response.data.data;
}; //체크리스트 가져오기

export const useCheckListsQuery = ({ surgeryId }: { surgeryId: number }) => {
    const query = useQuery<ResponseComplianceType>({
        queryKey: ['checklists', surgeryId],
        queryFn: () => getCheckLists(surgeryId),
    });

    return query;
}; //체크리스트 가져오기 커스텀 훅
