import style from "./CustomInput.module.scss";

export const CustomInput = (props) => {
  const { type, name, placeholder, value, onChange, onBlur, disabled, error } =
    props;

  return (
    <input
      className={`${style.custom_input} ${error && style.input_error}`}
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
