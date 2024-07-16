import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import DetailViewContainer from '../../../components/common/detail/DetailViewContainer';
import { SurgeryType } from '../../../models/SurgeryType';
import SurgeryDetail from './SurgeryDetail';

type Props = {
    values: SurgeryType;
    onClose: () => void;
};

function SurgeryDetailModal({ values, onClose }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <DetailViewContainer>
                <SurgeryDetail surgeryData={values} />
            </DetailViewContainer>
        </ModalFullScreenContainer>
    );
}

export default SurgeryDetailModal;
