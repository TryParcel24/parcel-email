// src/index.ts
import mjmlCore from "mjml";
var defaultValues = {
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
    footerBackground: "#E5E7EB"
  },
  fonts: {
    "exo 2": "https://fonts.googleapis.com/css2?family=Exo+2"
  }
};
var divider = {
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
            padding: "0px"
          }
        }
      ]
    }
  ]
};
var spacer = {
  tagName: "mj-section",
  attributes: { padding: "10px" }
};
var genericEmail = (input) => {
  const object = { ...defaultValues, ...input };
  Object.keys(object.colors).filter(
    (key) => key.includes("FontColor")
  ).forEach((key) => {
    if (object.colors[key]?.length === 0) {
      object.colors[key] = object.colors.fontColor;
    }
  });
  const headerSection = {
    tagName: "mj-section",
    attributes: {
      "background-color": object.colors.superHeaderBackground
    },
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
              href: "https://tryparcel.com"
            }
          }
        ]
      }
    ]
  };
  if (object.superHeader != null) {
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
            align: object.dir === "rtl" ? "right" : "left"
          },
          content: object.superHeader
        }
      ]
    });
  }
  const contentHeader = {
    tagName: "mj-text",
    attributes: {
      color: object.colors.contentHeaderFontColor,
      "font-weight": "bold",
      "font-size": "22px",
      align: object.dir === "rtl" ? "right" : "left"
    },
    content: `<div dir=${object.dir ?? "ltr"}>${object.contentHeader}</div>`
  };
  const contentBody = {
    tagName: "mj-text",
    attributes: {
      "font-size": "16px",
      color: object.colors.contentFontColor,
      "line-height": "1.4",
      align: object.dir === "rtl" ? "right" : "left"
    },
    content: `<div dir=${object.dir ?? "ltr"}>${object.content}</div>`
  };
  const contentActions = object.actions?.map((action) => ({
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
          target: "_blank"
        },
        content: action.label
      }
    ]
  })) ?? [];
  const contentActionsContainer = {
    tagName: "mj-group",
    attributes: {
      width: "100%",
      direction: object.dir ?? "ltr"
    },
    children: contentActions
  };
  const content = {
    tagName: "mj-section",
    attributes: {
      "background-color": object.colors.contentBackground
    },
    children: [
      {
        tagName: "mj-column",
        attributes: { width: "100%" },
        children: [contentHeader, contentBody]
      },
      contentActionsContainer
    ]
  };
  const footer = {
    tagName: "mj-column",
    attributes: {},
    children: []
  };
  const socialElements = Object.entries(object.socials).filter(([, value]) => value).sort(([, a], [, b]) => {
    if (typeof a?.order === "number" && typeof b?.order === "number")
      return a.order - b.order;
    if (typeof a?.order === "number")
      return 1;
    if (typeof b?.order === "number")
      return -1;
    return 1;
  }).map(
    ([name, value]) => ({
      tagName: "mj-social-element",
      attributes: {
        name,
        ...value,
        padding: "3px 5px",
        "icon-size": "25px",
        "border-radius": "99px",
        target: "_blank"
      }
    })
  );
  if (socialElements.length > 0)
    footer.children.push({
      tagName: "mj-social",
      attributes: {
        "font-size": "12px",
        "icon-size": "20px",
        mode: "horizontal"
      },
      children: socialElements
    });
  if (object.address != null) {
    footer.children.push({
      tagName: "mj-text",
      attributes: { align: "center", "font-size": "10px" },
      content: object.address
    });
  }
  const footerSection = {
    tagName: "mj-section",
    attributes: {
      padding: "2px",
      "background-color": object.colors.footerBackground
    },
    children: [footer]
  };
  const body = [];
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
  const head = [
    ...Object.entries(object.fonts).map(
      ([name, href]) => ({
        tagName: "mj-font",
        attributes: { name, href }
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
            color: object.colors.fontColor
          }
        }
      ]
    },
    {
      tagName: "mj-raw",
      attributes: {},
      content: `
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    `
    }
  ];
  if (input.preview != null)
    head.push({
      tagName: "mj-preview",
      attributes: {},
      content: input.preview
    });
  const json = {
    tagName: "mjml",
    attributes: {},
    children: [
      {
        tagName: "mj-head",
        attributes: {},
        children: head
      },
      {
        tagName: "mj-body",
        attributes: { "background-color": object.colors.background },
        children: body
      }
    ]
  };
  const mjml = mjmlCore(json, {
    fonts: object.fonts,
    validationLevel: "skip"
  });
  if (mjml.errors.length > 0)
    throw mjml.errors;
  return mjml.html;
};
var localizedGenericEmail = (input) => {
  const object = {
    ...defaultValues,
    ...input
  };
  Object.keys(object.colors).filter(
    (key) => key.includes("FontColor")
  ).forEach((key) => {
    if (object.colors[key]?.length === 0) {
      object.colors[key] = object.colors.fontColor;
    }
  });
  const headerSection = {
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
              href: "https://tryparcel.com"
            }
          }
        ]
      }
    ]
  };
  if (object.superHeader != null) {
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
            "padding-top": "0px"
          },
          content: object.superHeader
        }
      ]
    });
  }
  const contents = [];
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
            align: locale.dir === "rtl" ? "right" : "left"
          },
          content: `<div dir="${locale.dir ?? "ltr"}">${locale.contentHeader}</div>`
        },
        {
          tagName: "mj-text",
          attributes: {
            "font-size": "16px",
            color: object.colors.contentFontColor,
            align: locale.dir === "rtl" ? "right" : "left",
            "line-height": "1.4"
          },
          children: [],
          content: `<div dir="${locale.dir ?? "ltr"}">${locale.content}</div>`
        }
      ]
    });
    const contentActions2 = locale.actions?.map((action) => ({
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
            target: "_blank"
          },
          content: action.label
        }
      ]
    })) ?? [];
    contents.push({
      tagName: "mj-group",
      attributes: { width: "100%", direction: locale.dir },
      children: contentActions2
    });
    contents.push(spacer);
  }
  const contentActions = object.actions?.map((action) => ({
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
          target: "_blank"
        },
        content: action.label
      }
    ]
  })) ?? [];
  const contentActionsContainer = {
    tagName: "mj-group",
    attributes: { width: "100%" },
    children: contentActions
  };
  const content = {
    tagName: "mj-section",
    attributes: { "background-color": object.colors.contentBackground },
    children: contents.concat([contentActionsContainer])
  };
  const footer = {
    tagName: "mj-column",
    attributes: {},
    children: []
  };
  const socialElements = Object.entries(object.socials).filter(([, value]) => value).sort(([, a], [, b]) => {
    if (typeof a?.order === "number" && typeof b?.order === "number")
      return a.order - b.order;
    if (typeof a?.order === "number")
      return 1;
    if (typeof b?.order === "number")
      return -1;
    return 1;
  }).map(
    ([name, value]) => ({
      tagName: "mj-social-element",
      attributes: {
        name,
        ...value,
        padding: "3px 5px",
        "icon-size": "25px",
        "border-radius": "99px",
        target: "_blank"
      }
    })
  );
  if (socialElements.length > 0) {
    footer.children.push({
      tagName: "mj-social",
      attributes: {
        "font-size": "12px",
        "icon-size": "20px",
        mode: "horizontal"
      },
      children: socialElements
    });
  }
  if (object.address != null) {
    footer.children.push({
      tagName: "mj-text",
      attributes: { align: "center", "font-size": "10px" },
      content: object.address
    });
  }
  const footerSection = {
    tagName: "mj-section",
    attributes: {
      padding: "2px",
      "background-color": object.colors.footerBackground
    },
    children: [footer]
  };
  const body = [];
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
  const head = [
    ...Object.entries(object.fonts).map(
      ([name, href]) => ({
        tagName: "mj-font",
        attributes: { name, href }
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
            color: object.colors.fontColor
          }
        }
      ]
    },
    {
      tagName: "mj-raw",
      attributes: {},
      content: `
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    `
    }
  ];
  if (input.preview != null) {
    head.push({
      tagName: "mj-preview",
      attributes: {},
      content: input.preview
    });
  }
  const json = {
    tagName: "mjml",
    attributes: {},
    children: [
      {
        tagName: "mj-head",
        attributes: {},
        children: head
      },
      {
        tagName: "mj-body",
        attributes: { "background-color": object.colors.background },
        children: body
      }
    ]
  };
  const mjml = mjmlCore(json, {
    fonts: object.fonts,
    validationLevel: "skip"
  });
  if (mjml.errors.length > 0)
    throw mjml.errors;
  return mjml.html;
};
export {
  defaultValues,
  genericEmail,
  localizedGenericEmail
};
