module.exports = {
    content: ["./src/app/layout/**/*.{html,ejs}"],
    theme: {
        extend: {},
        colors: {
            "primary": {
                0: "#FFFFFF",
                100: "#F5F8FE",
                200: "#EBF1FD",
                300: "#E0EAFC",
                400: "#F0F5FF",
                500: "#CCDCFB",
                600: "#C2D4FA",
                700: "#B8CDF9",
                800: "#ADC6F8",
                900: "#A3BFF7",
                1000: "#99B8F6"
            },
            "primary-dark": {
                0: "#E6EDFD",
                50: "#CCDCFB",
                100: "#99B8F6",
                200: "#6695F2",
                300: "#3371ED",
                400: "#004EE9",
                500: "#003EBA",
                600: "#002F8C",
                700: "#001F5D",
                800: "#00102F",
                900: "#000817"
            },
            "background-dark-100": "#000000",
            "background-dark-90": "#111111",
            "background-dark-80": "#181a1b",
            "background-dark-70": "#252d38",
            "background-light-10": "#f8faff",
            "background-light-0": "#ffffff",
            "font-black": "#2C3E50",
            "font-lighter-black": "#718096",
            "font-light": "#c4c6c9",
            "font-darker-light": "#a7a9ad",
            "font-x-darker-light": "#77797d"
        }
    },
    plugins: [
        {
            tailwindcss: {},
            autoprefixer: {}
        }
    ]
};
