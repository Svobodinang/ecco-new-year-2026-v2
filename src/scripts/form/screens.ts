import { h } from '../core/dom';
import crossIcon from '/images/icons/cross.svg';
import { cookieKeys } from '../core/cookie';

type TScreenBuilder = (clickHandler: () => void) => HTMLElement;

const commonClass = 'form-layout';

export const buildFormLayout: TScreenBuilder = (clickHandler) => {
    const onClick = () => {
        if (clickHandler) clickHandler();
    };

    return h(
        'div',
        { class: `${commonClass}` },
        h('div', { class: `${commonClass}__background with-fade`, onClick }),
        h(
            'div',
            { class: `${commonClass}__container` },
            h(
                'button',
                { onClick, class: `${commonClass}__cross-button` },
                h('img', { src: crossIcon })
            ),
            h('div', { id: 'form-layout' })
        )
    );
};

export const buildCall: TScreenBuilder = (clickHandler) => {
    const onClick = () => {
        if (clickHandler) clickHandler();
    };

    return h(
        'div',
        { class: `${commonClass}__content` },
        h(
            'p',
            { class: `${commonClass}__text body-text` },
            'Чтобы результаты учитывались для розыгрыша призов, пожалуйста, авторизуйтесь'
        ),
        h('button', { class: 'ui-button ui-button--red', onClick }, 'Учитывать результаты!')
    );
};

export const buildForm: TScreenBuilder = (clickHandler) => {
    const onClick = (event: Event) => {
        event.preventDefault();

        if (clickHandler) clickHandler();
    };

    return h(
        'form',
        { class: `${commonClass}__content`, onSubmit: onClick, id: 'form' },
        h('input', {
            type: 'text',
            id: cookieKeys.SURNAME,
            name: cookieKeys.SURNAME,
            placeholder: 'Фамилия',
            required: true,
            autocomplete: 'family-name',
            class: 'input body-text',
        }),
        h('input', {
            type: 'text',
            id: cookieKeys.NAME,
            name: cookieKeys.NAME,
            placeholder: 'Имя',
            required: true,
            autocomplete: 'given-name',
            class: 'input body-text',
        }),
        h(
            'select',
            {
                id: cookieKeys.DEPARTMENT,
                name: cookieKeys.DEPARTMENT,
                placeholder: 'Имя',
                required: true,
                class: 'input body-text',
            },
            h('option', { value: 'office' }, 'Офис'),
            h('option', { value: 'shop' }, 'Розница'),
            h('option', { value: 'warehouse' }, 'Склад')
        ),
        h(
            'label',
            { class: 'checkbox-wrapper' },
            h('input', { type: 'checkbox', required: true, id: 'checkbox', name: 'checkbox' }),
            h('span', { class: 'checkbox-wrapper__checkmark' }),
            h(
                'span',
                { class: 'label-small checkbox-wrapper__text' },
                'Я&nbsp;соглашаюсь с&nbsp;<a href="https://www.ecco.ru/cart/rules/" target="_blank">условиями оферты</a> и&nbsp;даю согласие на&nbsp;<a href="https://www.ecco.ru/buyers/privacy-policy/" target="_blank">обработку своих персональных данных</a>*'
            )
        ),
        h('input', { type: 'submit', class: 'ui-button ui-button--red', value: 'Сохранить' })
    );
};

export const buildSuccess: TScreenBuilder = (clickHandler) => {
    const onClick = () => {
        if (clickHandler) clickHandler();
    };

    return h(
        'div',
        { class: `${commonClass}__content` },
        h(
            'p',
            { class: `${commonClass}__text body-text` },
            'Вы&nbsp;авторизовались!</br>Теперь результаты прохождения активностей учитываются для розыгрыша призов!'
        ),
        h('button', { class: 'ui-button ui-button--red', onClick }, 'Ок')
    );
};
