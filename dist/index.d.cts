type Socials = Record<string, {
    href?: string;
    src?: string;
    order?: number;
} | undefined>;
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
    fonts: Record<string, string>;
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
    dir?: "rtl" | "ltr";
    superHeader?: string;
    contentHeader: string;
    content: string;
    actions?: Action[];
}
interface LocalizedGenericEmail extends Partial<DefaultValues>, BaseEmail {
    superHeader?: string;
    locales: Array<{
        dir?: "rtl" | "ltr";
        contentHeader: string;
        content: string;
        actions?: Action[];
    }>;
    actions?: Action[];
}
/**
 *  @throws {import("mjml-core").MJMLParseError[]}
 */
declare const genericEmail: (input: GenericEmail) => string;
/**
 *  @throws {import("mjml-core").MJMLParseError[]}
 */
declare const localizedGenericEmail: (input: LocalizedGenericEmail) => string;

export { type Action, type BaseEmail, type GenericEmail, type LocalizedGenericEmail, defaultValues, genericEmail, localizedGenericEmail };
