export const cookieKeys = {
    NAME: 'ecco_name',
    SURNAME: 'ecco_surname',
    DEPARTMENT: 'ecco_department',
    PROGRESS: 'ecco_pregress',
} as const;

export const setCookie = (name: string, value: string, days: number = 365): void => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/;`;
};

export const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));

    return match ? decodeURIComponent(match[1]) : null;
};
