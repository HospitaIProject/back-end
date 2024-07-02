import { ITEMS_NAME_MAP } from '../../../utils/mappingNames';
import CheckBoxIcon from '../../../icons/CheckBoxIcon';
import { CheckListSetupType } from '../../../models/FormType';

type Props = {
    values: CheckListSetupType;
    patientKey: string;
    handleChange: (checkItem: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly?: boolean;
};

function PatientCheckCard({ values, patientKey, handleChange, readonly = false }: Props) {
    return (
        <label
            className={`${Boolean(values[patientKey]) ? 'text-gray-700' : 'text-gray-300'} flex cursor-pointer flex-row justify-between gap-2 rounded-md p-3 transition-all hover:bg-green-50 mobile:max-w-screen-mobile mobile:justify-center mobile:gap-4`}
        >
            <span className="flex w-full max-w-64 items-center">{`${ITEMS_NAME_MAP[patientKey]}`}</span>

            <CheckBoxIcon
                uncheckedClassName="w-8 h-8 shrink-0 text-gray-300"
                checkedClassName="w-8 h-8 shrink-0 text-green-500"
                isChecked={Boolean(values[patientKey])}
            />
            <input
                type="checkbox"
                className="absolute hidden w-full"
                checked={Boolean(values[patientKey])}
                onChange={(e) => handleChange(patientKey, e)}
            />
        </label>
    );
}

export default PatientCheckCard;
