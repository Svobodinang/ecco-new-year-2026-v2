export interface IGame {
    id: string;
    date: string; // Дата открытия игры в формате ГГГГ-ММ-ДД, влияет на открытие игры
    dateText: string;
    to: string;
}

export const gameIds = {
    GAME_FIVE_LETTERS: 'game-five-letters',
    PHOTO: 'photo',
    GAME_MEMORY: 'game-memory',
    LETTER: 'letter',
    GAME_PUZZLE: 'game-puzzle',
} as const;

export const games: IGame[] = [
    {
        id: gameIds.GAME_FIVE_LETTERS,
        date: '2025-12-16',
        dateText: 'Дата открытия: 20 декабря 2025',
        to: './game-five-letters',
    },
    {
        id: gameIds.PHOTO,
        date: '2025-12-16',
        dateText: 'Дата открытия: 21 декабря 2025',
        to: './photo',
    },
    {
        id: gameIds.GAME_MEMORY,
        date: '2025-12-16',
        dateText: 'Дата открытия: 22 декабря 2025',
        to: './game-memory',
    },
    {
        id: gameIds.LETTER,
        date: '2025-12-16',
        dateText: 'Дата открытия: 23 декабря 2025',
        to: './letter',
    },
    {
        id: gameIds.GAME_PUZZLE,
        date: '2025-12-16',
        dateText: 'Дата открытия: 24 декабря 2025',
        to: './game-puzzle',
    },
];
