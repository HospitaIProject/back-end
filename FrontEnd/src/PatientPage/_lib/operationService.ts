import { useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { OperationType } from '../../models/OperationType';
import { CheckListSetupDaySectionType } from '../../models/FormType';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';

const getOperationList = async ({ patientId }: { patientId: number }): Promise<OperationType[]> => {
    const response = await Axios.get(`/api/operations/${patientId}`);
    return response.data.data;
};
const getCheckListsSetup = async ({ operationId }: { operationId: number }): Promise<CheckListSetupDaySectionType> => {
    const response = await Axios.get(`/api/checkListItem/${operationId}`);
    return response.data.data.checkListItemDTO;
};

export const useOperationListQuery = ({ patientId }: { patientId: number }) => {
    const query = useQuery<OperationType[], AxiosError<ErrorResponse>>({
        queryKey: ['operation', 'list', patientId],
        queryFn: () => getOperationList({ patientId }),
    });

    return query;
}; //수술 리스트 가져오기 커스텀훅(내부에 수술상세도 포함되어 있음)

export const useCheckListsSetupQeury = ({ operationId }: { operationId: number }) => {
    const query = useQuery<CheckListSetupDaySectionType>({
        queryKey: ['operation', 'checklist', 'setup', operationId],
        queryFn: () => getCheckListsSetup({ operationId }),
    });
    return query;
}; //체크리스트 세팅 내역 가져오기 커스텀훅
