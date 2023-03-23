import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { JwtDecoder } from "../../../../Interface/JwtDecoder";
import { LazyLoading } from "../../../LazyLoading/LazyLoading";
import { ToastActionTypes } from "../../../Toast/store/type";

export const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");

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

  const PostAuth = async (token) => {
    const { data: dataLocation } = await axios.get("https://ipinfo.io/json");

    const tokenDecode: JwtDecoder = jwtDecode(token);

    const res = await axios.post(
      "account/add-authentication",
      {
        userId: tokenDecode.UserId,
        browser: getBrowser(window.navigator.userAgent),
        device: window.navigator.userAgentData?.platform,
        city: dataLocation.city,
        region: dataLocation.region,
        country: dataLocation.country,
        location: dataLocation.loc,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  };

  const { mutateAsync: PostAuthAsync } = useMutation(PostAuth);

  const PostConfirm = async ({ email: email, token: token }) => {
    const res = await axios.post("account/email-confirm", {
      email: email,
      token: token,
    });

    return res;
  };

  const { isLoading, isError, mutateAsync } = useMutation(PostConfirm, {
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      PostAuthAsync(res.data.token);

      navigate("/");
      window.location.reload();

      setTimeout(() => {
        dispatch({
          type: ToastActionTypes.SHOW,
          payload: {
            message: t("toast.success.confirm-email"),
            type: "success",
          },
        });
      }, 400);
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

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) mutateAsync({ email: email, token: token });
    else navigate("/");
  }, []);

  return (
    <>
      {isLoading && <LazyLoading />}
      {isError && <Navigate to="error/400" />}
    </>
  );
};
