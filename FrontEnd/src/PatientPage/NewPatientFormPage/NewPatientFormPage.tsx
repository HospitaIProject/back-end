import { useFormik } from 'formik';
import { useState } from 'react';
import { CheckListSetupType, NewPatientValuesType } from '../../models/FormType';
import TextInput from '../../components/common/form/input/TextInput';
import NumberInput from '../../components/common/form/input/NumberInput';
import SingleSelector from '../../components/common/form/input/SingleSelector';
import YesOrNoButton from '../../components/common/form/input/YesOrNoButton';
import BMIinput from '../../components/common/form/input/BMIinput';
import DateInput from '../../components/common/form/input/DateInput';
import ConfirmNewPaitentModal from './components/ConfirmNewPaitentModal';
import { usePatientNewFormMutation } from '../_lib/patientNewFormService';
import PatientChecklistSetupModal from './components/PatientChecklistSetupModal';
import SubmitButton from '../../components/common/form/SubmitButton';
function NewPatientFormPage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const patientNewFormMutation = usePatientNewFormMutation();
    const [checkListSetup, setCheckListSetup] = useState<CheckListSetupType>({
        explainBeforeOperation: true,
        takingONSBeforeOperationTwo_Hours: true,
        takingAfterBowelPreparation: true,
        preventionDVT: true,
        takingLaxatives: true,
        chewingGum: true,
        dayOfRemoveJP_Drain: true,
        reasonByRemoveJP_DrainDelay: true,
        dayOfRemoveUrinary_Catheter: true,
        reasonByRemoveUrinary_CatheterDelay: true,
        afterOperationLimitIV_Fluid: true,
        dayOfRemoveIV_Fluid: true,
        reasonByRemoveIV_FluidDelay: true,
        post_Nausea_Vomiting: true,
        postOpDayExercise: true,
        pod_1Exercise: true,
        pod_2Exercise: true,
        pod_3Exercise: true,
        postOpDayMeal: true,
        pod_1Meal: true,
        pod_2Meal: true,
        beforeOperationMedicine: true,
        silt_Itm: true,
        postOpEffectivePainControl: true,
        pod_1PainScore: true,
        pod_2PainScore: true,
        pod_3PainScore: true,
        beforeSixtyMinute: true,
        maintainTemperature: true,
        volumeOfIntraoperativeInfusion: true,
        bloodLoss: true,
        urineOutput: true,
        operationTime: true,
        isPost_Nausea_Vomiting: true,
        locate: true,
    });
    const [isCheckListSetupModal, setIsCheckListSetupModal] = useState(false);

    const initialValues: NewPatientValuesType = {
        patientNumber: '', //등록번호
        name: '', //환자이름
        sex: '', //성별
        age: '', //나이
        height: '', //키(cm)
        weight: '', //몸무게(kg)
        bmi: '', //BMI
        asaScore: '', //ASA score
        location: '', //위치
        dignosis: '', //진단
        opertationDate: '', //수술일
        hospitalizedDate: '', //입원일
        dischargedDate: '', //퇴원일
        totalHospitalizedDays: '', //총 재원일수
        operationMethod: '', //수술방법
        operationApproach: '', //수술approach
        stomaFormation: '', //Stoma formation
        ajccstage: '', //AJCC stage
        numberOfRetrievedLine: '', //No. of retrieved LN
        complicationOccurence: '', //Complication 발생여부
        cdclassification: '', //CD classification
        reOperationWithIn30Days: '', //Reoperation within 30days
        reOperationCause: '', //Reoperation 원인
    };
    const formik = useFormik({
        initialValues, // 초기값
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        onSubmit: (values) => {
            console.log('제출', values);
            if (confirm('제출하시겠습니까?')) {
                patientNewFormMutation.mutate({ data: values });
            } else {
                return;
            }
            console.log('제출', values);
        },
    });
    const onChangeCheckListSetup = (checkItem: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckListSetup({ ...checkListSetup, [checkItem]: event.target.checked });
    };
    const handleOpenConfirm = (values: NewPatientValuesType) => {
        let isError = false;
        for (const key in values) {
            if (values[key] === '') {
                formik.setFieldError(key, '필수 입력 항목입니다.');
                isError = true;
            }
        }
        if (isError) {
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
            <div className={`w-full ${isConfirmPage ? 'hidden' : ''}`}>
                <h1 className="mx-4 mb-4 border-b py-3 text-center text-2xl font-semibold">환자 정보 등록</h1>
                <form className="mx-auto flex w-full flex-col gap-4 bg-white p-4" onSubmit={formik.handleSubmit}>
                    <NumberInput label="등록번호" htmlFor="patientNumber" formik={formik} />
                    <TextInput label="환자이름" htmlFor="name" formik={formik} />
                    <SingleSelector
                        label="성별"
                        htmlFor="sex"
                        formik={formik}
                        values={[
                            { value: 'MALE', name: 'MALE' },
                            { value: 'FEMALE', name: 'FEMALE' },
                        ]}
                    />
                    <NumberInput label="나이" htmlFor="age" formik={formik} />
                    <NumberInput unit="cm" label="키(cm)" htmlFor="height" formik={formik} />
                    <NumberInput unit="kg" label="몸무게(kg)" htmlFor="weight" formik={formik} />
                    <BMIinput label="BMI" htmlFor="bmi" formik={formik} />
                    <SingleSelector
                        label="ASA score"
                        htmlFor="asaScore"
                        formik={formik}
                        values={[
                            { value: 'ASA_I', name: 'ASA_I' },
                            { value: 'ASA_II', name: 'ASA_II' },
                            { value: 'ASA_III', name: 'ASA_III' },
                            { value: 'ASA_IV', name: 'ASA_IV' },
                            { value: 'ASA_V', name: 'ASA_V' },
                            { value: 'ASA_VI', name: 'ASA_VI' },
                        ]}
                    />
                    <TextInput label="위치" htmlFor="location" formik={formik} />
                    <TextInput label="진단" htmlFor="dignosis" formik={formik} />
                    <DateInput label="수술일" htmlFor="opertationDate" formik={formik} />
                    <DateInput label="입원일" htmlFor="hospitalizedDate" formik={formik} />
                    <DateInput label="퇴원일" htmlFor="dischargedDate" formik={formik} />
                    <NumberInput label="총 재원일수" htmlFor="totalHospitalizedDays" formik={formik} />
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
                    <TextInput label="AJCC stage" htmlFor="ajccstage" formik={formik} />
                    <TextInput label="C-D classification" htmlFor="cdclassification" formik={formik} />
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
                    <SubmitButton onClick={() => handleOpenConfirm(formik.values)} label="등록하기" />
                </form>
            </div>
            {isConfirmPage && (
                <ConfirmNewPaitentModal
                    values={formik.values}
                    onSubmit={formik.handleSubmit}
                    onClose={handleCloseConfirm}
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

export default NewPatientFormPage;
