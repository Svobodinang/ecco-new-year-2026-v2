export const gameStatuses: Record<string, string> = {
    NOT_STARTED: 'not-started',
    IN_PROGRESS: 'in-progress',
    WIN: 'win',
    LOSE: 'lose',
} as const;

export const letterStatuses: Record<string, string> = {
    CORRECT: 'correct',
    PRESENT: 'present',
    INCORRECT: 'incorrect',
} as const;

export type TLetterStatus = (typeof letterStatuses)[keyof typeof letterStatuses];
export type TGameStatus = (typeof gameStatuses)[keyof typeof gameStatuses];
