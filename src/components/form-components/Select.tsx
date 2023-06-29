import React from "react";

interface SelectProps {
  value?: string;
  label?: string;
  labelStyle?: string;
  selectStyle?: string;
  required?: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  selected?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}

const Select: React.FC<SelectProps> = (props) => {
  return (
    <label className={`Select flex flex-col gap-1 ${props.labelStyle} w-full`}>
      {props.label && <p>{props.label}</p>}
      <select
        className={`gap rounded-md px-4 py-2 bg-stone-700 ring-stone-600
        active:ring-stone-800 w-full ${props.selectStyle}`}
        value={props.value || ""}
        required={props.required}
        onChange={props.onChange}
      >
        {props.placeholder && (
          <option disabled value="">
            {props.placeholder}
          </option>
        )}
        {props.children}
      </select>
    </label>
  );
};

export default Select;
