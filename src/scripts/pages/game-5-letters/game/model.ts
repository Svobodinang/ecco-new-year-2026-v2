import { gameStatuses, TLetterStatus, TGameStatus, letterStatuses } from './gameStatuses';

export type TFinalWord = string[];

export interface ILetterKnowledge {
    [letterStatuses.CORRECT]: Set<string>;
    [letterStatuses.PRESENT]: Set<string>;
    [letterStatuses.INCORRECT]: Set<string>;
}

export class Game5lettersModel {
    private maxAttempts: number;
    private finalWord: TFinalWord;

    letterKnowledge: ILetterKnowledge = {
        [letterStatuses.CORRECT]: new Set(),
        [letterStatuses.PRESENT]: new Set(),
        [letterStatuses.INCORRECT]: new Set(),
    };
    currentWord: TFinalWord = [];
    letterStatusesInCurrentWord: Array<TLetterStatus> = [];
    currentAttempts: number = 0;
    canCheckWord: boolean = false;
    canDelete: boolean = false;
    gameStatus: TGameStatus = gameStatuses.NOT_STARTED;

    constructor(maxAttempts: number, cellsCount: number, finalWord: TFinalWord) {
        this.maxAttempts = maxAttempts;
        this.finalWord = finalWord;
    }

    startGame() {
        this.currentAttempts = 0;
        this.gameStatus = gameStatuses.IN_PROGRESS;

        this.startNewWord();
    }

    startNewWord() {
        this.currentAttempts += 1;
        this.currentWord = [];
        this.letterStatusesInCurrentWord = [];
        this.canCheckWord = false;

        if (this.currentAttempts > this.maxAttempts) {
            this.gameStatus = gameStatuses.LOSE;
        }

        this.updateAbilities();
    }

    addLetter(letter: string) {
        if (this.currentWord.length >= this.finalWord.length) return;

        this.currentWord.push(letter);

        this.updateAbilities();
    }

    removeLetter() {
        this.currentWord.splice(-1, 1);

        this.updateAbilities();
    }

    private updateAbilities() {
        if (this.currentWord.length >= this.finalWord.length) this.canCheckWord = true;
        else this.canCheckWord = false;

        if (this.currentWord.length > 0) this.canDelete = true;
        else this.canDelete = false;
    }

    checkWord() {
        if (!this.canCheckWord) return;

        this.currentWord.forEach((letter, index) => {
            if (letter === this.finalWord[index]) {
                this.letterKnowledge.correct.add(letter);
                this.letterStatusesInCurrentWord.push(letterStatuses.CORRECT);

                if (this.letterKnowledge.present.has(letter))
                    this.letterKnowledge.present.delete(letter);

                return;
            }

            // todo обработать, если в введенном слове > 1 буквы, которая есть в загаданном слове
            if (this.finalWord.find((l) => l === letter)) {
                if (!this.letterKnowledge.correct.has(letter))
                    this.letterKnowledge.present.add(letter);

                this.letterStatusesInCurrentWord.push(letterStatuses.PRESENT);

                return;
            }

            this.letterKnowledge.incorrect.add(letter);
            this.letterStatusesInCurrentWord.push(letterStatuses.INCORRECT);
        });

        if (
            !this.letterStatusesInCurrentWord.find((l) => l === letterStatuses.INCORRECT) &&
            !this.letterStatusesInCurrentWord.find((l) => l === letterStatuses.PRESENT)
        ) {
            this.gameStatus = gameStatuses.WIN;
        }
    }
}
