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
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { useTranslation } from "react-i18next";
import axios from "axios";
import lodash from "lodash";

export const RegPhaseOne = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reg = useTypedSelector((state) => state.reg);
  const [t] = useTranslation("translation");

  useEffect(() => {
    document.title = t("auht.signup.reg_p1.title_page");
  }, []);

  const initialValues: RegPhase1Res = {
    Name: reg.data?.Name || "",
    Phone: reg.data?.Phone || "",
    DateOfBirth: new Date(new Date()),
  };

  const phoneRegExp = /^([\+]?[380]{3}?|[0])[0-9]{9}$/;

  const Reg1Schema = yup.object({
    Name: yup
      .string()
      .min(5, t("auht.signup.reg_p1.yup.name.min").toString())
      .max(15, t("auht.signup.reg_p1.yup.name.max").toString())
      .test(
        "check-name",
        t("auht.signup.reg_p1.yup.name.exist").toString(),
        async (value) => {
          try {
            const response = await axios.get(`account/check-name/${value}`);

            if (response.status === 200) return true;
            else return false;
          } catch (error) {
            return false;
          }
        }
      )
      .required(t("auht.signup.reg_p1.yup.name.req").toString()),
    Phone: yup
      .string()
      .matches(phoneRegExp, t("auht.signup.reg_p1.yup.phone").toString()),
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
      <div className={styles.reg_label}>Реєстрація</div>

      <FormikProvider value={formik}>
        <Form className={`${styles.form} dflex-column`} onSubmit={handleSubmit}>
          <div className={`${styles.form_input} dflex-column`}>
            <CustomInput
              type="text"
              placeholder={t("auht.signup.reg_p1.name_ph")}
              value={values.Name}
              onChange={handleChange}
              onBlur={handleBlur}
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
              name="DateOfBirth"
            />
            {touched.DateOfBirth && errors.DateOfBirth && (
              <div className={styles.error}>
                <ErrorMessage name="DateOfBirth" />
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
