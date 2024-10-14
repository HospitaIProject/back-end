import Cookies from 'js-cookie';

import LoginInput from './Components/LoginInput';
import BackIcon from '../icons/BackIcon';
import { useFormik } from 'formik';
import { useLoginMutation } from './_lib/LoginService';
import { AxiosError } from 'axios';
import { ErrorResponse, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export type LoginFormType = {
    [key: string]: string;
    id: string;
    password: string;
};

function LoginPage() {
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();
    const formik = useFormik<LoginFormType>({
        initialValues: {
            id: '',
            password: '',
        },

        onSubmit: (values) => {
            let isError = false;
            Object.keys(values).forEach((key) => {
                if (formik.values[key] === '') {
                    formik.setFieldError(key, '필수 입력 항목입니다.');
                    isError = true;
                }
            });
            if (isError) return;
            loginMutation.mutate({
                adminID: formik.values.id,
                adminPW: formik.values.password,
            });
        },
    });

    useEffect(() => {
        if (loginMutation.error) {
            const error = loginMutation.error as AxiosError<ErrorResponse>;
            console.log(error);
            if (error.response?.status === 401) {
                // formik.setFieldError('id', '다시 확인해주세요.');
                // formik.setFieldError('password', '다시 확인해주세요.');

                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            } else {
                alert('서버 오류');
            }
        }
        if (loginMutation.isSuccess) {
            // 로그인 성공 시 로컬 스토리지에 JWT 토큰과 사용자 이름 저장
            const accessToken = loginMutation.data.data.tokenDTO.accessToken; // loginMutation.data 구조에 따라 조정 필요
            Cookies.set('jwtToken', accessToken, { expires: 7, secure: true, sameSite: 'Strict' });
            alert('로그인 성공');
            navigate('/');
            window.location.reload(); // 이동 후 강제로 새로고침
        }
    }, [loginMutation.error, loginMutation.isSuccess]);

    useEffect(() => {
        const token = Cookies.get('jwtToken');
        if (token) {
            navigate('/');
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-10 px-6 pb-10 mx-auto h-dvh max-w-screen-tablet mobile:flex-row mobile:gap-24">
            <div className="w-full mobile:w-3/5">
                <img src="/logo.svg" className="w-full h-auto px-2" />
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col items-center justify-center w-full gap-3 mobile:w- h-2/5 mobile:w-2/5 mobile:flex-grow"
            >
                <span className="hidden my-4 text-2xl font-bold mobile:block">로그인</span>
                <LoginInput label="ID" id="id" type="text" formik={formik} />
                <LoginInput label="Password" id="password" type="password" formik={formik} />
                <button
                    type="submit"
                    className="flex flex-row items-center justify-center w-full gap-2 py-3 mt-4 text-sm text-white bg-blue-500 border rounded-lg"
                >
                    로그인 <BackIcon className="w-4 h-4 rotate-180" />
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
