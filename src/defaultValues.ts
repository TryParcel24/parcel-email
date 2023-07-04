import type { LocalizedGenericEmail, GenericEmail } from "./index.js";

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
      content: "ال�حتوى ",
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
