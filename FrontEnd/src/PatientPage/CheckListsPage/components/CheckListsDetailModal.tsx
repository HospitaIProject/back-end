import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import DetailViewContainer from '../../../components/common/detail/DetailViewContainer';
import {
    CheckListSetupType,
    CheckListsAfterItemType,
    CheckListsBeforeItemType,
    CheckListsDuringItemType,
} from '../../../models/CheckListsType';
import ConfirmComplianceForm from '../../ComplianceFormPage/components/ConfirmComplianceForm';
type Props = {
    onSubmit?: () => void;
    onClose: () => void;
    setupData: CheckListSetupType;

    prevValues?: CheckListsBeforeItemType;
    todayValues?: CheckListsDuringItemType;
    postValues?: CheckListsAfterItemType;
};

function CheckListsDetailModal({ prevValues, todayValues, postValues, onSubmit, onClose, setupData }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <DetailViewContainer>
                <ConfirmComplianceForm
                    existFields={setupData}
                    prevValues={prevValues}
                    todayValues={todayValues}
                    postValues={postValues}
                    onSubmit={onSubmit}
                />
            </DetailViewContainer>
        </ModalFullScreenContainer>
    );
}

export default CheckListsDetailModal;
