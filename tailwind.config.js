module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            keyframes: {
                pulse: {
                    '0%': { transform: 'scale(1)'},
                    '50%': { transform: 'scale(1.12)'},
                    '100%': { transform: 'scale(1)'},
                },
                flipStart: {
                    '0%': { transform: 'scale(1, 1)'},
                    '100%': { transform: 'scale(1, 0)'},
                },
                flipEnd: {
                    '0%': { transform: 'scale(1, 0)'},
                    '100%': { transform: 'scale(1, 1)'},
                },
                notificationIn: {
                    '0%': { transform: 'scale(0.8)'},
                    '100%': { transform: 'scale(1)'},
                },
                notificationOut: {
                    '0%': { transform: 'scale(1)'},
                    '100%': { transform: 'scale(0.50)'},
                },
                shake: {
                    '0%': { transform: 'translate(0, 0)'},
                    '25%': { transform: 'translate(-0.4rem, 0)'},
                    '50%': { transform: 'translate(0, 0)'},
                    '75%': { transform: 'translate(0.4rem, 0)'},
                    '100%': { transform: 'translate(0, 0)'},
                }
            },
            animation: {
                pulse: "pulse 0.09s ease-out 1",
                flipStart: "flipStart 0.3s ease-out 1",
                flipEnd: "flipEnd 0.3s ease-out 1",
                notificationIn: "notificationIn 0.2s ease-out 1",
                notificationOut: "notificationOut 0.6s ease-out 1",
                shake: "shake 0.2s ease-in-out 3",
            }
        },
    },
    plugins: [],
}