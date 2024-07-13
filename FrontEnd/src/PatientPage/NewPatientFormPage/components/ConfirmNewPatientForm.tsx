import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
import NumberViewInput from '../../../components/common/form/viewInput/NumberViewInput';
import ViewInput from '../../../components/common/form/viewInput/ViewInput';
import { PatientFormType } from '../../../models/PatientType';

type Props = {
    values: PatientFormType;
    onSubmit?: () => void;
};

function ConfirmNewPatientForm({ values, onSubmit }: Props) {
    const { onlyDate: operationDate } = useDateFormatted(values.operationDate);
    const { onlyDate: hospitalizedDate } = useDateFormatted(values.hospitalizedDate);
    const { onlyDate: dischargedDate } = useDateFormatted(values.dischargedDate);

    return (
        <div className="flex flex-col w-full gap-4 px-4 pt-4">
            <NumberViewInput label="등록번호" value={values.patientNumber} />
            <ViewInput label="환자이름" value={values.name} />
            <ViewInput label="성별" value={values.sex} />
            <NumberViewInput label="나이" value={values.age} />
            <NumberViewInput unit="cm" label="키" value={values.height} />
            <NumberViewInput unit="kg" label="몸무게" value={values.weight} />
            <NumberViewInput label="BMI" value={values.bmi} />
            <ViewInput label="ASA score" value={values.asaScore} />
            <ViewInput label="위치" value={values.location} />
            <ViewInput label="진단명" value={values.diagnosis} />
            <ViewInput label="입원일" value={hospitalizedDate} />
            <ViewInput label="수술일" value={operationDate} />
            <ViewInput label="퇴원일" value={dischargedDate} />
            <NumberViewInput label="총 재원 일수" value={values.totalHospitalizedDays} />

            {Boolean(onSubmit) && <FixedSubmitButton onClick={onSubmit} label="저장하기" />}
        </div>
    );
}

export default ConfirmNewPatientForm;
