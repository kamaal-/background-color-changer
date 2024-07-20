import React from 'react';
import {HSLColor} from "@/lib/types";
import {getBrightness, getTextColorByBrightnes, hslToHslString, hslToRGB} from "@/lib/helpers/utils";

type Props = {
    colors: Array<HSLColor>;
    setSelectedIndex: (index: number) => void;
    selectedIndex: number;
}

type ColorBoxProps = {
    index: number;
    color: HSLColor;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
}

function ColorBox({color, index, setSelectedIndex}: ColorBoxProps){
    const colorString = React.useMemo(() => hslToHslString(color), [color])
    const textColor = React.useMemo(() => getTextColorByBrightnes(getBrightness(hslToRGB(color))), [color]);

    return <div onClick={(e) =>
    {
        e.stopPropagation();
        setSelectedIndex(index)
    }} className={"color-box flex "} style={{backgroundColor: colorString, color: textColor}}>{index + 1}</div>
}

function AllColors({colors, selectedIndex, setSelectedIndex}:Props) {
    return (
        <div className={"flex all-colors absolute"}>
            {colors.map((c, index) => <ColorBox key={`cb-${index}`} index={index} color={c} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>)}
        </div>
    );
}

export default AllColors;
