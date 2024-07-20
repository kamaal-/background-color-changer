import {getHSLWithRandomHue, getRandomHue} from "@/lib/helpers/utils";

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
        expect(getHSLWithRandomHue(hue)).toBe(`hsl(${hue}, 50%, 50%)`)
    });

    test("Should get static hsl value with wrong hue:", () => {
        expect(getHSLWithRandomHue(361)).toBe(`hsl(100, 50%, 50%)`)
    });

    test("Should get static hsl value with wrong saturation:", () => {
        // @ts-ignore : - test purpose only
        expect(getHSLWithRandomHue(hue, -1, 40)).toBe(`hsl(100, 50%, 50%)`)
    });

    test("Should get static hsl value with wrong light:", () => {
        // @ts-ignore : - test purpose only
        expect(getHSLWithRandomHue(hue, 50, -40)).toBe(`hsl(100, 50%, 50%)`)
    });

})
