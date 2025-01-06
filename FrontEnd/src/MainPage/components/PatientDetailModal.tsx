import { useDateFormatted } from '../../Hooks/useDateFormatted';
import ModalFullScreenContainer from '../../components/common/ModalFullScreenContainer';
import NumberViewInput from '../../components/common/form/viewInput/NumberViewInput';
import ViewInput from '../../components/common/form/viewInput/ViewInput';
import { PatientWithOperationDtoType } from '../../models/PatientType';
import DetailViewContainer from '../../components/common/detail/DetailViewContainer';
import { useDeletePatientFormMutation } from '../../PatientPage/_lib/patientService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    values: PatientWithOperationDtoType;
    onClose: () => void;
};

function PatientDetailModal({ values, onClose }: Props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { patientDTO } = values;

    const { onlyDate: hospitalizedDate } = useDateFormatted(patientDTO.hospitalizedDate);
    const { onlyDate: dischargedDate } = useDateFormatted(patientDTO.dischargedDate);
    const { onlyDate: operationDate } = useDateFormatted(patientDTO.operationDate);
    const deletePatientFormMutation = useDeletePatientFormMutation();

    const deleteHandler = () => {
        if (confirm('환자 정보를 삭제하시겠습니까?')) {
            deletePatientFormMutation.mutate({ patientId: patientDTO.patientId });
        }
    };
    const updateHandler = () => {
        navigate(`/patient/new/info/${patientDTO.patientId}`);
    };
    useEffect(() => {
        if (deletePatientFormMutation.isSuccess) {
            onClose();
        }
    }, [deletePatientFormMutation.isSuccess]);

    return (
        <ModalFullScreenContainer title={t("patientDetails")} onClose={onClose}>
            <DetailViewContainer deleteHandler={deleteHandler} updateHandler={updateHandler}>
                <ViewInput label={t("patientName")} value={patientDTO.name} />
                <NumberViewInput label={t("patientNumber")} value={patientDTO.patientNumber} />
                <ViewInput label={t("sex")} value={patientDTO.sex} />
                <NumberViewInput label={t("age")} value={patientDTO.age} />
                <NumberViewInput unit="cm" label={t("height")} value={patientDTO.height} />
                <NumberViewInput unit="kg" label={t("weight")} value={patientDTO.weight} />
                <NumberViewInput unit="kg/m²" label="BMI" value={patientDTO.bmi} />
                <ViewInput label="ASA score" value={patientDTO.asaScore} />
                <ViewInput label={t("location")} value={patientDTO.location} />
                <ViewInput label={t("diagnosis")} value={patientDTO.diagnosis} />
                <ViewInput label={t("hospitalizedDate")} value={hospitalizedDate} />
                <ViewInput label={t("operationDate")} value={operationDate} />
                <ViewInput label={t("dischargedDate")} value={dischargedDate} />
                <NumberViewInput unit={t("totalHospitalizedDateUnit")} label={t("totalHospitalizedDate")} value={patientDTO.totalHospitalizedDays} />
            </DetailViewContainer>
        </ModalFullScreenContainer>
    );
}

export default PatientDetailModal;
