import { append, h } from '@/scripts/core/dom';

interface IGame {
    date: string;
    to: string;
}

const games: IGame[] = [
    {
        date: '2025-12-16',
        to: './game-puzzle',
    },
    {
        date: '2025-12-16',
        to: './photo',
    },
    {
        date: '2025-12-16',
        to: './game-five-letters',
    },
    {
        date: '2025-12-16',
        to: './game-memory',
    },
    {
        date: '2025-12-16',
        to: './letter',
    },
];

export const useGameNavigation = (): (() => void) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    games.forEach((game, index) => {
        const container = document.getElementById(`gameNav${index + 1}`);
        if (!container) {
            console.error('useGameNavigation | container has not defined');

            return () => {};
        }

        const openDate = new Date(game.date);
        openDate.setHours(0, 0, 0, 0);

        if (today >= openDate) {
            container.classList.add('open');

            const link = h('a', {
                href: game.to,
                class: 'interactive-illustration-game__link',
                onMouseOver: () => onMouseOver(container),
                onMouseOut: () => onMouseOut(container),
                onClick: () => onMouseOver(container),
            });
            append(container, link);
        }
    });

    const onMouseOver = (container: HTMLElement) => {
        if (!container) return;

        if (!container.classList.contains('hover')) container.classList.add('hover');
    };

    const onMouseOut = (container: HTMLElement) => {
        if (!container) return;

        if (container.classList.contains('hover')) container.classList.remove('hover');
    };

    return () => {};
};
