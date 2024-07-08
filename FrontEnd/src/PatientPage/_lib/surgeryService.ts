import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { SurgeryType } from '../../models/SurgeryType';
import { CheckListSetupDaySectionType } from '../../models/FormType';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';

const getSurgeryList = async ({ patientId }: { patientId: number }): Promise<SurgeryType[]> => {
    const response = await Axios.get(`/api/operations/${patientId}`);
    return response.data.data;
};
const getCheckListsSetup = async ({ surgeryId }: { surgeryId: number }): Promise<CheckListSetupDaySectionType> => {
    const response = await Axios.get(`/api/checkListItem/${surgeryId}`);
    return response.data.data.checkListItemDTO;
};

export const useSurgeryListQuery = ({ patientId }: { patientId: number }) => {
    const query = useQuery<SurgeryType[], AxiosError<ErrorResponse>>({
        queryKey: ['surgery', 'list', patientId],
        queryFn: () => getSurgeryList({ patientId }),
    });

    return query;
}; //수술 리스트 가져오기 커스텀훅(내부에 수술상세도 포함되어 있음)

export const useCheckListsSetupQeury = ({ surgeryId }: { surgeryId: number }) => {
    const query = useQuery<CheckListSetupDaySectionType>({
        queryKey: ['surgery', 'checklist', 'setup', surgeryId],
        queryFn: () => getCheckListsSetup({ surgeryId }),
    });
    return query;
}; //체크리스트 세팅 내역 가져오기 커스텀훅
