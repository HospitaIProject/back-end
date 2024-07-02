import { useMutation } from '@tanstack/react-query';
import { ComplianceValuesType } from '../../models/FormType';
import Axios from '../../utils/axiosInstance';
// import { AxiosError } from 'axios';
// import { ErrorResponse } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const postComplianceForm = async ({ patientId, data }: { patientId: number; data: ComplianceValuesType }) => {
    const response = await Axios.post(`api/compliance/${patientId}`, data);
    return response;
};

export const useComplianceFormMutation = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: postComplianceForm,

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
}; //Compliance Form 서비스
