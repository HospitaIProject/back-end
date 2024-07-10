import { useState } from 'react';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import DisplayEmptyData from '../../../components/common/DisplayEmptyData';
import Loading from '../../../components/common/Loading';
import NumberViewInput from '../../../components/common/form/viewInput/NumberViewInput';
import ViewInput from '../../../components/common/form/viewInput/ViewInput';
import YesOrNoViewButton from '../../../components/common/form/viewInput/YesOrNoViewButton';
import { SurgeryType } from '../../../models/SurgeryType';
import { getNameByValue } from '../../../utils/getNameByValue';
import PatientChecklistSetupModal from '../../NewSurgeryInfoFormPage/components/PatientChecklistSetupModal';
import { useCheckListsSetupQeury } from '../../_lib/surgeryService';

type Props = {
    surgeryData: SurgeryType;
};

function SurgeryDetail({ surgeryData }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const checkListsSetupQuery = useCheckListsSetupQeury({ surgeryId: surgeryData.operationId });
    const { data: checkListSetupData, isPending } = checkListsSetupQuery;

    const { onlyDate: operationDate } = useDateFormatted(surgeryData.operationDate);
    const { onlyDate: hospitalizedDate } = useDateFormatted(surgeryData.hospitalizedDate);
    const { onlyDate: dischargedDate } = useDateFormatted(surgeryData.dischargedDate);

    if (isPending) {
        return <Loading />;
    }
    if (!checkListSetupData) {
        return <DisplayEmptyData label="데이터가 없습니다." isRender />;
    }

    return (
        <>
            <NumberViewInput label="키(cm)" value={surgeryData.height} unit="cm" />
            <NumberViewInput label="몸무게(kg)" value={surgeryData.weight} unit="kg" />
            <NumberViewInput label="BMI" value={surgeryData.bmi} />
            <ViewInput label="ASA score" value={surgeryData.asaScore} />
            <ViewInput label="위치" value={surgeryData.location} />
            <ViewInput label="진단" value={surgeryData.dignosis} />
            <ViewInput label="수술일" value={operationDate} />
            <ViewInput label="입원일" value={hospitalizedDate} />
            <ViewInput label="퇴원일" value={dischargedDate} />
            <NumberViewInput label="총 재원일수" value={surgeryData.totalHospitalizedDays} />
            <ViewInput label="수술방법" value={surgeryData.operationMethod} />
            <ViewInput label="수술 approach" value={surgeryData.operationApproach} />
            <ViewInput label="Stoma formation" value={getNameByValue(surgeryData.stomaFormation)} />
            <ViewInput label="AJCC stage" value={surgeryData.ajcCStage} />
            <NumberViewInput label="No. of retrieved LN" value={surgeryData.numberOfRetrievedLine} />
            <YesOrNoViewButton label="Complication 발생 여부" value={surgeryData.complicationOccurence} />
            <ViewInput label="C-D classification" value={surgeryData.cdClassification} />
            <YesOrNoViewButton label="Reoperation within 30days" value={surgeryData.reOperationWithIn30Days} />
            <ViewInput label="Reoperation 원인" value={surgeryData.reOperationCause} />
            <div className="flex flex-col items-center w-full mt-4 tablet:col-span-2">
                <span className="mb-2 text-base text-yellow-600">*선택한 Checklist 확인 필수</span>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full px-8 py-3 text-gray-600 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-300 mobile:max-w-screen-mobile"
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

export default SurgeryDetail;
