import {IntRange} from "@/lib/types";

export function getRandomHue(): number{
    return Math.ceil(Math.random() * 360)
}

/*
 * Generate HSL color with provided hue, saturate and light (brightness)
 * @return string (hsl)
 */
export function getHSLWithRandomHue(hue:number, saturate: IntRange<0, 100> = 50, light: IntRange<0, 100> = 50): string {
    if(hue > 360 || hue < 0 || saturate > 100 || saturate < 0 || light > 100 || light < 0) return `hsl(100, 50%, 50%)`
    return `hsl(${hue}, ${saturate}%, ${light}%)`;
}
