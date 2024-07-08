import { useFormik } from 'formik';
import BirthDayInput from '../../components/common/form/input/BirthDayInput';
import NumberInput from '../../components/common/form/input/NumberInput';
import SingleSelector from '../../components/common/form/input/SingleSelector';
import TextInput from '../../components/common/form/input/TextInput';
import { NewPatientValuesType } from '../../models/FormType';
import { useState } from 'react';
import SubmitButton from '../../components/common/form/SubmitButton';
import ConfirmNewPatientFormModal from './components/ConfirmNewPatientFormModal';
import { useNewPatientFormMutation } from '../_lib/patientNewFormService';
import { pushNotification } from '../../utils/pushNotification';

function NewPatientFormPage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const patientNewFormMutation = useNewPatientFormMutation();

    const initialValues: NewPatientValuesType = {
        patientNumber: '',
        name: '',
        sex: '',
        birthday: '',
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
    const handleOpenConfirm = (values: NewPatientValuesType) => {
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

    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
                <h1 className="py-3 mx-4 mb-4 text-2xl font-semibold text-center border-b">환자 정보 등록</h1>
                <form className="flex flex-col w-full gap-4 p-4 mx-auto bg-white" onSubmit={formik.handleSubmit}>
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
                    <BirthDayInput label="생년월일" htmlFor="birthday" formik={formik} />
                    <SubmitButton onClick={() => handleOpenConfirm(formik.values)} label="등록하기" />
                </form>
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
