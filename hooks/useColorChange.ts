import {
  getBrightness,
  getHSLWithRandomHue,
  getRandomHue,
  getTextColorByBrightnes,
  hslToHslString,
  hslToRGB,
} from "@/lib/helpers/utils";
import { ColorChangeHookReturnType, HSLColor, IntRange } from "@/lib/types";
import React from "react";

export default function useColorChange(): ColorChangeHookReturnType {
  const [colors, setColors] = React.useState<Array<HSLColor>>([
    getHSLWithRandomHue(getRandomHue(), 100, 30),
  ]);
  const [saturate, setSaturate] = React.useState<IntRange<0, 100>>(50);
  const [light, setLight] = React.useState<IntRange<0, 100>>(50);
  const [currentColorIndex, setCurrentColorIndex] = React.useState<number>(0);

  const handleColorChange = React.useCallback(
    (_saturate: IntRange<0, 100>, _light: IntRange<0, 100>) => {
      setColors((existing) => [
        ...existing,
        getHSLWithRandomHue(getRandomHue(), _saturate, _light),
      ]);
      setLight(_light);
      setSaturate(_saturate);
      setCurrentColorIndex(colors.length);
    },
    [colors],
  );

  const hslColorString = React.useMemo(() => {
    if (currentColorIndex < colors.length)
      return hslToHslString(colors[currentColorIndex]);
    return hslToHslString(colors[0]);
  }, [colors, currentColorIndex]);

  const textColor: "#FFF" | "#222" = React.useMemo(
    () =>
      getTextColorByBrightnes(
        getBrightness(hslToRGB(colors[currentColorIndex])),
      ),
    [colors, currentColorIndex],
  );

  const clearAllColors = React.useCallback(() => {
    const color = colors[0];
    console.log(color);
    setColors([color]);
    setCurrentColorIndex(0);
  }, [colors]);

  const handleSaturationChange = React.useCallback(
    (_saturate: IntRange<0, 100>) => {
      setColors((existing) => [
        ...existing,
        getHSLWithRandomHue(getRandomHue(), _saturate, light),
      ]);

      setSaturate(_saturate);
      setCurrentColorIndex(colors.length);
    },
    [light, colors],
  );

  const handleLightChange = React.useCallback(
    (_light: IntRange<0, 100>) => {
      setColors((existing) => [
        ...existing,
        getHSLWithRandomHue(getRandomHue(), saturate, _light),
      ]);
      setLight(_light);
      setCurrentColorIndex(colors.length);
    },
    [saturate, colors],
  );

  return {
    handleColorChange,
    hslColorString,
    textColor,
    setSaturate: handleSaturationChange,
    saturate,
    light,
    setLight: handleLightChange,
    setCurrentColorIndex,
    colors,
    currentColorIndex,
    clearAllColors,
  };
}
