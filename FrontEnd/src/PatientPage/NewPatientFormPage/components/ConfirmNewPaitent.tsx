import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
import NumberViewInput from '../../../components/common/form/viewInput/NumberViewInput';
import ViewInput from '../../../components/common/form/viewInput/ViewInput';
import YesOrNoViewButton from '../../../components/common/form/viewInput/YesOrNoViewButton';
import { NewPatientValuesType } from '../../../models/FormType';

const MATCH_ITEMS = {
    COLOSTOMY: 'Colostomy',
    IlEOSTOMY: 'Ileostomy',
    UROSTOMY: 'Urostomy',
    GASTROSTOMY: 'Gastrostomy',
    JEJUNOSTOMY: 'Jejunostomy',
};

type Props = {
    values: NewPatientValuesType;
    onSubmit: () => void;
};

function getNameByValue(value: string) {
    const item = MATCH_ITEMS[value as keyof typeof MATCH_ITEMS];
    return item;
}

function ConfirmNewPaitent({ values, onSubmit }: Props) {
    const { onlyDate: opertationDate } = useDateFormatted(values.opertationDate);
    const { onlyDate: hospitalizedDate } = useDateFormatted(values.hospitalizedDate);
    const { onlyDate: dischargedDate } = useDateFormatted(values.dischargedDate);
    return (
        <div className="flex w-full flex-col gap-4 px-4 pt-4">
            <NumberViewInput label="등록번호" value={values.patientNumber} />
            <ViewInput label="환자이름" value={values.name} />
            <ViewInput label="성별" value={values.sex} />
            <NumberViewInput label="나이" value={values.age} />
            <NumberViewInput label="키(cm)" value={values.height} unit="cm" />
            <NumberViewInput label="몸무게(kg)" value={values.weight} unit="kg" />
            <NumberViewInput label="BMI" value={values.bmi} />
            <ViewInput label="ASA score" value={values.asaScore} />
            <ViewInput label="위치" value={values.location} />
            <ViewInput label="진단" value={values.dignosis} />
            <ViewInput label="수술일" value={opertationDate} />
            <ViewInput label="입원일" value={hospitalizedDate} />
            <ViewInput label="퇴원일" value={dischargedDate} />
            <NumberViewInput label="총 재원일수" value={values.totalHospitalizedDays} />
            <ViewInput label="수술방법" value={values.operationMethod} />
            <ViewInput label="수술 approach" value={values.operationApproach} />
            <ViewInput label="Stoma formation" value={getNameByValue(values.stomaFormation)} />
            <ViewInput label="AJCC stage" value={values.ajccstage} />
            <NumberViewInput label="No. of retrieved LN" value={values.numberOfRetrievedLine} />
            <YesOrNoViewButton label="Complication 발생 여부" value={values.complicationOccurence} />
            <ViewInput label="C-D classification" value={values.cdclassification} />
            <YesOrNoViewButton label="Reoperation within 30days" value={values.reOperationWithIn30Days} />
            <ViewInput label="Reoperation 원인" value={values.reOperationCause} />

            <FixedSubmitButton onClick={onSubmit} label="저장하기" />
        </div>
    );
}

export default ConfirmNewPaitent;
