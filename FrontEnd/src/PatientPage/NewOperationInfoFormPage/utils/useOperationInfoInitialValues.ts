import { useParams } from 'react-router-dom';
import { OperationInfoFormType } from '../../../models/OperationType';
import { useCheckListsSetupQeury, useOperationDetailQuery } from '../../_lib/operationService';
import { useEffect, useState } from 'react';
import { CheckListSetupType } from '../../../models/CheckListsType';
import { pushNotification } from '../../../utils/pushNotification';
function transformDateToTodayWithTime(dateTimeString: string): Date {
    // 주어진 날짜 문자열에서 시간 정보를 추출
    const inputDate = new Date(dateTimeString);
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const seconds = inputDate.getSeconds();

    // 오늘 날짜를 기반으로 새 Date 객체 생성
    const today = new Date();

    // 오늘 날짜에 주어진 시간 정보 설정
    today.setHours(hours, minutes, seconds);

    return today;
}
const initialCheckListSetup: CheckListSetupType = {
    explainedPreOp: true, // EAS 수술전 설명
    onsPreOp2hr: true, // 수술 2시간 전 ONS 복용여부
    onsPostBowelPrep: true, // Bowel preparation 후 경장영양액 복용여부
    dvtPrevention: true, // DVT 예방
    antibioticPreIncision: true, // 피부 절개 60분 전 예방적 항생제 투여
    painMedPreOp: true, // 수술전 통증 조절약 복용 여부
    //-------------------------수술전

    maintainTemp: true, // 수술 중 환자 체온 유지
    fluidRestriction: true, //수술 중 수액  2-4cc/kg/hr 으로 제한
    antiNausea: true, //수술 중 구역구토 방지제 사용 여부
    painControl: true, //수술 중 통증 조절을 위한 처치 여부
    //-------------------------수술당일

    giStimulant: true, //위장관 촉진 약 복용
    gumChewing: true, //하루 3번 15분동안 껌씹기
    antiNauseaPostOp: true, //수술 후 구역구토방지제 사용 여부
    ivFluidRestrictionPostOp: true, //수술 후 IV fluid 제한
    nonOpioidPainControl: true, //수술 후 non-opioid pain control 여부
    jpDrainRemoval: true, //수술 후 3일이내 JP drain 제거 여부
    catheterRemoval: true, //수술 후 수술장에서 소변줄 제거 여부
    ivLineRemoval: true, //수술 후 3일이내 IV line 제거 여부
    podExercise: true, //Post OP day 운동, POD 1day 운동, POD 2day 운동, POD 3day 운동
    podMeal: true, //Post OP day 식사, POD 1day 식사, POD 2day 식사, POD 3day 식사
    podPain: true, //수술 후 통증
};

export const useOperationInfoInitialValues = () => {
    const { operationId } = useParams();
    const enabled = Boolean(operationId);

    const [checkListSetup, setCheckListSetup] = useState<CheckListSetupType>(initialCheckListSetup);

    const checkListsSetupQeury = useCheckListsSetupQeury({
        operationId: Number(operationId),
        enabled: enabled,
    }); //체크리스트 셋업
    const operationDetailQuery = useOperationDetailQuery({
        operationId: Number(operationId),
        enabled: enabled,
    }); //수술 정보 조회
    const {
        data: checkListsSetup,
        isPending: isCheckListsSetupPending,
        error: checkListsSetupError,
    } = checkListsSetupQeury;

    const {
        data: operationDetail,
        isPending: isOperationDetailPending,
        error: operationDetailError,
        isSuccess: operationDetailSuccess,
    } = operationDetailQuery;

    const [initialValues, setInitialValues] = useState<OperationInfoFormType>({
        bloodLoss: '', //출혈량
        operationApproach: '', //수술 접근법
        operationEndTime: '', //수술 종료 시간
        operationTypeNames: '', //수술방법
        operationStartTime: '', //수술 시작 시간
        stomaFormation: '', //Stoma 형성
        totalFluidsAmount: '', //총 수액량
        totalOperationTime: '', //총 수술 시간
    });
    const resetCheckListSetup = () => {
        setCheckListSetup(initialCheckListSetup);
    };
    useEffect(() => {
        if (operationDetail) {
            setInitialValues({
                bloodLoss: operationDetail.bloodLoss,
                operationApproach: operationDetail.operationApproach,
                operationEndTime: transformDateToTodayWithTime((operationDetail.operationEndTime as string) || ''),
                operationTypeNames: operationDetail.operationMethod as string[],
                operationStartTime: transformDateToTodayWithTime((operationDetail.operationStartTime as string) || ''),
                stomaFormation: operationDetail.stomaFormation,
                totalFluidsAmount: operationDetail.totalFluidsAmount,
                totalOperationTime: operationDetail.totalOperationTime,
            });
        }
    }, [operationDetailSuccess]);

    useEffect(() => {
        if (checkListsSetup) {
            setCheckListSetup(checkListsSetup);
        }
    }, [checkListsSetup]);

    useEffect(() => {
        if (checkListsSetupError) {
            pushNotification({
                msg: checkListsSetupError.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        }
        if (operationDetailError) {
            pushNotification({
                msg: operationDetailError.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        }
    }, [checkListsSetupError, operationDetailError]);

    return {
        initialValues,
        isPending: enabled ? isOperationDetailPending || isCheckListsSetupPending : false,
        checkListSetup,
        setCheckListSetup,
        resetCheckListSetup,
    };
};
