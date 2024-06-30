import { useMutation } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { NewPatientValuesType } from '../../models/FormType';

const postPatientNewForm = async ({ data }: { data: NewPatientValuesType }) => {
    const response = await Axios.post(`api/patient`, data);
    return response;
};

export const usePatientNewFormMutation = () => {
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
