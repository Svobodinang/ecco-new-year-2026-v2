import { h } from '../../core/dom';

export interface IContent {
    screenClass: string;
    title: string;
    date: string;
    eyebrow: string;
    rules: string;
}

type TScreenBuilder = (content: IContent, clickHandler?: () => void) => HTMLElement;
type TScreenBuilder2 = (
    content: IContent,
    clickHandler1?: () => void,
    clickHandler2?: () => void,
    showSaveResultsInfo?: boolean
) => HTMLElement;
type TScreenBuilder3 = (
    content: IContent,
    clickHandler1?: () => void,
    showSaveResultsInfo?: boolean
) => HTMLElement;

export const buildTitleScreen: TScreenBuilder = (content, clickHandler) => {
    const onClick = () => {
        if (clickHandler) clickHandler();
    };

    const letters = [];
    for (const letter of content.title) {
        letters.push(h('span', { class: 'inview-letter' }, letter));
    }

    return h(
        'div',
        {
            class: `screen screen--title ${content.screenClass}`,
        },
        h(
            'div',
            { class: 'inview inview--first-load inview--title' },
            h('p', { class: 'h2 uppercase screen__eyebrow inview-word' }, content.eyebrow),
            h('h1', { class: 'h2-accent screen__title inview-word inview-word--accent' }, letters)
        ),
        h(
            'p',
            { class: 'screen__date body-text inview inview--first-load inview--opacity' },
            content.date
        ),
        h(
            'button',
            {
                class: 'ui-button screen__button inview inview--first-load inview--opacity',
                onClick,
            },
            'Далее'
        )
    );
};

export const buildHelpTitle: TScreenBuilder = (content) => {
    return h(
        'div',
        {},
        h('p', { class: 'text-accent' }, content.title),
        h('p', { class: 'body-text' }, content.eyebrow)
    );
};

export const buildRulesScreen: TScreenBuilder = (content, clickHandler) => {
    const onClick = () => {
        if (clickHandler) clickHandler();
    };

    return h(
        'div',
        { class: `screen screen--rules ${content.screenClass}` },
        h('h2', { class: 'h2 screen__title' }, 'Правила'),
        h('div', { class: 'screen__text-wrapper body-text' }, content.rules),
        h(
            'button',
            {
                class: 'ui-button screen__button',
                onClick,
            },
            'Играть!'
        )
    );
};

export const buildLoseScreen: TScreenBuilder = (content, clickHandler) => {
    const onClick = () => {
        if (clickHandler) clickHandler();
    };

    return h(
        'div',
        { class: `screen screen--lose ${content.screenClass}` },
        h('h2', { class: 'h2 screen__title' }, 'Проигрыш'),
        h(
            'p',
            { class: 'screen__text-wrapper body-text' },
            'К&nbsp;сожалению, не&nbsp;получилось угадать слово, попробуйте еще раз!'
        ),
        h(
            'button',
            {
                class: 'ui-button screen__button',
                onClick,
            },
            'Играть еще раз'
        )
    );
};

export const buildWinScreen: TScreenBuilder2 = (content, clickHandler1, clickHandler2) => {
    const onClick1 = () => {
        if (clickHandler1) clickHandler1();
    };

    const onClick2 = () => {
        if (clickHandler2) clickHandler2();
    };

    return h(
        'div',
        { class: `screen screen--win ${content.screenClass}` },
        h('h2', { class: 'h2 screen__title' }, 'Поздравляем!'),
        h(
            'div',
            { class: 'screen__text-wrapper body-text' },
            'Еще один шаг к&nbsp;новогоднему чуду сделан!'
        ),
        h(
            'div',
            { class: 'screen__buttons-wrapper' },
            h(
                'button',
                {
                    class: 'ui-button screen__button screen__button--red',
                    onClick: onClick1,
                },
                'Сохранить результат'
            ),
            h(
                'button',
                {
                    class: 'ui-button screen__button',
                    onClick: onClick2,
                },
                'Играть еще раз'
            )
        )
    );
};

export const buildWinAuthScreen: TScreenBuilder3 = (
    content,
    clickHandler,
    hideSaveResultsInfo = false
) => {
    const onClick = () => {
        if (clickHandler) clickHandler();
    };

    return h(
        'div',
        { class: `screen screen--win ${content.screenClass}` },
        h('h2', { class: 'h2 screen__title' }, 'Поздравляем!'),
        h(
            'div',
            { class: 'screen__text-wrapper body-text' },
            `<p>Еще один шаг к&nbsp;новогоднему чуду сделан!</p>${hideSaveResultsInfo ? '' : '<p>Результат о&nbsp;прохождения активности сохранен!</p>'}`
        ),
        h(
            'div',
            { class: 'screen__buttons-wrapper' },
            h(
                'button',
                {
                    class: 'ui-button screen__button',
                    onClick,
                },
                'Играть еще раз'
            )
        )
    );
};

export const buildGameScreen: TScreenBuilder = (content) => {
    return h('div', { class: `screen screen--game ${content.screenClass}`, id: 'game-container' });
};

export const buildTitleStopPhotoScreen: TScreenBuilder = (content) => {
    const letters = [];
    for (const letter of content.title) {
        letters.push(h('span', { class: 'inview-letter' }, letter));
    }

    return h(
        'div',
        {
            class: `screen screen--title ${content.screenClass}`,
        },
        h(
            'div',
            { class: 'inview inview--first-load inview--title' },
            h('p', { class: 'h2 uppercase screen__eyebrow inview-word' }, content.eyebrow),
            h('h1', { class: 'h2-accent screen__title inview-word inview-word--accent' }, letters)
        ),
        h(
            'p',
            { class: 'screen__date body-text inview inview--first-load inview--opacity' },
            content.date
        ),
        h(
            'p',
            {
                class: 'screen__stop-text body-text inview inview--first-load inview--opacity',
            },
            'Прием новогодних фотографий окончен, активность больше не&nbsp;доступна.'
        )
    );
};
