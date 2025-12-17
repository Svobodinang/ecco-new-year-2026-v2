import { Form } from '@/scripts/form';
import { IContent } from '../game-common/screens';
import { useScreenManager } from '../game-common/screen-manager';
import { Game5lettersController } from './game/controller';
import { useBurgerMenu } from '@/scripts/useBurgerMenu';

const content: IContent = {
    screenClass: 'screen--5-letters',
    title: '5 букв',
    date: 'Дата открытия: 21&nbsp;декабря 2025',
    eyebrow: 'Активность №2',
    rules: '<p>Сегодня вам предстоит угадать слово в&nbsp;игре &laquo;5&nbsp;букв&raquo;.</p> <p>Разгадайте по&nbsp;буквам загаданное существительное из&nbsp;пяти букв. Используйте шесть попыток и&nbsp;внимательно смотрите на&nbsp;подсказки цветом:</p> <ul> <li><span class="color color--green"><span>Зеленый цвет</span></span> обозначает буквы, которые угаданы и&nbsp;стоят на&nbsp;своих местах.</li> <li><span class="color color--orange"><span>Оранжевый</span></span>&nbsp;&mdash; буквы есть в&nbsp;слове, но&nbsp;находятся в&nbsp;другом месте.</li> <li><span class="color color--gray"><span>Серый</span></span>&nbsp;&mdash; буквы отсутствуют в&nbsp;загаданном слове.</li> </ul> <p>Всего 5&nbsp;букв отделяют вас от&nbsp;второго шага к&nbsp;призам!</p>',
};

const init = () => {
    const cleanupList: (() => void)[] = [];
    const gameKey = 'ecco_5-letters';

    const form = new Form();
    cleanupList.push(() => form.cleanup());

    window.addEventListener('DOMContentLoaded', () => {
        cleanupList.push(useBurgerMenu());

        cleanupList.push(
            useScreenManager({
                form,
                gameKey,
                GameControllerClass: Game5lettersController,
                content,
            })
        );
    });

    window.addEventListener('beforeunload', () => {
        cleanupList.forEach((cleanup) => cleanup());
    });
};

init();
