import mjmlCore from "mjml";
import { type MJMLJsonObject } from "mjml-core";

type Socials = Record<
  string,
  { href?: string; src?: string; order?: number } | undefined
>;

interface Colors {
  primary: string;
  secondary: string;

  contentBackground: string;
  actionsFontColor: string;
  footerBackground: string;
}

export interface Action {
  label: string;
  url: string;
}

// GENERICS
const divider: MJMLJsonObject = {
  tagName: "mj-section",
  attributes: { padding: "0px" },
  children: [
    {
      tagName: "mj-column",
      attributes: {},
      children: [
        {
          tagName: "mj-divider",
          attributes: {
            "border-color": "#09273d",
            width: "100%",
            padding: "0px",
          },
        },
      ],
    },
  ],
};

const spacer: MJMLJsonObject = {
  tagName: "mj-section",
  attributes: { padding: "10px" },
};

export class GenericEmailGenerator {
  readonly defaultValues = {
    font: ["exo 2", "https://fonts.googleapis.com/css2?family=Exo+2"],
  } as const;

  socials: Socials;
  colors: Colors;
  font:
    | [fontName: string, googleFontsLink: string]
    | readonly [fontName: string, googleFontsLink: string];

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
  }) {
    this.address = params.address;
    this.colors = params.colors;

    this.socials = params.socials ?? {};
    this.logo = params.logo;

    this.font = params.fonts ?? this.defaultValues.font;
  }

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
  }): string {
    // -- HEADER SECTION START --
    const headerSection: MJMLJsonObject = {
      tagName: "mj-section",
      attributes: { "background-color": this.colors.primary },
      children: [
        {
          tagName: "mj-column",
          attributes: {},
          children: [
            {
              tagName: "mj-image",
              attributes: {
                src: this.logo?.image,
                alt: "logo",
                width: "200px",
                href: this.logo?.href,
              },
            },
          ],
        },
      ],
    };

    if (input.superHeader != null) {
      headerSection.children.push({
        tagName: "mj-column",
        attributes: { width: "600px" },
        children: [
          {
            tagName: "mj-text",
            attributes: {
              color: this.colors.secondary,
              "font-weight": "900",
              "font-size": "35px",
              "padding-bottom": "0px",
              "padding-top": "0px",
            },
            content: input.superHeader,
          },
        ],
      });
    }
    // -- HEADER SECTION END --
    const contents: MJMLJsonObject[] = [];
    // -- CONTENT START --
    for (const locale of input.locales) {
      contents.push({
        tagName: "mj-column",
        attributes: { width: "100%" },
        children: [
          {
            tagName: "mj-text",
            attributes: {
              color: this.colors.secondary,
              "font-weight": "bold",
              "font-size": "22px",
              align: locale.dir === "rtl" ? "right" : "left",
            },
            content: `<div dir="${locale.dir ?? "ltr"}">${
              locale.contentHeader
            }</div>`,
          },
          {
            tagName: "mj-text",
            attributes: {
              "font-size": "16px",
              color: this.colors.secondary,
              align: locale.dir === "rtl" ? "right" : "left",
              "line-height": "1.4",
            },
            children: [],
            content: `<div dir="${locale.dir ?? "ltr"}">${locale.content}</div>`,
          },
        ],
      });

      const contentActions: MJMLJsonObject[] =
        locale.actions?.map((action) => ({
          tagName: "mj-column",
          attributes: {},
          children: [
            {
              tagName: "mj-button",
              attributes: {
                padding: "10px 0px 0px 0px",
                "inner-padding": "10px 30px",
                "border-radius": "5px",
                "font-size": "16px",
                "background-color": this.colors.primary,
                color: this.colors.actionsFontColor,
                "font-weight": "bold",
                href: action.url,
                target: "_blank",
              },
              content: action.label,
            },
          ],
        })) ?? [];

      contents.push({
        tagName: "mj-group",
        attributes: { width: "100%", direction: locale.dir },
        children: contentActions,
      });

      contents.push(spacer);
    }

    const contentActions: MJMLJsonObject[] =
      input.actions?.map((action) => ({
        tagName: "mj-column",
        attributes: {},
        children: [
          {
            tagName: "mj-button",
            attributes: {
              padding: "10px 0px 0px 0px",
              "inner-padding": "10px 30px",
              "border-radius": "5px",
              "font-size": "16px",
              "background-color": this.colors.primary,
              color: this.colors.actionsFontColor,
              "font-weight": "bold",
              href: action.url,
              target: "_blank",
            },
            content: action.label,
          },
        ],
      })) ?? [];

    const contentActionsContainer: MJMLJsonObject = {
      tagName: "mj-group",
      attributes: { width: "100%" },
      children: contentActions,
    };

    const content: MJMLJsonObject = {
      tagName: "mj-section",
      attributes: { "background-color": this.colors.contentBackground },
      children: contents.concat([contentActionsContainer]),
    };
    // -- CONTENT END --
    // -- FOOTER START --
    const footer: MJMLJsonObject = {
      tagName: "mj-column",
      attributes: {},
      children: [],
    };
    const socialElements = Object.entries(this.socials)
      .filter(([, value]) => value)
      .sort(([, a], [, b]) => {
        if (typeof a?.order === "number" && typeof b?.order === "number")
          return a.order - b.order;
        if (typeof a?.order === "number") return 1;
        if (typeof b?.order === "number") return -1;
        return 1;
      })
      .map(
        ([name, value]): MJMLJsonObject => ({
          tagName: "mj-social-element",
          attributes: {
            name,
            ...value,
            padding: "3px 5px",
            "icon-size": "25px",
            "border-radius": "99px",
            target: "_blank",
          },
        }),
      );

    if (socialElements.length > 0) {
      footer.children.push({
        tagName: "mj-social",
        attributes: {
          "font-size": "12px",
          "icon-size": "20px",
          mode: "horizontal",
        },
        children: socialElements,
      });
    }

    if (this.address != null) {
      footer.children.push({
        tagName: "mj-text",
        attributes: { align: "center", "font-size": "10px" },
        content: this.address,
      });
    }

    const footerSection: MJMLJsonObject = {
      tagName: "mj-section",
      attributes: {
        padding: "2px",
        "background-color": this.colors.footerBackground,
      },
      children: [footer],
    };
    // -- FOOTER END --
    //
    const body: MJMLJsonObject[] = [];

    if (headerSection.children.length > 0) {
      body.push(headerSection);
    }
    if (content.children.length > 0) {
      body.push(divider);
      body.push(content);
    }
    if (footer.children.length > 0) {
      body.push(divider);
      body.push(footerSection);
    }

    body.push(divider);

    // HEAD
    const head: MJMLJsonObject[] = [
      ...Object.entries(this.font).map(
        ([name, href]): MJMLJsonObject => ({
          tagName: "mj-font",
          attributes: { name, href },
        }),
      ),
      {
        tagName: "mj-attributes",
        attributes: {},
        children: [
          {
            tagName: "mj-all",
            attributes: {
              "font-family": `${this.font[0].includes(" ") ? `'${this.font[0]}'` : this.font[0]}, sans-serif;`,
              color: this.colors.secondary,
            },
          },
        ],
      },
      {
        tagName: "mj-raw",
        attributes: {},
        content: `
      <meta name="color-scheme" content="dark" />
      <meta name="supported-color-schemes" content="dark" />
      `,
      },
    ];
    if (input.preview != null) {
      head.push({
        tagName: "mj-preview",
        attributes: {},
        content: input.preview,
      });
    }
    // full
    const json: MJMLJsonObject = {
      tagName: "mjml",
      attributes: {},
      children: [
        {
          tagName: "mj-head",
          attributes: {},
          children: head,
        },
        {
          tagName: "mj-body",
          attributes: { "background-color": this.colors.secondary },
          children: body,
        },
      ],
    };

    const mjml = mjmlCore(json, {
      fonts: {
        [this.font[0]]: this.font[1],
      },
      validationLevel: "skip",
    });

    if (mjml.errors.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw mjml.errors;
    }

    return mjml.html;
  }
}
