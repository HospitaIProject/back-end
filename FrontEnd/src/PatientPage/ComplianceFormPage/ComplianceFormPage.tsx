import { useFormik } from 'formik';
import YesOrNoButton from '../../components/common/form/input/YesOrNoButton';
import { ComplianceValuesType } from '../../models/FormType';
import { useEffect, useState } from 'react';
import SingleSelector from '../../components/common/form/input/SingleSelector';
// import TextInput from '../../components/common/form/input/TextInput';
import NumberInput from '../../components/common/form/input/NumberInput';
import ComfirmComplianceFormModal from './components/ComfirmComplianceFormModal';
import { useComplianceFormMutation } from '../_lib/complianceFormSevice';
import SubmitButton from '../../components/common/form/SubmitButton';
import { ITEMS_NAME_MAP } from '../../utils/mappingNames';
import TextInput from '../../components/common/form/input/TextInput';
import ArrowIcon from '../../icons/ArrowIcon';

const existFields = {
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
    pod_1Exercise: true, // POD#1 운동
    pod_2Exercise: true, // POD#2 운동
    pod_3Exercise: true, // POD#3 운동
    postOpDayMeal: true, // Post OP day 식사
    pod_1Meal: true, // POD#1 식사
    pod_2Meal: true, // POD#2 식사
    postOpEffectivePainControl: true, // Post op Effective pain control
    pod_1PainScore: true, // POD#1 pain score
    pod_2PainScore: true, // POD#2 pain score
    pod_3PainScore: true, // POD#3 pain score
    isPost_Nausea_Vomiting: true, // Post OP Nausea & Vomiting prophylaxis 여부
    locate: true, // 입원병동
    //수술후
};

