import { useEffect } from "react";
import { CustomButtonBG } from "../../../MainBlock/Button/CustomButton";
import { CustomInput } from "../../../MainBlock/Input/CustomInput";
import "./RegPhaseOneStyle.css";

export const RegPhaseOne = () => {
  useEffect(() => {
    document.title = "Sign Up | Phase One - Flip";
  }, []);

  return (
    <>
      <div className="reg-label">Реєстрація</div>
      <div className="form-input">
        <CustomInput type="text" placeholder="Ім'я" />
        <CustomInput type="text" placeholder="Телефон" />
        <CustomInput type="text" placeholder="Дата народження" />
      </div>
      <div className="selector">
        <div>O</div>
        <div>O</div>
      </div>
      <div className="form-button">
        <CustomButtonBG content="Далі" />
        <div>Скасувати</div>
      </div>
    </>
  );
};
