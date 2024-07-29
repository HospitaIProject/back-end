import { useMutation, useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { OperationInfoFormType, OperationItemType } from '../../models/OperationType';
import { CheckListSetupType } from '../../models/CheckListsType';
import { AxiosError } from 'axios';
import { ErrorResponse, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import { pushNotification } from '../../utils/pushNotification';

const postOperationInfoNewForm = async ({
    setupData,
    operationData,
    patientId,
}: {
    operationData: OperationInfoFormType;
    setupData: CheckListSetupType;
    patientId: number;
}) => {
    const operationStartTime = dayjs(operationData.operationStartTime).add(9, 'hour').toISOString();

    const operationEndTime = dayjs(operationData.operationEndTime).add(9, 'hour').toISOString();

    const requestOperationData = {
        ...operationData,
        operationStartTime: operationStartTime,
        operationEndTime: operationEndTime,
    };
    console.log('requestOperationData', requestOperationData);

    const patientResponse = await Axios.post(`api/operation/${patientId}`, requestOperationData); //먼저 수술 정보를 등록하고
    const operationId = patientResponse.data.data; //등록된 수술 정보의 id를 가져옴
    const response = await Axios.post(`api/checkListItem/${operationId}`, setupData); //등록된 수술 정보에 체크리스트를 등록

    return response;
}; //수술 정보 등록 폼 서비스

const getOperationDetail = async ({ patientId }: { patientId: number }) => {
    const response = await Axios.get(`/api/operations/${patientId}`);
    return response.data.data;
};

const getOperationList = async ({ patientId }: { patientId: number }): Promise<OperationItemType[]> => {
    const response = await Axios.get(`/api/operations/${patientId}`);
    return response.data.data;
};
const getCheckListsSetup = async ({ operationId }: { operationId: number }): Promise<CheckListSetupType> => {
    const response = await Axios.get(`/api/checkListItem/${operationId}`);
    return response.data.data.checkListItemDTO;
};

export const useOperationListQuery = ({ patientId }: { patientId: number }) => {
    const query = useQuery<OperationItemType[], AxiosError<ErrorResponse>>({
        queryKey: ['operation', 'list', patientId],
        queryFn: () => getOperationList({ patientId }),
    });

    return query;
}; //수술 리스트 가져오기 커스텀훅(내부에 수술상세도 포함되어 있음)

export const useNewOperationInfoFormMutation = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: postOperationInfoNewForm,

        onError: (error: AxiosError<ErrorResponseType>) => {
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
            console.log(error);
        },
        onSuccess: () => {
            pushNotification({
                msg: '등록되었습니다.',
                type: 'success',
                theme: 'dark',
            });
            navigate(-1);
        },
    });
    return mutation;
}; //환자 수술 정보 등록 폼 서비스

export const useCheckListsSetupQeury = ({ operationId }: { operationId: number }) => {
    const query = useQuery<CheckListSetupType>({
        queryKey: ['operation', 'checklist', 'setup', operationId],
        queryFn: () => getCheckListsSetup({ operationId }),
    });
    return query;
}; //체크리스트 세팅 내역 가져오기 커스텀훅

export const useOperationDetailQuery = ({ patientId, enabled = false }: { patientId: number; enabled: boolean }) => {
    const query = useQuery<OperationItemType, AxiosError<ErrorResponse>>({
        queryKey: ['operation', 'detail', patientId],
        queryFn: () => getOperationDetail({ patientId }),
        enabled: enabled,
    });

    return query;
};
