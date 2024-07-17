import { useMutation } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { OperationInfoFormType } from '../../models/OperationType';
import { PatientFormType } from '../../models/PatientType';
import { CheckListSetupType } from '../../models/CheckListsType';
import { useDateFormatted } from '../../Hooks/useDateFormatted';
import { pushNotification } from '../../utils/pushNotification';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import dayjs from 'dayjs';

const postPatientNewForm = async ({ data }: { data: PatientFormType }) => {
    const { onlyDate: operationDate } = useDateFormatted(data.operationDate);
    const { onlyDate: hospitalizedDate } = useDateFormatted(data.hospitalizedDate);
    const { onlyDate: dischargedDate } = useDateFormatted(data.dischargedDate);
    const operationDataTransformed = {
        ...data,
        operationDate: operationDate,
        hospitalizedDate: hospitalizedDate,
        dischargedDate: dischargedDate,
    };
    console.log('operationDataTransformed', operationDataTransformed);

    const response = await Axios.post(`api/patient`, operationDataTransformed);
    return response;
}; //환자 정보 등록 폼 서비스

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

export const useNewPatientFormMutation = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: postPatientNewForm,

        onError: (error: AxiosError<ErrorResponseType>) => {
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
            console.log(error);
        },
        onSuccess: (data) => {
            console.log('xxxxx', data);

            alert('제출되었습니다.');
            navigate(-1);
        },
    });
    return mutation;
}; //환자 정보 등록 폼 서비스
