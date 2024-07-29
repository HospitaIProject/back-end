import { useDateFormatted } from '../../Hooks/useDateFormatted';
import ModalFullScreenContainer from '../../components/common/ModalFullScreenContainer';
import NumberViewInput from '../../components/common/form/viewInput/NumberViewInput';
import ViewInput from '../../components/common/form/viewInput/ViewInput';
import { PatientWithOperationDtoType } from '../../models/PatientType';
import DetailViewContainer from '../../components/common/detail/DetailViewContainer';
import { useDeletePatientFormMutation } from '../../PatientPage/_lib/patientService';
import { useNavigate } from 'react-router-dom';
type Props = {
    values: PatientWithOperationDtoType;
    onClose: () => void;
};

function PatientDetailModal({ values, onClose }: Props) {
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

    return (
        <ModalFullScreenContainer title="환자 상세정보" onClose={onClose}>
            <DetailViewContainer deleteHandler={deleteHandler} updateHandler={updateHandler}>
                <ViewInput label="환자이름" value={patientDTO.name} />
                <NumberViewInput label="등록번호" value={patientDTO.patientNumber} />
                <ViewInput label="성별" value={patientDTO.sex} />
                <NumberViewInput label="나이" value={patientDTO.age} />
                <NumberViewInput unit="cm" label="키" value={patientDTO.height} />
                <NumberViewInput unit="kg" label="몸무게" value={patientDTO.weight} />
                <NumberViewInput unit="kg/cm²" label="BMI" value={patientDTO.bmi} />
                <ViewInput label="ASA score" value={patientDTO.asaScore} />
                <ViewInput label="위치" value={patientDTO.location} />
                <ViewInput label="진단명" value={patientDTO.diagnosis} />
                <ViewInput label="입원일" value={hospitalizedDate} />
                <ViewInput label="수술일" value={operationDate} />
                <ViewInput label="퇴원일" value={dischargedDate} />
                <NumberViewInput unit="일" label="총 재원 일수" value={patientDTO.totalHospitalizedDays} />
            </DetailViewContainer>
        </ModalFullScreenContainer>
    );
}

export default PatientDetailModal;
