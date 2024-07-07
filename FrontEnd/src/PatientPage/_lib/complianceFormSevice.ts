import { useMutation, useQuery } from '@tanstack/react-query';
import { CheckListSetupDaySectionType, ComplianceValuesType } from '../../models/FormType';
import Axios from '../../utils/axiosInstance';
// import { AxiosError } from 'axios';
// import { ErrorResponse } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { pushNotification } from '../../utils/pushNotification';

const postComplianceForm = async ({ surgeryId, data }: { surgeryId: number; data: ComplianceValuesType }) => {
    const response = await Axios.post(`api/compliance/${surgeryId}`, data);
    return response;
}; //Compliance Form 서비스(체크리스트 제출)

export const useComplianceFormMutation = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: postComplianceForm,

        onError: (error) => {
            console.log(error);
            pushNotification({
                msg: '제출에 실패하였습니다.',
                type: 'error',
                theme: 'dark',
            });
        },
        onSuccess: () => {
            alert('제출되었습니다.');
            navigate('/');
        },
    });
    return mutation;
}; //Compliance Form 서비스

const getCheckListSetup = async ({ surgeryId }: { surgeryId: number }): Promise<CheckListSetupDaySectionType> => {
    const response = await Axios.get(`/api/checkListItem/${surgeryId}`);
    return response.data.data.checkListItemDTO;
}; //체크리스트 세팅 가져오기

export const useCheckListSetupQuery = ({ surgeryId }: { surgeryId: number }) => {
    const query = useQuery<CheckListSetupDaySectionType>({
        queryKey: ['checklist', 'setup', surgeryId],
        queryFn: () => getCheckListSetup({ surgeryId }),
    });
    return query;
}; //체크리스트 세팅 가져오기
