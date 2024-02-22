import type { LocalizedGenericEmail, GenericEmail } from "./index.js";

export const defaultValues = {
  socials: {},
  colors: {
    primary: "#FED12C",
    secondary: "#09273D",

    contentBackground: "#E5E7EB",
    // contentHeaderBackground: "#E5E7EB",
    actionsFontColor: "#000000",
    footerBackground: "#E5E7EB",
  },
  fonts: ["Exo 2", "https://fonts.googleapis.com/css2?family=Exo+2"],
  logo: {
    image: "https://parcel-media.s3.me-south-1.amazonaws.com/parcel_logo.png",
    href: "https://tryparcel.com",
  },
} as const;

export const genericEmailDefaultValues: GenericEmail = {
  superHeader: "Topic",
  // dir: "rtl",
  contentHeader: "Content Header",
  content:
    "Non esse sit sit non nisi voluptate cillum dolor nisi ut sunt. Qui ipsum adipisicing eiusmod officia adipisicing nisi ullamco. Adipisicing laboris fugiat irure dolor dolor pariatur occaecat aliquip et sit aliqua. Id Lorem proident ut commodo est. Excepteur amet proident do labore aliqua veniam minim culpa. Excepteur veniam incididunt quis ullamco aute anim quis Lorem duis. Veniam est aute nostrud sint dolore excepteur id ex dolore enim est duis labore occaecat.",
  actions: [
    {
      label: "1",
      url: "https://tryparcel.com",
    },
    {
      label: "2",
      url: "https://tryparcel.com",
    },
    {
      label: "3",
      url: "https://tryparcel.com",
    },
  ],
  address: "Parcel, Bahrain, Gulf, Middle East, Asia, Earth, Milky way",
};

export const localizedGenericEmailDefaultValues: LocalizedGenericEmail = {
  superHeader: "Topic",
  locales: [
    {
      contentHeader: "Content Header",
      content:
        "Non esse sit sit non nisi voluptate cillum dolor nisi ut sunt. Qui ipsum adipisicing eiusmod officia adipisicing nisi ullamco. Adipisicing laboris fugiat irure dolor dolor pariatur occaecat aliquip et sit aliqua. Id Lorem proident ut commodo est. Excepteur amet proident do labore aliqua veniam minim culpa. Excepteur veniam incididunt quis ullamco aute anim quis Lorem duis. Veniam est aute nostrud sint dolore excepteur id ex dolore enim est duis labore occaecat.",
      actions: [
        {
          label: "1",
          url: "https://tryparcel.com",
        },
        {
          label: "2",
          url: "https://tryparcel.com",
        },
        {
          label: "3",
          url: "https://tryparcel.com",
        },
      ],
    },
    {
      contentHeader: "رأس المحتوى",
      content: "المحتوى ",
      dir: "rtl",
      actions: [
        {
          label: "1",
          url: "https://tryparcel.com",
        },
        {
          label: "2",
          url: "https://tryparcel.com",
        },
        {
          label: "3",
          url: "https://tryparcel.com",
        },
      ],
    },
  ],
  actions: [
    {
      label: "Do et",
      url: "https://tryparcel.com",
    },
    {
      label: "Do et",
      url: "https://tryparcel.com",
    },
    {
      label: "Do et",
      url: "https://tryparcel.com",
    },
  ],
  address: "Parcel, Bahrain, Gulf, Middle East, Asia, Earth, Milky way",
};
