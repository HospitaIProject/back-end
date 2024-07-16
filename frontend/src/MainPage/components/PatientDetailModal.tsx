import { useDateFormatted } from '../../Hooks/useDateFormatted';
import ModalFullScreenContainer from '../../components/common/ModalFullScreenContainer';
import NumberViewInput from '../../components/common/form/viewInput/NumberViewInput';
import ViewInput from '../../components/common/form/viewInput/ViewInput';
import { PatientWithOperationDtoType } from '../../models/PatientType';
import DetailViewContainer from '../../components/common/detail/DetailViewContainer';
type Props = {
    values: PatientWithOperationDtoType;
    onClose: () => void;
};

function ConfirmNewPatientFormModal({ values, onClose }: Props) {
    const { patientDTO } = values;

    const { onlyDate: birthday } = useDateFormatted(patientDTO.birthday);

    return (
        <ModalFullScreenContainer title="환자 상세정보" onClose={onClose}>
            <DetailViewContainer>
                <ViewInput label="환자이름" value={patientDTO.name} />
                <NumberViewInput label="등록번호" value={patientDTO.patientNumber} />
                <ViewInput label="성별" value={patientDTO.sex} />
                <ViewInput label="나이" value={birthday} />
            </DetailViewContainer>
        </ModalFullScreenContainer>
    );
}

export default ConfirmNewPatientFormModal;
