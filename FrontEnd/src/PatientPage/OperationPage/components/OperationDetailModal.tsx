import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import DetailViewContainer from '../../../components/common/detail/DetailViewContainer';
import { OperationItemType } from '../../../models/OperationType';
import OperationDetail from './OperationDetail';

type Props = {
    values: OperationItemType;
    onClose: () => void;
};

function OperationDetailModal({ values, onClose }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <DetailViewContainer>
                <OperationDetail operationData={values} />
            </DetailViewContainer>
        </ModalFullScreenContainer>
    );
}

export default OperationDetailModal;