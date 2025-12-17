import { append, h } from '@/scripts/core/dom';
import { IItem } from './items';

export class GamePuzzleView {
    private container?: HTMLElement | null;
    private shuffledItems: IItem[] = [];
    private shuffleQuestions: IItem[] = [];
    private onClickcPuzzleItem: ((itemId: string) => void) | null = null;
    private shuffleQuestionsEls: HTMLElement[] = [];
    private shuffledItemsEls: HTMLElement[] = [];

    constructor(onClickcPuzzleItem: (itemId: string) => void) {
        this.onClickcPuzzleItem = onClickcPuzzleItem;
    }

    render(shuffledItems: IItem[], shuffleQuestions: IItem[]) {
        this.shuffledItems = shuffledItems;
        this.shuffleQuestions = shuffleQuestions;

        this.container = document.getElementById('game-container');
        if (!this.container) throw new Error('game 5 letter view | container is not defined');

        this.container.innerHTML = '';
        this.shuffleQuestionsEls = [];
        this.shuffledItemsEls = [];

        this.renderMainImage();
        this.renderItems();
    }

    renderMainImage() {
        if (!this.container) return;

        const imageWrapper = h(
            'div',
            {
                class: 'main-image-wrapper',
            },
            h('img', {
                src: '/images/puzzle-game/main-image.png',
                class: 'main-image',
            })
        );

        this.shuffleQuestions.forEach((item) => {
            const question = h(
                'div',
                { class: `puzzle-question-wrapper puzzle-question-wrapper--${item.id}` },
                h('img', { src: item.src }),
                h('p', { class: 'h2' }, '?')
            );

            this.shuffleQuestionsEls.push(question);

            append(imageWrapper, question);
        });

        append(this.container, imageWrapper);
    }

    renderItems() {
        if (!this.container) return;

        const box = h('div', { class: 'puzzle-items' });

        const onClick = (itemId: string) => {
            if (!this.onClickcPuzzleItem) return;

            this.onClickcPuzzleItem(itemId);
        };

        this.shuffledItems.forEach((item) => {
            const div = h(
                'button',
                { class: 'puzzle-item-image-wrapper', onClick: onClick.bind(this, item.id) },
                h('img', { src: item.src })
            );

            this.shuffledItemsEls.push(div);
            append(box, div);
        });

        append(this.container, box);
    }

    showQuestion(questionIndex: number) {
        this.shuffleQuestionsEls[questionIndex].classList.add('question');
    }

    renderCorrect(itemId: string) {
        const questionIndex = this.shuffleQuestions.findIndex((item) => item.id === itemId);
        const itemIndex = this.shuffledItems.findIndex((item) => item.id === itemId);

        if (questionIndex >= 0) this.shuffleQuestionsEls[questionIndex].classList.add('show');
        if (itemIndex >= 0) this.shuffledItemsEls[itemIndex].classList.add('hide');
    }
}
