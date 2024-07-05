import toast from 'react-hot-toast';

type ToastType = 'error' | 'error' | 'success';
type ThemeType = 'light' | 'dark';

type ToastProps = {
    msg: string;
    type: ToastType;
    theme: ThemeType;
};

export const pushNotification = ({ msg, type, theme }: ToastProps) => {
    toast[type](msg, {
        duration: 1000,
        position: 'bottom-center',

        // Styling
        style: {
            padding: '14px',
            maxWidth: '500px',
            background: `${theme === 'dark' ? '#333' : '#fff'}`,
            color: `${theme === 'dark' ? '#fff' : '#333'}`,
        },
        className: 'w-full border text-md text-sm  ',

        // Custom Icon

        // Change colors of success/error/loading icon

        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
};