function ComplianceFormPage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const [relativeDay, setRelativeDay] = useState<'PREV' | 'TODAY' | 'POST'>('PREV');

    const complianceFormMutation = useComplianceFormMutation();
    const initialValues: ComplianceValuesType = {
        explainBeforeOperation: '', //EAS 수술전 설명
        takingONSBeforeOperationTwo_Hours: '', //수술 2시간 전 ONS 복용여부
        takingAfterBowelPreparation: '', //Bowel preparation 후 ONS 경장영양액 복용여부
        preventionDVT: '', //DVT 예방
        takingLaxatives: '', //Laxatives 복용
        chewingGum: '', //Chewing gum
        dayOfRemoveJP_Drain: '', //JP Drain 제거일
        reasonByRemoveJP_DrainDelay: '', //JP Drain 제거 지연 사유
        dayOfRemoveUrinary_Catheter: '', //Urinary catheter 제거일
        reasonByRemoveUrinary_CatheterDelay: '', //Urinary catheter 제거 지연 사유
        afterOperationLimitIV_Fluid: '', //수술 후 IV fluid 제한
        dayOfRemoveIV_Fluid: '', //IV fluid 제거일
        reasonByRemoveIV_FluidDelay: '', //IV fluid 제거 지연 이유
        post_Nausea_Vomiting: '', //Post OP Nausea & Vomiting prophylaxis
        postOpDayExercise: '', //Post OP day 운동
        pod_1Exercise: '', //POD#1 운동
        pod_2Exercise: '', //POD#2 운동
        pod_3Exercise: '', //POD#3 운동
        postOpDayMeal: '', //Post OP day 식사
        pod_1Meal: '', //POD#1 식사
        pod_2Meal: '', //POD#2 식사
        beforeOperationMedicine: '', //수술 전 통증 조절약
        silt_Itm: '', //수술중 SILT or ITM
        postOpEffectivePainControl: '', //Post op Effective pain control
        pod_1PainScore: '', ////POD#1 pain score
        pod_2PainScore: '', ////POD#2 pain score
        pod_3PainScore: '', ////POD#3 pain score
        beforeSixtyMinute: '', //피부 절개 60분 전 예방적 항생제 투여
        maintainTemperature: '', //수술 중 환자 체온 유지
        volumeOfIntraoperativeInfusion: '', //Volume of intraoperative infusion (ml)
        bloodLoss: '', //Blood loss (cc)
        urineOutput: '', //Urine output (cc)
        operationTime: '', //Operation time (min)
        isPost_Nausea_Vomiting: '', //Post OP Nausea & Vomiting prophylaxis 여부
        locate: '', //입원병동

        //비고
        explainBeforeOperation_remark: '',
        takingONSBeforeOperationTwo_Hours_remark: '',
        takingAfterBowelPreparation_remark: '',
        preventionDVT_remark: '',
        takingLaxatives_remark: '',
        chewingGum_remark: '',
        dayOfRemoveJP_Drain_remark: '',
        reasonByRemoveJP_DrainDelay_remark: '',
        dayOfRemoveUrinary_Catheter_remark: '',
        reasonByRemoveUrinary_CatheterDelay_remark: '',
        afterOperationLimitIV_Fluid_remark: '',
        dayOfRemoveIV_Fluid_remark: '',
        reasonByRemoveIV_FluidDelay_remark: '',
        post_Nausea_Vomiting_remark: '',
        postOpDayExercise_remark: '',
        pod_1Exercise_remark: '',
        pod_2Exercise_remark: '',
        pod_3Exercise_remark: '',
        postOpDayMeal_remark: '',
        pod_1Meal_remark: '',
        pod_2Meal_remark: '',
        beforeOperationMedicine_remark: '',
        silt_Itm_remark: '',
        postOpEffectivePainControl_remark: '',
        pod_1PainScore_remark: '',
        pod_2PainScore_remark: '',
        pod_3PainScore_remark: '',
        beforeSixtyMinute_remark: '',
        maintainTemperature_remark: '',
        volumeOfIntraoperativeInfusion_remark: '',
        bloodLoss_remark: '',
        urineOutput_remark: '',
        operationTime_remark: '',
        isPost_Nausea_Vomiting_remark: '',
        locate_remark: '',
    };
    const formik = useFormik({
        initialValues, // 초기값
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        onSubmit: (values) => {
            console.log('제출', values);
            if (confirm('제출하시겠습니까?')) {
                complianceFormMutation.mutate({ patientId: 1, data: values });
            } else {
                return;
            }
        },
    });

    const handleOpenConfirm = (values: ComplianceValuesType) => {
        let isError = false;
        for (const key in values) {
            if (!key.endsWith('_remark') && values[key] === '') {
                formik.setFieldError(key, '필수 입력 항목입니다.');
                isError = true;
            } //비어있는 필드 유효성 검사(Remark 제외)
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
    };

    useEffect(() => {
        console.log('form 에러객체', formik.errors);
    }, [formik.errors]);

    return (
        <>
            <div className={`w-full ${isConfirmPage ? 'hidden' : ''}`}>
                <h2 className="mt-4 text-center text-2xl font-bold text-blue-500">김동연</h2>
                <h1 className="mx-4 mb-4 border-b py-3 text-center text-2xl font-bold">
                    Rectal ERAS compliance checklist
                </h1>
                <form className="mx-auto flex w-full flex-col gap-6 rounded bg-white p-4 shadow-md">
                    {/* 수술전 */}
                    <div className="flex w-full flex-col items-center gap-6">
                        <button className="flex w-fit flex-row items-center gap-2">
                            <span className="">-수술전-</span>
                            <ArrowIcon className="h-5 w-5 rotate-90 transform" />
                        </button>

                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="explainBeforeOperation"
                            label={ITEMS_NAME_MAP.explainBeforeOperation}
                            formik={formik}
                            isRender={existFields.explainBeforeOperation}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="takingONSBeforeOperationTwo_Hours"
                            label={ITEMS_NAME_MAP.takingONSBeforeOperationTwo_Hours}
                            formik={formik}
                            isRender={existFields.takingONSBeforeOperationTwo_Hours}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="takingAfterBowelPreparation"
                            label={ITEMS_NAME_MAP.takingAfterBowelPreparation}
                            formik={formik}
                            isRender={existFields.takingAfterBowelPreparation}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="takingLaxatives"
                            label={ITEMS_NAME_MAP.takingLaxatives}
                            formik={formik}
                            isRender={existFields.takingLaxatives}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="beforeOperationMedicine"
                            label={ITEMS_NAME_MAP.beforeOperationMedicine}
                            formik={formik}
                            isRender={existFields.beforeOperationMedicine}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="beforeSixtyMinute"
                            label={ITEMS_NAME_MAP.beforeSixtyMinute}
                            formik={formik}
                            isRender={existFields.beforeSixtyMinute}
                        />
                    </div>

                    {/* 수술당일 */}
                    <div className="flex w-full flex-col items-center gap-6">
                        <span>-수술당일-</span>

                        <TextInput<ComplianceValuesType>
                            htmlFor="silt_Itm"
                            label={ITEMS_NAME_MAP.silt_Itm}
                            formik={formik}
                            isRender={existFields.silt_Itm}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="maintainTemperature"
                            label={ITEMS_NAME_MAP.maintainTemperature}
                            formik={formik}
                            isRender={existFields.maintainTemperature}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            label={ITEMS_NAME_MAP.volumeOfIntraoperativeInfusion}
                            htmlFor="volumeOfIntraoperativeInfusion"
                            formik={formik}
                            isRender={existFields.volumeOfIntraoperativeInfusion}
                        />
                        <NumberInput
                            label={ITEMS_NAME_MAP.bloodLoss}
                            htmlFor="bloodLoss"
                            formik={formik}
                            isRender={existFields.bloodLoss}
                        />
                        <NumberInput
                            label={ITEMS_NAME_MAP.urineOutput}
                            htmlFor="urineOutput"
                            formik={formik}
                            isRender={existFields.urineOutput}
                        />
                        <NumberInput
                            label={ITEMS_NAME_MAP.operationTime}
                            htmlFor="operationTime"
                            formik={formik}
                            isRender={existFields.operationTime}
                        />
                    </div>

                    {/* 수술후 */}
                    <div className="flex w-full flex-col items-center gap-6">
                        <span>-수술후-</span>

                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="preventionDVT"
                            label={ITEMS_NAME_MAP.preventionDVT}
                            formik={formik}
                            isRender={existFields.preventionDVT}
                        />

                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="chewingGum"
                            label={ITEMS_NAME_MAP.chewingGum}
                            formik={formik}
                            isRender={existFields.chewingGum}
                        />
                        <SingleSelector<ComplianceValuesType>
                            label={ITEMS_NAME_MAP.dayOfRemoveJP_Drain}
                            htmlFor={ITEMS_NAME_MAP.dayOfRemoveJP_Drain}
                            formik={formik}
                            values={[
                                { value: 'POD_1', name: 'POD#1' },
                                { value: 'POD_2', name: 'POD#2' },
                                { value: 'POD_3', name: 'POD#3' },
                                { value: 'POD_4', name: 'POD#4' },
                                { value: 'AFTER_POD_5', name: 'POD#5 이후' },
                            ]}
                            isRender={existFields.dayOfRemoveJP_Drain}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="reasonByRemoveJP_DrainDelay"
                            label={ITEMS_NAME_MAP.reasonByRemoveJP_DrainDelay}
                            formik={formik}
                            isRender={existFields.reasonByRemoveJP_DrainDelay}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="dayOfRemoveUrinary_Catheter"
                            label={ITEMS_NAME_MAP.dayOfRemoveUrinary_Catheter}
                            formik={formik}
                            isRender={existFields.dayOfRemoveUrinary_Catheter}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="reasonByRemoveUrinary_CatheterDelay"
                            label={ITEMS_NAME_MAP.reasonByRemoveUrinary_CatheterDelay}
                            formik={formik}
                            isRender={existFields.reasonByRemoveUrinary_CatheterDelay}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="afterOperationLimitIV_Fluid"
                            label={ITEMS_NAME_MAP.afterOperationLimitIV_Fluid}
                            formik={formik}
                            isRender={existFields.afterOperationLimitIV_Fluid}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="dayOfRemoveIV_Fluid"
                            label={ITEMS_NAME_MAP.dayOfRemoveIV_Fluid}
                            formik={formik}
                            isRender={existFields.dayOfRemoveIV_Fluid}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="reasonByRemoveIV_FluidDelay"
                            label={ITEMS_NAME_MAP.reasonByRemoveIV_FluidDelay}
                            formik={formik}
                            isRender={existFields.reasonByRemoveIV_FluidDelay}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="post_Nausea_Vomiting"
                            label={ITEMS_NAME_MAP.post_Nausea_Vomiting}
                            formik={formik}
                            isRender={existFields.post_Nausea_Vomiting}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="postOpDayExercise"
                            label={ITEMS_NAME_MAP.postOpDayExercise}
                            formik={formik}
                            isRender={existFields.postOpDayExercise}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="pod_1Exercise"
                            label={ITEMS_NAME_MAP.pod_1Exercise}
                            formik={formik}
                            isRender={existFields.pod_1Exercise}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="pod_2Exercise"
                            label={ITEMS_NAME_MAP.pod_2Exercise}
                            formik={formik}
                            isRender={existFields.pod_2Exercise}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="pod_3Exercise"
                            label={ITEMS_NAME_MAP.pod_3Exercise}
                            formik={formik}
                            isRender={existFields.pod_3Exercise}
                        />

                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="postOpDayMeal"
                            label={ITEMS_NAME_MAP.postOpDayMeal}
                            formik={formik}
                            isRender={existFields.postOpDayMeal}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="pod_1Meal"
                            label={ITEMS_NAME_MAP.pod_1Meal}
                            formik={formik}
                            isRender={existFields.pod_1Meal}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="pod_2Meal"
                            label={ITEMS_NAME_MAP.pod_2Meal}
                            formik={formik}
                            isRender={existFields.pod_2Meal}
                        />

                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="postOpEffectivePainControl"
                            label={ITEMS_NAME_MAP.postOpEffectivePainControl}
                            formik={formik}
                            isRender={existFields.postOpEffectivePainControl}
                        />
                        <SingleSelector<ComplianceValuesType>
                            htmlFor="pod_1PainScore"
                            label={ITEMS_NAME_MAP.pod_1PainScore}
                            formik={formik}
                            isRender={existFields.pod_1PainScore}
                            values={[
                                { value: 'DAY', name: 'day' },
                                { value: 'EVENING', name: 'Evening' },
                                { value: 'NIGHT', name: 'Night' },
                            ]}
                        />
                        <SingleSelector<ComplianceValuesType>
                            htmlFor="pod_2PainScore"
                            label={ITEMS_NAME_MAP.pod_2PainScore}
                            formik={formik}
                            isRender={existFields.pod_2PainScore}
                            values={[
                                { value: 'DAY', name: 'day' },
                                { value: 'EVENING', name: 'Evening' },
                                { value: 'NIGHT', name: 'Night' },
                            ]}
                        />
                        <SingleSelector<ComplianceValuesType>
                            htmlFor="pod_3PainScore"
                            label={ITEMS_NAME_MAP.pod_3PainScore}
                            formik={formik}
                            isRender={existFields.pod_3PainScore}
                            values={[
                                { value: 'DAY', name: 'day' },
                                { value: 'EVENING', name: 'Evening' },
                                { value: 'NIGHT', name: 'Night' },
                            ]}
                        />

                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="isPost_Nausea_Vomiting"
                            label={ITEMS_NAME_MAP.isPost_Nausea_Vomiting}
                            formik={formik}
                            isRender={existFields.isPost_Nausea_Vomiting}
                        />
                        <TextInput<ComplianceValuesType>
                            label="입원병동"
                            htmlFor="locate"
                            formik={formik}
                            isRender={existFields.locate}
                        />
                    </div>

                    <SubmitButton onClick={() => handleOpenConfirm(formik.values)} label="확인하기" />
                </form>
            </div>

            {/* 작성한 폼을 한번 더확인 */}
            {isConfirmPage && (
                <ComfirmComplianceFormModal
                    values={formik.values}
                    onSubmit={formik.handleSubmit}
                    onClose={handleCloseConfirm}
                />
            )}
        </>
    );
}

export default ComplianceFormPage;
