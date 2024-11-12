import { useParams, useSearchParams } from 'react-router-dom';
import { CheckListSetupType, DailyCheckListFormType } from '../../../models/CheckListsType';
import { useCheckListDailyQuery } from '../../_lib/checkListsService';
import { useEffect } from 'react';
import { pushNotification } from '../../../utils/pushNotification';

export const useDailyInitialValues = ({ existFields }: { existFields?: CheckListSetupType }) => {
    const [searchParams] = useSearchParams();

    const diffDay = searchParams.get('diffDay'); //몇일차인지
    const { checkListId } = useParams(); //수술 id
    const isEditPage = Boolean(checkListId); //수정 페이지인지 여부

    const checkListDailyQuery = useCheckListDailyQuery({
        checkListId: Number(checkListId),
        enabled: isEditPage,
    });
    const {
        data: checkListDaily,
        isPending: isCheckListDailyPending,
        error: checkListDailyError,
    } = checkListDailyQuery;

    // const isPostOp = diffDay === '0'; //수술 후인지 여부
    const isPod1 = diffDay === '-1'; //POD 1일차인지 여부
    const isPod2 = diffDay === '-2'; //POD 2일차인지 여부
    const isPod3 = diffDay === '-3'; //POD 3일차인지 여부

    let initialValues: DailyCheckListFormType = {
        podOneExercise: existFields?.podExercise && isPod1 ? '' : undefined, //POD 1day 운동
        podTwoExercise: existFields?.podExercise && isPod2 ? '' : undefined, //POD 2day 운동
        podThreeExercise: existFields?.podExercise && isPod3 ? '' : undefined, //POD 3day 운동
        podOneMeal: existFields?.podMeal && isPod1 ? '' : undefined, //POD 1day 식사
        podTwoMeal: existFields?.podMeal && isPod2 ? '' : undefined, //POD 2day 식사

        podOnePain:
            existFields?.podPain && isPod1
                ? {
                      day: 0,
                      evening: 0,
                      night: 0,
                  }
                : undefined, //POD 1day 통증
        podTwoPain:
            existFields?.podPain && isPod2
                ? {
                      day: 0,
                      evening: 0,
                      night: 0,
                  }
                : undefined, //POD 2day 통증

        podThreePain:
            existFields?.podPain && isPod3
                ? {
                      day: 0,
                      evening: 0,
                      night: 0,
                  }
                : undefined, //POD 3day 통증

        podOneExercise_remarks: isPod1 && existFields?.podExercise ? '' : undefined,
        podTwoExercise_remarks: isPod2 && existFields?.podExercise ? '' : undefined,
        podThreeExercise_remarks: isPod3 && existFields?.podExercise ? '' : undefined,
        podOneMeal_remarks: isPod1 && existFields?.podMeal ? '' : undefined,
        podTwoMeal_remarks: isPod2 && existFields?.podMeal ? '' : undefined,

        //-------------------------추가 항목-------------------------
        podOneGumChewing: existFields?.gumChewing && isPod1 ? '' : undefined, //POD 1day 껌씹기
        podTwoGumChewing: existFields?.gumChewing && isPod2 ? '' : undefined, //POD 2day 껌씹기
        podThreeGumChewing: existFields?.gumChewing && isPod3 ? '' : undefined, //POD 3day 껌씹기
        podOneGiStimulant: existFields?.giStimulant && isPod1 ? '' : undefined, //POD 1day GI stimulant
        podTwoGiStimulant: existFields?.giStimulant && isPod2 ? '' : undefined, //POD 2day GI stimulant
        podThreeGiStimulant: existFields?.giStimulant && isPod3 ? '' : undefined, //POD 3day GI stimulant

        podOneIvFluidRestriction: existFields?.ivFluidRestrictionPostOp && isPod1 ? '' : undefined, //POD 1day IV fluid 제한
        podTwoIvFluidRestriction: existFields?.ivFluidRestrictionPostOp && isPod2 ? '' : undefined, //POD 2day IV fluid 제한
        podThreeIvFluidRestriction: existFields?.ivFluidRestrictionPostOp && isPod3 ? '' : undefined, //POD 3day IV fluid 제한

        podOneNonOpioidPainControl: existFields?.nonOpioidPainControl && isPod1 ? '' : undefined, //POD 1day non-opioid pain control 여부
        podTwoNonOpioidPainControl: existFields?.nonOpioidPainControl && isPod2 ? '' : undefined, //POD 2day non-opioid pain control 여부
        podThreeNonOpioidPainControl: existFields?.nonOpioidPainControl && isPod3 ? '' : undefined, //POD 3day non-opioid pain control 여부

        podOneJpDrainRemoval: existFields?.jpDrainRemoval && isPod1 ? '' : undefined, //POD 1day JP drain 제거 여부
        podTwoJpDrainRemoval: existFields?.jpDrainRemoval && isPod2 ? '' : undefined, //POD 2day JP drain 제거 여부
        podThreeJpDrainRemoval: existFields?.jpDrainRemoval && isPod3 ? '' : undefined, //POD 3day JP drain 제거 여부
        podOneIvLineRemoval: existFields?.ivLineRemoval && isPod1 ? '' : undefined, //POD 1day IV line 제거 여부
        podTwoIvLineRemoval: existFields?.ivLineRemoval && isPod2 ? '' : undefined, //POD 2day IV line 제거 여부
        podThreeIvLineRemoval: existFields?.ivLineRemoval && isPod3 ? '' : undefined, //POD 3day IV line 제거 여부

        podOneGumChewing_remarks: isPod1 && existFields?.gumChewing ? '' : undefined,
        podTwoGumChewing_remarks: isPod2 && existFields?.gumChewing ? '' : undefined,
        podThreeGumChewing_remarks: isPod3 && existFields?.gumChewing ? '' : undefined,
        podOneGiStimulant_remarks: isPod1 && existFields?.giStimulant ? '' : undefined,
        podTwoGiStimulant_remarks: isPod2 && existFields?.giStimulant ? '' : undefined,
        podThreeGiStimulant_remarks: isPod3 && existFields?.giStimulant ? '' : undefined,
        podOneIvFluidRestriction_remarks: isPod1 && existFields?.ivFluidRestrictionPostOp ? '' : undefined,
        podTwoIvFluidRestriction_remarks: isPod2 && existFields?.ivFluidRestrictionPostOp ? '' : undefined,
        podThreeIvFluidRestriction_remarks: isPod3 && existFields?.ivFluidRestrictionPostOp ? '' : undefined,
        podOneNonOpioidPainControl_remarks: isPod1 && existFields?.nonOpioidPainControl ? '' : undefined,
        podTwoNonOpioidPainControl_remarks: isPod2 && existFields?.nonOpioidPainControl ? '' : undefined,
        podThreeNonOpioidPainControl_remarks: isPod3 && existFields?.nonOpioidPainControl ? '' : undefined,
        podOneJpDrainRemoval_remarks: isPod1 && existFields?.jpDrainRemoval ? '' : undefined,
        podTwoJpDrainRemoval_remarks: isPod2 && existFields?.jpDrainRemoval ? '' : undefined,
        podThreeJpDrainRemoval_remarks: isPod3 && existFields?.jpDrainRemoval ? '' : undefined,
        podOneIvLineRemoval_remarks: isPod1 && existFields?.ivLineRemoval ? '' : undefined,
        podTwoIvLineRemoval_remarks: isPod2 && existFields?.ivLineRemoval ? '' : undefined,
        podThreeIvLineRemoval_remarks: isPod3 && existFields?.ivLineRemoval ? '' : undefined,
    };
    if (checkListDaily) {
        initialValues = checkListDaily as DailyCheckListFormType;
    }

    useEffect(() => {
        if (checkListDailyError) {
            pushNotification({
                type: 'error',
                msg: checkListDailyError.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                theme: 'dark',
            });
        }
    }, [checkListDailyError]);
    return {
        initialValues,
        isPending: isEditPage && isCheckListDailyPending,
    };
};
