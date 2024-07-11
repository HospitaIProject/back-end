import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import DetailViewContainer from '../../../components/common/detail/DetailViewContainer';
import { checkListFormType } from '../../../models/CheckListsType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import ConfirmComplianceForm from '../../ComplianceFormPage/components/ConfirmComplianceForm';
type Props = {
    values: checkListFormType;
    onSubmit?: () => void;
    onClose: () => void;
    setupData: CheckListSetupType;
};

function CheckListsDetailModal({ values, onSubmit, onClose, setupData }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <DetailViewContainer>
                <ConfirmComplianceForm existFields={setupData} values={values} onSubmit={onSubmit} />
            </DetailViewContainer>
        </ModalFullScreenContainer>
    );
}

export default CheckListsDetailModal;
