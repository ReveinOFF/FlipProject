import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import style from "./CustomInput.module.scss";

export const CustomInput = (props) => {
  const { type, name, placeholder, value, onChange, onBlur, disabled, error } =
    props;

  const theme = useTypedSelector((state) => state.theme.mode);
  const [mode, setMode] = useState<string>("light");

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
  }, [theme]);

  return (
    <input
      className={`
        ${style.custom_input} 
        ${error && mode === "light" && style.input_error}
        ${error && mode === "dark" && style.dark_error}
        ${!error && mode === "light" && style.light}
        ${!error && mode === "dark" && style.dark}
      `}
      value={value}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
};
