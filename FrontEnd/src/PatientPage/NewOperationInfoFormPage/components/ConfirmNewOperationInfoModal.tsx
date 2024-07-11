import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import { CheckListSetupType } from '../../../models/CheckListsType';
import ConfirmNewOperationInfo from './ConfirmNewOperationInfo';

type Props = {
    values: any;
    onSubmit: () => void;
    onClose: () => void;
    checkListSetup: CheckListSetupType;
};

function ConfirmNewOperationInfoModal({ values, onSubmit, onClose, checkListSetup }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose} maxWidthClassName="max-w-screen-tablet">
            <ConfirmNewOperationInfo values={values} onSubmit={onSubmit} checkListSetup={checkListSetup} />
        </ModalFullScreenContainer>
    );
}

export default ConfirmNewOperationInfoModal;
