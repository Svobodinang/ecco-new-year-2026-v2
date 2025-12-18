import '@/styles/main.scss';
import '@/utils/initViewportUnits';
import { Form } from '@/scripts/form';
import { useCallToAction } from './useCallToAction';
import { useGameNavigation } from './useGameNavigation';
import { useBurgerMenu } from '../../useBurgerMenu';
import { useInview } from '../../useInview';
import { currentProjectStatus, projectStatuses } from '@/scripts/games';
import { useResults } from '../../useResults';

const init = () => {
    const cleanupList: (() => void)[] = [];

    const form = new Form();
    cleanupList.push(() => form.cleanup());

    window.addEventListener('DOMContentLoaded', () => {
        if (currentProjectStatus === projectStatuses.ENDED) {
            useResults();
        }

        cleanupList.push(useCallToAction(form));
        cleanupList.push(useGameNavigation());
        cleanupList.push(useBurgerMenu());
        cleanupList.push(useInview());
    });

    window.addEventListener('beforeunload', () => {
        cleanupList.forEach((cleanup) => cleanup());
    });
};

init();
