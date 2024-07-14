import { useFormik } from 'formik';
import YesOrNoButton from '../../components/common/form/input/YesOrNoButton';
import { ComplianceValuesType } from '../../models/FormType';
import { useEffect, useState } from 'react';
import SingleSelector from '../../components/common/form/input/SingleSelector';
// import TextInput from '../../components/common/form/input/TextInput';
import NumberInput from '../../components/common/form/input/NumberInput';
import ComfirmComplianceFormModal from './components/ComfirmComplianceFormModal';
import { useCheckListSetupQuery, useComplianceFormMutation } from '../_lib/complianceFormSevice';
import SubmitButton from '../../components/common/form/SubmitButton';
import { ITEMS_NAME_MAP } from '../../utils/mappingNames';
import TextInput from '../../components/common/form/input/TextInput';
import DropContainer from './components/DropContainer';
import { useSearchParams } from 'react-router-dom';
import { useDateFormatted } from '../../Hooks/useDateFormatted';
import Loading from '../../components/common/Loading';

type Button = {
    day: 'PREV' | 'TODAY' | 'POST' | 'ALL';
    label: string;
};

const buttons: Button[] = [
    { day: 'PREV', label: '수술 전' },
    { day: 'TODAY', label: '수술 당일' },
    { day: 'POST', label: '수술 후' },
    { day: 'ALL', label: '전체' },
];

