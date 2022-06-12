"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericEmail = void 0;
const mjml_1 = __importDefault(require("mjml"));
const genericEmail = (stuff) => {
    // GENERICS
    const divider = {
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
    // -- HEADER SECTION START --
    const headerSection = {
        tagName: "mj-section",
        attributes: { "background-color": "#FED12C" },
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
                            width: "600px",
                            href: "https://tryparcel.com",
                        },
                    },
                ],
            },
            {
                tagName: "mj-column",
                attributes: { width: "600px" },
                children: [
                    {
                        tagName: "mj-text",
                        attributes: {
                            color: "#09273d",
                            "font-family": "poppins, sans-serif",
                            "font-weight": "bold",
                            "font-size": "35px",
                            "padding-bottom": "0px",
                            "padding-top": "0px",
                        },
                        content: stuff.topic,
                    },
                ],
            },
        ],
    };
    // -- HEADER SECTION END --
    // -- CONTENT START --
    const contentHeader = {
        tagName: "mj-text",
        attributes: {
            color: "#09273d",
            "font-family": "poppins, sans-serif",
            "font-weight": "bold",
            "font-size": "22px",
        },
        children: [],
        content: stuff.contentHeader,
    };
    const contentBody = {
        tagName: "mj-text",
        attributes: {
            "font-size": "16px",
            color: "#333",
            align: "left",
            "line-height": "1.4",
        },
        children: [],
        content: stuff.content,
    };
    const contentActions = stuff.actions.map((action) => ({
        tagName: "mj-button",
        attributes: {
            "padding-left": "0px",
            "padding-right": "0px",
            "font-family": "poppins, sans-serif",
            "border-radius": "5px",
            "font-size": "20px",
            "background-color": "#fed12c",
            color: "#09273d",
            "font-weight": "bold",
            href: action.url,
            target: "_blank",
        },
        content: action.label,
    }));
    const contentActionsContainer = {
        tagName: "mj-group",
        attributes: { width: "100%" },
        children: contentActions.map((action) => ({
            tagName: "mj-column",
            attributes: {},
            children: [action],
        })),
    };
    const content = {
        tagName: "mj-section",
        attributes: { "background-color": "#E5E7EB" },
        children: [
            {
                tagName: "mj-column",
                attributes: { width: "100%" },
                children: [contentHeader, contentBody],
                content: undefined,
            },
            contentActionsContainer,
        ],
    };
    // -- CONTENT END --
    // -- FOOTER START --
    const socials = {
        tagName: "mj-social",
        attributes: {
            "font-size": "12px",
            "icon-size": "20px",
            mode: "horizontal",
        },
        children: [
            {
                tagName: "mj-social-element",
                attributes: {
                    name: "instagram-noshare",
                    href: "https://www.instagram.com/parcel_bh/",
                    padding: "10px 5px",
                    "border-radius": "99px",
                    "icon-size": "25px",
                    "font-family": "poppins, sans-serif",
                    target: "_blank",
                },
            },
            {
                tagName: "mj-social-element",
                attributes: {
                    name: "twitter-noshare",
                    href: "https://twitter.com/parcel24bh/",
                    padding: "10px 5px",
                    "border-radius": "99px",
                    "icon-size": "25px",
                    "font-family": "poppins, sans-serif",
                    target: "_blank",
                },
            },
            {
                tagName: "mj-social-element",
                attributes: {
                    name: "facebook-noshare",
                    href: "https://www.facebook.com/parcel.bh/",
                    padding: "10px 5px",
                    "border-radius": "99px",
                    "icon-size": "25px",
                    "font-family": "poppins, sans-serif",
                    target: "_blank",
                },
            },
            {
                tagName: "mj-social-element",
                attributes: {
                    name: "linkedin-noshare",
                    href: "https://www.linkedin.com/company/tryparcel/",
                    padding: "10px 5px",
                    "border-radius": "99px",
                    "icon-size": "25px",
                    "font-family": "poppins, sans-serif",
                    target: "_blank",
                },
            },
            {
                tagName: "mj-social-element",
                attributes: {
                    src: "https://parcel-media.s3.me-south-1.amazonaws.com/www.png",
                    href: "https://tryparcel.com/",
                    padding: "10px 5px",
                    "border-radius": "99px",
                    "icon-size": "25px",
                    "font-family": "poppins, sans-serif",
                    target: "_blank",
                },
            },
        ],
    };
    const footer = {
        tagName: "mj-section",
        attributes: { padding: "0px", "background-color": "#e5e7eb" },
        children: [
            {
                tagName: "mj-column",
                attributes: {},
                children: [
                    socials,
                    {
                        tagName: "mj-text",
                        attributes: { align: "center", "font-size": "10px" },
                        content: stuff.address,
                    },
                ],
            },
        ],
    };
    // -- FOOTER END --
    const json = {
        tagName: "mjml",
        attributes: {},
        children: [
            {
                tagName: "mj-body",
                attributes: { "background-color": "#09273D" },
                children: [headerSection, divider, content, divider, footer],
            },
        ],
    };
    const mjml = (0, mjml_1.default)(json);
    if (mjml.errors.length)
        throw mjml.errors;
    return mjml.html;
};
exports.genericEmail = genericEmail;
//# sourceMappingURL=index.js.map