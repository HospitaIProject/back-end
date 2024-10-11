import { useMutation } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';

export type LoginResponseType = {
    timeStamp: string;
    status: number;
    data: {
        tokenDTO: {
            accessToken: string;
        };
    };
    message: string;
};

export const postLogin = async ({
    adminID,
    adminPW,
}: {
    adminID: string;
    adminPW: string;
}): Promise<LoginResponseType> => {
    const response = await Axios.post('/api/signIn', { adminID, adminPW });
    return response.data;
};
//----------------------------------------------------------------hooks----------------------------------------------------------------

export const useLoginMutation = () => {
    const mutation = useMutation({
        mutationFn: postLogin,
        onError: (error: AxiosError<ErrorResponse>) => {
            return error;
        },
    });
    return mutation;
};
