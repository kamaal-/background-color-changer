import React from 'react';
import {IntRange} from "@/lib/types";

type Props = {
    setValue: (value: IntRange<0, 100>) => void;
    value: IntRange<0, 100>;
    name?: string;
}

function RangeSlider({setValue, value, name = "range"}:Props) {
    return (
        <input type="range" min="0" max="100" value={value} name={name} onChange={(e) => setValue(parseInt(e.target.value, 10) as IntRange<0, 100>)}/>
    );
}

export default RangeSlider;
