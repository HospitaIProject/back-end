import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import ConfirmNewPatientForm from './ConfirmNewPatientForm';

type Props = {
    values: any;
    onSubmit: () => void;
    onClose: () => void;
};

function ConfirmNewPatientFormModal({ values, onSubmit, onClose }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <ConfirmNewPatientForm values={values} onSubmit={onSubmit} />
        </ModalFullScreenContainer>
    );
}

export default ConfirmNewPatientFormModal;
