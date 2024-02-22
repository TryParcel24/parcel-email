type Socials = Record<string, {
    href?: string;
    src?: string;
    order?: number;
} | undefined>;
interface Colors {
    primary: string;
    secondary: string;
    contentBackground: string;
    actionsFontColor: string;
    footerBackground: string;
}
interface Action {
    label: string;
    url: string;
}
declare class GenericEmailGenerator {
    readonly defaultValues: {
        readonly font: readonly ["exo 2", "https://fonts.googleapis.com/css2?family=Exo+2"];
    };
    socials: Socials;
    colors: Colors;
    font: [fontName: string, googleFontsLink: string] | readonly [fontName: string, googleFontsLink: string];
    logo: {
        image: string;
        href?: string;
    };
    address?: string;
    constructor(params: {
        socials: GenericEmailGenerator["socials"];
        colors: GenericEmailGenerator["colors"];
        /**
         * as `[ "font name": "https://fonts.googleapis.com/css2?family=font+name" ]`
         */
        fonts?: GenericEmailGenerator["font"];
        logo: GenericEmailGenerator["logo"];
        address?: GenericEmailGenerator["address"];
    });
    /**
     *  @throws {import("mjml-core").MJMLParseError[]}
     */
    render(input: {
        preview?: string;
        superHeader?: string;
        locales: Array<{
            dir?: "rtl" | "ltr";
            contentHeader: string;
            content: string;
            actions?: Action[];
        }>;
        actions?: Action[];
    }): string;
}

export { type Action, GenericEmailGenerator };
