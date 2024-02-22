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
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/v3/index.ts
var v3_exports = {};
__export(v3_exports, {
  GenericEmailGenerator: () => GenericEmailGenerator
});
module.exports = __toCommonJS(v3_exports);
var import_mjml = __toESM(require("mjml"), 1);
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
var GenericEmailGenerator = class {
  defaultValues = {
    font: ["exo 2", "https://fonts.googleapis.com/css2?family=Exo+2"]
  };
  socials;
  colors;
  font;
  logo;
  address;
  constructor(params) {
    this.address = params.address;
    this.colors = params.colors;
    this.socials = params.socials ?? {};
    this.logo = params.logo;
    this.font = params.fonts ?? this.defaultValues.font;
  }
  /**
   *  @throws {import("mjml-core").MJMLParseError[]}
   */
  render(input) {
    const headerSection = {
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
                href: this.logo?.href
              }
            }
          ]
        }
      ]
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
              "padding-top": "0px"
            },
            content: input.superHeader
          }
        ]
      });
    }
    const contents = [];
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
              align: locale.dir === "rtl" ? "right" : "left"
            },
            content: `<div dir="${locale.dir ?? "ltr"}">${locale.contentHeader}</div>`
          },
          {
            tagName: "mj-text",
            attributes: {
              "font-size": "16px",
              color: this.colors.secondary,
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
              "background-color": this.colors.primary,
              color: this.colors.actionsFontColor,
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
    const contentActions = input.actions?.map((action) => ({
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
      attributes: { "background-color": this.colors.contentBackground },
      children: contents.concat([contentActionsContainer])
    };
    const footer = {
      tagName: "mj-column",
      attributes: {},
      children: []
    };
    const socialElements = Object.entries(this.socials).filter(([, value]) => value).sort(([, a], [, b]) => {
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
    if (this.address != null) {
      footer.children.push({
        tagName: "mj-text",
        attributes: { align: "center", "font-size": "10px" },
        content: this.address
      });
    }
    const footerSection = {
      tagName: "mj-section",
      attributes: {
        padding: "2px",
        "background-color": this.colors.footerBackground
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
      ...Object.entries(this.font).map(
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
              "font-family": `${this.font[0].includes(" ") ? `'${this.font[0]}'` : this.font[0]}, sans-serif;`,
              color: this.colors.secondary
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
          attributes: { "background-color": this.colors.secondary },
          children: body
        }
      ]
    };
    const mjml = (0, import_mjml.default)(json, {
      fonts: {
        [this.font[0]]: this.font[1]
      },
      validationLevel: "skip"
    });
    if (mjml.errors.length > 0) {
      throw mjml.errors;
    }
    return mjml.html;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GenericEmailGenerator
});
