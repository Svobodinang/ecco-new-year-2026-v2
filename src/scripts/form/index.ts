import { cookieKeys, getCookie, setCookie } from '../core/cookie';
import { createScreenManager, ITScreenManager, TScreensMap } from '../core/screen-manager';
import { buildCall, buildForm, buildFormLayout, buildSuccess } from './screens';

export const screenNames = {
    CALL: 'call',
    FORM: 'form',
    SUCCESS: 'success',
} as const;

export class Form {
    isAuth: boolean = false;
    private formManager?: ITScreenManager;
    private screenManager?: ITScreenManager;
    private isOpenLayout: boolean = false;
    private currentScreenName: string | null = null;
    private form: HTMLFormElement | null = null;
    private onCloseFunction: (() => void) | null = null;
    private onAuthFunction: (() => void) | null = null;

    constructor() {
        this.createForm();
        this.checkAuth();
    }

    private createForm() {
        const container: HTMLElement | null = document.getElementById('form-container');

        if (!container) return;

        const screens: TScreensMap = {
            formLayout: () => {
                return {
                    newNode: buildFormLayout(this.close.bind(this)),
                    onMount: () => this.buildScreens(),
                };
            },
        };

        this.formManager = createScreenManager(container, screens);
    }

    private buildScreens() {
        const container: HTMLElement | null = document.getElementById('form-layout');

        if (!container) return;

        const screens: TScreensMap = {
            [screenNames.CALL]: () => {
                return {
                    newNode: buildCall(() => this.showScreen({ screenName: screenNames.FORM })),
                };
            },
            [screenNames.FORM]: () => {
                return {
                    newNode: buildForm(() => this.handleSendForm()),
                    onMount: () => this.initFormData(),
                };
            },
            [screenNames.SUCCESS]: () => {
                return {
                    newNode: buildSuccess(() => this.close()),
                };
            },
        };

        this.screenManager = createScreenManager(container, screens);

        if (this.currentScreenName) this.screenManager.showScreen(this.currentScreenName);
    }

    showScreen({
        screenName,
        onClose,
        onAuth,
    }: {
        screenName: string;
        onClose?: () => void;
        onAuth?: () => void;
    }) {
        if (!this.isOpenLayout) {
            this.formManager?.showScreen('formLayout');
            this.isOpenLayout = true;
        } else {
            this.screenManager?.showScreen(screenName);
        }

        this.currentScreenName = screenName;
        if (onAuth) this.onAuthFunction = onAuth;
        if (onClose) this.onCloseFunction = onClose;
    }

    initFormData() {
        this.form = document.getElementById('form') as HTMLFormElement;
    }

    handleSendForm() {
        if (!this.form) {
            console.error('form has not defined');

            return;
        }

        if (!this.form.checkValidity()) {
            this.form.reportValidity();

            return;
        }

        const formData = new FormData(this.form);

        for (const [key, value] of formData.entries()) {
            if (typeof value !== 'string' || key === 'checkbox') break;

            setCookie(key, value);
        }

        this.isAuth = true;

        if (this.onAuthFunction) {
            this.onAuthFunction();
            this.onAuthFunction = null;
        }
        this.showScreen({ screenName: screenNames.SUCCESS });
    }

    checkAuth() {
        if (getCookie(cookieKeys.NAME)) this.isAuth = true;
    }

    close() {
        this.formManager?.hideScreens();
        this.isOpenLayout = false;

        if (this.onCloseFunction) {
            this.onCloseFunction();
            this.onCloseFunction = null;
        }
    }

    cleanup() {
        console.log('cleanup');
    }
}
