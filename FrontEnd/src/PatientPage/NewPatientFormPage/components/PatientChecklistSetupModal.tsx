import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import { CheckListSetupType } from '../../../models/FormType';
import PatientCheckCard from './PatientCheckCard';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
type Props = {
    values: CheckListSetupType;
    handleChange: (checkItem: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
};

function PatientChecklistSetupModal({ values, handleChange, onClose }: Props) {
    return (
        <ModalFullScreenContainer title="체크리스트 설정" onClose={onClose}>
            <div className="mx-auto grid w-full grid-cols-1 gap-1 px-6 pt-6 mobile:grid-cols-2">
                {Object.keys(values).map((patientKey) => (
                    <PatientCheckCard
                        patientKey={patientKey}
                        values={values}
                        handleChange={handleChange}
                        key={patientKey}
                    />
                ))}
                <FixedSubmitButton onClick={onClose} label="저장하기" />
            </div>
        </ModalFullScreenContainer>
    );
}

export default PatientChecklistSetupModal;
