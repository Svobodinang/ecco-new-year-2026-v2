import { Form } from '@/scripts/form';
import { IContent } from '../game-common/screens';
import { useScreenManager } from '../game-common/screen-manager';
import { PhotoWidget } from './photoWidget';
import { useBurgerMenu } from '@/scripts/useBurgerMenu';

const content: IContent = {
    screenClass: 'screen--game-photo',
    title: 'Новогодняя фотография',
    date: 'Дата открытия: 23 декабря 2025',
    eyebrow: 'Активность №4',
    rules: '<p>Поделитесь своим праздничным настроением&nbsp;&mdash; загрузите свою новогоднюю фотографию.</p> <p>Она станет частью большого корпоративного новогоднего коллажа.</p>',
};

const init = () => {
    const cleanupList: (() => void)[] = [];
    const gameKey = 'ecco_photo-widget';

    const form = new Form();
    cleanupList.push(() => form.cleanup());

    window.addEventListener('DOMContentLoaded', () => {
        cleanupList.push(useBurgerMenu());

        cleanupList.push(
            useScreenManager({
                form,
                gameKey,
                GameControllerClass: PhotoWidget,
                content,
            })
        );
    });

    window.addEventListener('beforeunload', () => {
        cleanupList.forEach((cleanup) => cleanup());
    });
};

init();
