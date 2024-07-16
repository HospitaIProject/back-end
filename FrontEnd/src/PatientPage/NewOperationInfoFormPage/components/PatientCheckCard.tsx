import CheckBoxIcon from '../../../icons/CheckBoxIcon';
import { CheckListSetupType } from '../../../models/CheckListsType';
import { getValueLabel } from '../../../utils/getNameByValue';

type Props = {
    values: CheckListSetupType;
    patientKey: string;
    handleChange?: (checkItem: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly?: boolean;
};

function PatientCheckCard({ values, patientKey, handleChange }: Props) {
    const isReadOnly = !Boolean(handleChange); // handleChange가 없으면 readonly로 처리
    return (
        <label
            className={`${Boolean(values[patientKey]) ? 'text-gray-700' : 'text-gray-300'} flex ${isReadOnly ? 'cursor-pointer p-2 text-sm mobile:text-base' : 'p-3'} flex-row justify-between gap-2 rounded-md transition-all hover:bg-green-50 mobile:max-w-screen-mobile mobile:justify-center mobile:gap-4`}
        >
            <span className="flex w-full max-w-64 items-center">{`${getValueLabel({
                value: patientKey,
                type: 'checkListSetup',
            })}`}</span>

            <CheckBoxIcon
                uncheckedClassName={`${isReadOnly ? 'w-6 h-6' : 'w-8 h-8'}  shrink-0 text-gray-300`}
                checkedClassName={`shrink-0 text-green-500 ${isReadOnly ? 'w-6 h-6' : 'w-8 h-8'}`}
                isChecked={Boolean(values[patientKey])}
            />
            {Boolean(handleChange) && (
                <input
                    type="checkbox"
                    className="absolute hidden w-full"
                    checked={Boolean(values[patientKey])}
                    onChange={(e) => handleChange?.(patientKey, e)}
                />
            )}
        </label>
    );
}

export default PatientCheckCard;
