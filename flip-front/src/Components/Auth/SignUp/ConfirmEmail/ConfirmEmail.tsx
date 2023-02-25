import axios from "axios";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

export const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const CheckToken = (): boolean => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      axios
        .post("account/email-confirm", { email, token })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            navigate("/");
            window.location.reload();
          }
        })
        .catch((err) => {
          alert("Помилка у підтвердженні пошти!");
        });
      return true;
    } else return false;
  };

  return <div>{!CheckToken() && <Navigate to="error/404" />}</div>;
};
