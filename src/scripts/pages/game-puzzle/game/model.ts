import { gameStatuses } from '../../game-common/gameStatuses';
import { IItem, items } from './items';

export const ItemStatuses = {
    CORRECT: 'correct',
    INCORRECT: 'incorrect',
};

export class GamePuzzleModel {
    shuffledItems: IItem[] = [];
    shuffleQuestions: IItem[] = [];
    currentQuestionIndex: number = 0;
    gameStatus: string = gameStatuses.NOT_STARTED;

    constructor() {}

    startGame() {
        this.shuffledItems = this.shuffle(items);
        this.shuffleQuestions = this.shuffle(items);
        this.currentQuestionIndex = 0;
        this.gameStatus = gameStatuses.IN_PROGRESS;
    }

    private shuffle<T>(arr: T[]): T[] {
        const result = [...arr];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }

    toChooseItem(itemId: string) {
        if (itemId === this.shuffleQuestions[this.currentQuestionIndex].id) {
            return ItemStatuses.CORRECT;
        }
    }

    nextQuestion() {
        this.currentQuestionIndex += 1;
        if (this.currentQuestionIndex >= this.shuffleQuestions.length) {
            this.gameStatus = gameStatuses.WIN;
        }
    }
}
