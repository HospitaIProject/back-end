import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { OperationInfoFormType } from '../../models/OperationType';
import { CheckListSetupType } from '../../models/CheckListsType';
import NumberInput from '../../components/common/form/input/NumberInput';
import SingleSelector from '../../components/common/form/input/SingleSelector';
import YesOrNoButton from '../../components/common/form/input/YesOrNoButton';
import ConfirmNewOperationInfoModal from './components/ConfirmNewOperationInfoModal';
import { useNewOperationInfoFormMutation } from '../_lib/patientNewFormService';
import PatientChecklistSetupModal from './components/PatientChecklistSetupModal';
import SubmitButton from '../../components/common/form/SubmitButton';
import { useSearchParams } from 'react-router-dom';
import { pushNotification } from '../../utils/pushNotification';
import MultiSelector from '../../components/common/form/input/MultiSelector';
import TimeInput from '../../components/common/form/input/TimeInput';
import TotalOperationInput from '../../components/common/form/input/TotalOperationInput';
import { validateCheckListSetup } from './components/utils/validateCheckListSetup';
function NewOperationInfoFormPage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const patientNewFormMutation = useNewOperationInfoFormMutation();
    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name');
    const patientId = searchParams.get('id');

    const [checkListSetup, setCheckListSetup] = useState<CheckListSetupType>({
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
    });
    const [isCheckListSetupModal, setIsCheckListSetupModal] = useState(false);

    const initialValues: OperationInfoFormType = {
        operationMethod: '', //수술방법
        customOperationMethod: '', //수술방법 *직접입력
        operationApproach: '', //수술approach //enum
        stomaFormation: '', //장루 조성술 여부
        operationStartTime: '', //수술 시작 시간
        operationEndTime: '', //수술 종료 시간
        totalOperationTime: '', //전체 수술 시간 (분)
        totalFluidsAmount: '', //수술 중 총 들어간 수액 양 (cc)
        bloodLoss: '', //수술 중 실혈량 (cc)
    };
    const formik = useFormik({
        initialValues, // 초기값
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        onSubmit: (values) => {
            console.log('제출', values);
            if (confirm('제출하시겠습니까?')) {
                if (values.operationMethod === '') {
                    values.operationMethod = [];
                } else if (values.customOperationMethod === '') {
                    values.customOperationMethod = [];
                }
                patientNewFormMutation.mutate({
                    operationData: values, // 환자수술 정보
                    setupData: checkListSetup, //해당 수술의 체크리스트 설정
                    patientId: Number(patientId),
                });
            } else {
                return;
            }
        },
    });
    const onSubmitCheckListSetup = (newCheckListSetup: CheckListSetupType) => {
        let isValid = validateCheckListSetup({ values: newCheckListSetup });
        console.log('newCheckListSetup', newCheckListSetup);
        if (!isValid) {
            pushNotification({
                msg: '수술전, 수술당일, 수술후 각 섹션을 하나 이상 선택해주세요.',
                type: 'error',
                theme: 'dark',
                position: 'top-center',
            });
            return;
        } else {
            pushNotification({
                msg: '체크리스트 설정이 완료되었습니다.',
                type: 'success',
                theme: 'dark',
                position: 'top-center',
            });
        }
        setCheckListSetup({ ...newCheckListSetup });
        handleCloseCheckListSetup();
    };
    const specialFields = ['customOperationMethod', 'operationMethod'];
    const handleOpenConfirm = (values: OperationInfoFormType) => {
        let isError = false;
        for (const key in values) {
            if (specialFields.includes(key)) {
                if (formik.values['customOperationMethod'] !== '' || formik.values['operationMethod'] !== '') continue;
            }

            if (values[key] === '') {
                formik.setFieldError(key, '필수 입력 항목입니다.');
                isError = true;
                console.log('error', key, values[key]);
            }
        }
        if (isError) {
            pushNotification({
                msg: '입력되지 않은 항목이 있습니다.',
                type: 'error',
                theme: 'dark',
                position: 'top-center',
            });
            return;
        } else {
            setIsConfirmPage(true);
            isError = false;
        }
        // setIsConfirmPage(true);
    };
    const handleCloseConfirm = () => {
        setIsConfirmPage(false);
    }; // 확인 모달 닫기
    const handleOpenCheckListSetup = () => {
        setIsCheckListSetupModal(true);
    }; // 체크리스트 설정 모달 열기
    const handleCloseCheckListSetup = () => {
        setIsCheckListSetupModal(false);
    }; // 체크리스트 설정 모달 닫기

    useEffect(() => {
        console.log('operationStartTime', formik.values.operationStartTime);
        console.log('operationEndTime', formik.values.operationEndTime);
    }, [formik.values.operationStartTime, formik.values.operationEndTime]);
    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
                <form className="mx-auto flex w-full flex-col gap-4 bg-white p-4" onSubmit={formik.handleSubmit}>
                    <h1 className="mx-auto mb-4 w-full max-w-screen-mobile border-b px-2 py-3 text-start text-gray-600">
                        <span>환자명:&nbsp;{patientName}</span>
                    </h1>

                    {/* 수술방법 수정 필요 */}
                    <MultiSelector
                        label="수술방법"
                        htmlFor="operationMethod"
                        formik={formik}
                        customFor="customOperationMethod"
                        values={[
                            { value: 'RHC_ERHC', name: 'RHC, ERHC' },
                            { value: 'T_COLECTOMY', name: 'T-colectomy' },
                            { value: 'LHC_ELHC', name: 'LHC, ELHC' },
                            { value: 'AR', name: 'AR' },
                            { value: 'LAR', name: 'LAR' },
                            { value: 'ISR', name: 'ISR' },
                            { value: 'APR', name: 'APR' },
                            { value: 'SUBTOTAL_TOTAL_COLECTOMY', name: 'Subtotal, Total colectomy' },
                            { value: 'TOTAL_PROCTOCOLECTOMY', name: 'Total proctocolectomy' },
                        ]}
                    />
                    <SingleSelector
                        label="수술approach"
                        htmlFor="operationApproach"
                        formik={formik}
                        values={[
                            { value: 'OPEN', name: 'Open' },
                            { value: 'LAPAROSCOPIC_MULTIPORT', name: 'Laparoscopic_multiport' },
                            { value: 'LAPAROSCOPIC_SINGLEPORT', name: 'Laparoscopic_Singleport' },
                            { value: 'ROBOTIC_MULTIPORT', name: 'Robotic_multiport' },
                            { value: 'ROBOTIC_SINGLEPORT', name: 'Robotic_Singleport' },
                            { value: 'OPEN_CONVERSION', name: 'open conversion' },
                        ]}
                    />
                    <YesOrNoButton label="장루 조성술 여부" htmlFor="stomaFormation" formik={formik} />
                    <TimeInput label="수술 시작 시간" htmlFor="operationStartTime" formik={formik} />
                    <TimeInput label="수술 종료 시간" htmlFor="operationEndTime" formik={formik} />
                    <TotalOperationInput
                        unit="분"
                        label="전체 수술 시간 (분)"
                        htmlFor="totalOperationTime"
                        formik={formik}
                    />
                    <NumberInput
                        unit="cc"
                        label="수술 중 총 들어간 수액 양 (cc)"
                        htmlFor="totalFluidsAmount"
                        formik={formik}
                    />
                    <NumberInput unit="cc" label="수술 중 실혈량 (cc)" htmlFor="bloodLoss" formik={formik} />

                    <div className="mt-4 flex w-full flex-col items-center">
                        <button
                            type="button"
                            onClick={handleOpenCheckListSetup}
                            className="w-full rounded-md bg-gray-400 px-8 py-3 text-white hover:bg-gray-500 mobile:max-w-screen-mobile"
                        >
                            체크리스트 설정
                        </button>
                        <span className="mt-2 text-sm text-green-600">*CheckList의 기본값은 True입니다.</span>
                    </div>
                </form>
                <SubmitButton onClick={() => handleOpenConfirm(formik.values)} label="등록하기" />
            </div>
            {isConfirmPage && (
                <ConfirmNewOperationInfoModal
                    values={formik.values}
                    onSubmit={formik.handleSubmit}
                    onClose={handleCloseConfirm}
                    checkListSetup={checkListSetup}
                />
            )}
            {isCheckListSetupModal && (
                <PatientChecklistSetupModal
                    handleSubmit={onSubmitCheckListSetup}
                    onClose={handleCloseCheckListSetup}
                    values={checkListSetup}
                />
            )}
        </>
    );
}

export default NewOperationInfoFormPage;
