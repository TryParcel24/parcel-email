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
declare const defaultValues: DefaultValues;
interface Action {
    label: string;
    url: string;
}
interface BaseEmail {
    preview?: string;
}
interface GenericEmail extends Partial<DefaultValues>, BaseEmail {
    superHeader?: string;
    contentHeader: string;
    content: string;
    actions?: Action[];
}
interface LocalizedGenericEmail extends Partial<DefaultValues>, BaseEmail {
    superHeader?: string;
    locales: Array<{
        contentHeader: string;
        content: string;
        actions?: Action[];
    }>;
    actions?: Action[];
}
declare const genericEmail: (input: GenericEmail) => string;
declare const localizedGenericEmail: (input: LocalizedGenericEmail) => string;

export { Action, BaseEmail, GenericEmail, LocalizedGenericEmail, defaultValues, genericEmail, localizedGenericEmail };
