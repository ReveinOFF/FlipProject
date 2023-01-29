import "./CustomButtonStyle.css";

export const CustomButtonBG = (props) => {
  const { type, onClick, disabled, content, error } = props;

  return (
    <>
      <button
        className={`custom-btn ${error && "error"}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {content}
      </button>
    </>
  );
};

export const CustomButton = (props) => {
  const { type, onClick, disabled, content, error } = props;

  return (
    <>
      <button
        className={`custom-btn ${error && "error"}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {content}
      </button>
    </>
  );
};
