import React from "react";

interface InputProps {
  type: "text" | "password" | "email" | "number";
  label?: string;
  value: string | number | readonly string[];
  placeholder?: string;
  labelStyle?: string;
  inputStyle?: string;
  autocomplete?: string;
  min?: number;
  max?: number;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <label className={`Input flex flex-col gap-1 ${props.labelStyle} w-full`}>
      {props.label && <p>{props.label}</p>}
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        className={`gap rounded-md px-4 py-2 bg-stone-700 ring-stone-600
           active:ring-stone-800 w-full ${props.inputStyle}`}
        autoComplete={props.autocomplete}
        onChange={props.onChange}
        min={props.min}
        max={props.max}
      />
    </label>
  );
};

export default Input;
