import { useMutation } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { PatientFormType } from '../../models/PatientType';
import { useDateFormatted } from '../../Hooks/useDateFormatted';
import { pushNotification } from '../../utils/pushNotification';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';

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
