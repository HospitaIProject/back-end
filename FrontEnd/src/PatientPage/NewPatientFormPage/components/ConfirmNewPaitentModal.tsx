import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import ConfirmNewPaitent from './ConfirmNewPaitent';

type Props = {
    values: any;
    onSubmit: () => void;
    onClose: () => void;
};

function ConfirmNewPaitentModal({ values, onSubmit, onClose }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <ConfirmNewPaitent values={values} onSubmit={onSubmit} />
        </ModalFullScreenContainer>
    );
}

export default ConfirmNewPaitentModal;
