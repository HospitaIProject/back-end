import { useFormik } from 'formik';
import NumberInput from '../../components/common/form/input/NumberInput';
import SingleSelector from '../../components/common/form/input/SingleSelector';
import TextInput from '../../components/common/form/input/TextInput';
import { PatientFormType } from '../../models/PatientType';
import { useState } from 'react';
import SubmitButton from '../../components/common/form/SubmitButton';
import ConfirmNewPatientFormModal from './components/ConfirmNewPatientFormModal';
import { useNewPatientFormMutation, usePutPatientFormMutation } from '../_lib/patientService';
import { pushNotification } from '../../utils/pushNotification';
import BMIinput from '../../components/common/form/input/BMIinput';
import HospitalDateInput from '../../components/common/form/input/HospitalDateInput';
import TotalHospitalizedInput from '../../components/common/form/input/TotalHospitalizedInput';
import { usePatientInitialValues } from './utils/usePatientInitialValues';
import Loading from '../../components/common/Loading';
import { useParams } from 'react-router-dom';
import usePrompt from '../../Hooks/usePrompt';

function NewPatientFormPage() {
    const { patientId } = useParams();
    const isEdit = Boolean(patientId);
    const [isConfirmPage, setIsConfirmPage] = useState(false); // 확인 페이지 모달 여부
    const [isSubmitting, setIsSubmitting] = useState(false); //제출 중인지 여부

    const patientNewFormMutation = useNewPatientFormMutation();
    const patientPutFormMutation = usePutPatientFormMutation();

    const { initialValues, isPending } = usePatientInitialValues();
    const formik = useFormik({
        initialValues, // 초기값
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        enableReinitialize: true,
        onSubmit: (values) => {
            if (isEdit) {
                if (confirm('수정하시겠습니까?')) {
                    setIsSubmitting(true);
                    patientPutFormMutation.mutate({ data: values, patientId: Number(patientId) });
                } else {
                    return;
                }
            } else {
                if (confirm('등록하시겠습니까?')) {
                    setIsSubmitting(true);
                    patientNewFormMutation.mutate({ data: values });
                } else {
                    return;
                }
            }
            console.log('환자 정보 제출', values);
        },
    });
    usePrompt(!isSubmitting); // 이동시 경고창

    const handleOpenConfirm = (values: PatientFormType) => {
        let isError = false;
        for (const key in values) {
            if (values[key] === '' && key !== 'dischargedDate' && key !== 'totalHospitalizedDays') {
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

    if (isPending) return <Loading />;

    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
                <form className="mx-auto mt-5 flex w-full flex-col gap-4 bg-white p-4" onSubmit={formik.handleSubmit}>
                    <NumberInput label="등록번호" htmlFor="patientNumber" formik={formik} />
                    <TextInput label="환자이름" htmlFor="name" formik={formik} />
                    <SingleSelector
                        label="성별"
                        htmlFor="sex"
                        formik={formik}
                        values={[
                            { value: 'MALE', name: '남자' },
                            { value: 'FEMALE', name: '여자' },
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
                    <SingleSelector
                        label="위치"
                        htmlFor="location"
                        formik={formik}
                        values={[
                            { value: 'RT_SIDED_COLON', name: 'Rt. sided colon' },
                            { value: 'LT_SIDED_COLON', name: 'Lt. sided colon' },
                            { value: 'RECTUM', name: 'Rectum' },
                            { value: 'MULTIPLE', name: 'Multiple' },
                        ]}
                    />
                    <SingleSelector
                        label="진단명"
                        htmlFor="diagnosis"
                        formik={formik}
                        values={[
                            { value: 'ASCENDING_COLON', name: 'Ascending colon' },
                            { value: 'HF_COLON', name: 'HF colon' },
                            { value: 'T_COLON', name: 'T colon' },
                            { value: 'SF_COLON', name: 'SF colon' },
                            { value: 'DS_COLON', name: 'DS colon' },
                            { value: 'SIGMOID_COLON', name: 'Sigmoid colon' },
                            { value: 'RS_COLON', name: 'RS colon' },
                            { value: 'RECTUM', name: 'Rectum' },
                            { value: 'CECUM', name: 'Cecum' },
                            { value: 'APPENDICEAL', name: 'Appendiceal' },
                            { value: 'ANUS', name: 'Anus' },
                        ]}
                    />
                    <HospitalDateInput label="입원일" htmlFor="hospitalizedDate" formik={formik} />
                    <HospitalDateInput label="수술일" htmlFor="operationDate" formik={formik} />
                    <HospitalDateInput label="퇴원일" htmlFor="dischargedDate" formik={formik} />
                    <TotalHospitalizedInput label="총 재원 일수" htmlFor="totalHospitalizedDays" formik={formik} />
                </form>
                <SubmitButton
                    onClick={() => handleOpenConfirm(formik.values)}
                    label={isEdit ? '수정하기' : '등록하기'}
                />
            </div>
            {isConfirmPage && (
                <ConfirmNewPatientFormModal
                    values={formik.values}
                    onSubmit={formik.handleSubmit}
                    onClose={handleCloseConfirm}
                />
            )}
        </>
    );
}

export default NewPatientFormPage;
