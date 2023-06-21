import React from "react";

interface InputProps {
  label?: string;
  type: "text" | "password" | "email";
  value: string | number | readonly string[];
  placeholder?: string;
  labelStyle?: string;
  inputStyle?: string;
  autocomplete?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div>
      <label className={` flex flex-col gap-2 ${props.labelStyle}`}>
        {props.label && <p>{props.label}</p>}
        <input
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          className={`gap rounded-md px-4 py-2 bg-stone-700 ring-stone-600 active:ring-stone-800 ${props.inputStyle}`}
          autoComplete={props.autocomplete}
          onChange={props.onChange}
        />
      </label>
    </div>
  );
};

export default Input;
