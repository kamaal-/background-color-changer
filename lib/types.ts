type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

export type IntRange<F extends number, T extends number> =
  | Exclude<Enumerate<T>, Enumerate<F>>
  | T;

export type ColorChangeHookReturnType = {
  handleColorChange: (
    _saturate: IntRange<0, 100>,
    _light: IntRange<0, 100>,
  ) => void;
  hslColorString: string;
  textColor: "#FFF" | "#222";
  setSaturate: (value: IntRange<0, 100>) => void;
  saturate: IntRange<0, 100>;
  setLight: (value: IntRange<0, 100>) => void;
  light: IntRange<0, 100>;
  setCurrentColorIndex: (index: number) => void;
  colors: Array<HSLColor>;
};

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}
