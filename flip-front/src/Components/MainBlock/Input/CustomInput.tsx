import "./CustomInputStyle.css";

export const CustomInput = (props) => {
  const { type, name, placeholder, value, onChange, onBlur, disabled, error } =
    props;

  return (
    <input
      className={`custom-input ${error && "input-error"}`}
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
