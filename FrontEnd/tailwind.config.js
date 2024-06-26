/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            extend: {
                colors: {
                    primary: {
                        DEFAULT: '#2bca43',
                    },
                },
            },
        },
    },
    plugins: [],
};
