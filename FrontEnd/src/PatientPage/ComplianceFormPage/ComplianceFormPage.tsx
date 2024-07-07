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

type Button = {
    day: 'PREV' | 'TODAY' | 'POST' | 'ALL';
    label: string;
};

const buttons: Button[] = [
    { day: 'PREV', label: '수술전' },
    { day: 'TODAY', label: '수술당일' },
    { day: 'POST', label: '수술후' },
    { day: 'ALL', label: '전체' },
];

function ComplianceFormPage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const [relativeDay, setRelativeDay] = useState<Array<'PREV' | 'TODAY' | 'POST' | 'ALL'>>(['PREV']);
    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name');
    const surgeryId = searchParams.get('id');
    const dateStatus = searchParams.get('dateStatus');
    const complianceFormMutation = useComplianceFormMutation(); //체크리스트 제출
    const checkListSetupQuery = useCheckListSetupQuery({ surgeryId: Number(surgeryId) }); //체크리스트 세팅 정보 가져오기
    const { data: existFields } = checkListSetupQuery;

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
        pod_Exercise: '', //POD# 운동
        postOpDayMeal: '', //Post OP day 식사
        pod_Meal: '', //POD# 식사
        beforeOperationMedicine: '', //수술 전 통증 조절약
        silt_Itm: '', //수술중 SILT or ITM
        postOpEffectivePainControl: '', //Post op Effective pain control
        pod_PainScore: '', ////POD#1 pain score
        beforeSixtyMinute: '', //피부 절개 60분 전 예방적 항생제 투여
        maintainTemperature: '', //수술 중 환자 체온 유지
        volumeOfIntraoperativeInfusion: '', //Volume of intraoperative infusion (ml)
        bloodLoss: '', //Blood loss (cc)
        urineOutput: '', //Urine output (cc)
        operationTime: '', //Operation time (min)
        hasPost_Nausea_Vomiting: '', //Post OP Nausea & Vomiting prophylaxis 여부
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
        pod_Exercise_remark: '',
        postOpDayMeal_remark: '',
        pod_Meal_remark: '',
        beforeOperationMedicine_remark: '',
        silt_Itm_remark: '',
        postOpEffectivePainControl_remark: '',
        pod_PainScore_remark: '',
        beforeSixtyMinute_remark: '',
        maintainTemperature_remark: '',
        volumeOfIntraoperativeInfusion_remark: '',
        bloodLoss_remark: '',
        urineOutput_remark: '',
        operationTime_remark: '',
        hasPost_Nausea_Vomiting_remark: '',
        locate_remark: '',
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

    const handleOpenConfirm = () => {
        // console.log('확인하기', values);
        // let isError = false;
        // for (const key in values) {
        //     if (!key.endsWith('_remark') && values[key] === '') {
        //         formik.setFieldError(key, '필수 입력 항목입니다.');
        //         isError = true;
        //     } //비어있는 필드 유효성 검사(Remark 제외)
        // }
        // if (isError) {
        //     console.log('에러발생');
        //     return;
        // } else {
        //     setIsConfirmPage(true);
        //     isError = false;
        // }
        setIsConfirmPage(true);
    };
    const handleCloseConfirm = () => {
        setIsConfirmPage(false);
    };
    const handleToggleField = (day: 'PREV' | 'TODAY' | 'POST' | 'ALL') => {
        setRelativeDay([day]);
    };

    useEffect(() => {
        console.log('form 에러객체', formik.errors);
    }, [formik.errors]);
    useEffect(() => {
        setRelativeDay([dateStatus as 'PREV' | 'TODAY' | 'POST']);
    }, []);

    if (!existFields) return <div>데이터가 없습니다.</div>;

    return (
        <>
            <div className={`w-full ${isConfirmPage ? 'hidden' : ''}`}>
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

                <div className="flex flex-col gap-2 py-3 mb-4 text-center bg-gray-100 border-b rounded-md text-neutral-700">
                    <span className="text-xl font-bold text-center text-blue-500">{patientName}</span>
                    <span>Daily CheckList</span>
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

                    <SubmitButton onClick={() => handleOpenConfirm()} label="확인하기" />
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
