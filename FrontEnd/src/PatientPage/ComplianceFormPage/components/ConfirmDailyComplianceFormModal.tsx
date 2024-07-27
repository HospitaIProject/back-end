import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import { DailyCheckListFormType } from '../../../models/CheckListsType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import ConfirmDailyComplianceForm from './ConfirmDailyComplianceForm';
type Props = {
    values: DailyCheckListFormType;
    onSubmit: () => void;
    onClose: () => void;
    existFields: CheckListSetupType;
};

function ConfirmDailyComplianceFormModal({ values, onSubmit, onClose, existFields }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <ConfirmDailyComplianceForm values={values} onSubmit={onSubmit} existFields={existFields} />
        </ModalFullScreenContainer>
    );
}

export default ConfirmDailyComplianceFormModal;
