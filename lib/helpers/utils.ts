import { HSLColor, IntRange, RGBColor } from "@/lib/types";

export function getRandomHue(): number {
  return Math.ceil(Math.random() * 360);
}

/*
 * Generate HSL color with provided hue, saturate and light (brightness)
 */
export function getHSLWithRandomHue(
  hue: number,
  saturate: IntRange<0, 100> = 50,
  light: IntRange<0, 100> = 50,
): HSLColor {
  if (
    hue > 360 ||
    hue < 0 ||
    saturate > 100 ||
    saturate < 0 ||
    light > 100 ||
    light < 0
  )
    return {
      h: 100,
      s: 50,
      l: 50,
    };
  return {
    h: hue,
    s: saturate,
    l: light,
  };
}

export const round = (
  number: number,
  digits = 0,
  base = Math.pow(10, digits),
): number => {
  return Math.round(base * number) / base;
};

export const hslToRGB = ({ h, s, l }: HSLColor): RGBColor => {
  h = (h / 360) * 6;
  s = s / 100;
  l = l / 100;

  const hh = Math.floor(h),
    b = l * (1 - s),
    c = l * (1 - (h - hh) * s),
    d = l * (1 - (1 - h + hh) * s),
    module = hh % 6;

  return {
    r: round([l, c, b, b, d, l][module] * 255),
    g: round([d, l, l, c, b, b][module] * 255),
    b: round([b, b, d, l, l, c][module] * 255),
  };
};

export const hslToHslString = ({ h, s, l }: HSLColor): string =>
  `hsl(${h}, ${s}%, ${l}%)`;

// See http://www.w3.org/TR/AERT#color-contrast
export const getBrightness = ({ r, g, b }: RGBColor): number =>
  (r * 299 + g * 587 + b * 114) / 1000;

export const getTextColorByBrightnes = (brightness: number): "#222" | "#FFF" =>
  brightness > 130 ? "#222" : "#FFF";
