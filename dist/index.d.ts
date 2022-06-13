interface Socials {
    [key: string]: {
        href?: string;
        src?: string;
        order?: number;
    } | undefined;
}
interface Colors {
    background: string;
    superHeaderBackground: string;
    superHeaderFontColor: string;
    contentHeaderFontColor: string;
    contentBackground: string;
    contentFontColor: string;
    fontColor: string;
    actionsBackgroundColor: string;
    actionsFontColor: string;
    footerBackground: string;
}
interface DefaultValues {
    address?: string;
    socials: Socials;
    colors: Colors;
    fonts: {
        [key: string]: string;
    };
}
export declare const defaultValues: DefaultValues;
export interface Action {
    label: string;
    url: string;
}
export interface GenericEmail extends Partial<DefaultValues> {
    superHeader?: string;
    content: string;
    contentHeader: string;
    actions?: Action[];
}
export declare const genericEmail: (input: GenericEmail) => string;
export {};
//# sourceMappingURL=index.d.ts.map