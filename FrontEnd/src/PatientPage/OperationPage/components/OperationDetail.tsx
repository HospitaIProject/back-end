import { useEffect, useState } from 'react';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import DisplayEmptyData from '../../../components/common/DisplayEmptyData';
import Loading from '../../../components/common/Loading';
import NumberViewInput from '../../../components/common/form/viewInput/NumberViewInput';
import ViewInput from '../../../components/common/form/viewInput/ViewInput';
import YesOrNoViewButton from '../../../components/common/form/viewInput/YesOrNoViewButton';
import { OperationItemType } from '../../../models/OperationType';
import { getValueLabel } from '../../../utils/getNameByValue';
import PatientChecklistSetupModal from '../../NewOperationInfoFormPage/components/PatientChecklistSetupModal';
import { useCheckListsSetupQeury } from '../../_lib/operationService';
import { useOperationMethodFormatted } from '../../../Hooks/useOperationMethodFormatted';

type Props = {
    operationData: OperationItemType;
};

function OperationDetail({ operationData }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const checkListsSetupQuery = useCheckListsSetupQeury({ operationId: operationData.operationId });
    const { data: checkListSetupData, isPending } = checkListsSetupQuery;

    const { onlyTime: operationStartTime } = useDateFormatted(operationData.operationStartTime); //수술시작시간
    const { onlyTime: operationEndTime } = useDateFormatted(operationData.operationEndTime); //수술종료시간
    const operationMethodFormatted = useOperationMethodFormatted({
        operationMethod: operationData.operationMethod,
        customOperationMethod: operationData.customOperationMethod,
    });

    useEffect(() => {
        console.log(checkListSetupData);
    }, [checkListsSetupQuery.isSuccess]);
    if (isPending) {
        return <Loading />;
    }
    if (!checkListSetupData) {
        return <DisplayEmptyData label="데이터가 없습니다." isRender />;
    }

    return (
        <>
            <ViewInput label="수술방법" value={`${operationMethodFormatted}`} />

            <ViewInput
                label="수술approach"
                value={getValueLabel({
                    value: operationData.operationApproach,
                    type: 'operation',
                })}
            />
            <YesOrNoViewButton label="장루 조성술 여부" value={operationData.stomaFormation} />
            <ViewInput label="수술 시작 시간" value={operationStartTime} />
            <ViewInput label="수술 종료 시간" value={operationEndTime} />
            <NumberViewInput unit="분" label="전체 수술 시간 (분)" value={operationData.totalOperationTime} />
            <NumberViewInput unit="cc" label="수술 중 총 들어간 수액 양 (cc)" value={operationData.totalFluidsAmount} />

            <NumberViewInput unit="cc" label="수술 중 실혈량 (cc)" value={operationData.bloodLoss} />
            <div className="mt-4 flex w-full flex-col items-center tablet:col-span-2">
                <span className="mb-2 text-base text-yellow-600">*선택한 Checklist 확인 필수</span>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full rounded-md border border-gray-200 bg-gray-100 px-8 py-3 text-gray-600 hover:bg-gray-300 mobile:max-w-screen-mobile"
                >
                    설정된 체크리스트
                </button>
            </div>
            {isModalOpen && (
                <PatientChecklistSetupModal
                    onClose={() => setIsModalOpen(false)}
                    values={checkListSetupData}
                    title="설정된 체크리스트"
                />
            )}
        </>
    );
}

export default OperationDetail;
