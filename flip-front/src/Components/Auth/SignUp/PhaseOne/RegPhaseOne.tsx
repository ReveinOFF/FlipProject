import { useEffect } from "react";
import { RegPhase1Res } from "../../../../Interface/Registration";
import {
  CustomButtonBG,
  CustomMiniBTN,
} from "../../../MainBlock/Button/CustomButton";
import { CustomInput } from "../../../MainBlock/Input/CustomInput";
import * as yup from "yup";
import { ErrorMessage, Form, FormikProvider, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { SelectPhase } from "../store/types";
import styles from "./RegPhaseOne.module.scss";
import { useNavigate } from "react-router-dom";
import { getAge } from "../../../Convertor/convertDate";
import { parse } from "date-fns";

export const RegPhaseOne = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign Up | Phase One - Flip";
  }, []);

  const initialValues: RegPhase1Res = {
    name: "",
    phone: "",
    dateBirth: new Date(new Date()),
  };

  const phoneRegExp = /^([\+]?[380]{3}?|[0])[0-9]{9}$/;

  const Reg1Schema = yup.object({
    name: yup
      .string()
      .min(5, "Ім'я повинно містити не менше 5 символів!")
      .max(15, "Ім'я повинно містити не більше 15 символів!")
      .required("Ім'я є обов'язковим полем!"),
    phone: yup.string().matches(phoneRegExp, "Номер телефона неправильний!"),
    dateBirth: yup
      .date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "dd.MM.yyyy", new Date());
        return result;
      })
      .test(
        "DateOfBirth",
        "Вам повинно бути не менше 18 років!",
        function (value) {
          return getAge(new Date(value as Date)) >= 18;
        }
      ),
  });

  const PhaseOne = (value: RegPhase1Res) => {
    dispatch({
      type: "REG",
      payload: {
        phase: SelectPhase.phaseTwo,
        data: {
          name: value.name,
          phone: value.phone,
          dateBirth: value.dateBirth,
        },
      },
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Reg1Schema,
    onSubmit: PhaseOne,
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    isValid,
    dirty,
  } = formik;

  return (
    <>
      <div className={styles.reg_label}>Реєстрація</div>

      <FormikProvider value={formik}>
        <Form className={`${styles.form} dflex-column`} onSubmit={handleSubmit}>
          <div className={`${styles.form_input} dflex-column`}>
            <CustomInput
              type="text"
              placeholder="Ім'я"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
            />
            {touched.name && errors.name && (
              <div className={styles.error}>{errors.name}</div>
            )}

            <CustomInput
              type="text"
              placeholder="Телефон"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              name="phone"
            />
            {touched.phone && errors.phone && (
              <div className={styles.error}>{errors.phone}</div>
            )}

            <CustomInput
              type="date"
              placeholder="Дата народження"
              value={values.dateBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              name="dateBirth"
            />
            {touched.dateBirth && errors.dateBirth && (
              <div className={styles.error}>
                <ErrorMessage name="dateBirth" />
              </div>
            )}
          </div>

          <div className={styles.selector}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="9" r="9" fill="#575757" />
            </svg>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="9" r="9" fill="#D9D9D9" />
            </svg>
          </div>

          <CustomButtonBG
            content="Далі"
            type="submit"
            disabled={!(dirty && isValid)}
            error={!(dirty && isValid)}
          />
        </Form>
      </FormikProvider>

      <CustomMiniBTN content="Скасувати" onClick={() => navigate(-1)} />
    </>
  );
};
