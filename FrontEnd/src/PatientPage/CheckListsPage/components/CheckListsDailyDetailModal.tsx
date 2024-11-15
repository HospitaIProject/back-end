import { useNavigate, useSearchParams } from 'react-router-dom';
import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import DetailViewContainer from '../../../components/common/detail/DetailViewContainer';
import { CheckListsDailyItemType } from '../../../models/CheckListsType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import ConfirmDailyComplianceForm from '../../ComplianceFormPage/components/ConfirmDailyComplianceForm';
import { useDeleteCheckListMutation } from '../../_lib/checkListsService';
import { useEffect } from 'react';
type Props = {
    values: CheckListsDailyItemType;
    onSubmit?: () => void;
    onClose: () => void;
    existFields: CheckListSetupType;
    od: string;
};

function CheckListsDailyDetailModal({ values, onSubmit, onClose, existFields, od }: Props) {
    const navigation = useNavigate();
    const [searchParams] = useSearchParams();
    const diffDay = searchParams.get('diffDay');
    const name = searchParams.get('name'); //환자 이름
    const operationId = searchParams.get('id');
    const deleteCheckListMutation = useDeleteCheckListMutation();
    const checkListId = values.checkListId;

    const deleteHandler = () => {
        if (!checkListId) return;
        if (!confirm(`정말 삭제하시겠습니까?`)) return;
        deleteCheckListMutation.mutate({ checkListId, type: 'DAILY' });
    };
    const updateHandler = () => {
        //일일
        navigation(
            `/patient/form/compliance/daily/edit/${checkListId}?id=${operationId}&diffDay=${diffDay}&name=${name}&od=${od}`,
        );
    };

    useEffect(() => {
        if (deleteCheckListMutation.isSuccess) {
            onClose();
        }
    }, [deleteCheckListMutation.isSuccess]);
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <DetailViewContainer deleteHandler={deleteHandler} updateHandler={updateHandler}>
                <ConfirmDailyComplianceForm values={values} onSubmit={onSubmit} existFields={existFields} />
            </DetailViewContainer>
        </ModalFullScreenContainer>
    );
}

export default CheckListsDailyDetailModal;
