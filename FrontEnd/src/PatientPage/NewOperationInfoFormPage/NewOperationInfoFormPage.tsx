import { useFormik } from 'formik';
import { useState } from 'react';
import { OperationInfoFormType } from '../../models/OperationType';
import { CheckListSetupType } from '../../models/CheckListsType';
import TextInput from '../../components/common/form/input/TextInput';
import NumberInput from '../../components/common/form/input/NumberInput';
import SingleSelector from '../../components/common/form/input/SingleSelector';
import YesOrNoButton from '../../components/common/form/input/YesOrNoButton';
import ConfirmNewOperationInfoModal from './components/ConfirmNewOperationInfoModal';
import { useNewOperationInfoFormMutation } from '../_lib/patientNewFormService';
import PatientChecklistSetupModal from './components/PatientChecklistSetupModal';
import SubmitButton from '../../components/common/form/SubmitButton';
import { useSearchParams } from 'react-router-dom';
import { pushNotification } from '../../utils/pushNotification';
function NewOperationInfoFormPage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const patientNewFormMutation = useNewOperationInfoFormMutation();
    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name');
    const patientId = searchParams.get('id');

    const [checkListSetup, setCheckListSetup] = useState<CheckListSetupType>({
        explainBeforeOperation: true, // EAS 수술전 설명
        takingONSBeforeOperationTwo_Hours: true, // 수술 2시간 전 ONS 복용여부
        takingAfterBowelPreparation: true, // Bowel preparation 후 ONS 경장영양액 복용여부
        takingLaxatives: true, // Laxatives 복용
        beforeOperationMedicine: true, // 수술 전 통증 조절약
        beforeSixtyMinute: true, // 피부 절개 60분 전 예방적 항생제 투여
        //수술전

        silt_Itm: true, // 수술중 SILT or ITM
        maintainTemperature: true, // 수술 중 환자 체온 유지
        volumeOfIntraoperativeInfusion: true, // Volume of intraoperative infusion (ml)
        bloodLoss: true, // Blood loss (cc)
        urineOutput: true, // Urine output (cc)
        operationTime: true, // Operation time (min)
        //수술당일

        preventionDVT: true, // DVT 예방
        chewingGum: true, // Chewing gum
        dayOfRemoveJP_Drain: true, // JP Drain 제거일
        reasonByRemoveJP_DrainDelay: true, // JP Drain 제거 지연 사유
        dayOfRemoveUrinary_Catheter: true, // Urinary catheter 제거일
        reasonByRemoveUrinary_CatheterDelay: true, // Urinary catheter 제거 지연 사유
        afterOperationLimitIV_Fluid: true, // 수술 후 IV fluid 제한
        dayOfRemoveIV_Fluid: true, // IV fluid 제거일
        reasonByRemoveIV_FluidDelay: true, // IV fluid 제거 지연 이유
        post_Nausea_Vomiting: true, // Post OP Nausea & Vomiting prophylaxis
        postOpDayExercise: true, // Post OP day 운동
        pod_Exercise: true, // POD#1 운동
        postOpDayMeal: true, // Post OP day 식사
        pod_Meal: true, // POD#1 식사
        postOpEffectivePainControl: true, // Post op Effective pain control
        pod_PainScore: true, // POD#1 pain score

        hasPost_Nausea_Vomiting: true, // Post OP Nausea & Vomiting prophylaxis 여부
        locate: true, // 입원병동
        //수술후
    });
    const [isCheckListSetupModal, setIsCheckListSetupModal] = useState(false);

    const initialValues: OperationInfoFormType = {
        height: '', //키(cm)
        weight: '', //몸무게(kg)
        bmi: '', //BMI
        asaScore: '', //ASA score
        location: '', //위치
        dignosis: '', //진단
        operationDate: '', //수술일
        hospitalizedDate: '', //입원일
        dischargedDate: '', //퇴원일
        totalHospitalizedDays: '', //총 재원일수
        operationMethod: '', //수술방법
        operationApproach: '', //수술approach
        stomaFormation: '', //Stoma formation
        ajcCStage: '', //AJCC stage
        numberOfRetrievedLine: '', //No. of retrieved LN
        complicationOccurence: '', //Complication 발생여부
        cdClassification: '', //CD classification
        reOperationWithIn30Days: '', //Reoperation within 30days
        reOperationCause: '', //Reoperation 원인
    };
    const formik = useFormik({
        initialValues, // 초기값
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        onSubmit: (values) => {
            console.log('제출', values);
            if (confirm('제출하시겠습니까?')) {
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
    const onChangeCheckListSetup = (checkItem: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckListSetup({ ...checkListSetup, [checkItem]: event.target.checked });
    };
    const handleOpenConfirm = (values: OperationInfoFormType) => {
        let isError = false;
        for (const key in values) {
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

    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
                <form className="flex flex-col w-full gap-4 p-4 mx-auto bg-white" onSubmit={formik.handleSubmit}>
                    <h1 className="w-full px-2 py-3 mx-auto mb-4 text-gray-600 border-b max-w-screen-mobile text-start">
                        <span>환자명:&nbsp;{patientName}</span>
                    </h1>

                    <TextInput label="수술방법" htmlFor="operationMethod" formik={formik} />
                    <TextInput label="수술 approach" htmlFor="operationApproach" formik={formik} />
                    <SingleSelector
                        label="Stoma formation"
                        htmlFor="stomaFormation"
                        formik={formik}
                        values={[
                            { value: 'COLOSTOMY', name: 'Colostomy' },
                            { value: 'IlEOSTOMY', name: 'IlEostomy' },
                            { value: 'UROSTOMY', name: 'Urostomy' },
                            { value: 'GASTROSTOMY', name: 'Gastrostomy' },
                            { value: 'JEJUNOSTOMY', name: 'Jejunostomy' },
                        ]}
                    />
                    <NumberInput label="No. of retrieved LN" htmlFor="numberOfRetrievedLine" formik={formik} />
                    <YesOrNoButton label="Complication 발생여부" htmlFor="complicationOccurence" formik={formik} />
                    <YesOrNoButton
                        label="Reoperation within 30days"
                        htmlFor="reOperationWithIn30Days"
                        formik={formik}
                    />
                    <TextInput label="Reoperation 원인" htmlFor="reOperationCause" formik={formik} />
                    <TextInput label="AJCC stage" htmlFor="ajcCStage" formik={formik} />
                    <TextInput label="C-D classification" htmlFor="cdClassification" formik={formik} />
                    <div className="flex flex-col items-center w-full mt-4">
                        <button
                            type="button"
                            onClick={handleOpenCheckListSetup}
                            className="w-full px-8 py-3 text-white bg-gray-400 rounded-md hover:bg-gray-500 mobile:max-w-screen-mobile"
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
                    handleChange={onChangeCheckListSetup}
                    onClose={handleCloseCheckListSetup}
                    values={checkListSetup}
                />
            )}
        </>
    );
}

export default NewOperationInfoFormPage;
