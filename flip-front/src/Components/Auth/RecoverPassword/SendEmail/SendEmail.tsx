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

export const SendEmail = ({ onClick }) => {
  const navigate = useNavigate();
  const [t] = useTranslation("translation");

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

  const { isLoading, mutate } = useMutation(PostEmail, {
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
    onSubmit: (values) => mutate(values.Email),
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

      <div className={styles.header}>
        {t("auht.recoverPass.sendEmail.header")}
      </div>
      <div className={styles.description}>
        {t("auht.recoverPass.sendEmail.description")}
      </div>
      <FormikProvider value={formik}>
        <Form className={`${styles.form} dflex-column`} onSubmit={handleSubmit}>
          <CustomInput
            type="text"
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
