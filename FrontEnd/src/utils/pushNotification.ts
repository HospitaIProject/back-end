import toast from 'react-hot-toast';

type ToastType = 'error' | 'error' | 'success';
type ThemeType = 'light' | 'dark';

type ToastProps = {
    msg: string;
    type: ToastType;
    theme: ThemeType;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};

export const pushNotification = ({ msg, type, theme, position = 'bottom-center' }: ToastProps) => {
    toast[type](msg, {
        duration: 3500,
        position: position,

        // Styling
        style: {
            maxWidth: '500px',
            background: `${theme === 'dark' ? '#333' : '#fff'}`,
            color: `${theme === 'dark' ? '#fff' : '#333'}`,
            borderRadius: '10px',
        },
        className: 'w-full rounded-none border text-md text-sm  ',

        // Custom Icon

        // Change colors of success/error/loading icon

        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
};
