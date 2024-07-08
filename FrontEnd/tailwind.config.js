/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            mobile: '640px',
            // => @media (min-width: 640px) { ... }
            tablet: '992px',

            laptop: '1200px',
            // => @media (min-width: 1024px) { ... }

            desktop: '1380px',
            // => @media (min-width: 1280px) { ... }

            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2bca43',
                },
            },
        },
    },
    plugins: [],
};
