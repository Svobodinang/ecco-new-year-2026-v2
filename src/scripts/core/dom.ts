export type TDomChild = Node | string | number | boolean | null | undefined;
export type TDomChildren = TDomChild | TDomChild[];

type TEventHandler = (event: Event) => void;

export type TDomProps = {
    class?: string;
    className?: string;
    dataset?: Record<string, string>;
    style?: Partial<CSSStyleDeclaration>;
    [key: string]: unknown;
};

/**
 * Создание элемента:
 * h('button', { class: 'btn', onClick: handler }, 'Текст')
 */
export function h<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    props: TDomProps = {},
    ...children: TDomChildren[]
): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag);

    for (const [key, value] of Object.entries(props)) {
        if (value == null) continue;

        if (key === 'class' || key === 'className') {
            el.className = String(value as string);
            continue;
        }

        if (key === 'dataset' && typeof value === 'object') {
            Object.entries(value as Record<string, string>).forEach(([k, v]) => {
                el.dataset[k] = v;
            });
            continue;
        }

        if (key === 'style' && typeof value === 'object') {
            Object.assign(el.style, value);
            continue;
        }

        // onClick, onInput и т.п.
        if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.slice(2).toLowerCase();
            el.addEventListener(eventName, value as TEventHandler);
            continue;
        }

        // всё остальное — атрибуты
        el.setAttribute(key, String(value as string));
    }

    const append = (child: TDomChildren) => {
        if (child == null || child === false) return;

        if (Array.isArray(child)) {
            child.forEach(append);
        } else if (child instanceof Node) {
            el.appendChild(child);
        } else {
            el.innerHTML = `${child}`;
        }
    };

    children.forEach(append);

    return el;
}

/**
 * Полная замена содержимого контейнера
 */
export function mount(container: HTMLElement, node: Node | null): void {
    container.innerHTML = '';
    if (node) container.appendChild(node);
}

export function unmount(container: HTMLElement): void {
    container.innerHTML = '';
}

export function append(container: HTMLElement, child: HTMLElement) {
    container.appendChild(child);
}
