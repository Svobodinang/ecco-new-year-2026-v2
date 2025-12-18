import { append, h } from '@/scripts/core/dom';

export const useResults = (): (() => void) => {
    const addResultsBlock = () => {
        const resultsContainer = document.getElementById('results-container');

        if (!resultsContainer) return;

        const letters = [];
        for (const letter of 'Как это было') {
            letters.push(h('span', { class: 'inview-letter' }, letter));
        }

        const mainClass = 'main-page-results';
        const resultsBlock = h(
            'div',
            { class: `container ${mainClass}` },
            h(
                'h2',
                { class: `h2-accent ${mainClass}__title inview inview--title` },
                h('span', { class: 'inview-word inview-word--accent' }, letters)
            ),
            h(
                'div',
                { class: `body-text ${mainClass}__text-wrapper inview inview--opacity` },
                '<p>Наше приключение длинной в&nbsp;5&nbsp;дней подошло к&nbsp;концу. Самое время посмотреть, как это было и&nbsp;кто стал обладателем призов.</p> <p>Игры и&nbsp;отправка поздравлений продолжают свою работу: вы&nbsp;всегда можете вернуться сюда, чтобы получить немного предновогоднего волшебства!</p>'
            ),
            h('a', { class: 'ui-button inview inview--opacity', href: './results' }, 'Посмотреть')
        );

        append(resultsContainer, resultsBlock);
    };

    const addResultsNav = () => {
        const container = document.getElementById('header-nav');

        if (!container) return;

        const resultsNavItem = h('li', {}, h('a', { href: './results' }, 'Как это было'));

        append(container, resultsNavItem);
    };

    addResultsBlock();
    addResultsNav();

    return () => {};
};
