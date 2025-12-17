import { h, append } from '@/scripts/core/dom';
import isMobilePtSize from '@/scripts/core/isMobilePtSize';
import { keybardSymbols, specialKeys } from './keyboard';
import { TOnClickKeyboardLetter } from './controller';
import { TFinalWord, ILetterKnowledge } from './model';
import { letterStatuses, TGameStatus } from './gameStatuses';
import checkIcon from '/images/icons/check.svg';
import deleteIcon from '/images/icons/delete.svg';

export class Game5lettersView {
    private container?: HTMLElement | null;
    private gridCells: HTMLElement[][] = [];
    private helpContainer?: HTMLElement | null;
    private keyboardContainer?: HTMLElement | null;
    private keyboardCells?: Record<string, HTMLElement> = {};
    private readonly rowsCount;
    private readonly cellsCount;
    private isMobilePtSize: boolean;
    private bindedResizeHandler?: () => void;
    onClickKeyboardLetter: TOnClickKeyboardLetter;

    constructor(
        maxAttempts: number,
        cellsCount: number,
        onClickKeyboardLetter: TOnClickKeyboardLetter
    ) {
        this.rowsCount = maxAttempts;
        this.cellsCount = cellsCount;

        this.onClickKeyboardLetter = onClickKeyboardLetter;

        this.isMobilePtSize = isMobilePtSize();

        this.addResizeHandler();
    }

    private addResizeHandler(): void {
        this.bindedResizeHandler = this.onResizeHandler.bind(this);
        window.addEventListener('resize', this.bindedResizeHandler);
    }

    private removeResizeHandler(): void {
        if (this.bindedResizeHandler) {
            window.removeEventListener('resize', this.bindedResizeHandler);
        }
    }

    private onResizeHandler(): void {
        const isNewMobilePtSize: boolean = isMobilePtSize();

        if (isNewMobilePtSize === this.isMobilePtSize) return;

        this.isMobilePtSize = isNewMobilePtSize;
        this.renderKeyboard();
    }

    render(): void {
        this.container = document.getElementById('game-container');
        this.helpContainer = document.getElementById('game-help-container');
        if (!this.container) throw new Error('game 5 letter view | container is not defined');
        if (!this.helpContainer)
            throw new Error('game 5 letter view | help container is not defined');

        this.renderGrid();
        this.renderKeyboard();
    }

    private renderGrid(): void {
        if (!this.container) return;

        const grid: HTMLElement = h('div', { class: 'grid' });

        for (let i = 0; i < this.rowsCount; i += 1) {
            const row: HTMLElement = h('div', { class: 'row' });
            this.gridCells[i] = [];

            for (let j = 0; j < this.cellsCount; j += 1) {
                const cell = h('div', {
                    class: 'cell body-text uppercase',
                });

                this.gridCells[i][j] = cell;

                append(row, cell);
            }

            append(grid, row);
        }

        append(this.container, grid);
    }

    private removeOutsideKeyboard(): void {
        if (this.isMobilePtSize && this.keyboardContainer) {
            const currentKeyboard = this.keyboardContainer.querySelector('.keyboard');
            currentKeyboard?.remove();
        }
    }

    private renderKeyboard(): void {
        if (this.keyboardContainer) {
            const currentKeyboard = this.keyboardContainer.querySelector('.keyboard');
            currentKeyboard?.remove();
        }

        this.keyboardContainer = this.container;

        if (this.isMobilePtSize) {
            this.keyboardContainer = this.helpContainer;
        }

        if (!this.keyboardContainer) return;

        const keyboard: HTMLElement = h('div', { class: 'keyboard' });

        keybardSymbols.forEach((symbols: string[]) => {
            const row: HTMLElement = h('div', { class: 'row' });

            symbols.forEach((letter) => {
                let innerHTML: string | HTMLElement = letter;
                const addClasses: string[] = [];

                if (letter === specialKeys.DELETE || letter === specialKeys.OK) {
                    addClasses.push('spec-key');
                    addClasses.push(letter);

                    const src = letter === specialKeys.DELETE ? deleteIcon : checkIcon;
                    innerHTML = h('img', { src });
                }

                const cell: HTMLElement = h(
                    'button',
                    {
                        class: `cell body-text uppercase ${addClasses.join(' ')}`,
                        value: letter,
                        onClick: this.onClickKeyboardLetter.bind(this, letter),
                    },
                    innerHTML
                );

                if (this.keyboardCells) this.keyboardCells[letter] = cell;

                if (letter === specialKeys.DELETE || letter === specialKeys.OK) {
                    this.toggleEnableSpecKeyButton(false, letter);
                }

                append(row, cell);
            });

            append(keyboard, row);
        });

        append(this.keyboardContainer, keyboard);
    }

    updateAbilities(canCheckWord: boolean, canDelete: boolean) {
        this.toggleEnableSpecKeyButton(canCheckWord, specialKeys.OK);
        this.toggleEnableSpecKeyButton(canDelete, specialKeys.DELETE);
    }

    private toggleEnableSpecKeyButton(isEnable: boolean, specLetter: string) {
        if (!this.keyboardCells) return;

        if (!isEnable) this.keyboardCells[specLetter].setAttribute('disabled', 'true');
        else this.keyboardCells[specLetter].removeAttribute('disabled');
    }

    renderWord(currentWord: TFinalWord, currentAttempts: number) {
        this.gridCells[currentAttempts - 1].forEach((cell) => {
            cell.innerHTML = '';
        });

        currentWord.forEach((letter, index) => {
            this.gridCells[currentAttempts - 1][index].innerHTML = letter;
        });
    }

    renderLettersStatus(
        letterStatusesInCurrentWord: TGameStatus[],
        letterKnowledge: ILetterKnowledge,
        currentAttempts: number
    ) {
        // word
        letterStatusesInCurrentWord.forEach((status, index) => {
            this.gridCells[currentAttempts - 1][index].setAttribute('status', status);
        });

        // keyboard
        Object.values(letterStatuses).forEach((letterStatus) => {
            letterKnowledge[letterStatus].forEach((letter) => {
                if (this.keyboardCells)
                    this.keyboardCells[letter].setAttribute('status', letterStatus);
            });
        });
    }

    endGame(): void {
        this.removeResizeHandler();
        this.removeOutsideKeyboard();
    }
}
