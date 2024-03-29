import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { UserLogin } from "../../../Interface/Login";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import styles from "./SignIn.module.scss";
import {
  CustomButton,
  CustomButtonBG,
  CustomMiniBTN,
} from "../../../Components/MainBlock/Button/CustomButton";
import { CustomInput } from "../../../Components/MainBlock/Input/CustomInput";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { LazyLoading } from "../../../Components/LazyLoading/LazyLoading";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import jwtDecode from "jwt-decode";
import { JwtDecoder } from "../../../Interface/JwtDecoder";

export const SignIn = () => {
  const [visible, setVisoiblity] = useState(false);
  const [bot, setBot] = useState<boolean>(false);

  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [t] = useTranslation("translation");

  const [mode, setMode] = useState<string>("light");
  const theme = useTypedSelector((state) => state.theme.mode);

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
  }, [theme]);

  useEffect(() => {
    document.title = t("auht.signin.title_page");
  }, []);

  const initialValues: UserLogin = {
    Name: "",
    Password: "",
  };

  const LoginSchema = yup.object({
    Name: yup.string().required(t("auht.signin.yup.name").toString()),
    Password: yup.string().required(t("auht.signin.yup.password").toString()),
  });

  const getBrowser = (userAgent) => {
    if (userAgent.includes("Firefox")) {
      return "Mozilla Firefox";
    } else if (userAgent.includes("SamsungBrowser")) {
      return "Samsung Internet";
    } else if (
      userAgent.includes("Opera") ||
      userAgent.includes("OPR") ||
      userAgent.includes("Opera GX")
    ) {
      return "Opera";
    } else if (userAgent.includes("Edge")) {
      return "Microsoft Edge (Legacy)";
    } else if (userAgent.includes("Edg")) {
      return "Microsoft Edge (Chromium)";
    } else if (userAgent.includes("Chrome")) {
      return "Google Chrome or Chromium";
    } else if (userAgent.includes("Safari")) {
      return "Apple Safari";
    } else {
      return "unknown";
    }
  };

  const PostLogin = async (value: UserLogin) => {
    if (!executeRecaptcha) {
      setBot(true);
      return;
    }

    if (bot) return;

    value.RecaptchaToken = await executeRecaptcha();

    const response = await axios.post("account/login", value);
    return response;
  };

  const PostAuth = async (token) => {
    const { data: dataLocation } = await axios.get(
      "https://geolocation-db.com/json/",
      {
        transformRequest: (data, headers) => {
          delete headers["Authorization"];
          return data;
        },
      }
    );

    const tokenDecode: JwtDecoder = jwtDecode(token);

    const res = await axios.post(
      "account/add-authentication",
      {
        userId: tokenDecode.UserId,
        ipAddress: dataLocation.IPv4,
        browser: getBrowser(window.navigator.userAgent),
        device: window.navigator.platform,
        city: dataLocation.city,
        country: dataLocation.country_name,
        latitude: dataLocation.latitude,
        longitude: dataLocation.longitude,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  };

  const { isLoading: isLoadingAuth, mutateAsync: PostAuthAsync } =
    useMutation(PostAuth);

  const { isLoading, mutateAsync } = useMutation(PostLogin, {
    onSuccess: async (res) => {
      localStorage.setItem("token", res?.data.token);
      localStorage.setItem("refreshToken", res?.data.refreshToken);

      await PostAuthAsync(res?.data.token);

      navigate("/");
      window.location.reload();
    },
    onError: () => {
      errors.Name = t("auht.signin.yup.error").toString();
      errors.Password = t("auht.signin.yup.error").toString();
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
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
      {(isLoading && <LazyLoading />) || (isLoadingAuth && <LazyLoading />)}

      <div
        className={`${styles.log_header} ${
          mode === "light" ? styles.header_l : styles.header_d
        }`}
      >
        {t("auht.signin.header")}
      </div>

      <FormikProvider value={formik}>
        <Form
          className={`${styles.log_form} dflex-column`}
          onSubmit={handleSubmit}
        >
          <CustomInput
            value={values.Name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="Name"
            type="text"
            placeholder={t("auht.signin.login_ph")}
            error={touched.Name && errors.Name ? true : false}
          />
          {touched.Name && errors.Name && (
            <div className={styles.error}>{errors.Name}</div>
          )}

          <div className={styles.form_pass}>
            <CustomInput
              type={visible ? "text" : "password"}
              value={values.Password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="Password"
              placeholder={t("auht.signin.password_ph")}
              error={touched.Password && errors.Password ? true : false}
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
                {mode === "light" ? (
                  <>
                    {errors.Password && touched.Password ? (
                      <path
                        d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                        stroke="#9D3535"
                        strokeWidth="2"
                      />
                    ) : (
                      <>
                        <path
                          d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                          stroke="#939292"
                          strokeWidth="2"
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {errors.Password && touched.Password ? (
                      <path
                        d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                        stroke="#9D3535"
                        strokeWidth="2"
                      />
                    ) : (
                      <>
                        <path
                          d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                          stroke="#F8F8F8"
                          strokeWidth="2"
                        />
                      </>
                    )}
                  </>
                )}
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
                {mode === "light" ? (
                  <>
                    {errors.Password && touched.Password ? (
                      <>
                        <path
                          d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                          stroke="#9D3535"
                          strokeWidth="2"
                        />
                        <line
                          x1="24"
                          y1="1"
                          x2="1"
                          y2="24"
                          stroke="#9D3535"
                          strokeWidth="2"
                        />
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {errors.Password && touched.Password ? (
                      <>
                        <path
                          d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                          stroke="#9D3535"
                          strokeWidth="2"
                        />
                        <line
                          x1="24"
                          y1="1"
                          x2="1"
                          y2="24"
                          stroke="#9D3535"
                          strokeWidth="2"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                          stroke="#F8F8F8"
                          strokeWidth="2"
                        />
                        <line
                          x1="24"
                          y1="1"
                          x2="1"
                          y2="24"
                          stroke="#F8F8F8"
                          strokeWidth="2"
                        />
                      </>
                    )}
                  </>
                )}
              </svg>
            )}
          </div>
          {touched.Password && errors.Password && (
            <div className={styles.error}>{errors.Password}</div>
          )}

          <CustomButtonBG
            content={t("auht.signin.btn_login")}
            type="submit"
            disabled={!(dirty && isValid)}
            error={!(dirty && isValid)}
          />
        </Form>
      </FormikProvider>

      <div className={`dflex-column ${styles.form_btn}`}>
        <CustomMiniBTN
          onClick={() => navigate("/recover-password")}
          content={t("auht.signin.btn_rec_psw")}
        />

        <div className={styles.log_or}>
          <svg
            width="230"
            height="2"
            viewBox="0 0 181 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mode === "light" ? (
              <>
                <line
                  x1="0.5"
                  y1="1"
                  x2="180.5"
                  y2="1"
                  stroke="black"
                  strokeLinecap="square"
                />
              </>
            ) : (
              <>
                <line
                  x1="0.5"
                  y1="1"
                  x2="180.5"
                  y2="1"
                  stroke="#f8f8f8"
                  strokeLinecap="square"
                />
              </>
            )}
          </svg>
          <div className={mode === "light" ? styles.or_l : styles.or_d}>
            {t("auht.signin.or")}
          </div>
          <svg
            width="230"
            height="2"
            viewBox="0 0 181 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mode === "light" ? (
              <>
                <line
                  x1="0.5"
                  y1="1"
                  x2="180.5"
                  y2="1"
                  stroke="black"
                  strokeLinecap="square"
                />
              </>
            ) : (
              <>
                <line
                  x1="0.5"
                  y1="1"
                  x2="180.5"
                  y2="1"
                  stroke="#f8f8f8"
                  strokeLinecap="square"
                />
              </>
            )}
          </svg>
        </div>

        <div className={`${styles.log_other_btn} dflex-column`}>
          <CustomButton
            content={t("auht.signin.btn_reg")}
            className={styles.btn_reg}
            onClick={() => navigate("/signup")}
          />

          <CustomMiniBTN
            onClick={() => navigate(-1)}
            content={t("auht.signin.btn_cancel")}
          />
        </div>
      </div>
    </>
  );
};
