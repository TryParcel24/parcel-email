import mjmlCore from "mjml";
import { MJMLJsonObject } from "mjml-core";

interface Socials {
  [key: string]: { href?: string; src?: string; order?: number } | undefined;
}

interface Colors {
  background: string;
  superHeaderBackground: string;
  superHeaderFontColor: string;
  // contentHeaderBackground: string;
  contentHeaderFontColor: string;
  contentBackground: string;
  contentFontColor: string;
  fontColor: string;
  actionsBackgroundColor: string;
  actionsFontColor: string;
  footerBackground: string;
  // primaryActionFontColor: string;
  // primaryActionBackgroundColor: string;
}

interface DefaultValues {
  address?: string;
  socials: Socials;
  colors: Colors;
  fonts: { [key: string]: string };
}

export const defaultValues: DefaultValues = {
  socials: {},
  colors: {
    background: "#09273D",
    contentBackground: "#E5E7EB",
    // contentHeaderBackground: "#E5E7EB",
    contentFontColor: "#09273D",
    contentHeaderFontColor: "#09273D",
    superHeaderBackground: "#FED12C",
    superHeaderFontColor: "#09273D",
    fontColor: "#09273D",
    actionsBackgroundColor: "#fed12c",
    actionsFontColor: "",
    footerBackground: "#E5E7EB",
  },
  fonts: {
    "exo 2": "https://fonts.googleapis.com/css2?family=Exo+2",
  },
};

export interface Action {
  label: string;
  url: string;
}

export interface BaseEmail {
  preview?: string;
}

export interface GenericEmail extends Partial<DefaultValues>, BaseEmail {
  superHeader?: string;
  contentHeader: string;
  content: string;
  actions?: Action[];
}

