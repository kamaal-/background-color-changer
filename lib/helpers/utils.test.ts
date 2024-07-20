import {
    getBrightness,
    getHSLWithRandomHue,
    getRandomHue,
    getTextColorByBrightnes,
    hslToHslString,
    hslToRGB
} from "@/lib/helpers/utils";
import {getTextColor} from "@expo/metro-runtime/build/error-overlay/UI/LogBoxStyle";

describe("Helper functions", () => {
    let hue = 0;
    beforeAll(() => {
        hue = getRandomHue();
    });

    test("get random hue", () => {
        expect(getRandomHue()).toBeGreaterThanOrEqual(0);
        expect(getRandomHue()).toBeLessThanOrEqual(360);
    });

    test("Should get hsl value with random hue:", () => {
        expect(getHSLWithRandomHue(hue)).toEqual({h: hue, s: 50, l: 50})
    });

    test("Should get static hsl value with wrong hue:", () => {
        expect(getHSLWithRandomHue(361)).toEqual({h: 100, s: 50, l: 50})
    });

    test("Should get static hsl value with wrong saturation:", () => {
        // @ts-ignore : - test purpose only
        expect(getHSLWithRandomHue(hue, -1, 40)).toEqual({h: 100, s: 50, l: 50})
    });

    test("Should get static hsl value with wrong light:", () => {
        // @ts-ignore : - test purpose only
        expect(getHSLWithRandomHue(hue, 50, -40)).toEqual({h: 100, s: 50, l: 50})
    });

    test("Should return rgb", () => {
        expect(hslToRGB(getHSLWithRandomHue(50))).toEqual({"b": 64, "g": 117, "r": 128})
    });

    test("Should return brightness for hue", () => {
        expect(getBrightness(hslToRGB(getHSLWithRandomHue(50)))).toBe(114.247)
    });

    test("Should convert to hsl() color with hue", () => {
        expect(hslToHslString(getHSLWithRandomHue(hue))).toBe(`hsl(${hue}, 50%, 50%)`)
    });

    test("Should convert to hsl() color with saturation: ", () => {
        expect(hslToHslString(getHSLWithRandomHue(hue, 57))).toBe(`hsl(${hue}, 57%, 50%)`)
    });

    test("Should convert to hsl() color with light: ", () => {
        expect(hslToHslString(getHSLWithRandomHue(hue, 57, 94))).toBe(`hsl(${hue}, 57%, 94%)`)
    });

    test("Should return black color for light bg", () => {
        expect(getTextColorByBrightnes(getBrightness(hslToRGB(getHSLWithRandomHue(50, 50, 89))))).toBe("#222")
    });

    test("Should return white color for dark bg", () => {
        expect(getTextColorByBrightnes(getBrightness(hslToRGB(getHSLWithRandomHue(50, 50, 28))))).toBe("#FFF")
    });
})
