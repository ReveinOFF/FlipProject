import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import "./SignInStyle.css";
import { UserLogin } from "../../../Interface/Login";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const SignIn = () => {
  const navigate = useNavigate();
  const [visible, setVisoiblity] = useState(false);
  const [bot, setBot] = useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    document.title = "Sign In - Flip";
  }, []);

  const initialValues: UserLogin = {
    name: "",
    password: "",
  };

  const LoginSchema = yup.object({
    name: yup.string().required("Логін є обов'язкови полем"),
    password: yup.string().required("Пароль є обов'язкови полем"),
  });

  const PostLogin = async (value: UserLogin) => {
    if (!executeRecaptcha) {
      setBot(true);
      return;
    }

    const recaptchaToken = await executeRecaptcha();
    value.reCaptchaToken = recaptchaToken;

    await axios
      .post("account/login", value)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      })
      .finally(() => navigate("/"));
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: PostLogin,
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
      <div className="header">Вхід</div>
      <FormikProvider value={formik}>
        <Form className="form" onSubmit={handleSubmit}>
          <input
            className={
              errors.name && touched.name ? "error-input" : "input-name"
            }
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            type="text"
            placeholder="E-Mail або нікнейм"
          />
          {touched.name && errors.name && (
            <div className="error">{errors.name}</div>
          )}

          <div className="form-pass">
            <input
              className={
                errors.password && touched.password
                  ? "input-pasw error-input"
                  : "input-pasw"
              }
              type={visible ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              placeholder="Пароль"
            />
            <svg
              onClick={() => setVisoiblity((visible) => !visible)}
              className="password-show"
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
          </div>
          {touched.password && errors.password && (
            <div className="error">{errors.password}</div>
          )}

          <button
            className={!(dirty && isValid) ? "btn-log-error" : "btn-log"}
            type="submit"
            disabled={!(dirty && isValid)}
          >
            Увійти
          </button>
        </Form>
      </FormikProvider>
      <div className="other">
        <div className="data">
          <div className="fake-btn">
            <div>Забув(ла) пароль?</div>
            <div className="loader"></div>
          </div>
        </div>
        <div className="or">
          <svg
            width="230"
            height="2"
            viewBox="0 0 181 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.5"
              y1="1"
              x2="180.5"
              y2="1"
              stroke="black"
              strokeLinecap="square"
            />
          </svg>
          <div>або</div>
          <svg
            width="230"
            height="2"
            viewBox="0 0 181 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.5"
              y1="1"
              x2="180.5"
              y2="1"
              stroke="black"
              strokeLinecap="square"
            />
          </svg>
        </div>
        <div className="other-btn">
          <button className="btn-reg" onClick={() => navigate("/signup")}>
            Зареєструватись
          </button>
          <div className="fake-btn cancel" onClick={() => navigate(-1)}>
            <Link className="link" to="/">
              Скасувати
            </Link>
            <div className="loader"></div>
          </div>
        </div>
      </div>
    </>
  );
};
