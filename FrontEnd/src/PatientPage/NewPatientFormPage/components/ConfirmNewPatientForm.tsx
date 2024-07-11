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
    const { onlyDate: birthday } = useDateFormatted(values.birthday);

    return (
        <div className="flex flex-col w-full gap-4 px-4 pt-4">
            <NumberViewInput label="등록번호" value={values.patientNumber} />
            <ViewInput label="환자이름" value={values.name} />
            <ViewInput label="성별" value={values.sex} />
            <ViewInput label="나이" value={birthday} />
            {Boolean(onSubmit) && <FixedSubmitButton onClick={onSubmit} label="저장하기" />}
        </div>
    );
}

export default ConfirmNewPatientForm;
