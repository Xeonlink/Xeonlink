import type { LogoSlug } from "./logo-slug";

export type StaticBadgeOptions = {
  style?: "flat" | "flat-square" | "for-the-badge" | "plastic" | "social";
  logo?:
    | string // slug or base64 // data:image/*;base64,**
    | {
        slug: LogoSlug;
        color?: string;
        size?: string;
      };
  label?:
    | string
    | {
        message: string;
        color?: string;
      };
  color?: string;
  cacheSeconds?: number;
};

export function getStaticBadgeUrl(message: string, options: StaticBadgeOptions) {
  const { color, style = "for-the-badge", logo, label, cacheSeconds = 3600 } = options;

  const url = new URL("https://img.shields.io/badge");
  if (message) {
    url.pathname += `/${message.replace("-", "--").replace("_", "__").replace(" ", "_")}-_`;
  }
  if (style) {
    url.searchParams.set("style", style);
  }
  if (logo) {
    if (typeof logo === "string") {
      url.searchParams.set("logo", logo);
    }
    if (typeof logo === "object") {
      url.searchParams.set("logo", logo.slug);
      if (logo.color) {
        url.searchParams.set("logoColor", logo.color);
      }
    }
  }
  if (label) {
    if (typeof label === "string") {
      url.searchParams.set("label", label);
    }
    if (typeof label === "object") {
      url.searchParams.set("label", label.message);
      if (label.color) {
        url.searchParams.set("labelColor", label.color);
      }
    }
  }
  if (color) {
    url.searchParams.set("color", color);
  }
  if (cacheSeconds) {
    url.searchParams.set("cacheSeconds", cacheSeconds.toString());
  }

  return url.toString();
}
