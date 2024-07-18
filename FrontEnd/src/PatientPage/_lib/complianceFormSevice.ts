import { useMutation, useQuery } from '@tanstack/react-query';
import { checkListFormType } from '../../models/CheckListsType';
import { CheckListSetupType } from '../../models/CheckListsType';
import Axios from '../../utils/axiosInstance';
// import { AxiosError } from 'axios';
// import { ErrorResponse } from 'react-router-dom';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { pushNotification } from '../../utils/pushNotification';
import { AxiosError } from 'axios';
import { ErrorResponseType } from '../../models/AxiosResponseType';

const postComplianceForm = async ({
    operationId,
    data,
    type,
}: {
    operationId: number;
    data: checkListFormType;
    type: 'PREV' | 'TODAY' | 'POST';
}) => {
    let url = '';
    if (type === 'PREV') {
        url = 'api/checkListBefore/operation/';
    } else if (type === 'TODAY') {
        url = 'api/checkListDuring/operation/';
    } else {
        url = 'api/checkList/operation/';
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

            maintainTemp_remarks: data.maintainTemp_remarks,
            fluidRestriction_remarks: data.fluidRestriction_remarks,
            antiNausea_remarks: data.antiNausea_remarks,
            painControl_remarks: data.painControl_remarks,
        };
    } else {
        processedChecklistData = {
            giStimulant: data.giStimulant,
            gumChewing: data.gumChewing,
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
            podOneExercise: data.podOneExercise,
            podTwoExercise: data.podTwoExercise,
            podThreeExercise: data.podThreeExercise,
            postMeal: data.postMeal,
            podOneMeal: data.podOneMeal,
            podTwoMeal: data.podTwoMeal,
            postPain: data.postPain,
            podOnePain: data.podOnePain,
            podTwoPain: data.podTwoPain,
            podThreePain: data.podThreePain,

            giStimulant_remarks: data.giStimulant_remarks,
            gumChewing_remarks: data.gumChewing_remarks,
            antiNauseaPostOp_remarks: data.antiNauseaPostOp_remarks,
            ivFluidRestrictionPostOp_remarks: data.ivFluidRestrictionPostOp_remarks,
            nonOpioidPainControl_remarks: data.nonOpioidPainControl_remarks,
            jpDrainRemoval_remarks: data.jpDrainRemoval_remarks,
            catheterRemoval_remarks: data.catheterRemoval_remarks,
            ivLineRemoval_remarks: data.ivLineRemoval_remarks,
            postExercise_remarks: data.postExercise_remarks,
            podOneExercise_remarks: data.podOneExercise_remarks,
            podTwoExercise_remarks: data.podTwoExercise_remarks,
            podThreeExercise_remarks: data.podThreeExercise_remarks,
            postMeal_remarks: data.postMeal_remarks,
            podOneMeal_remarks: data.podOneMeal_remarks,
            podTwoMeal_remarks: data.podTwoMeal_remarks,
        };
    } //체크리스트 데이터 구조 변경

    console.log('processedChecklistData', processedChecklistData);
    console.log('url', url);
    const response = await Axios.post(`${url}${operationId}`, processedChecklistData);
    return response;
}; //Compliance Form 서비스(체크리스트 제출)

export const useComplianceFormMutation = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const operationId = Number(searchParams.get('id'));
    const name = searchParams.get('name');
    const mutation = useMutation({
        mutationFn: postComplianceForm,

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
                msg: '제출되었습니다.',
                type: 'success',
                theme: 'dark',
            });
            navigate(`/patient/checkLists?id=${operationId}&name=${name}`, { replace: true }); //체크리스트 페이지로 이동하되 이전페이지는 스택에서 제거
        },
    });
    return mutation;
}; //Compliance Form 서비스

const getCheckListSetup = async ({ operationId }: { operationId: number }): Promise<CheckListSetupType> => {
    const response = await Axios.get(`/api/checkListItem/${operationId}`);
    return response.data.data.checkListItemDTO;
}; //체크리스트 세팅 가져오기

export const useCheckListSetupQuery = ({ operationId }: { operationId: number }) => {
    const query = useQuery<CheckListSetupType>({
        queryKey: ['checklist', 'setup', operationId],
        queryFn: () => getCheckListSetup({ operationId }),
    });
    return query;
}; //체크리스트 세팅 가져오기 커스텀 훅
