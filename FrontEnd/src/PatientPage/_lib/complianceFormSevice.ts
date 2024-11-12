import { useMutation, useQuery } from '@tanstack/react-query';
import { DailyCheckListFormType, checkListFormType } from '../../models/CheckListsType';
import { CheckListSetupType } from '../../models/CheckListsType';
import Axios from '../../utils/axiosInstance';
// import { AxiosError } from 'axios';
// import { ErrorResponse } from 'react-router-dom';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { pushNotification } from '../../utils/pushNotification';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';

const postOrPutComplianceForm = async ({
    operationId,
    checkListId,
    data,
    type,
    submitType,
}: {
    operationId?: number;
    checkListId?: number;
    data: checkListFormType;
    type: 'PREV' | 'TODAY' | 'POST';
    submitType: 'post' | 'put';
}) => {
    let url = '';
    if (type === 'PREV') {
        submitType === 'post' ? (url = 'api/checkListBefore/operation/') : (url = 'api/checkListBefore/');
    } else if (type === 'TODAY') {
        submitType === 'post' ? (url = 'api/checkListDuring/operation/') : (url = 'api/checkListDuring/');
    } else {
        submitType === 'post' ? (url = 'api/checkListAfter/operation/') : (url = 'api/checkListAfter/');
    } //체크리스트 제출 url(수술전, 당일, 후)

    let processedChecklistData;
    if (type === 'PREV') {
        processedChecklistData = {
            explainedPreOp: data.explainedPreOp,
            onsPreOp2hr: data.onsPreOp2hr,
            onsPostBowelPrep: data.onsPostBowelPrep,
            dvtPrevention: data.dvtPrevention,
            antibioticPreIncision: data.antibioticPreIncision,
            painMedPreOp: data.painMedPreOp,

            explainedPreOp_remarks: data.explainedPreOp_remarks,
            onsPreOp2hr_remarks: data.onsPreOp2hr_remarks,
            onsPostBowelPrep_remarks: data.onsPostBowelPrep_remarks,
            dvtPrevention_remarks: data.dvtPrevention_remarks,
            antibioticPreIncision_remarks: data.antibioticPreIncision_remarks,
            painMedPreOp_remarks: data.painMedPreOp_remarks,
        };
    } else if (type === 'TODAY') {
        processedChecklistData = {
            maintainTemp: data.maintainTemp,
            fluidRestriction: data.fluidRestriction,
            antiNausea: data.antiNausea,
            painControl: data.painControl,
            painControlMethod: data.painControlMethod,

            maintainTemp_remarks: data.maintainTemp_remarks,
            fluidRestriction_remarks: data.fluidRestriction_remarks,
            antiNausea_remarks: data.antiNausea_remarks,
            painControl_remarks: data.painControl_remarks,
            painControlMethod_remarks: data.painControlMethod_remarks,
        };
    } else {
        processedChecklistData = {
            antiNauseaPostOp: data.antiNauseaPostOp,
            ivFluidRestrictionPostOp: data.ivFluidRestrictionPostOp,
            nonOpioidPainControl: data.nonOpioidPainControl,
            jpDrainRemoval: data.jpDrainRemoval,
            jpDrainRemovalDate: data.jpDrainRemoval === 'YES' ? data.jpDrainRemovalDate : undefined, //제거한날 기입 yes일때만
            catheterRemoval: data.catheterRemoval,
            catheterRemovalDate: data.catheterRemoval === 'YES' ? data.catheterRemovalDate : undefined, //제거한날 기입 yes일때만
            catheterReInsertion: data.catheterRemoval === 'YES' ? data.catheterReInsertion : undefined, //Foley cath 재삽입 여부 yes일때만
            ivLineRemoval: data.ivLineRemoval,
            ivLineRemovalDate: data.ivLineRemoval === 'YES' ? data.ivLineRemovalDate : undefined, //제거한날 기입 yes일때만
            postExercise: data.postExercise,
            postMeal: data.postMeal,
            postPain: {
                evening: undefined,
                day: data.postPain?.day || undefined,
                night: data.postPain?.night || undefined,
            },

            antiNauseaPostOp_remarks: data.antiNauseaPostOp_remarks,
            ivFluidRestrictionPostOp_remarks: data.ivFluidRestrictionPostOp_remarks,
            nonOpioidPainControl_remarks: data.nonOpioidPainControl_remarks,
            jpDrainRemoval_remarks: data.jpDrainRemoval_remarks,
            catheterRemoval_remarks: data.catheterRemoval_remarks,
            ivLineRemoval_remarks: data.ivLineRemoval_remarks,
            postExercise_remarks: data.postExercise_remarks,
            postMeal_remarks: data.postMeal_remarks,
        };
    } //체크리스트 데이터 구조 변경

    console.log('processedChecklistData', processedChecklistData);
    console.log('url', url);
    if (submitType === 'post') {
        const response = await Axios.post(`${url}${operationId}`, processedChecklistData);
        return response;
    } else {
        const response = await Axios.put(`${url}${checkListId}`, processedChecklistData);
        return response;
    }
}; //Compliance Form 서비스(체크리스트 제출,수정)

