import { FormikProps } from 'formik';
import { useState } from 'react';
import { LoginFormType } from '../LoginPage';
import InfoIcons from '../../icons/InfoIcons';

export default function LoginInput({
    label,
    type,
    formik,
    id,
}: {
    label: string;
    type: 'text' | 'password';
    id: 'id' | 'password';
    formik: FormikProps<LoginFormType>;
}) {
    const [focus, setFocus] = useState(false);
    const error = formik.errors[id];

    return (
        <div className="flex flex-col w-full gap-1">
            <div
                className={`flex ${error ? 'border-2 border-red-500' : ''} w-full overflow-hidden rounded-md border px-2 py-1 transition-colors focus-within:border-2 focus-within:border-blue-500`}
            >
                <div className="relative flex w-full">
                    <label
                        className={`absolute left-0 transition-all duration-100 ${
                            focus ? 'top-0 text-xs text-blue-500' : 'top-[10px] text-gray-500'
                        }`}
                    >
                        {label}
                    </label>
                    <input
                        type={type}
                        onChange={(e) => formik.setFieldValue(id, e.target.value)}
                        onFocus={() => {
                            setFocus(true);
                            formik.setFieldError(id, '');
                        }}
                        onBlur={(e) => setFocus(e.target.value !== '')}
                        className="w-full pt-4 pb-1 text-gray-700 outline-none"
                    />
                </div>
            </div>

            <span
                className={`flex-row items-center gap-1 text-xs text-red-500 transition-all ${error ? 'flex' : 'hidden'}`}
            >
                <InfoIcons className="w-4 h-4" />
                {error}
            </span>
        </div>
    );
}
