import { useEffect, useState } from "react";
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
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const RegPhaseOne = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reg = useTypedSelector((state) => state.reg);
  const [t] = useTranslation("translation");

  const [typingTimeout, setTypingTimeout] = useState<any>();
  const [typingTimeout2, setTypingTimeout2] = useState<any>();

  const theme = useTypedSelector((state) => state.theme.mode);
  const [mode, setMode] = useState<string>("light");

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
  }, [theme]);

  useEffect(() => {
    document.title = t("auht.signup.reg_p1.title_page");
  }, []);

  const initialValues: RegPhase1Res = {
    Name: reg.data?.Name || "",
    Phone: reg.data?.Phone || "",
    DateOfBirth: new Date(new Date()),
  };

  const phoneRegExp = /^([\+]{1}[0-9]{1,3}?)[0-9]{9}$/;

  const Reg1Schema = yup.object({
    Name: yup
      .string()
      .min(5, t("auht.signup.reg_p1.yup.name.min").toString())
      .max(15, t("auht.signup.reg_p1.yup.name.max").toString())
      .test(
        "checkName",
        t("auht.signup.reg_p1.yup.name.exist").toString(),
        async (value) => {
          if (typingTimeout) clearTimeout(typingTimeout);
          return new Promise((resolve) => {
            setTypingTimeout(
              setTimeout(async () => {
                await axios.get(`account/check-name/${value}`).then((res) => {
                  if (res.status == 200) return resolve(true);
                  else return resolve(false);
                });
              }, 500)
            );
          });
        }
      )
      .required(t("auht.signup.reg_p1.yup.name.req").toString()),
    Phone: yup
      .string()
      .min(10, t("auht.signup.reg_p1.yup.phone.max_min").toString())
      .max(13, t("auht.signup.reg_p1.yup.phone.max_min").toString())
      .matches(phoneRegExp, t("auht.signup.reg_p1.yup.phone.bad").toString())
      .notRequired()
      .test(
        "check-email",
        t("auht.signup.reg_p1.yup.phone.exist").toString(),
        async (value) => {
          if (typingTimeout2) clearTimeout(typingTimeout2);
          return new Promise((resolve) => {
            setTypingTimeout2(
              setTimeout(async () => {
                await axios.get(`account/check-phone/${value}`).then((res) => {
                  if (res.status == 200) return resolve(true);
                  else return resolve(false);
                });
              }, 500)
            );
          });
        }
      ),
    DateOfBirth: yup
      .date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "yyyy-MM-dd", new Date());
        return result;
      })
      .test(
        "DateOfBirth",
        t("auht.signup.reg_p1.yup.date_birth").toString(),
        function (value) {
          return getAge(new Date(value as Date)) >= 18;
        }
      ),
  });

  const PhaseOne = (value: RegPhase1Res) => {
    dispatch({
      type: "REG",
      payload: {
        data: {
          Name: value.Name,
          Phone: value.Phone,
          DateOfBirth: value.DateOfBirth,
        },
      },
    });

    dispatch({
      type: "REG-PHASE",
      payload: {
        phase: SelectPhase.phaseTwo,
      },
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Reg1Schema,
    onSubmit: PhaseOne,
    validateOnChange: true,
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
      <div
        className={mode === "light" ? styles.reg_label_l : styles.reg_label_d}
      >
        Реєстрація
      </div>

      <FormikProvider value={formik}>
        <Form className={`${styles.form} dflex-column`} onSubmit={handleSubmit}>
          <div className={`${styles.form_input} dflex-column`}>
            <CustomInput
              type="text"
              placeholder={t("auht.signup.reg_p1.name_ph")}
              value={values.Name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.Name && errors.Name ? true : false}
              name="Name"
            />
            {touched.Name && errors.Name && (
              <div className={styles.error}>{errors.Name}</div>
            )}

            <CustomInput
              type="text"
              placeholder={t("auht.signup.reg_p1.phone_ph")}
              value={values.Phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.Phone && errors.Phone ? true : false}
              name="Phone"
            />
            {touched.Phone && errors.Phone && (
              <div className={styles.error}>{errors.Phone}</div>
            )}

            <CustomInput
              type="date"
              placeholder={t("auht.signup.reg_p1.date_ph")}
              value={values.DateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.DateOfBirth && errors.DateOfBirth ? true : false}
              name="DateOfBirth"
            />
            {touched.DateOfBirth && errors.DateOfBirth && (
              <div className={styles.error}>
                <ErrorMessage name="DateOfBirth" />
              </div>
            )}
          </div>

          <div className={styles.selector}>
            {mode === "light" ? (
              <>
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
              </>
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="9"
                    fill="url(#paint0_linear_1649_9365)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1649_9365"
                      x1="-3.49103"
                      y1="16.2"
                      x2="18.3145"
                      y2="15.7189"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#48D824" />
                      <stop offset="1" stopColor="#10D0EA" />
                    </linearGradient>
                  </defs>
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
              </>
            )}
          </div>

          <CustomButtonBG
            content={t("auht.signup.reg_p1.btn_next")}
            type="submit"
            disabled={!(dirty && isValid)}
            error={!(dirty && isValid)}
          />
        </Form>
      </FormikProvider>

      <CustomMiniBTN
        content={t("auht.signup.reg_p1.btn_cancel")}
        onClick={() => navigate(-1)}
      />
    </>
  );
};
