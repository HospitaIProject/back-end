import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import { CHECKLIST_SECTION_KEYS, CheckListSetupDaySectionType } from '../../../models/FormType';
import PatientCheckCard from './PatientCheckCard';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
type Props = {
    values: CheckListSetupDaySectionType;
    handleChange?: (checkItem: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
    title?: string;
};

function PatientChecklistSetupModal({ values, handleChange, onClose, title }: Props) {
    return (
        <ModalFullScreenContainer
            maxWidthClassName="max-w-screen-tablet"
            title={`
            ${title ? title : '체크리스트 설정'}
        `}
            onClose={onClose}
        >
            <div className="flex flex-col w-full px-6 mx-auto max">
                <div className="flex justify-center w-full py-2 text-gray-700 bg-gray-100 rounded-md">-수술전-</div>

                <div className="grid w-full grid-cols-1 gap-1 py-6 mobile:grid-cols-2">
                    {Object.keys(values)
                        .filter((key) => CHECKLIST_SECTION_KEYS.PREV.includes(key))
                        .map((patientKey) => (
                            <>
                                <PatientCheckCard
                                    patientKey={patientKey}
                                    values={values}
                                    handleChange={handleChange}
                                    key={patientKey}
                                />
                            </>
                        ))}
                </div>
                <div className="flex justify-center w-full py-2 text-gray-700 bg-gray-100 rounded-md">-수술당일-</div>
                <div className="grid w-full grid-cols-1 gap-1 py-6 mx-auto mobile:grid-cols-2">
                    {Object.keys(values)
                        .filter((key) => CHECKLIST_SECTION_KEYS.TODAY.includes(key))
                        .map((patientKey) => (
                            <>
                                <PatientCheckCard
                                    patientKey={patientKey}
                                    values={values}
                                    handleChange={handleChange}
                                    key={patientKey}
                                />
                            </>
                        ))}
                </div>
                <div className="flex justify-center w-full py-2 text-gray-700 bg-gray-100 rounded-md">-수술후-</div>
                <div className="grid w-full grid-cols-1 gap-1 py-6 mx-auto mobile:grid-cols-2">
                    {Object.keys(values)
                        .filter((key) => CHECKLIST_SECTION_KEYS.POST.includes(key))
                        .map((patientKey) => (
                            <>
                                <PatientCheckCard
                                    patientKey={patientKey}
                                    values={values}
                                    handleChange={handleChange}
                                    key={patientKey}
                                />
                            </>
                        ))}
                </div>
                {Boolean(handleChange) && <FixedSubmitButton onClick={onClose} label="저장하기" />}
            </div>
        </ModalFullScreenContainer>
    );
}

export default PatientChecklistSetupModal;
