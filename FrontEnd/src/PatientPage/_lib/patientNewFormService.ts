import { useMutation } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { OperationInfoFormType } from '../../models/OperationType';
import { PatientFormType } from '../../models/PatientType';
import { CheckListSetupType } from '../../models/CheckListsType';

const postPatientNewForm = async ({ data }: { data: PatientFormType }) => {
    const response = await Axios.post(`api/patient`, data);
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
    console.log('operationData', operationData);
    const patientResponse = await Axios.post(`api/operation/${patientId}`, operationData); //먼저 수술 정보를 등록하고
    const operationId = patientResponse.data.data; //등록된 수술 정보의 id를 가져옴
    const response = await Axios.post(`api/checkListItem/${operationId}`, setupData); //등록된 수술 정보에 체크리스트를 등록

    return response;
}; //수술 정보 등록 폼 서비스

export const useNewOperationInfoFormMutation = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: postOperationInfoNewForm,

        onError: (error) => {
            console.log(error);
            alert('서버에러가 발생했습니다. 다시 시도해주세요.');
        },
        onSuccess: (data) => {
            alert('등록되었습니다.');
            navigate(-1);
        },
    });
    return mutation;
}; //환자 수술 정보 등록 폼 서비스

export const useNewPatientFormMutation = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: postPatientNewForm,

        onError: (error) => {
            console.log(error);
            alert('서버에러가 발생했습니다. 다시 시도해주세요.');
        },
        onSuccess: (data) => {
            console.log('xxxxx', data);

            alert('제출되었습니다.');
            navigate('');
        },
    });
    return mutation;
}; //환자 정보 등록 폼 서비스
