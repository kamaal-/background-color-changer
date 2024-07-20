import {getHSLWithRandomHue, getRandomHue} from "@/lib/helpers/utils";
import {ColorChangeHookReturnType, IntRange} from "@/lib/types";
import React from "react";

export default function useColorChange():ColorChangeHookReturnType {
    const [colors, setColors] = React.useState<Array<string>>([getHSLWithRandomHue(getRandomHue(), 100, 100)]);
    const [saturate, setSaturate] = React.useState<IntRange<0, 100>>(50);
    const [light, setLight] = React.useState<IntRange<0, 100>>(50);

    const handleColorChange = React.useCallback(() => {
        setColors((existing) => [...existing, getHSLWithRandomHue(getRandomHue(), saturate, light)] )
    }, [saturate, light]);

    return {
        colors,
        handleColorChange
    }

}
