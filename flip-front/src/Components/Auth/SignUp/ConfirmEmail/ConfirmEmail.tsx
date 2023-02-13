import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

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
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        })
        .catch((err) => {
          alert("Помилка у підтвердженні пошти!");
        })
        .finally(() => navigate("/"));
      return true;
    } else return false;
  };

  return (
    <div>
      {!CheckToken() && (
        <>Щось пішло не так! Можливо, помилка в неправильній силі!</>
      )}
    </div>
  );
};
