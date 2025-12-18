import { IContent } from '../game-common/screens';
import { useScreenManager } from '../game-common/screen-manager';
import { Game5lettersController } from './game/controller';
import { useBurgerMenu } from '@/scripts/useBurgerMenu';
import { gameIds, games } from '@/scripts/games';

const curentGameIndex = games.findIndex((game) => game.id === gameIds.GAME_FIVE_LETTERS);
const curentGame = games[curentGameIndex];

const content: IContent = {
    screenClass: `screen--${curentGame.id}`,
    title: '5 букв',
    date: curentGame.dateText,
    eyebrow: `Активность №${curentGameIndex + 1}`,
    rules: '<p>Сегодня вам предстоит угадать слово в&nbsp;игре &laquo;5&nbsp;букв&raquo;.</p> <p>Разгадайте по&nbsp;буквам загаданное существительное из&nbsp;пяти букв. Используйте шесть попыток и&nbsp;внимательно смотрите на&nbsp;подсказки цветом:</p> <ul> <li><span class="color color--green"><span>Зеленый цвет</span></span> обозначает буквы, которые угаданы и&nbsp;стоят на&nbsp;своих местах.</li> <li><span class="color color--orange"><span>Оранжевый</span></span>&nbsp;&mdash; буквы есть в&nbsp;слове, но&nbsp;находятся в&nbsp;другом месте.</li> <li><span class="color color--gray"><span>Серый</span></span>&nbsp;&mdash; буквы отсутствуют в&nbsp;загаданном слове.</li> </ul> <p>Всего 5&nbsp;букв отделяют вас от&nbsp;второго шага к&nbsp;призам!</p>',
};

const init = () => {
    const cleanupList: (() => void)[] = [];
    const gameKey = `ecco_${curentGame.id}`;

    window.addEventListener('DOMContentLoaded', () => {
        cleanupList.push(useBurgerMenu());

        cleanupList.push(
            useScreenManager({
                gameKey,
                GameControllerClass: Game5lettersController,
                content,
                game: curentGame,
            })
        );
    });

    window.addEventListener('beforeunload', () => {
        cleanupList.forEach((cleanup) => cleanup());
    });
};

init();
