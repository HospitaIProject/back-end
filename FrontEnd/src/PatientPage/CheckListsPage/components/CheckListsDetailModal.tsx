import { useNavigate, useSearchParams } from 'react-router-dom';
import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import DetailViewContainer from '../../../components/common/detail/DetailViewContainer';
import {
    CheckListSetupType,
    CheckListsAfterItemType,
    CheckListsBeforeItemType,
    CheckListsDuringItemType,
} from '../../../models/CheckListsType';
import ConfirmComplianceForm from '../../ComplianceFormPage/components/ConfirmComplianceForm';
import { useDeleteCheckListMutation } from '../../_lib/checkListsService';
import { useEffect } from 'react';
type Props = {
    onSubmit?: () => void;
    onClose: () => void;
    setupData: CheckListSetupType;

    prevValues?: CheckListsBeforeItemType;
    todayValues?: CheckListsDuringItemType;
    postValues?: CheckListsAfterItemType;
    od: string;
};

function CheckListsDetailModal({ prevValues, todayValues, postValues, onSubmit, onClose, setupData, od }: Props) {
    const navigation = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name'); //환자 이름
    const operationId = searchParams.get('id'); //수술 아이디

    const type = prevValues ? 'PREV' : todayValues ? 'TODAY' : 'POST';
    const checkListId = prevValues?.checkListBeforeId || todayValues?.checkListDuringId || postValues?.checkListAfterId; //체크리스트 아이디
    const deleteCheckListMutation = useDeleteCheckListMutation();

    const deleteHandler = () => {
        if (!checkListId) return;
        if (!confirm(`정말 삭제하시겠습니까?`)) return;
        deleteCheckListMutation.mutate({ checkListId, type: type });
    };
    const updateHandler = () => {
        if (type === 'PREV') {
            //수술전
            navigation(
                `/patient/form/compliance/edit/${checkListId}?id=${operationId}&dateStatus=PREV&name=${name}&od=${od}`,
            );
        } else if (type === 'TODAY') {
            //수술당일
            navigation(
                `/patient/form/compliance/edit/${checkListId}?id=${operationId}&dateStatus=TODAY&name=${name}&od=${od}`,
            );
        } else if (type === 'POST') {
            //수술후
            navigation(
                `/patient/form/compliance/edit/${checkListId}?id=${operationId}&dateStatus=POST&name=${name}&od=${od}`,
            );
        }
    };
    useEffect(() => {
        if (deleteCheckListMutation.isSuccess) {
            onClose();
        }
    }, [deleteCheckListMutation.isSuccess]);
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <DetailViewContainer deleteHandler={deleteHandler} updateHandler={updateHandler}>
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