const postDailyComplianceForm = async ({
    data,
    operationId,
    dayOfCheckList,
    submitType,
    checkListId,
}: {
    data: DailyCheckListFormType;
    operationId?: number;
    dayOfCheckList?: string;
    submitType: 'post' | 'put';
    checkListId?: number;
}) => {
    let processedChecklistData;
    processedChecklistData = {
        ...data,
        podOneIvLineRemoval: undefined,
        podOneIvLineRemoval_remarks: undefined,
        podTwoIvLineRemoval: undefined,
        podTwoIvLineRemoval_remarks: undefined,

        dayOfCheckList: submitType === 'post' ? dayOfCheckList : undefined,
    };
    console.log('processedChecklistData', processedChecklistData);

    if (submitType === 'post') {
        const response = await Axios.post(`api/checkList/operation/${operationId}`, processedChecklistData);
        return response;
    } else {
        const response = await Axios.put(`api/checkList/${checkListId}`, processedChecklistData);
        return response;
    }
};

export const useComplianceFormMutation = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const mutation = useMutation({
        mutationFn: (parameter: { operationId: number; data: checkListFormType; type: 'PREV' | 'TODAY' | 'POST' }) =>
            postOrPutComplianceForm({
                operationId: parameter.operationId,
                data: parameter.data,
                type: parameter.type,
                submitType: 'post',
            }),

        onError: (error: AxiosError<ErrorResponseType>) => {
            console.log(error);
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        },
        onSuccess: (_, parameter) => {
            pushNotification({
                msg: '제출되었습니다.',
                type: 'success',
                theme: 'dark',
            });
            navigate(`/patient/checkLists?id=${parameter.operationId}&name=${name}`, { replace: true }); //체크리스트 페이지로 이동하되 이전 form페이지는 스택에서 제거
        },
    });
    return mutation;
}; //Compliance Form 서비스

export const useComplianceFormUpdateMutation = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const operationId = Number(searchParams.get('id'));
    const mutation = useMutation({
        mutationFn: (parameter: { checkListId: number; data: checkListFormType; type: 'PREV' | 'TODAY' | 'POST' }) =>
            postOrPutComplianceForm({
                checkListId: parameter.checkListId,
                data: parameter.data,
                type: parameter.type,
                submitType: 'put',
            }),

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
                msg: '수정되었습니다.',
                type: 'success',
                theme: 'dark',
            });
            navigate(`/patient/checkLists?id=${operationId}&name=${name}`, { replace: true }); //체크리스트 페이지로 이동하되 이전 form페이지는 스택에서 제거
        },
    });
    return mutation;
}; //Compliance Form 수정 서비스

export const useDailyComplianceFormMutation = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const mutation = useMutation({
        mutationFn: (parameter: { data: DailyCheckListFormType; operationId: number; dayOfCheckList: string }) =>
            postDailyComplianceForm({
                data: parameter.data,
                operationId: parameter.operationId,
                dayOfCheckList: parameter.dayOfCheckList,
                submitType: 'post',
            }),

        onError: (error: AxiosError<ErrorResponseType>) => {
            console.log(error);
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        },
        onSuccess: (_, parameter) => {
            pushNotification({
                msg: '제출되었습니다.',
                type: 'success',
                theme: 'dark',
            });
            navigate(`/patient/checkLists?id=${parameter.operationId}&name=${name}`, { replace: true }); //체크리스트 페이지로 이동하되 이전 form페이지는 스택에서 제거
        },
    });
    return mutation;
}; //Daily Compliance Form 서비스

export const useDailyComplianceFormUpdateMutation = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const operationId = Number(searchParams.get('id'));
    const name = searchParams.get('name');
    const mutation = useMutation({
        mutationFn: (parameter: { data: DailyCheckListFormType; checkListId: number }) =>
            postDailyComplianceForm({
                data: parameter.data,
                submitType: 'put',
                checkListId: parameter.checkListId,
            }),

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
                msg: '수정되었습니다.',
                type: 'success',
                theme: 'dark',
            });
            navigate(`/patient/checkLists?id=${operationId}&name=${name}`, { replace: true }); //체크리스트 페이지로 이동하되 이전 form페이지는 스택에서 제거
        },
    });
    return mutation;
}; //Daily Compliance Form 수정 서비스

const getCheckListSetup = async ({ operationId }: { operationId: number }): Promise<CheckListSetupType> => {
    const response = await Axios.get(`/api/checkListItem/${operationId}`);
    return response.data.data.checkListItemDTO;
}; //체크리스트 세팅 가져오기

export const useCheckListSetupQuery = ({ operationId }: { operationId: number }) => {
    const query = useQuery<CheckListSetupType, AxiosError<ErrorResponseType>>({
        queryKey: ['checklist', 'setup', operationId],
        queryFn: () => getCheckListSetup({ operationId }),
    });
    return query;
}; //체크리스트 세팅 가져오기 커스텀 훅
