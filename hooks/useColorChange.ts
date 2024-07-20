import {
    getBrightness,
    getHSLWithRandomHue,
    getRandomHue,
    getTextColorByBrightnes,
    hslToHslString,
    hslToRGB
} from "@/lib/helpers/utils";
import {ColorChangeHookReturnType, HSLColor, IntRange} from "@/lib/types";
import React from "react";

export default function useColorChange():ColorChangeHookReturnType {
    const [colors, setColors] = React.useState<Array<HSLColor>>([getHSLWithRandomHue(getRandomHue(), 100, 100)]);
    const [saturate, setSaturate] = React.useState<IntRange<0, 100>>(50);
    const [light, setLight] = React.useState<IntRange<0, 100>>(50);
    const [currentColorIndex, setCurrentColorIndex] = React.useState<number>(0)

    const handleColorChange = React.useCallback(() => {
        setColors((existing) => [...existing, getHSLWithRandomHue(getRandomHue(), saturate, light)])
        setCurrentColorIndex((i) => i + 1 )
    }, [saturate, light]);

    const hslColorString = React.useMemo(() =>
        hslToHslString(colors[currentColorIndex]), [colors, currentColorIndex]);

    const textColor: "#FFF" | "#222" = React.useMemo(() => getTextColorByBrightnes(getBrightness(hslToRGB(colors[currentColorIndex])))
    , [colors, currentColorIndex])

    return {
        handleColorChange,
        hslColorString,
        textColor,
        setSaturate,
        saturate,
        light,
        setLight,
        setCurrentColorIndex,
        colors
    }

}
