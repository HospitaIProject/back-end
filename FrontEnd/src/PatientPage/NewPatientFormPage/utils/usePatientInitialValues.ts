import { useParams } from 'react-router-dom';
import { PatientFormType } from '../../../models/PatientType';
import { usePatientDetailQuery } from '../../_lib/patientService';
import { useEffect } from 'react';
import { pushNotification } from '../../../utils/pushNotification';

export const usePatientInitialValues = () => {
    const { patientId } = useParams();
    const enabled = Boolean(patientId);

    const patientDetailQuery = usePatientDetailQuery({
        patientId: Number(patientId),
        enabled: enabled,
    });
    const { data, isPending, error } = patientDetailQuery;

    let initialValues: PatientFormType = {
        patientNumber: '', //등록번호
        name: '', //환자이름
        sex: '', //성별
        age: '', //나이
        height: '', //키(cm)
        weight: '', //몸무게(kg)
        bmi: '', //BMI(kg/cm^2)
        asaScore: '', //ASA score
        location: '', //위치            //enum
        diagnosis: '', //진단명          //enum
        operationDate: '', //수술일
        hospitalizedDate: '', //입원일
        dischargedDate: '', //퇴원일
        totalHospitalizedDays: '', //총 재원 일수(일)
    };
    if (data) {
        console.log('환자 정보 조회 성공');
        initialValues = data;
        initialValues.operationDate = new Date(data.operationDate);
        initialValues.hospitalizedDate = new Date(data.hospitalizedDate);
        initialValues.dischargedDate = new Date(data.dischargedDate);
    }

    useEffect(() => {
        if (error) {
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        }
    }, [error]);

    return { initialValues, isPending: enabled ? isPending : false };
};
