import { useSearchParams } from 'react-router-dom';
import { CheckListSetupType, checkListFormType } from '../../../models/CheckListsType';
import { useCheckListBeforeQuery, useCheckListDuringQuery } from '../../_lib/checkListsService';
import { useEffect } from 'react';
import { pushNotification } from '../../../utils/pushNotification';

//호출시점에 데이터가 전달 안될수도 있음. 그래서 optional chaining 사용
export const useInitialValues = ({
    existFields,
    toggleDateStatus,
}: {
    existFields?: CheckListSetupType;
    toggleDateStatus: 'PREV' | 'TODAY' | 'POST';
}) => {
    const [searchParams] = useSearchParams();
    const operationId = searchParams.get('id'); //수술ID
    const diffDay = searchParams.get('diffDay'); //몇일차인지
    const dateStatus = searchParams.get('dateStatus'); //수술전, 당일, 후인지

    const isPrevEnabled = dateStatus !== 'PREV';
    const isTodayEnabled = dateStatus !== 'PREV' && dateStatus !== 'TODAY';

    const checkListBeforeQuery = useCheckListBeforeQuery({
        operationId: Number(operationId),
        enabled: isPrevEnabled,
    });
    const checkListDuringQuery = useCheckListDuringQuery({
        operationId: Number(operationId),
        enabled: isTodayEnabled,
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
    useEffect(() => {
        if (checkListBeforeError) {
            console.log('checkListBeforeError', checkListBeforeError);
        }
        if (checkListDuringError) {
            console.log('checkListDuringError', checkListDuringError);
        }
    }, [checkListBeforeError, checkListDuringError]); //에러가 있을때 확인

    useEffect(() => {
        if (checkListBeforeError && toggleDateStatus === 'PREV') {
            console.log('xxxxx');
            pushNotification({
                msg: checkListBeforeError.response?.data.message || '수술 전 체크리스트를 불러오는데 실패했습니다.',
                type: 'error',
                theme: 'light',
                position: 'top-center',
            });
        }
        if (checkListDuringError && toggleDateStatus !== 'TODAY') {
            console.log('ㅌㅌㅌㅌ');
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

    const isPostOp = diffDay === '0'; //수술 후인지 여부
    const isPod1 = diffDay === '-1'; //POD 1일차인지 여부
    const isPod2 = diffDay === '-2'; //POD 2일차인지 여부
    const isPod3 = diffDay === '-3'; //POD 3일차인지 여부

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

        giStimulant: existFields?.giStimulant ? '' : undefined, //위장관 촉진 약 복용
        gumChewing: existFields?.gumChewing ? '' : undefined, //하루 3번 15분동안 껌씹기
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
        postExercise: existFields?.podExercise && isPostOp ? '' : undefined, //Post OP day 운동
        podOneExercise: existFields?.podExercise && isPod1 ? '' : undefined, //POD 1day 운동
        podTwoExercise: existFields?.podExercise && isPod2 ? '' : undefined, //POD 2day 운동
        podThreeExercise: existFields?.podExercise && isPod3 ? '' : undefined, //POD 3day 운동
        postMeal: existFields?.podMeal && isPostOp ? '' : undefined, //Post OP day 식사
        podOneMeal: existFields?.podMeal && isPod1 ? '' : undefined, //POD 1day 식사
        podTwoMeal: existFields?.podMeal && isPod2 ? '' : undefined, //POD 2day 식사
        postPain:
            existFields?.podPain && isPostOp
                ? {
                      day: '',
                      evening: '',
                      night: '',
                  }
                : undefined,
        //수술 후 통증
        podOnePain:
            existFields?.podPain && isPod1
                ? {
                      day: '',
                      evening: '',
                      night: '',
                  }
                : undefined, //POD 1day 통증
        podTwoPain:
            existFields?.podPain && isPod2
                ? {
                      day: '',
                      evening: '',
                      night: '',
                  }
                : undefined, //POD 2day 통증

        podThreePain:
            existFields?.podPain && isPod3
                ? {
                      day: '',
                      evening: '',
                      night: '',
                  }
                : undefined, //POD 3day 통증

        giStimulant_remarks: existFields?.giStimulant ? '' : undefined,
        gumChewing_remarks: existFields?.gumChewing ? '' : undefined,
        antiNauseaPostOp_remarks: existFields?.antiNauseaPostOp ? '' : undefined,
        ivFluidRestrictionPostOp_remarks: existFields?.ivFluidRestrictionPostOp ? '' : undefined,
        nonOpioidPainControl_remarks: existFields?.nonOpioidPainControl ? '' : undefined,
        jpDrainRemoval_remarks: existFields?.jpDrainRemoval ? '' : undefined,
        catheterRemoval_remarks: existFields?.catheterRemoval ? '' : undefined,
        ivLineRemoval_remarks: existFields?.ivLineRemoval ? '' : undefined,
        postExercise_remarks: isPostOp && existFields?.podExercise ? '' : undefined,
        podOneExercise_remarks: isPod1 && existFields?.podExercise ? '' : undefined,
        podTwoExercise_remarks: isPod2 && existFields?.podExercise ? '' : undefined,
        podThreeExercise_remarks: isPod3 && existFields?.podExercise ? '' : undefined,
        postMeal_remarks: isPostOp && existFields?.podMeal ? '' : undefined,
        podOneMeal_remarks: isPod1 && existFields?.podMeal ? '' : undefined,
        podTwoMeal_remarks: isPod2 && existFields?.podMeal ? '' : undefined,
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
    return {
        initialValues,
        isPending:
            (dateStatus !== 'PREV' ? isCheckListBeforePending : false) ||
            (dateStatus !== 'PREV' && dateStatus !== 'TODAY' ? isCheckListDuringPending : false),
    };
};
