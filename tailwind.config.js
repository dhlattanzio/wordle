module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            spacing: {
                '8vh': '8vh'
            },
            keyframes: {
                pulse: {
                    '0%': { transform: 'scale(1)'},
                    '50%': { transform: 'scale(1.12)'},
                    '100%': { transform: 'scale(1)'},
                },
                flip: {
                    '0%': { transform: 'scale(1, 1)'},
                    '50%': { transform: 'scale(1, 0)'},
                    '100%': { transform: 'scale(1, 1)'},
                }
            },
            animation: {
                pulse: "pulse 0.09s ease-out 1",
                flip: "flip 0.4s ease-out 1"
            }
        },
    },
    plugins: [],
}
