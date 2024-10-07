import { useNavigate, useSearchParams } from 'react-router-dom';
import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import DetailViewContainer from '../../../components/common/detail/DetailViewContainer';
import { OperationItemType } from '../../../models/OperationType';
import { useDeleteOperationInfoMutation } from '../../_lib/operationService';
import OperationDetail from './OperationDetail';
import { useEffect } from 'react';

type Props = {
    values: OperationItemType;
    onClose: () => void;
};

function OperationDetailModal({ values, onClose }: Props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name');

    const deleteOperationInfoMutation = useDeleteOperationInfoMutation();
    const deleteHandler = () => {
        if (confirm('수술 정보를 삭제하시겠습니까?')) {
            deleteOperationInfoMutation.mutate(values.operationId);
        }
    };
    const updateHandler = () => {
        navigate(`/patient/new/operation/${values.operationId}?name=${patientName}`);
    };

    useEffect(() => {
        if (deleteOperationInfoMutation.isSuccess) {
            onClose();
        }
    }, [deleteOperationInfoMutation.isSuccess]);
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <DetailViewContainer deleteHandler={deleteHandler} updateHandler={updateHandler}>
                <OperationDetail operationData={values} />
            </DetailViewContainer>
        </ModalFullScreenContainer>
    );
}

export default OperationDetailModal;
