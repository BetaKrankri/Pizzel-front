import React, { InputHTMLAttributes } from "react";

interface Props {
  label: string;
  type: "text" | "password" | "email";
  value?: string | number | readonly string[];
  placeholder?: string;
  labelStyle?: string;
  inputStyle?: string;
  autocomplete?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const Input = ({
  label,
  type,
  value,
  placeholder,
  labelStyle,
  inputStyle,
  autocomplete,
  onChange,
}: Props) => {
  return (
    <div>
      <label className={` flex flex-col gap-2 ${labelStyle}`}>
        <p>{label}</p>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className={`gap rounded-md px-4 py-2 bg-stone-700 ring-stone-600 active:ring-stone-800 ${inputStyle}`}
          autoComplete={autocomplete}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Input;
