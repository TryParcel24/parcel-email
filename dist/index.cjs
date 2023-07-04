"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  defaultValues: () => defaultValues,
  genericEmail: () => genericEmail,
  localizedGenericEmail: () => localizedGenericEmail
});
module.exports = __toCommonJS(src_exports);
var import_mjml = __toESM(require("mjml"), 1);
var defaultValues = {
  socials: {},
  colors: {
    background: "#09273D",
    contentBackground: "#E5E7EB",
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
  Object.keys(object.colors).filter((key) => key.includes("FontColor")).forEach((_key) => {
    const key = _key;
    if (!object.colors[key]) {
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
            "padding-top": "0px"
          },
          content: object.superHeader
        }
      ]
    });
  const contentHeader = {
    tagName: "mj-text",
    attributes: {
      color: object.colors.contentHeaderFontColor,
      "font-weight": "bold",
      "font-size": "22px"
    },
    children: [],
    content: object.contentHeader
  };
  const contentBody = {
    tagName: "mj-text",
    attributes: {
      "font-size": "16px",
      color: object.colors.contentFontColor,
      align: "left",
      "line-height": "1.4"
    },
    children: [],
    content: object.content
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
  })) || [];
  const contentActionsContainer = {
    tagName: "mj-group",
    attributes: { width: "100%" },
    children: contentActions
  };
  const content = {
    tagName: "mj-section",
    attributes: { "background-color": object.colors.contentBackground },
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
  if (socialElements.length)
    footer.children.push({
      tagName: "mj-social",
      attributes: {
        "font-size": "12px",
        "icon-size": "20px",
        mode: "horizontal"
      },
      children: socialElements
    });
  if (object.address)
    footer.children.push({
      tagName: "mj-text",
      attributes: { align: "center", "font-size": "10px" },
      content: object.address
    });
  const footerSection = {
    tagName: "mj-section",
    attributes: {
      padding: "2px",
      "background-color": object.colors.footerBackground
    },
    children: [footer]
  };
  const body = [];
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
  if (input.preview)
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
  const mjml = (0, import_mjml.default)(json, {
    fonts: object.fonts,
    validationLevel: "skip"
  });
  if (mjml.errors.length)
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
    if (!object.colors[key]) {
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
            "font-size": "22px"
          },
          children: [],
          content: locale.contentHeader
        },
        {
          tagName: "mj-text",
          attributes: {
            "font-size": "16px",
            color: object.colors.contentFontColor,
            align: "left",
            "line-height": "1.4"
          },
          children: [],
          content: locale.content
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
    })) || [];
    contents.push({
      tagName: "mj-group",
      attributes: { width: "100%" },
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
  if (socialElements.length) {
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
  if (object.address) {
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
  if (input.preview) {
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
  const mjml = (0, import_mjml.default)(json, {
    fonts: object.fonts,
    validationLevel: "skip"
  });
  if (mjml.errors.length)
    throw mjml.errors;
  return mjml.html;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultValues,
  genericEmail,
  localizedGenericEmail
});
