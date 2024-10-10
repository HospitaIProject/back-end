import { useState } from 'react';

export default function LoginInput({ label, type }: { label: string; type: 'text' | 'password' }) {
    const [focus, setFocus] = useState(false);

    return (
        <div className="flex w-full px-2 py-1 overflow-hidden transition-colors border rounded-md focus-within:border-2 focus-within:border-blue-500">
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
                    onFocus={() => setFocus(true)}
                    onBlur={(e) => setFocus(e.target.value !== '')}
                    className="w-full pt-4 pb-1 text-gray-700 outline-none"
                />
            </div>
        </div>
    );
}