function ComplianceFormPage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const [relativeDay, setRelativeDay] = useState<Array<'PREV' | 'TODAY' | 'POST' | 'ALL'>>(['PREV']);
    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name'); //환자명
    const surgeryId = searchParams.get('id'); //수술ID
    const dateStatus = searchParams.get('dateStatus'); //수술전, 당일, 후인지
    const diffDay = searchParams.get('diffDay'); //몇일차인지
    const { onlyDate: formattedOnlyDate } = useDateFormatted(new Date(), 'SIMPLE'); // 수술일자 포맷팅
    const complianceFormMutation = useComplianceFormMutation(); //체크리스트 제출
    const checkListSetupQuery = useCheckListSetupQuery({ surgeryId: Number(surgeryId) }); //체크리스트 세팅 정보 가져오기
    const { data: existFields, isPending } = checkListSetupQuery; //체크리스트 세팅 정보

    const initialValues: ComplianceValuesType = {
        explainBeforeOperation: existFields?.explainBeforeOperation ? '' : undefined, // EAS 수술전 설명
        takingONSBeforeOperationTwo_Hours: existFields?.takingONSBeforeOperationTwo_Hours ? '' : undefined, // 수술 2시간 전 ONS 복용여부
        takingAfterBowelPreparation: existFields?.takingAfterBowelPreparation ? '' : undefined, // Bowel preparation 후 ONS 경장영양액 복용여부
        preventionDVT: existFields?.preventionDVT ? '' : undefined, // DVT 예방
        takingLaxatives: existFields?.takingLaxatives ? '' : undefined, // Laxatives 복용
        chewingGum: existFields?.chewingGum ? '' : undefined, // Chewing gum
        dayOfRemoveJP_Drain: existFields?.dayOfRemoveJP_Drain ? '' : undefined, // JP Drain 제거일
        reasonByRemoveJP_DrainDelay: existFields?.reasonByRemoveJP_DrainDelay ? '' : undefined, // JP Drain 제거 지연 사유
        dayOfRemoveUrinary_Catheter: existFields?.dayOfRemoveUrinary_Catheter ? '' : undefined, // Urinary catheter 제거일
        reasonByRemoveUrinary_CatheterDelay: existFields?.reasonByRemoveUrinary_CatheterDelay ? '' : undefined, // Urinary catheter 제거 지연 사유
        afterOperationLimitIV_Fluid: existFields?.afterOperationLimitIV_Fluid ? '' : undefined, // 수술 후 IV fluid 제한
        dayOfRemoveIV_Fluid: existFields?.dayOfRemoveIV_Fluid ? '' : undefined, // IV fluid 제거일
        reasonByRemoveIV_FluidDelay: existFields?.reasonByRemoveIV_FluidDelay ? '' : undefined, // IV fluid 제거 지연 이유
        post_Nausea_Vomiting: existFields?.post_Nausea_Vomiting ? '' : undefined, // Post OP Nausea & Vomiting prophylaxis
        postOpDayExercise: existFields?.postOpDayExercise ? '' : undefined, // Post OP day 운동
        pod_Exercise: existFields?.pod_Exercise ? '' : undefined, // POD# 운동
        postOpDayMeal: existFields?.postOpDayMeal ? '' : undefined, // Post OP day 식사
        pod_Meal: existFields?.pod_Meal ? '' : undefined, // POD# 식사
        beforeOperationMedicine: existFields?.beforeOperationMedicine ? '' : undefined, // 수술 전 통증 조절약
        silt_Itm: existFields?.silt_Itm ? '' : undefined, // 수술중 SILT or ITM
        postOpEffectivePainControl: existFields?.postOpEffectivePainControl ? '' : undefined, // Post op Effective pain control
        pod_PainScore: existFields?.pod_PainScore ? '' : undefined, // POD#1 pain score
        beforeSixtyMinute: existFields?.beforeSixtyMinute ? '' : undefined, // 피부 절개 60분 전 예방적 항생제 투여
        maintainTemperature: existFields?.maintainTemperature ? '' : undefined, // 수술 중 환자 체온 유지
        volumeOfIntraoperativeInfusion: existFields?.volumeOfIntraoperativeInfusion ? '' : undefined, // Volume of intraoperative infusion (ml)
        bloodLoss: existFields?.bloodLoss ? '' : undefined, // Blood loss (cc)
        urineOutput: existFields?.urineOutput ? '' : undefined, // Urine output (cc)
        operationTime: existFields?.operationTime ? '' : undefined, // Operation time (min)
        hasPost_Nausea_Vomiting: existFields?.hasPost_Nausea_Vomiting ? '' : undefined, // Post OP Nausea & Vomiting prophylaxis 여부
        locate: existFields?.locate ? '' : undefined, // 입원병동
        // 비고
        explainBeforeOperation_remark: existFields?.explainBeforeOperation ? '' : undefined,
        takingONSBeforeOperationTwo_Hours_remark: existFields?.takingONSBeforeOperationTwo_Hours ? '' : undefined,
        takingAfterBowelPreparation_remark: existFields?.takingAfterBowelPreparation ? '' : undefined,
        preventionDVT_remark: existFields?.preventionDVT ? '' : undefined,
        takingLaxatives_remark: existFields?.takingLaxatives ? '' : undefined,
        chewingGum_remark: existFields?.chewingGum ? '' : undefined,
        dayOfRemoveJP_Drain_remark: existFields?.dayOfRemoveJP_Drain ? '' : undefined,
        reasonByRemoveJP_DrainDelay_remark: existFields?.reasonByRemoveJP_DrainDelay ? '' : undefined,
        dayOfRemoveUrinary_Catheter_remark: existFields?.dayOfRemoveUrinary_Catheter ? '' : undefined,
        reasonByRemoveUrinary_CatheterDelay_remark: existFields?.reasonByRemoveUrinary_CatheterDelay ? '' : undefined,
        afterOperationLimitIV_Fluid_remark: existFields?.afterOperationLimitIV_Fluid ? '' : undefined,
        dayOfRemoveIV_Fluid_remark: existFields?.dayOfRemoveIV_Fluid ? '' : undefined,
        reasonByRemoveIV_FluidDelay_remark: existFields?.reasonByRemoveIV_FluidDelay ? '' : undefined,
        post_Nausea_Vomiting_remark: existFields?.post_Nausea_Vomiting ? '' : undefined,
        postOpDayExercise_remark: existFields?.postOpDayExercise ? '' : undefined,
        pod_Exercise_remark: existFields?.pod_Exercise ? '' : undefined,
        postOpDayMeal_remark: existFields?.postOpDayMeal ? '' : undefined,
        pod_Meal_remark: existFields?.pod_Meal ? '' : undefined,
        beforeOperationMedicine_remark: existFields?.beforeOperationMedicine ? '' : undefined,
        silt_Itm_remark: existFields?.silt_Itm ? '' : undefined,
        postOpEffectivePainControl_remark: existFields?.postOpEffectivePainControl ? '' : undefined,
        pod_PainScore_remark: existFields?.pod_PainScore ? '' : undefined,
        beforeSixtyMinute_remark: existFields?.beforeSixtyMinute ? '' : undefined,
        maintainTemperature_remark: existFields?.maintainTemperature ? '' : undefined,
        volumeOfIntraoperativeInfusion_remark: existFields?.volumeOfIntraoperativeInfusion ? '' : undefined,
        bloodLoss_remark: existFields?.bloodLoss ? '' : undefined,
        urineOutput_remark: existFields?.urineOutput ? '' : undefined,
        operationTime_remark: existFields?.operationTime ? '' : undefined,
        hasPost_Nausea_Vomiting_remark: existFields?.hasPost_Nausea_Vomiting ? '' : undefined,
        locate_remark: existFields?.locate ? '' : undefined,
    };
    const formik = useFormik({
        initialValues, // 초기값
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        onSubmit: (values) => {
            console.log('제출', values);
            if (confirm('제출하시겠습니까?')) {
                complianceFormMutation.mutate({ surgeryId: Number(surgeryId), data: values });
            } else {
                return;
            }
        },
    });

    const handleOpenConfirm = (values: ComplianceValuesType) => {
        console.log('확인하기', values);
        let isError = false;
        for (const key in values) {
            if (!key.endsWith('_remark') && values[key] === '') {
                formik.setFieldError(key, '필수 입력 항목입니다.');
                isError = true;
            } //비어있는 필드 유효성 검사(Remark 제외)
        }
        if (isError) {
            console.log('에러발생');
            return;
        } else {
            setIsConfirmPage(true);
            isError = false;
        }
        setIsConfirmPage(true);
    };

    const handleCloseConfirm = () => {
        setIsConfirmPage(false);
    };
    const handleToggleField = (day: 'PREV' | 'TODAY' | 'POST' | 'ALL') => {
        setRelativeDay([day]);
    };

    useEffect(() => {
        setRelativeDay([dateStatus as 'PREV' | 'TODAY' | 'POST']);
    }, []);

    if (isPending) {
        return <Loading />;
    }
    if (!existFields) return;

    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
                <div className="sticky top-[64px] z-10 flex flex-row border-b shadow-sm">
                    {buttons.map(({ day, label }) => (
                        <button
                            key={day}
                            className={`flex-1 py-3 text-gray-600 ${relativeDay.includes(day) ? 'bg-green-500 text-white' : 'bg-white'} transition-colors duration-300 ease-in-out`}
                            type="button"
                            onClick={() => handleToggleField(day)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-row items-center gap-1 py-3 pr-4 mb-4 border-b rounded-md bg-gray-50 pl-28 text-neutral-700">
                    <span className="mx-auto text-xl font-bold text-center text-blue-500">{patientName}</span>
                    <div className="flex flex-col items-end w-24 gap-1">
                        <span className="text-sm font-medium text-gray-700">{formattedOnlyDate}</span>

                        <span className="p-1 text-sm font-medium text-gray-700 bg-yellow-200">
                            {dateStatus === 'TODAY'
                                ? 'D-Day'
                                : dateStatus === 'PREV'
                                  ? `D-${diffDay}`
                                  : `D+${Math.abs(Number(diffDay))}`}
                        </span>
                    </div>
                </div>

                <form className="flex flex-col w-full gap-6 p-4 mx-auto rounded">
                    {/* 수술전 */}
                    <DropContainer isOpen={relativeDay.includes('PREV') || relativeDay.includes('ALL')}>
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
                    </DropContainer>

                    {/* 수술당일 */}
                    <DropContainer isOpen={relativeDay.includes('TODAY') || relativeDay.includes('ALL')}>
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
                    </DropContainer>

                    {/* 수술후 */}
                    <DropContainer isOpen={relativeDay.includes('POST') || relativeDay.includes('ALL')}>
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
                            htmlFor="dayOfRemoveJP_Drain"
                            label={ITEMS_NAME_MAP.dayOfRemoveJP_Drain}
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
                            htmlFor="pod_Exercise"
                            label={ITEMS_NAME_MAP.pod_Exercise}
                            formik={formik}
                            isRender={existFields.pod_Exercise}
                        />

                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="postOpDayMeal"
                            label={ITEMS_NAME_MAP.postOpDayMeal}
                            formik={formik}
                            isRender={existFields.postOpDayMeal}
                        />
                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="pod_Meal"
                            label={ITEMS_NAME_MAP.pod_Meal}
                            formik={formik}
                            isRender={existFields.pod_Meal}
                        />

                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="postOpEffectivePainControl"
                            label={ITEMS_NAME_MAP.postOpEffectivePainControl}
                            formik={formik}
                            isRender={existFields.postOpEffectivePainControl}
                        />
                        <SingleSelector<ComplianceValuesType>
                            htmlFor="pod_PainScore"
                            label={ITEMS_NAME_MAP.pod_PainScore}
                            formik={formik}
                            isRender={existFields.pod_PainScore}
                            values={[
                                { value: 'DAY', name: 'day' },
                                { value: 'EVENING', name: 'Evening' },
                                { value: 'NIGHT', name: 'Night' },
                            ]}
                        />

                        <YesOrNoButton<ComplianceValuesType>
                            htmlFor="hasPost_Nausea_Vomiting"
                            label={ITEMS_NAME_MAP.hasPost_Nausea_Vomiting}
                            formik={formik}
                            isRender={existFields.hasPost_Nausea_Vomiting}
                        />
                        <TextInput<ComplianceValuesType>
                            label="입원병동"
                            htmlFor="locate"
                            formik={formik}
                            isRender={existFields.locate}
                        />
                    </DropContainer>
                </form>
                <SubmitButton onClick={() => handleOpenConfirm(formik.values)} label="확인하기" />
            </div>

            {/* 작성한 폼을 한번 더확인 */}
            {isConfirmPage && (
                <ComfirmComplianceFormModal
                    values={formik.values}
                    onSubmit={formik.handleSubmit}
                    onClose={handleCloseConfirm}
                    existFields={existFields}
                />
            )}
        </>
    );
}

export default ComplianceFormPage;
