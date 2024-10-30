import { useParams, useSearchParams } from 'react-router-dom';
import { CheckListSetupType, checkListFormType } from '../../../models/CheckListsType';
import { useCheckListAfterQuery, useCheckListBeforeQuery, useCheckListDuringQuery } from '../../_lib/checkListsService';
import { useEffect } from 'react';
import { pushNotification } from '../../../utils/pushNotification';
import { useQueryClient } from '@tanstack/react-query';

//호출시점에 데이터가 전달 안될수도 있음. 그래서 optional chaining 사용
export const useInitialValues = ({
    existFields,
    toggleDateStatus,
}: {
    existFields?: CheckListSetupType;
    toggleDateStatus: 'PREV' | 'TODAY' | 'POST';
}) => {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const operationId = searchParams.get('id'); //수술ID
    const diffDay = searchParams.get('diffDay'); //몇일차인지
    const dateStatus = searchParams.get('dateStatus'); //수술전, 당일, 후인지

    const { checkListId } = useParams(); //체크리스트 아이디(존재한다면 수정모드)
    const isEditPage = Boolean(checkListId); //수정 페이지인지 여부

    const isPrevEnabled = dateStatus !== 'PREV';
    const isTodayEnabled = dateStatus !== 'PREV' && dateStatus !== 'TODAY';

    const isEditPrevEnabled = isEditPage && dateStatus === 'PREV'; //수술전 체크리스트 수정 가능 여부
    const isEditTodayEnabled = isEditPage && dateStatus === 'TODAY'; //수술당일 체크리스트 수정 가능 여부
    const isEditPostEnabled = isEditPage && dateStatus === 'POST'; //수술후 체크리스트 수정 가능 여부

    console.log('diffDay:', diffDay);
    console.log('dateStatus:', dateStatus);
    console.log('isPrevEnabled:', isPrevEnabled);
    console.log('isTodayEnabled:', isTodayEnabled);

    const checkListBeforeQuery = useCheckListBeforeQuery({
        operationId: Number(operationId),
        enabled: isPrevEnabled || isEditPrevEnabled,
    });
    console.log('dateStatus', dateStatus);
    const checkListDuringQuery = useCheckListDuringQuery({
        operationId: Number(operationId),
        enabled: isTodayEnabled || isEditTodayEnabled,
    });
    const checkListAfterQuery = useCheckListAfterQuery({
        operationId: Number(operationId),
        enabled: isEditPostEnabled,
    });
    const {
        data: checkListBeforeData,
        isPending: isCheckListBeforePending,
        error: checkListBeforeError,
    } = checkListBeforeQuery;
    const {
        data: checkListDuringData,
        isPending: isCheckListDuringPending,
        error: checkListDuringError,
    } = checkListDuringQuery;
    const {
        data: checkListAfterData,
        // isPending: isCheckListAfterPending,
        // error: checkListAfterError,
    } = checkListAfterQuery;

    useEffect(() => {
        if (checkListBeforeError && toggleDateStatus === 'PREV') {
            console.log('checkListBeforeError:', checkListBeforeError);
            pushNotification({
                msg: checkListBeforeError.response?.data.message || '수술 전 체크리스트를 불러오는데 실패했습니다.',
                type: 'error',
                theme: 'light',
                position: 'top-center',
            });
        }
        if (checkListDuringError && toggleDateStatus == 'TODAY') {
            console.log('checkListDuringError:', checkListDuringError);
            pushNotification({
                msg: checkListDuringError.response?.data.message || '수술 중 체크리스트를 불러오는데 실패했습니다.',
                type: 'error',
                theme: 'light',
                position: 'top-center',
            });
        }
    }, [toggleDateStatus]); //각탭에서 에러가 있을때 알림

    useEffect(() => {
        console.log('checkListBeforeData', checkListBeforeData);
        console.log('checkListDuringData', checkListDuringData);
    }, [checkListBeforeData, checkListDuringData]);

    useEffect(() => {
        return () => {
            // checkListBeforeOperation 쿼리 캐시 삭제
            queryClient.removeQueries({
                queryKey: ['checklistBefore', Number(operationId)],
            });

            // checkListDuringOperation 쿼리 캐시 삭제
            queryClient.removeQueries({
                queryKey: ['checkListDuring', Number(operationId)],
            });
        };
    }, [operationId, queryClient]);

    const initialValues: checkListFormType = {
        explainedPreOp: existFields?.explainedPreOp ? '' : undefined, // EAS 수술전 설명
        onsPreOp2hr: existFields?.onsPreOp2hr ? '' : undefined, // 수술 2시간 전 ONS 복용여부
        onsPostBowelPrep: existFields?.onsPostBowelPrep ? '' : undefined, // Bowel preparation 후 ONS 경장영양액 복용여부
        dvtPrevention: existFields?.dvtPrevention ? '' : undefined, // DVT 예방
        antibioticPreIncision: existFields?.antibioticPreIncision ? '' : undefined, // 피부 절개 60분 전 예방적 항생제 투여
        painMedPreOp: existFields?.painMedPreOp ? '' : undefined, // 수술 전 통증 조절약

        explainedPreOp_remarks: existFields?.explainedPreOp ? '' : undefined,
        onsPreOp2hr_remarks: existFields?.onsPreOp2hr ? '' : undefined,
        onsPostBowelPrep_remarks: existFields?.onsPostBowelPrep ? '' : undefined,
        dvtPrevention_remarks: existFields?.dvtPrevention ? '' : undefined,
        antibioticPreIncision_remarks: existFields?.antibioticPreIncision ? '' : undefined,
        painMedPreOp_remarks: existFields?.painMedPreOp ? '' : undefined,

        //-------------------------------수술전--------------------------------

        maintainTemp: existFields?.maintainTemp ? '' : undefined, // 수술 중 환자 체온 유지
        fluidRestriction: existFields?.fluidRestriction ? '' : undefined, //수술 중 수액  2-4cc/kg/hr 으로 제한 *별도 수치 디스플레이 필요
        antiNausea: existFields?.antiNausea ? '' : undefined, //수술 중 구역구토 방지제 사용 여부
        painControl: existFields?.painControl ? '' : undefined, //수술 중 통증 조절을 위한 처치 여부

        maintainTemp_remarks: existFields?.maintainTemp ? '' : undefined,
        fluidRestriction_remarks: existFields?.fluidRestriction ? '' : undefined,
        antiNausea_remarks: existFields?.antiNausea ? '' : undefined,
        painControl_remarks: existFields?.painControl ? '' : undefined,
        //------------------------------수술당일-----------------------------------

        antiNauseaPostOp: existFields?.antiNauseaPostOp ? '' : undefined, //수술 후 구역구토방지제 사용 여부
        ivFluidRestrictionPostOp: existFields?.ivFluidRestrictionPostOp ? '' : undefined, //수술 후 IV fluid 제한awsas
        nonOpioidPainControl: existFields?.nonOpioidPainControl ? '' : undefined, //수술 후 non-opioid pain control 여부
        jpDrainRemoval: existFields?.jpDrainRemoval ? '' : undefined, //수술 후 3일이내 JP drain 제거 여부
        jpDrainRemovalDate: existFields?.jpDrainRemoval ? '' : undefined, //제거한날 기입
        catheterRemoval: existFields?.catheterRemoval ? '' : undefined, //수술 후 수술장에서 소변줄 제거 여부
        catheterRemovalDate: existFields?.catheterRemoval ? '' : undefined, //제거한날 기입
        catheterReInsertion: existFields?.catheterRemoval ? '' : undefined, //Foley cath 재삽입 여부
        ivLineRemoval: existFields?.ivLineRemoval ? '' : undefined, //수술 후 3일이내 IV line 제거 여부
        ivLineRemovalDate: existFields?.ivLineRemoval ? '' : undefined, //제거한날 기입
        postExercise: existFields?.podExercise ? '' : undefined, //Post OP day 운동
        postMeal: existFields?.podMeal ? '' : undefined, //Post OP day 식사
        postPain: existFields?.podPain
            ? {
                  day: 0,
                  evening: 0,
                  night: 0,
              }
            : undefined,
        //수술 후 통증

        antiNauseaPostOp_remarks: existFields?.antiNauseaPostOp ? '' : undefined,
        ivFluidRestrictionPostOp_remarks: existFields?.ivFluidRestrictionPostOp ? '' : undefined,
        nonOpioidPainControl_remarks: existFields?.nonOpioidPainControl ? '' : undefined,
        jpDrainRemoval_remarks: existFields?.jpDrainRemoval ? '' : undefined,
        catheterRemoval_remarks: existFields?.catheterRemoval ? '' : undefined,
        ivLineRemoval_remarks: existFields?.ivLineRemoval ? '' : undefined,
        postExercise_remarks: existFields?.podExercise ? '' : undefined,
        postMeal_remarks: existFields?.podMeal ? '' : undefined,
    };

    if (checkListBeforeData) {
        const checkListBefore = checkListBeforeData;
        initialValues.explainedPreOp = checkListBefore?.explainedPreOp;
        initialValues.onsPreOp2hr = checkListBefore?.onsPreOp2hr;
        initialValues.onsPostBowelPrep = checkListBefore?.onsPostBowelPrep;
        initialValues.dvtPrevention = checkListBefore?.dvtPrevention;
        initialValues.antibioticPreIncision = checkListBefore?.antibioticPreIncision;
        initialValues.painMedPreOp = checkListBefore?.painMedPreOp;

        initialValues.explainedPreOp_remarks = checkListBefore?.explainedPreOp_remarks;
        initialValues.onsPreOp2hr_remarks = checkListBefore?.onsPreOp2hr_remarks;
        initialValues.onsPostBowelPrep_remarks = checkListBefore?.onsPostBowelPrep_remarks;
        initialValues.dvtPrevention_remarks = checkListBefore?.dvtPrevention_remarks;
        initialValues.antibioticPreIncision_remarks = checkListBefore?.antibioticPreIncision_remarks;
        initialValues.painMedPreOp_remarks = checkListBefore?.painMedPreOp_remarks;
    }

    if (checkListDuringData) {
        const checkListDuring = checkListDuringData;
        initialValues.maintainTemp = checkListDuring?.maintainTemp;
        initialValues.fluidRestriction = checkListDuring?.fluidRestriction;
        initialValues.antiNausea = checkListDuring?.antiNausea;
        initialValues.painControl = checkListDuring?.painControl;

        initialValues.maintainTemp_remarks = checkListDuring?.maintainTemp_remarks;
        initialValues.fluidRestriction_remarks = checkListDuring?.fluidRestriction_remarks;
        initialValues.antiNausea_remarks = checkListDuring?.antiNausea_remarks;
        initialValues.painControl_remarks = checkListDuring?.painControl_remarks;
    }
    if (checkListAfterData) {
        const checkListAfter = checkListAfterData;
        initialValues.antiNauseaPostOp = checkListAfter?.antiNauseaPostOp;
        initialValues.ivFluidRestrictionPostOp = checkListAfter?.ivFluidRestrictionPostOp;
        initialValues.nonOpioidPainControl = checkListAfter?.nonOpioidPainControl;
        initialValues.jpDrainRemoval = checkListAfter?.jpDrainRemoval;
        initialValues.jpDrainRemovalDate = checkListAfter.jpDrainRemovalDate
            ? new Date(checkListAfter?.jpDrainRemovalDate ?? '')
            : '';
        initialValues.catheterRemoval = checkListAfter?.catheterRemoval;
        initialValues.catheterRemovalDate = checkListAfter.catheterRemovalDate
            ? new Date(checkListAfter?.catheterRemovalDate ?? '')
            : '';
        initialValues.catheterReInsertion = checkListAfter?.catheterReInsertion;
        initialValues.ivLineRemoval = checkListAfter?.ivLineRemoval;
        initialValues.ivLineRemovalDate = checkListAfter.ivLineRemovalDate
            ? new Date(checkListAfter.ivLineRemovalDate ?? '')
            : '';
        initialValues.postExercise = checkListAfter?.postExercise;
        initialValues.postMeal = checkListAfter?.postMeal;
        initialValues.postPain = checkListAfter?.postPain;

        initialValues.antiNauseaPostOp_remarks = checkListAfter?.antiNauseaPostOp_remarks;
        initialValues.ivFluidRestrictionPostOp_remarks = checkListAfter?.ivFluidRestrictionPostOp_remarks;
        initialValues.nonOpioidPainControl_remarks = checkListAfter?.nonOpioidPainControl_remarks;
        initialValues.jpDrainRemoval_remarks = checkListAfter?.jpDrainRemoval_remarks;
        initialValues.catheterRemoval_remarks = checkListAfter?.catheterRemoval_remarks;
        initialValues.ivLineRemoval_remarks = checkListAfter?.ivLineRemoval_remarks;
        initialValues.postExercise_remarks = checkListAfter?.postExercise_remarks;
        initialValues.postMeal_remarks = checkListAfter?.postMeal_remarks;
    }
    return {
        initialValues,
        isPending:
            (dateStatus !== 'PREV' ? isCheckListBeforePending : false) ||
            (dateStatus !== 'PREV' && dateStatus !== 'TODAY' ? isCheckListDuringPending : false),
    };
};
