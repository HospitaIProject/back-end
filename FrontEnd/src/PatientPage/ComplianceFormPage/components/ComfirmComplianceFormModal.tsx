import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import { CheckListSetupType, checkListFormType } from '../../../models/FormType';
import ConfirmComplianceForm from './ConfirmComplianceForm';
type Props = {
    values: checkListFormType;
    onSubmit: () => void;
    onClose: () => void;
    existFields: CheckListSetupType;
};

function ComfirmComplianceFormModal({ values, onSubmit, onClose, existFields }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <ConfirmComplianceForm values={values} onSubmit={onSubmit} existFields={existFields} />
        </ModalFullScreenContainer>
    );
}

export default ComfirmComplianceFormModal;
