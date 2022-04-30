const strings = {
    es: {
        title: "WORDLE",
        dialog: {
            tutorial: {
                title: "CÓMO JUGAR",
                details: [
                    "Adivina la palabra en seis intentos.", 
                    "Cada intento debe ser una palabra valida de cinco letras. Pulsa enter para intentar.",
                    "Después de cada palabra, el color de cada bloque cambiará dependiendo que tan cerca estuviste de la palabra correcta."
                ],
                newWordleEveryDay: "¡Un nuevo WORDLE estará disponible cada día!",
                examples: "Ejemplos",
                words: {
                    correct: ["DIANA", "La letra ", "D", " está en la palabra y en la posición correcta."],
                    badSpot: ["TORTA", "La letra ", "R", " está en la palabra pero en no la posición incorrecta."],
                    notInWord: ["BRAZO", "La letra ", "Z", " no está en la palabra."]
                }
            },
            statistics: {
                title: "ESTADÍSTICAS",
                played: "Jugados",
                win: "Victorias",
                currentStreak: "Racha Actual",
                maxStreak: "Mejor Racha",
                distribution: "DISTRIBUCIÓN ADIVINADOS",
                nextWordle: "PROXIMO WORDLE",
                share: "COMPARTIR"
            }
        },
        notifications: {
            correct: "¡Correcto!",
            invalidWord: "Palabra inválida",
            copyToClipboard: "Copiado al portapapeles"
        }
    }
}

export const lang = strings.es;