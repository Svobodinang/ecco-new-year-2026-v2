import '@/styles/main.scss';
import '@/utils/initViewportUnits';
import { useBurgerMenu } from '../../useBurgerMenu';
import { useInview } from '../../useInview';
import { currentProjectStatus, projectStatuses } from '@/scripts/games';
import { useResults } from '../../useResults';

const init = () => {
    const cleanupList: (() => void)[] = [];

    window.addEventListener('DOMContentLoaded', () => {
        if (currentProjectStatus === projectStatuses.ENDED) {
            useResults();
        }

        cleanupList.push(useBurgerMenu());
        cleanupList.push(useInview());
    });

    window.addEventListener('beforeunload', () => {
        cleanupList.forEach((cleanup) => cleanup());
    });
};

init();
