import { Form, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  CustomButton,
  CustomMiniBTN,
} from "../../../MainBlock/Button/CustomButton";
import { CustomInput } from "../../../MainBlock/Input/CustomInput";
import * as yup from "yup";
import styles from "./SendEmail.module.scss";
import { useMutation } from "react-query";
import { LazyLoading } from "../../../LazyLoading/LazyLoading";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";

export const SendEmail = ({ onClick }) => {
  const navigate = useNavigate();
  const [t] = useTranslation("translation");

  const [mode, setMode] = useState<string>("light");
  const theme = useTypedSelector((state) => state.theme.mode);

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
  }, [theme]);

  const initialValues = {
    Email: "",
  };

  const RecoverySchema = yup.object({
    Email: yup
      .string()
      .email(t("auht.recoverPass.sendEmail.yup.email").toString())
      .required(t("auht.recoverPass.sendEmail.yup.req").toString()),
  });

  const PostEmail = async (email: string) => {
    const res = await axios.post("account/recover-password", email, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  const { isLoading, mutateAsync } = useMutation(PostEmail, {
    onSuccess: () => {
      onClick();
    },
    onError: () => {
      errors.Email = t("auht.recoverPass.sendEmail.yup.error").toString();
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RecoverySchema,
    onSubmit: (values) => mutateAsync(values.Email),
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
      {isLoading && <LazyLoading />}

      <div className={mode === "light" ? styles.header : styles.header_dark}>
        {t("auht.recoverPass.sendEmail.header")}
      </div>
      <div
        className={
          mode === "light" ? styles.description : styles.description_dark
        }
      >
        {t("auht.recoverPass.sendEmail.description")}
      </div>
      <FormikProvider value={formik}>
        <Form className={`${styles.form} dflex-column`} onSubmit={handleSubmit}>
          <CustomInput
            type="email"
            placeholder={t("auht.recoverPass.sendEmail.email")}
            value={values.Email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="Email"
            error={touched.Email && errors.Email}
          />
          {touched.Email && errors.Email && (
            <div className={styles.error}>{errors.Email}</div>
          )}
          <CustomButton
            content={t("auht.recoverPass.sendEmail.btn")}
            type="submit"
            disabled={!(dirty && isValid)}
            error={!(dirty && isValid)}
          />
          <CustomMiniBTN
            onClick={() => navigate(-1)}
            content={t("auht.recoverPass.sendEmail.miniBtn")}
          />
        </Form>
      </FormikProvider>
    </>
  );
};
