import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import ConfirmComplianceForm from './ConfirmComplianceForm';
type Props = {
    values: any;
    onSubmit: () => void;
    onClose: () => void;
};

function ComfirmComplianceFormModal({ values, onSubmit, onClose }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <ConfirmComplianceForm values={values} onSubmit={onSubmit} />
        </ModalFullScreenContainer>
    );
}

export default ComfirmComplianceFormModal;
