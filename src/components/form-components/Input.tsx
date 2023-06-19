import React, { InputHTMLAttributes } from "react";

interface Props {
  type: "text" | "password" | "email";
  label: string;
  placeholder?: string;
  labelStyle?: string;
  inputStyle?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const Input = ({
  type,
  labelStyle,
  inputStyle,
  label,
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <div>
      <label className={` flex flex-col gap-2 ${labelStyle}`}>
        <p>{label}</p>
        <input
          type={type}
          className={`gap rounded-md px-4 py-2 bg-stone-700 ring-stone-600 active:ring-stone-800 ${inputStyle}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Input;