export interface LocalizedGenericEmail
  extends Partial<DefaultValues>,
  BaseEmail {
  superHeader?: string;
  locales: Array<{
    contentHeader: string;
    content: string;
    actions?: Action[];
  }>;
  actions?: Action[];
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

export const genericEmail = (input: GenericEmail) => {
  const object: DefaultValues & GenericEmail = { ...defaultValues, ...input };
  Object.keys(object.colors)
    .filter((key) => key.includes("FontColor"))
    .forEach((_key) => {
      const key = _key as keyof typeof object.colors;
      if (!object.colors[key]) {
        object.colors[key] = object.colors.fontColor;
      }
    });

  // -- HEADER SECTION START --
  const headerSection: MJMLJsonObject = {
    tagName: "mj-section",
    attributes: { "background-color": object.colors.superHeaderBackground },
    children: [
      {
        tagName: "mj-column",
        attributes: {},
        children: [
          {
            tagName: "mj-image",
            attributes: {
              src: "https://parcel-media.s3.me-south-1.amazonaws.com/parcel_logo.png",
              alt: "logo",
              width: "200px",
              href: "https://tryparcel.com",
            },
          },
        ],
      },
    ],
  };

  if (object.superHeader)
    headerSection.children.push({
      tagName: "mj-column",
      attributes: { width: "600px" },
      children: [
        {
          tagName: "mj-text",
          attributes: {
            color: object.colors.superHeaderFontColor,
            "font-weight": "900",
            "font-size": "35px",
            "padding-bottom": "0px",
            "padding-top": "0px",
          },
          content: object.superHeader,
        },
      ],
    });
  // -- HEADER SECTION END --

  // -- CONTENT START --
  const contentHeader: MJMLJsonObject = {
    tagName: "mj-text",
    attributes: {
      color: object.colors.contentHeaderFontColor,
      "font-weight": "bold",
      "font-size": "22px",
    },
    children: [],
    content: object.contentHeader,
  };

  const contentBody: MJMLJsonObject = {
    tagName: "mj-text",
    attributes: {
      "font-size": "16px",
      color: object.colors.contentFontColor,
      align: "left",
      "line-height": "1.4",
    },
    children: [],
    content: object.content,
  };

  const contentActions: MJMLJsonObject[] =
    object.actions?.map((action) => ({
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
            "background-color": object.colors.actionsBackgroundColor,
            color: object.colors.actionsFontColor,
            "font-weight": "bold",
            href: action.url,
            target: "_blank",
          },
          content: action.label,
        },
      ],
    })) || [];

  const contentActionsContainer: MJMLJsonObject = {
    tagName: "mj-group",
    attributes: { width: "100%" },
    children: contentActions,
  };

  const content: MJMLJsonObject = {
    tagName: "mj-section",
    attributes: { "background-color": object.colors.contentBackground },
    children: [
      {
        tagName: "mj-column",
        attributes: { width: "100%" },
        children: [contentHeader, contentBody],
      },
      contentActionsContainer,
    ],
  };
  // -- CONTENT END --

  // -- FOOTER START --
  const footer: MJMLJsonObject = {
    tagName: "mj-column",
    attributes: {},
    children: [],
  };
  const socialElements = Object.entries(object.socials)
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
      })
    );

  if (socialElements.length)
    footer.children.push({
      tagName: "mj-social",
      attributes: {
        "font-size": "12px",
        "icon-size": "20px",
        mode: "horizontal",
      },
      children: socialElements,
    });

  if (object.address)
    footer.children.push({
      tagName: "mj-text",
      attributes: { align: "center", "font-size": "10px" },
      content: object.address,
    });

  const footerSection: MJMLJsonObject = {
    tagName: "mj-section",
    attributes: {
      padding: "2px",
      "background-color": object.colors.footerBackground,
    },
    children: [footer],
  };
  // -- FOOTER END --

  //
  const body: MJMLJsonObject[] = [];

  if (headerSection.children.length) {
    body.push(headerSection);
  }
  if (content.children.length) {
    body.push(divider);
    body.push(content);
  }
  if (footer.children.length) {
    body.push(divider);
    body.push(footerSection);
  }

  body.push(divider);

  // HEAD
  const head: MJMLJsonObject[] = [
    ...Object.entries(object.fonts).map(
      ([name, href]): MJMLJsonObject => ({
        tagName: "mj-font",
        attributes: { name, href },
      })
    ),
    {
      tagName: "mj-attributes",
      attributes: {},
      children: [
        {
          tagName: "mj-all",
          attributes: {
            "font-family": "'Exo 2', sans-serif;",
            color: object.colors.fontColor,
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
  if (input.preview)
    head.push({
      tagName: "mj-preview",
      attributes: {},
      content: input.preview,
    });
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
        attributes: { "background-color": object.colors.background },
        children: body,
      },
    ],
  };

  const mjml = mjmlCore(json, {
    fonts: object.fonts,
    validationLevel: "skip",
  });

  if (mjml.errors.length) throw mjml.errors;
  return mjml.html;
};

export const localizedGenericEmail = (input: LocalizedGenericEmail) => {
  const object: DefaultValues & typeof input = {
    ...defaultValues,
    ...input,
  };

  Object.keys(object.colors)
    .filter((key): key is keyof typeof object.colors =>
      key.includes("FontColor")
    )
    .forEach((key) => {
      if (!object.colors[key]) {
        object.colors[key] = object.colors.fontColor;
      }
    });

  // -- HEADER SECTION START --
  const headerSection: MJMLJsonObject = {
    tagName: "mj-section",
    attributes: { "background-color": object.colors.superHeaderBackground },
    children: [
      {
        tagName: "mj-column",
        attributes: {},
        children: [
          {
            tagName: "mj-image",
            attributes: {
              src: "https://parcel-media.s3.me-south-1.amazonaws.com/parcel_logo.png",
              alt: "logo",
              width: "200px",
              href: "https://tryparcel.com",
            },
          },
        ],
      },
    ],
  };

  if (object.superHeader) {
    headerSection.children.push({
      tagName: "mj-column",
      attributes: { width: "600px" },
      children: [
        {
          tagName: "mj-text",
          attributes: {
            color: object.colors.superHeaderFontColor,
            "font-weight": "900",
            "font-size": "35px",
            "padding-bottom": "0px",
            "padding-top": "0px",
          },
          content: object.superHeader,
        },
      ],
    });
  }
  // -- HEADER SECTION END --

  const contents: MJMLJsonObject[] = [];
  // -- CONTENT START --
  for (const locale of object.locales) {
    contents.push({
      tagName: "mj-column",
      attributes: { width: "100%" },
      children: [
        {
          tagName: "mj-text",
          attributes: {
            color: object.colors.contentHeaderFontColor,
            "font-weight": "bold",
            "font-size": "22px",
          },
          children: [],
          content: locale.contentHeader,
        },
        {
          tagName: "mj-text",
          attributes: {
            "font-size": "16px",
            color: object.colors.contentFontColor,
            align: "left",
            "line-height": "1.4",
          },
          children: [],
          content: locale.content,
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
              "background-color": object.colors.actionsBackgroundColor,
              color: object.colors.actionsFontColor,
              "font-weight": "bold",
              href: action.url,
              target: "_blank",
            },
            content: action.label,
          },
        ],
      })) || [];

    contents.push({
      tagName: "mj-group",
      attributes: { width: "100%" },
      children: contentActions,
    });

    contents.push(spacer);
  }

  const contentActions: MJMLJsonObject[] =
    object.actions?.map((action) => ({
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
            "background-color": object.colors.actionsBackgroundColor,
            color: object.colors.actionsFontColor,
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
    attributes: { "background-color": object.colors.contentBackground },
    children: contents.concat([contentActionsContainer]),
  };
  // -- CONTENT END --

  // -- FOOTER START --
  const footer: MJMLJsonObject = {
    tagName: "mj-column",
    attributes: {},
    children: [],
  };
  const socialElements = Object.entries(object.socials)
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
      })
    );

  if (socialElements.length) {
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

  if (object.address) {
    footer.children.push({
      tagName: "mj-text",
      attributes: { align: "center", "font-size": "10px" },
      content: object.address,
    });
  }

  const footerSection: MJMLJsonObject = {
    tagName: "mj-section",
    attributes: {
      padding: "2px",
      "background-color": object.colors.footerBackground,
    },
    children: [footer],
  };
  // -- FOOTER END --

  //
  const body: MJMLJsonObject[] = [];

  if (headerSection.children.length) {
    body.push(headerSection);
  }
  if (content.children.length) {
    body.push(divider);
    body.push(content);
  }
  if (footer.children.length) {
    body.push(divider);
    body.push(footerSection);
  }

  body.push(divider);

  // HEAD
  const head: MJMLJsonObject[] = [
    ...Object.entries(object.fonts).map(
      ([name, href]): MJMLJsonObject => ({
        tagName: "mj-font",
        attributes: { name, href },
      })
    ),
    {
      tagName: "mj-attributes",
      attributes: {},
      children: [
        {
          tagName: "mj-all",
          attributes: {
            "font-family": "'Exo 2', sans-serif;",
            color: object.colors.fontColor,
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
  if (input.preview) {
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
        attributes: { "background-color": object.colors.background },
        children: body,
      },
    ],
  };

  const mjml = mjmlCore(json, {
    fonts: object.fonts,
    validationLevel: "skip",
  });

  if (mjml.errors.length) throw mjml.errors;
  return mjml.html;
};
