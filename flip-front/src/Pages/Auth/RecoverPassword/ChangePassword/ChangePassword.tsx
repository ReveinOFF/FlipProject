import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CustomButton,
  CustomMiniBTN,
} from "../../../../Components/MainBlock/Button/CustomButton";
import { CustomInput } from "../../../../Components/MainBlock/Input/CustomInput";
import * as yup from "yup";
import styles from "./ChangePassword.module.scss";
import axios from "axios";
import { useMutation } from "react-query";
import { Form, FormikProvider, useFormik } from "formik";
import { ConfirmPassword, RecoveryPassword } from "../../../../Interface/Login";
import { useDispatch } from "react-redux";
import { LazyLoading } from "../../../../Components/LazyLoading/LazyLoading";
import { ToastActionTypes } from "../../../../Components/Toast/store/type";
import { useTranslation } from "react-i18next";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [t] = useTranslation("translation");

  const [email, setEmail] = useState<string>();
  const [token, setToken] = useState<string>();
  const [visible, setVisoiblity] = useState(false);
  const [visible2, setVisoiblity2] = useState(false);

  useEffect(() => {
    document.title = t("auht.recoverPass.changePass.title");
  }, []);

  useEffect(() => {
    setToken(searchParams.get("token") as string);
    setEmail(searchParams.get("email") as string);
  }, [searchParams]);

  const initialValues: RecoveryPassword = {
    password: "",
    confirmPassword: "",
  };

  const PasswordSchema = yup.object({
    password: yup
      .string()
      .min(8, t("auht.recoverPass.changePass.yup.password.min").toString())
      .max(20, t("auht.recoverPass.changePass.yup.password.max").toString())
      .required(t("auht.recoverPass.changePass.yup.password.req").toString()),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        t("auht.recoverPass.changePass.yup.confirmPassword.one").toString()
      )
      .required(
        t("auht.recoverPass.changePass.yup.confirmPassword.req").toString()
      ),
  });

  const PostPassword = async (password: RecoveryPassword) => {
    const confirmPass: ConfirmPassword = {
      email: email as string,
      newPassword: password.password,
      token: token as string,
    };

    const res = await axios.post("account/password-confirm", confirmPass, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  const { isLoading, mutate } = useMutation(PostPassword, {
    onSuccess: () => {
      navigate("/signin");
    },
    onError: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.error.confirm-email"),
          type: "error",
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: PasswordSchema,
    onSubmit: (values) => mutate(values),
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
        {t("auht.recoverPass.changePass.header")}
      </div>
      <FormikProvider value={formik}>
        <Form className={`${styles.form} dflex-column`} onSubmit={handleSubmit}>
          <div className={styles.input_menu}>
            <CustomInput
              type={visible ? "text" : "password"}
              placeholder={t("auht.recoverPass.changePass.password")}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              error={touched.password && errors.password}
            />
            {visible ? (
              <svg
                onClick={() => setVisoiblity(false)}
                className={styles.password_show}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                  stroke="#939292"
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg
                onClick={() => setVisoiblity(true)}
                width="32"
                height="25"
                viewBox="0 0 32 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12.4118C3.00272 5.76373 8.96217 0.941162 16 0.941162C23.0394 0.941162 28.9973 5.76373 31 12.4118C28.9973 19.0598 23.0394 23.8823 16 23.8823C8.96217 23.8823 3.00272 19.0598 1 12.4118Z"
                  stroke="#F5F5F5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.7152 12.4118C20.7152 13.7156 20.2183 14.966 19.3339 15.8879C18.4495 16.8099 17.25 17.3278 15.9992 17.3278C14.7484 17.3278 13.5489 16.8099 12.6645 15.8879C11.7801 14.966 11.2832 13.7156 11.2832 12.4118C11.2832 11.108 11.7801 9.85762 12.6645 8.9357C13.5489 8.01378 14.7484 7.49585 15.9992 7.49585C17.25 7.49585 18.4495 8.01378 19.3339 8.9357C20.2183 9.85762 20.7152 11.108 20.7152 12.4118Z"
                  stroke="#F5F5F5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="31.3042"
                  y1="1.3968"
                  x2="1.30422"
                  y2="24.3968"
                  stroke="#F5F5F5"
                />
              </svg>
            )}
          </div>
          {touched.password && errors.password && (
            <div className={styles.error}>{errors.password}</div>
          )}

          <div className={styles.input_menu}>
            <CustomInput
              type={visible2 ? "text" : "password"}
              placeholder={t("auht.recoverPass.changePass.confirmPass")}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirmPassword"
              error={touched.confirmPassword && errors.confirmPassword}
            />
            {visible2 ? (
              <svg
                onClick={() => setVisoiblity2(false)}
                className={styles.password_show}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                  stroke="#939292"
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg
                onClick={() => setVisoiblity2(true)}
                width="32"
                height="25"
                viewBox="0 0 32 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12.4118C3.00272 5.76373 8.96217 0.941162 16 0.941162C23.0394 0.941162 28.9973 5.76373 31 12.4118C28.9973 19.0598 23.0394 23.8823 16 23.8823C8.96217 23.8823 3.00272 19.0598 1 12.4118Z"
                  stroke="#F5F5F5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.7152 12.4118C20.7152 13.7156 20.2183 14.966 19.3339 15.8879C18.4495 16.8099 17.25 17.3278 15.9992 17.3278C14.7484 17.3278 13.5489 16.8099 12.6645 15.8879C11.7801 14.966 11.2832 13.7156 11.2832 12.4118C11.2832 11.108 11.7801 9.85762 12.6645 8.9357C13.5489 8.01378 14.7484 7.49585 15.9992 7.49585C17.25 7.49585 18.4495 8.01378 19.3339 8.9357C20.2183 9.85762 20.7152 11.108 20.7152 12.4118Z"
                  stroke="#F5F5F5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="31.3042"
                  y1="1.3968"
                  x2="1.30422"
                  y2="24.3968"
                  stroke="#F5F5F5"
                />
              </svg>
            )}
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword}</div>
          )}

          <CustomButton
            content={t("auht.recoverPass.changePass.btn")}
            type="submit"
            disabled={!(dirty && isValid)}
            error={!(dirty && isValid)}
          />
          <CustomMiniBTN
            content={t("auht.recoverPass.changePass.miniBtn")}
            onClick={() => navigate("/")}
          />
        </Form>
      </FormikProvider>
    </>
  );
};
