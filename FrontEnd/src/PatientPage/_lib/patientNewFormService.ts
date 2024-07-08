import { useMutation } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { CheckListSetupDaySectionType, NewPatientValuesType, NewSurgeryInfoValuesType } from '../../models/FormType';

const postPatientNewForm = async ({ data }: { data: NewPatientValuesType }) => {
    const response = await Axios.post(`api/patient`, data);
    return response;
}; //환자 정보 등록 폼 서비스

const postSurgeryInfoNewForm = async ({
    setupData,
    surgeryData,
    patientId,
}: {
    surgeryData: NewSurgeryInfoValuesType;
    setupData: CheckListSetupDaySectionType;
    patientId: number;
}) => {
    console.log('surgeryData', surgeryData);
    const patientResponse = await Axios.post(`api/operation/${patientId}`, surgeryData); //먼저 수술 정보를 등록하고
    const operationId = patientResponse.data.data; //등록된 수술 정보의 id를 가져옴
    const response = await Axios.post(`api/checkListItem/${operationId}`, setupData); //등록된 수술 정보에 체크리스트를 등록

    return response;
}; //수술 정보 등록 폼 서비스

export const useNewSurgeryInfoFormMutation = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: postSurgeryInfoNewForm,

        onError: (error) => {
            console.log(error);
            alert('서버에러가 발생했습니다. 다시 시도해주세요.');
        },
        onSuccess: () => {
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
        onSuccess: () => {
            alert('제출되었습니다.');
            navigate('/');
        },
    });
    return mutation;
}; //환자 정보 등록 폼 서비스
