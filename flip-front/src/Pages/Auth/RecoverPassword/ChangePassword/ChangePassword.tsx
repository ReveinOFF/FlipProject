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
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [t] = useTranslation("translation");

  const [email, setEmail] = useState<string>();
  const [token, setToken] = useState<string>();
  const [visible, setVisoiblity] = useState(false);
  const [visible2, setVisoiblity2] = useState(false);

  const [mode, setMode] = useState<string>("light");
  const theme = useTypedSelector((state) => state.theme.mode);

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
  }, [theme]);

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

  const { isLoading, mutateAsync } = useMutation(PostPassword, {
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
    onSubmit: (values) => mutateAsync(values),
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
                <line
                  x1="24"
                  y1="1"
                  x2="1"
                  y2="24"
                  stroke="#939292"
                  strokeWidth="2"
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
                <line
                  x1="24"
                  y1="1"
                  x2="1"
                  y2="24"
                  stroke="#939292"
                  strokeWidth="2"
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
