import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import { checkListFormType } from '../../../models/CheckListsType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import ConfirmComplianceForm from './ConfirmComplianceForm';
type Props = {
    values: checkListFormType;
    onSubmit: () => void;
    onClose: () => void;
    existFields: CheckListSetupType;
    fluidRestriction: number;
};

function ComfirmComplianceFormModal({ values, onSubmit, onClose, existFields, fluidRestriction }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <ConfirmComplianceForm
                formValues={values}
                fluidRestriction={fluidRestriction}
                onSubmit={onSubmit}
                existFields={existFields}
            />
        </ModalFullScreenContainer>
    );
}

export default ComfirmComplianceFormModal;
