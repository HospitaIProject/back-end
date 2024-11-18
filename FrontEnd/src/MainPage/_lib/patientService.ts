import { useMutation, useQuery } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { PageInfoPatientListType, PatientWithOperationDtoType } from '../../models/PatientType';
import { ErrorResponseType } from '../../models/AxiosResponseType';
import { AxiosError } from 'axios';
import { pushNotification } from '../../utils/pushNotification';

const SC_MATCH_ITEMS: { [key: string]: string | undefined } = {
    // patientName: 'PATIENT_NAME',
    '': 'PATIENT_NAME',
    patientNumber: 'PATIENT_NUMBER',
};
// const OP_DATE_MATCH_ITEMS: { [key: string]: string | undefined } = {
//     default: 'DEFAULT',
//     newest: 'NEWER',
//     oldest: 'OLDER',
//     // '': undefined,
// };
// const CHECKLIST_STATUS_MATCH_ITEMS: { [key: string]: string | undefined } = {
//     all: 'ALL',
//     done: 'WRITTEN',
//     notDone: 'NOT_WRITTEN',
// };

const getPatientDetail = async ({ patientId }: { patientId: number }) => {
    const response = await Axios.get(`/api/patient/${patientId}`);
    return response.data.data;
}; //환자 조회
const deletePatient = async ({ patientId }: { patientId: number }) => {
    const response = await Axios.delete(`/api/patient/${patientId}`);
    return response.data.data;
}; //환자 삭제

const getPatientList = async ({
    year,
    month,
    sc,
    operationMethod,
    q,
    page,
    size,

    // opDate,
    // checkListStatus,
}: {
    q: string;
    sc: string;
    page: number;
    size: number;
    year: string;
    month: string;
    operationMethod: string;

    opDate: string;
    checkListStatus: string;
}): Promise<PageInfoPatientListType> => {
    const params = {
        year: Number(year) || undefined,
        month: Number(month) || undefined,
        searchType: SC_MATCH_ITEMS[sc],
        opName: operationMethod || undefined,
        query: q || undefined,
        page: page,
        size: size,

        // opDate: OP_DATE_MATCH_ITEMS[opDate],
        // checkListStatus: CHECKLIST_STATUS_MATCH_ITEMS[checkListStatus],
    };
    console.log('params', params);

    const response = await Axios.get('/api/patients/monthly', { params });
    return response.data.data;
};
export const usePatientListQuery = (searchParams: URLSearchParams) => {
    // const page = Number(searchParams.get('page')) || 1;
    const q = searchParams.get('q') || ''; //검색 키워드
    const sc = searchParams.get('sc') || ''; //검색 카테고리
    const page = Number(searchParams.get('page')) || 1; //페이지
    const size = Number(searchParams.get('size')) || 7; //페이지 사이즈
    const year = searchParams.get('year') || ''; //수술일 기준 년도
    const month = searchParams.get('month') || ''; //수술일 기준 월
    const operationMethod = searchParams.get('operationMethod') || ''; //수술명

    const opDate = searchParams.get('sort') || 'default'; //수술일 기준 최신,오래된 (boolean)
    const checkListStatus = searchParams.get('checklist') || 'all'; //체크리스트 작성여부

    // const sort = searchParams.get('sort') || '';

    const query = useQuery<PageInfoPatientListType, AxiosError<ErrorResponseType>>({
        queryKey: ['patient', 'list', q, sc, page, size, year, month, operationMethod],
        queryFn: () =>
            getPatientList({
                q,
                sc,
                page,
                size,
                year,
                month,
                operationMethod,
                opDate: opDate,
                checkListStatus: checkListStatus,
            }),
    });

    return query;
};

export const usePatientDetailQuery = ({ patientId, enabled = false }: { patientId: number; enabled: boolean }) => {
    const query = useQuery<PatientWithOperationDtoType, AxiosError<ErrorResponseType>>({
        queryKey: ['patient', 'detail', patientId],
        queryFn: () => getPatientDetail({ patientId }),
        enabled: enabled,
    });

    return query;
};

export const usePatientDeleteMutation = () => {
    const mutation = useMutation({
        mutationFn: deletePatient,
        onError: (error: AxiosError<ErrorResponseType>) => {
            console.log(error);
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        },
        onSuccess: () => {
            pushNotification({
                msg: '삭제되었습니다.',
                type: 'success',
                theme: 'dark',
            });
        },
    });
    return mutation;
};
