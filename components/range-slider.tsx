import React from "react";
import { IntRange } from "@/lib/types";

type Props = {
  setValue: (value: IntRange<0, 100>) => void;
  value: IntRange<0, 100>;
  label: string;
  name?: string;
};

function RangeSlider({ setValue, value, label, name = "range" }: Props) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      setValue(parseInt(event.target.value, 10) as IntRange<0, 100>);
    },
    [setValue],
  );

  return (
    <div className="flex slider roboto-ligh">
      <label htmlFor={name}>
        <span className={"flex slider-label"}>
          <span>{label}</span>
          <span>{value.toFixed(1)}</span>
        </span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
}

export default RangeSlider;
