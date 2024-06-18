import { Metadata } from "next";

export const sharedMetadata: Metadata = {
  // See Github issue: https://github.com/vercel/next.js/issues/55767
  icons: {
    shortcut: "/favicon.ico",
    other: {
      rel: "mask-icon",
      url: "/icons/safari-pinned-tab.svg",
      color: "#22cc5e",
    },
  },
};
