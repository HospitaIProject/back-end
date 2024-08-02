import { useSearchParams } from 'react-router-dom';
import { CheckListSetupType, DailyCheckListFormType } from '../../../models/CheckListsType';

export const useDailyInitialValues = ({ existFields }: { existFields?: CheckListSetupType }) => {
    const [searchParams] = useSearchParams();

    const diffDay = searchParams.get('diffDay'); //몇일차인지

    // const isPostOp = diffDay === '0'; //수술 후인지 여부
    const isPod1 = diffDay === '-1'; //POD 1일차인지 여부
    const isPod2 = diffDay === '-2'; //POD 2일차인지 여부
    const isPod3 = diffDay === '-3'; //POD 3일차인지 여부

    const initialValues: DailyCheckListFormType = {
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
    };

    return initialValues;
};
