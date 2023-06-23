import React from "react";

interface SelectProps {
  value: string | readonly string[] | undefined;
  label?: string;
  labelStyle?: string;
  selectStyle?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  options: string[] | undefined;
}

const Select: React.FC<SelectProps> = (props) => {
  return (
    <label className={`Select flex flex-col gap-1 ${props.labelStyle} w-full`}>
      {props.label && <p>{props.label}</p>}
      <select
        value={props.value}
        className={`gap rounded-md px-4 py-2 bg-stone-700 ring-stone-600
        active:ring-stone-800 w-full ${props.selectStyle}`}
        onChange={props.onChange}
      >
        {props.options?.map((option, i) => (
          <option key={i} value={option} className="">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
