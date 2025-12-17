import { Form } from '@/scripts/form';
import { IContent } from '../game-common/screens';
import { useScreenManager } from '../game-common/screen-manager';
import { LetterWidget } from './letterWidget';
import { useBurgerMenu } from '@/scripts/useBurgerMenu';

const content: IContent = {
    screenClass: 'screen--game-letter',
    title: 'Поздравление коллеге',
    date: 'Дата открытия: 25 декабря 2025',
    eyebrow: 'Активность №5',
    rules: '<p>Делитесь праздничным настроением и&nbsp;отправляйте поздравления коллегам!</p> <p>Заполните форму и&nbsp;ваш коллега получит на&nbsp;электронную почту* тематическую открытку и&nbsp;одно из&nbsp;300 уникальных тематических поздравлений.</p> <p>Количество отправок не&nbsp;ограничено!</p> <p class="label-small">*на&nbsp;корпоративную или, при ее&nbsp;отсутствии, на&nbsp;ту, что была указана при регистрации в&nbsp;ECCO Club, директора магазинов получат поздравления на&nbsp;почту магазина</p>',
};

const init = () => {
    const cleanupList: (() => void)[] = [];
    const gameKey = 'ecco_letter-widget';

    const form = new Form();
    cleanupList.push(() => form.cleanup());

    window.addEventListener('DOMContentLoaded', () => {
        cleanupList.push(useBurgerMenu());

        cleanupList.push(
            useScreenManager({
                form,
                gameKey,
                GameControllerClass: LetterWidget,
                content,
            })
        );
    });

    window.addEventListener('beforeunload', () => {
        cleanupList.forEach((cleanup) => cleanup());
    });
};

init();
