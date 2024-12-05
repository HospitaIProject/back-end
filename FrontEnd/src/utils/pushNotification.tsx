import toast from 'react-hot-toast';
import CheckBoxIcon from '../icons/CheckBoxIcon';

type ToastType = 'error' | 'success';
type ThemeType = 'light' | 'dark';

type ToastProps = {
    msg: string;
    type: ToastType;
    theme: ThemeType;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};

export const pushNotification = ({ msg, type, theme }: ToastProps) => {
    toast.custom(
        (t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } pointer-events-auto flex w-full max-w-md rounded-lg p-3 shadow-lg ring-1 ring-black ring-opacity-5`}
                style={{
                    backgroundColor: theme === 'dark' ? '#333' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#333',
                }}
            >
                <div className="flex w-full items-center">
                    {type === 'success' ? (
                        <CheckBoxIcon isChecked checkedClassName="w-7 mr-3 h-7 text-green-500" />
                    ) : (
                        ''
                    )}
                    <span className="mr-3 flex flex-grow justify-center text-sm">{msg}</span>
                    <button onClick={() => toast.dismiss(t.id)} className="text-gray-400 hover:text-gray-200">
                        ✖
                    </button>
                </div>
            </div>
        ),
        {
            position: 'top-center',
            duration: 2000,
        },
    );
};
