import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import DetailViewContainer from '../../../components/common/detail/DetailViewContainer';
import { CheckListsDailyItemType } from '../../../models/CheckListsType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import ConfirmDailyComplianceForm from '../../ComplianceFormPage/components/ConfirmDailyComplianceForm';
type Props = {
    values: CheckListsDailyItemType;
    onSubmit?: () => void;
    onClose: () => void;
    existFields: CheckListSetupType;
};

function CheckListsDailyDetailModal({ values, onSubmit, onClose, existFields }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <DetailViewContainer>
                <ConfirmDailyComplianceForm values={values} onSubmit={onSubmit} existFields={existFields} />
            </DetailViewContainer>
        </ModalFullScreenContainer>
    );
}

export default CheckListsDailyDetailModal;
