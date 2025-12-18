import { append, h } from '@/scripts/core/dom';
import { Form, screenNames } from '@/scripts/form';
import { currentProjectStatus, projectStatuses } from '@/scripts/games';

export const useCallToAction = (form: Form): (() => void) => {
    let callToActionBlock: HTMLElement | null = null;

    const container = document.getElementById('mainPageCards');
    if (!container) {
        console.error('useCallToAction | container has not defined');

        return () => {};
    }

    const toOpenForm = () => {
        form.showScreen({ screenName: screenNames.FORM, onAuth: removeCallToAction });
    };

    if (!form.isAuth && currentProjectStatus === projectStatuses.IN_PROGRESS) {
        callToActionBlock = h(
            'div',
            { class: 'call-to-action-block' },
            h(
                'p',
                { class: 'call-to-action-block__text body-text' },
                'Чтобы результаты засчитались, а&nbsp;шансы на&nbsp;победу стали максимальными, пожалуйста авторизуйтесь. Укажите свое имя, фамилию и&nbsp;подразделение.'
            ),
            h(
                'button',
                { class: 'call-to-action-block__button ui-button', onClick: toOpenForm },
                'Учитывать результаты'
            )
        );

        append(container, callToActionBlock);
    }

    const removeCallToAction = () => {
        callToActionBlock?.remove();
    };

    return () => {};
};
