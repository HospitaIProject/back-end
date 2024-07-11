import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import { checkListFormType } from '../../../models/CheckListsType';
import { CheckListSetupType } from '../../../models/CheckListsType';
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
