export type ThemeName = 'white' | 'blue';

export interface ThemeColors {
    primary: string,
    secondary: string,
    background: string,
    third: string,
    ind_good: string,
    ind_neutral: string,
    ind_bad: string,
    streak: string,
    shadow: string,
    interface: string,
    gold: string,
    silver: string,
    bronze: string,
}

export const themes: Record<ThemeName, ThemeColors> = {
    white: {
        gold: "#EAB308",
        silver: "#6B7280",
        bronze: "#F97316",
        primary: '#4C4C4C',
        secondary: '#9DB2CE80',
        background: '#f2f2f2',
        third: '#A8D5F2',
        ind_good: '#59CB09',
        ind_neutral: '#22AFF6',
        ind_bad: '#CD81FF',
        streak: '#FF9500',
        shadow: "0px 1px 0px 2px #E4E4E4",
        interface: "#9d9d9dff"
    },
    blue: {
        gold: "#EAB308",
        silver: "#6B7280",
        bronze: "#F97316",
        primary: '#657D9E',
        secondary: '#9DB2CE80',
        background: '#CFDCED',
        third: '#7CCDFC',
        ind_good: '#5C8DFF',
        ind_neutral: '#5A4FCF',
        ind_bad: '#5846A8',
        streak: '#5C8DFF',
        shadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        interface: "#5C8DFF"
    },
};