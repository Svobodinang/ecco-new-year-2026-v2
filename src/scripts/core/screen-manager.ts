import { mount, unmount } from './dom';

export type TScreenName = string;
export type TScreenBuilder = () => {
    newNode: HTMLElement;
    onMount?: () => void;
};

export type TScreensMap = Record<TScreenName, TScreenBuilder>;

export interface ITScreenManager {
    showScreen: (name: TScreenName) => void;
    hideScreens: () => void;
}

/**
 * Менеджер экранов с fade-переходами
 * Контейнер должен иметь класс .with-fade, если нужна анимация
 */
export function createScreenManager(container: HTMLElement, screens: TScreensMap): ITScreenManager {
    const hasFade = container.classList.contains('with-fade');

    const showScreen = (name: TScreenName): void => {
        const builder = screens[name];
        if (!builder) {
            console.warn(`[ITScreenManager] Screen "${name}" not found`);

            return;
        }

        const { newNode, onMount } = builder();

        if (!hasFade) {
            mount(container, newNode);

            if (typeof onMount === 'function') {
                requestAnimationFrame(() => {
                    onMount();
                });
            }

            return;
        }

        container.classList.add('fade-out');
        container.classList.add('show');

        const onFadeOutEnd = (event: AnimationEvent) => {
            if (event.target !== container) return;
            container.removeEventListener('animationend', onFadeOutEnd);

            mount(container, newNode);

            if (typeof onMount === 'function') {
                requestAnimationFrame(() => {
                    onMount();
                });
            }

            container.classList.remove('fade-out');
            container.classList.add('fade-in');

            const onFadeInEnd = (eventIn: AnimationEvent) => {
                if (eventIn.target !== container) return;
                container.removeEventListener('animationend', onFadeInEnd);
                container.classList.remove('fade-in');
            };

            container.addEventListener('animationend', onFadeInEnd);
        };

        container.addEventListener('animationend', onFadeOutEnd);
    };

    const hideScreens = () => {
        container.classList.remove('show');
        unmount(container);
    };

    return { showScreen, hideScreens };
}
