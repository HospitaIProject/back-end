import { useMutation, useQuery } from '@tanstack/react-query';
import { CheckListSetupType, checkListFormType } from '../../models/FormType';
import Axios from '../../utils/axiosInstance';
// import { AxiosError } from 'axios';
// import { ErrorResponse } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { pushNotification } from '../../utils/pushNotification';

const postComplianceForm = async ({ operationId, data }: { operationId: number; data: checkListFormType }) => {
    const response = await Axios.post(`api/checkList/operation/${operationId}`, data);
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
            pushNotification({
                msg: '제출되었습니다.',
                type: 'success',
                theme: 'dark',
            });
            navigate(-1);
        },
    });
    return mutation;
}; //Compliance Form 서비스

const getCheckListSetup = async ({ operationId }: { operationId: number }): Promise<CheckListSetupType> => {
    const response = await Axios.get(`/api/checkListItem/${operationId}`);
    return response.data.data.checkListItemDTO;
}; //체크리스트 세팅 가져오기

export const useCheckListSetupQuery = ({ operationId }: { operationId: number }) => {
    const query = useQuery<CheckListSetupType>({
        queryKey: ['checklist', 'setup', operationId],
        queryFn: () => getCheckListSetup({ operationId }),
    });
    return query;
}; //체크리스트 세팅 가져오기 커스텀 훅
