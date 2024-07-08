import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import { CheckListSetupDaySectionType } from '../../../models/FormType';
import ConfirmNewSurgeryInfo from './ConfirmNewSurgeryInfo';

type Props = {
    values: any;
    onSubmit: () => void;
    onClose: () => void;
    checkListSetup: CheckListSetupDaySectionType;
};

function ConfirmNewSurgeryInfoModal({ values, onSubmit, onClose, checkListSetup }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose} maxWidthClassName="max-w-screen-tablet">
            <ConfirmNewSurgeryInfo values={values} onSubmit={onSubmit} checkListSetup={checkListSetup} />
        </ModalFullScreenContainer>
    );
}

export default ConfirmNewSurgeryInfoModal;
