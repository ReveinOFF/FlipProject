import axios from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LazyLoading } from "../../../Components/LazyLoading/LazyLoading";
import { ToastActionTypes } from "../../../Components/Toast/store/type";
import styles from "./Settings.module.scss";

export const Settings = () => {
  const [t] = useTranslation("translation");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = t("main.settings.title_page");
  }, []);

  const Logout = async () => {
    const refreshToken = await localStorage.getItem("refreshToken");
    const res = await axios.post("account/revoke-token", refreshToken, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  const { isLoading, mutateAsync } = useMutation(Logout, {
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      navigate("/");
      window.location.reload();
    },
    onError: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.error.logout"),
          type: "error",
        },
      });
    },
  });

  return (
    <>
      {isLoading && <LazyLoading />}

      <div className={styles.search}>
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0625 19.0312C5.11875 19.0312 1.09375 15.0062 1.09375 10.0625C1.09375 5.11875 5.11875 1.09375 10.0625 1.09375C10.4212 1.09375 10.7188 1.39125 10.7188 1.75C10.7188 2.10875 10.4212 2.40625 10.0625 2.40625C5.83625 2.40625 2.40625 5.845 2.40625 10.0625C2.40625 14.28 5.83625 17.7187 10.0625 17.7187C14.2887 17.7187 17.7188 14.28 17.7188 10.0625C17.7188 9.70375 18.0163 9.40625 18.375 9.40625C18.7337 9.40625 19.0312 9.70375 19.0312 10.0625C19.0312 15.0062 15.0063 19.0312 10.0625 19.0312ZM19.25 19.9071C19.0838 19.9071 18.9175 19.8459 18.7862 19.7146L17.0362 17.9646C16.9142 17.8411 16.8458 17.6745 16.8458 17.5009C16.8458 17.3272 16.9142 17.1606 17.0362 17.0371C17.29 16.7834 17.71 16.7834 17.9638 17.0371L19.7138 18.7871C19.9675 19.0409 19.9675 19.4609 19.7138 19.7146C19.5825 19.8459 19.4162 19.9071 19.25 19.9071Z"
            fill="#474747"
          />
          <path
            d="M15.3124 8.34729C14.5074 8.34729 12.6349 7.36729 12.0574 5.56479C11.6636 4.33104 12.1186 2.71229 13.5449 2.24854C14.1574 2.04729 14.7961 2.14354 15.3036 2.46729C15.8024 2.14354 16.4586 2.05604 17.0711 2.24854C18.4974 2.71229 18.9611 4.33104 18.5586 5.56479C17.9899 7.40229 16.0211 8.34729 15.3124 8.34729ZM13.3086 5.17104C13.7111 6.43979 15.0761 7.01729 15.3211 7.04354C15.6011 7.01729 16.9399 6.36979 17.3074 5.17979C17.5086 4.54104 17.3074 3.71854 16.6686 3.50854C16.3974 3.42104 16.0299 3.47354 15.8549 3.72729C15.7324 3.91104 15.5399 4.01604 15.3211 4.02479C15.2157 4.02598 15.1114 4.00199 15.0171 3.95481C14.9227 3.90764 14.841 3.83864 14.7786 3.75354C14.5774 3.46479 14.2099 3.42104 13.9474 3.49979C13.3174 3.70979 13.1074 4.53229 13.3086 5.17104Z"
            fill="#474747"
          />
        </svg>

        <input
          type="text"
          placeholder={t("main.settings.main.search").toString()}
        />
      </div>

      <div className={styles.settings_list}>
        <div
          className={styles.setting}
          onClick={() => navigate("edit-profile")}
        >
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.15655 25.2134C6.36863 25.2134 5.63238 24.9422 5.1028 24.4384C4.43113 23.8055 4.10821 22.8497 4.22446 21.8163L4.70238 17.6313C4.7928 16.8434 5.27072 15.7972 5.82613 15.2288L16.4307 4.00425C19.0786 1.20133 21.8428 1.12383 24.6457 3.77175C27.4486 6.41967 27.5261 9.18383 24.8782 11.9868L14.2736 23.2113C13.7311 23.7926 12.7236 24.3351 11.9357 24.4643L7.77655 25.1747C7.55697 25.1876 7.36322 25.2134 7.15655 25.2134ZM20.577 3.75883C19.5824 3.75883 18.717 4.37883 17.8386 5.30883L7.23405 16.5463C6.97571 16.8176 6.67863 17.4634 6.62697 17.838L6.14905 22.023C6.09738 22.4493 6.20072 22.798 6.43322 23.0176C6.66572 23.2372 7.01447 23.3147 7.44072 23.2501L11.5999 22.5397C11.9745 22.4751 12.5945 22.1393 12.8528 21.868L23.4574 10.6434C25.059 8.93842 25.6403 7.36258 23.3024 5.16675C22.2691 4.17217 21.3778 3.75883 20.577 3.75883Z"
              fill="#2F2F2F"
            />
            <path
              d="M22.3975 14.1423H22.3071C20.3496 13.9503 18.5115 13.1125 17.0827 11.7607C15.6538 10.409 14.7153 8.62033 14.415 6.67646C14.3375 6.14688 14.6992 5.65604 15.2287 5.56563C15.7583 5.48813 16.2492 5.84979 16.3396 6.37938C16.5761 7.89921 17.3109 9.29739 18.4284 10.3542C19.546 11.411 20.9831 12.0665 22.5137 12.2177C23.0433 12.2694 23.4308 12.7473 23.3792 13.2769C23.3146 13.7677 22.8883 14.1423 22.3975 14.1423ZM27.125 29.3853H3.875C3.34542 29.3853 2.90625 28.9461 2.90625 28.4165C2.90625 27.8869 3.34542 27.4478 3.875 27.4478H27.125C27.6546 27.4478 28.0937 27.8869 28.0937 28.4165C28.0937 28.9461 27.6546 29.3853 27.125 29.3853Z"
              fill="#2F2F2F"
            />
          </svg>
          <div>{t("main.settings.main.edit_profile")}</div>
        </div>

        <div
          className={styles.setting}
          onClick={() => navigate("change-email")}
        >
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.9001 13.1752H15.7585V17.9543H22.8626C22.7335 19.1168 21.9585 20.9252 20.2793 22.0877C19.246 22.8627 17.696 23.3793 15.7585 23.3793C12.4001 23.3793 9.4293 21.1835 8.39596 17.9543C8.13763 17.1793 8.00846 16.2752 8.00846 15.371C8.00846 14.4668 8.13763 13.5627 8.39596 12.7877C8.52513 12.5293 8.52513 12.271 8.6543 12.1418C9.8168 9.42933 12.5293 7.49183 15.7585 7.49183C18.2126 7.49183 19.7626 8.52516 20.796 9.42933L24.4126 5.81266C22.2168 3.87516 19.246 2.5835 15.7585 2.5835C10.721 2.5835 6.3293 5.42516 4.26263 9.68766C3.35846 11.496 2.8418 13.4335 2.8418 15.5002C2.8418 17.5668 3.35846 19.5043 4.26263 21.3127C6.3293 25.5752 10.721 28.4168 15.7585 28.4168C19.246 28.4168 22.2168 27.2543 24.2835 25.3168C26.7376 23.121 28.1585 19.7627 28.1585 15.7585C28.1585 14.7252 28.0293 13.9502 27.9001 13.1752Z"
              stroke="#2F2F2F"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div>{t("main.settings.main.change_email")}</div>
        </div>

        <div
          className={styles.setting}
          onClick={() => navigate("change-password")}
        >
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.497 29.3997C14.0891 29.3997 12.6941 28.9863 11.5962 28.1726L6.04201 24.0263C4.56951 22.9284 3.41992 20.6292 3.41992 18.808V9.19799C3.41992 7.20883 4.87951 5.09049 6.75242 4.39299L13.1978 1.97758C14.4766 1.49966 16.4916 1.49966 17.7703 1.97758L24.2158 4.39299C26.0887 5.09049 27.5483 7.20883 27.5483 9.19799V18.7951C27.5483 20.6292 26.3987 22.9155 24.9262 24.0134L19.372 28.1597C18.2999 28.9863 16.9049 29.3997 15.497 29.3997ZM13.8824 3.79883L7.437 6.21424C6.33909 6.62758 5.37034 8.02258 5.37034 9.21091V18.808C5.37034 20.0351 6.23576 21.753 7.20451 22.4763L12.7587 26.6226C14.2441 27.7334 16.7499 27.7334 18.2483 26.6226L23.8024 22.4763C24.7841 21.7401 25.6366 20.0351 25.6366 18.808V9.19799C25.6366 8.02258 24.6678 6.62758 23.5699 6.20133L17.1245 3.78591C16.2462 3.47591 14.7478 3.47591 13.8824 3.79883Z"
              fill="#2F2F2F"
            />
            <path
              d="M13.7661 18.3815C13.5207 18.3815 13.2752 18.2911 13.0815 18.0973L11.0019 16.0178C10.8217 15.8355 10.7207 15.5895 10.7207 15.3332C10.7207 15.0769 10.8217 14.8309 11.0019 14.6486C11.3765 14.274 11.9965 14.274 12.3711 14.6486L13.7661 16.0436L18.6357 11.174C19.0102 10.7994 19.6302 10.7994 20.0048 11.174C20.3794 11.5486 20.3794 12.1686 20.0048 12.5432L14.4506 18.0973C14.2569 18.2911 14.0115 18.3815 13.7661 18.3815Z"
              fill="#2F2F2F"
            />
          </svg>

          <div>{t("main.settings.main.change_pass")}</div>
        </div>

        <div className={styles.setting}>
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5007 29.3853C7.84107 29.3853 1.61523 23.1595 1.61523 15.4999C1.61523 7.84034 7.84107 1.6145 15.5007 1.6145C23.1602 1.6145 29.3861 7.84034 29.3861 15.4999C29.3861 23.1595 23.1602 29.3853 15.5007 29.3853ZM15.5007 3.552C8.91315 3.552 3.55273 8.91242 3.55273 15.4999C3.55273 22.0874 8.91315 27.4478 15.5007 27.4478C22.0882 27.4478 27.4486 22.0874 27.4486 15.4999C27.4486 8.91242 22.0882 3.552 15.5007 3.552Z"
              fill="#2F2F2F"
            />
            <path
              d="M11.6216 28.0938H10.33C9.80039 28.0938 9.36123 27.6546 9.36123 27.125C9.36123 26.5954 9.77456 26.1692 10.3041 26.1563C8.27622 19.1968 8.27622 11.8032 10.3041 4.84377C10.0512 4.83868 9.81039 4.73417 9.63392 4.55286C9.45744 4.37155 9.35948 4.12803 9.36123 3.87502C9.36123 3.34544 9.80039 2.90627 10.33 2.90627H11.6216C11.9316 2.90627 12.2287 3.06127 12.4096 3.30669C12.5904 3.56502 12.6421 3.88794 12.5387 4.18502C10.1104 11.5373 10.1104 19.4756 12.5387 26.8279C12.6421 27.125 12.5904 27.4479 12.4096 27.7063C12.2287 27.9388 11.9316 28.0938 11.6216 28.0938ZM19.3716 28.0938C19.2174 28.0951 19.0651 28.0593 18.9275 27.9895C18.79 27.9196 18.6712 27.8177 18.5813 27.6923C18.4914 27.567 18.433 27.4218 18.4109 27.2691C18.3889 27.1165 18.4038 26.9607 18.4546 26.815C20.8829 19.4627 20.8829 11.5244 18.4546 4.1721C18.4138 4.05167 18.3973 3.9244 18.4057 3.79755C18.4142 3.67071 18.4476 3.54678 18.504 3.43283C18.5603 3.31889 18.6386 3.21716 18.7343 3.13346C18.83 3.04976 18.9412 2.98573 19.0616 2.94502C19.1821 2.90431 19.3093 2.88772 19.4362 2.8962C19.563 2.90467 19.687 2.93805 19.8009 2.99442C19.9149 3.0508 20.0166 3.12906 20.1003 3.22475C20.184 3.32044 20.248 3.43167 20.2887 3.5521C22.8591 11.2968 22.8591 19.6645 20.2887 27.4092C20.1596 27.8354 19.7721 28.0938 19.3716 28.0938Z"
              fill="#2F2F2F"
            />
            <path
              d="M15.5009 22.2166C11.8971 22.2166 8.30628 21.7128 4.84461 20.6924C4.83169 21.2091 4.40544 21.6353 3.87586 21.6353C3.34628 21.6353 2.90711 21.1961 2.90711 20.6666V19.3749C2.90711 19.0649 3.06211 18.7678 3.30753 18.587C3.56586 18.4061 3.88878 18.3545 4.18586 18.4578C11.5382 20.8861 19.4765 20.8861 26.8288 18.4578C26.9749 18.4078 27.1308 18.3934 27.2836 18.4159C27.4364 18.4383 27.5816 18.497 27.7071 18.587C27.9654 18.7678 28.1075 19.0649 28.1075 19.3749V20.6666C28.1075 21.1961 27.6684 21.6353 27.1388 21.6353C26.6092 21.6353 26.1829 21.222 26.17 20.6924C22.6954 21.7128 19.1046 22.2166 15.5009 22.2166ZM27.1259 12.5936C27.0225 12.5936 26.9192 12.5807 26.8159 12.542C19.4635 10.1136 11.5253 10.1136 4.17294 12.542C3.65628 12.7099 3.11378 12.4386 2.94586 11.9349C2.79086 11.4182 3.06211 10.8757 3.56586 10.7078C11.3105 8.13744 19.6783 8.13744 27.4229 10.7078C27.9267 10.8757 28.2109 11.4311 28.03 11.9349C27.9694 12.1268 27.8489 12.2943 27.6862 12.4128C27.5235 12.5314 27.3271 12.5947 27.1259 12.5936Z"
              fill="black"
            />
          </svg>

          <div>{t("main.settings.main.lng")}</div>
        </div>

        <div className={styles.setting}>
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.26089 29.3879C6.18672 29.3879 3.66797 27.1533 3.66797 24.4021V21.7671C3.66797 21.2375 4.10714 20.7983 4.63672 20.7983C5.1663 20.7983 5.60547 21.2375 5.60547 21.7671C5.60547 23.3817 7.16839 24.5958 9.26089 24.5958C11.3534 24.5958 12.9163 23.3817 12.9163 21.7671C12.9163 21.2375 13.3555 20.7983 13.8851 20.7983C14.4146 20.7983 14.8538 21.2375 14.8538 21.7671V24.4021C14.8538 27.1533 12.348 29.3879 9.26089 29.3879ZM5.9413 25.6679C6.50964 26.7271 7.78839 27.4504 9.26089 27.4504C10.7334 27.4504 12.0121 26.7142 12.5805 25.6679C11.6634 26.2233 10.5267 26.5463 9.26089 26.5463C7.99505 26.5463 6.85839 26.2233 5.9413 25.6679Z"
              fill="#2F2F2F"
            />
            <path
              d="M9.26089 22.9929C7.14255 22.9929 5.2438 22.0242 4.30089 20.4871C3.88755 19.8154 3.66797 19.0275 3.66797 18.2267C3.66797 16.8704 4.26214 15.6046 5.34714 14.6617C7.43964 12.8275 11.0434 12.8275 13.1488 14.6488C14.2338 15.6046 14.8409 16.8704 14.8409 18.2267C14.8409 19.0275 14.6213 19.8154 14.208 20.4871C13.278 22.0242 11.3792 22.9929 9.26089 22.9929ZM9.26089 15.1783C8.25339 15.1783 7.32339 15.5142 6.62589 16.1213C5.96714 16.6896 5.60547 17.4388 5.60547 18.2267C5.60547 18.6788 5.72172 19.0921 5.95422 19.4796C6.54839 20.4613 7.81422 21.0683 9.26089 21.0683C10.7076 21.0683 11.9734 20.4613 12.5546 19.4925C12.7871 19.1179 12.9034 18.6917 12.9034 18.2396C12.9034 17.4517 12.5417 16.7025 11.883 16.1213C11.1984 15.5142 10.2684 15.1783 9.26089 15.1783Z"
              fill="#2F2F2F"
            />
            <path
              d="M9.26089 26.5437C6.07047 26.5437 3.66797 24.49 3.66797 21.7775V18.2254C3.66797 15.4741 6.1738 13.2396 9.26089 13.2396C10.7205 13.2396 12.1155 13.7433 13.1617 14.6475C14.2467 15.6033 14.8538 16.8691 14.8538 18.2254V21.7775C14.8538 24.49 12.4513 26.5437 9.26089 26.5437ZM9.26089 15.1771C7.24589 15.1771 5.60547 16.5462 5.60547 18.2254V21.7775C5.60547 23.3921 7.16839 24.6062 9.26089 24.6062C11.3534 24.6062 12.9163 23.3921 12.9163 21.7775V18.2254C12.9163 17.4375 12.5546 16.6883 11.8959 16.1071C11.1984 15.5129 10.2684 15.1771 9.26089 15.1771ZM24.593 19.1166C22.6426 19.1166 20.9892 17.67 20.8342 15.81C20.7309 14.7379 21.1184 13.6916 21.8934 12.9296C22.5392 12.2579 23.4563 11.8833 24.4251 11.8833H27.1246C28.4034 11.9221 29.3851 12.9296 29.3851 14.1696V16.8304C29.3851 18.0704 28.4034 19.0779 27.1634 19.1166H24.593ZM27.0859 13.8208H24.438C23.9859 13.8208 23.5726 13.9887 23.2755 14.2987C22.9009 14.6604 22.7201 15.1512 22.7717 15.6421C22.8363 16.4946 23.663 17.1791 24.593 17.1791H27.1246C27.2926 17.1791 27.4476 17.0241 27.4476 16.8304V14.1696C27.4476 13.9758 27.2926 13.8337 27.0859 13.8208Z"
              fill="black"
            />
            <path
              d="M20.6685 27.4478H17.4394C16.9098 27.4478 16.4706 27.0087 16.4706 26.4791C16.4706 25.9495 16.9098 25.5103 17.4394 25.5103H20.6685C24.001 25.5103 26.1581 23.3533 26.1581 20.0208V19.1166H24.5952C22.6448 19.1166 20.9914 17.6699 20.8364 15.8099C20.7331 14.7378 21.1206 13.6916 21.8956 12.9295C22.5414 12.2578 23.4585 11.8833 24.4273 11.8833H26.1452V10.9791C26.1452 7.95659 24.3756 5.877 21.5081 5.54117C21.1981 5.4895 20.9269 5.4895 20.6556 5.4895H9.0306C8.7206 5.4895 8.42352 5.51534 8.12643 5.55409C5.28477 5.91575 3.54102 7.98242 3.54102 10.9791V13.5624C3.54102 14.092 3.10185 14.5312 2.57227 14.5312C2.04268 14.5312 1.60352 14.092 1.60352 13.5624V10.9791C1.60352 7.00075 4.05768 4.12034 7.8681 3.64242C8.21685 3.59075 8.61727 3.552 9.0306 3.552H20.6556C20.9656 3.552 21.366 3.56492 21.7794 3.6295C25.5898 4.06867 28.0827 6.962 28.0827 10.9791V12.852C28.0827 13.3816 27.6435 13.8208 27.1139 13.8208H24.4273C23.9752 13.8208 23.5618 13.9887 23.2648 14.2987C22.8902 14.6603 22.7093 15.1512 22.761 15.642C22.8256 16.4945 23.6523 17.1791 24.5823 17.1791H27.1269C27.6564 17.1791 28.0956 17.6183 28.0956 18.1478V20.0208C28.0956 24.4641 25.1119 27.4478 20.6685 27.4478Z"
              fill="black"
            />
          </svg>

          <div>{t("main.settings.main.advertising")}</div>
        </div>

        <div className={styles.setting}>
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 5.63636C15.1008 5.63636 14.7663 5.50109 14.4967 5.23055C14.2262 4.96094 14.0909 4.62651 14.0909 4.22727V1.40909C14.0909 1.00985 14.2262 0.674954 14.4967 0.404409C14.7663 0.134803 15.1008 0 15.5 0C15.8992 0 16.2341 0.134803 16.5047 0.404409C16.7743 0.674954 16.9091 1.00985 16.9091 1.40909V4.22727C16.9091 4.62651 16.7743 4.96094 16.5047 5.23055C16.2341 5.50109 15.8992 5.63636 15.5 5.63636ZM22.475 8.525C22.2167 8.26667 22.0875 7.94351 22.0875 7.55555C22.0875 7.16851 22.2167 6.83409 22.475 6.55227L24.4477 4.54432C24.7295 4.2625 25.064 4.12159 25.451 4.12159C25.839 4.12159 26.1739 4.2625 26.4557 4.54432C26.714 4.80265 26.8432 5.13144 26.8432 5.53068C26.8432 5.92992 26.714 6.25871 26.4557 6.51705L24.4477 8.525C24.1894 8.78333 23.8606 8.9125 23.4614 8.9125C23.0621 8.9125 22.7333 8.78333 22.475 8.525ZM26.7727 16.9091C26.3735 16.9091 26.0391 16.7738 25.7695 16.5033C25.4989 16.2337 25.3636 15.8992 25.3636 15.5C25.3636 15.1008 25.4989 14.7659 25.7695 14.4953C26.0391 14.2257 26.3735 14.0909 26.7727 14.0909H29.5909C29.9902 14.0909 30.3246 14.2257 30.5942 14.4953C30.8647 14.7659 31 15.1008 31 15.5C31 15.8992 30.8647 16.2337 30.5942 16.5033C30.3246 16.7738 29.9902 16.9091 29.5909 16.9091H26.7727ZM15.5 31C15.1008 31 14.7663 30.8647 14.4967 30.5942C14.2262 30.3246 14.0909 29.9902 14.0909 29.5909V26.7727C14.0909 26.3735 14.2262 26.0391 14.4967 25.7695C14.7663 25.4989 15.1008 25.3636 15.5 25.3636C15.8992 25.3636 16.2341 25.4989 16.5047 25.7695C16.7743 26.0391 16.9091 26.3735 16.9091 26.7727V29.5909C16.9091 29.9902 16.7743 30.3246 16.5047 30.5942C16.2341 30.8647 15.8992 31 15.5 31ZM6.55227 8.525L4.54432 6.55227C4.2625 6.27045 4.12159 5.92992 4.12159 5.53068C4.12159 5.13144 4.2625 4.80265 4.54432 4.54432C4.80265 4.28598 5.13144 4.15682 5.53068 4.15682C5.92992 4.15682 6.25871 4.28598 6.51705 4.54432L8.525 6.55227C8.78333 6.81061 8.9125 7.13939 8.9125 7.53864C8.9125 7.93788 8.78333 8.26667 8.525 8.525C8.24318 8.78333 7.91439 8.9125 7.53864 8.9125C7.16288 8.9125 6.83409 8.78333 6.55227 8.525ZM24.4477 26.4557L22.475 24.4477C22.2167 24.1659 22.0875 23.8315 22.0875 23.4445C22.0875 23.0565 22.2167 22.7333 22.475 22.475C22.7333 22.2167 23.0565 22.0875 23.4445 22.0875C23.8315 22.0875 24.1659 22.2167 24.4477 22.475L26.4557 24.4477C26.7375 24.7061 26.8723 25.0348 26.8601 25.4341C26.8488 25.8333 26.714 26.1739 26.4557 26.4557C26.1739 26.7375 25.8333 26.8784 25.4341 26.8784C25.0348 26.8784 24.7061 26.7375 24.4477 26.4557ZM1.40909 16.9091C1.00985 16.9091 0.675424 16.7738 0.405818 16.5033C0.135273 16.2337 0 15.8992 0 15.5C0 15.1008 0.135273 14.7659 0.405818 14.4953C0.675424 14.2257 1.00985 14.0909 1.40909 14.0909H4.22727C4.62652 14.0909 4.96141 14.2257 5.23195 14.4953C5.50156 14.7659 5.63636 15.1008 5.63636 15.5C5.63636 15.8992 5.50156 16.2337 5.23195 16.5033C4.96141 16.7738 4.62652 16.9091 4.22727 16.9091H1.40909ZM4.54432 26.4557C4.28598 26.1973 4.15682 25.8686 4.15682 25.4693C4.15682 25.0701 4.28598 24.7413 4.54432 24.483L6.55227 22.475C6.81061 22.2167 7.13376 22.0875 7.52173 22.0875C7.90876 22.0875 8.24318 22.2167 8.525 22.475C8.80682 22.7568 8.94773 23.0917 8.94773 23.4797C8.94773 23.8667 8.80682 24.2011 8.525 24.483L6.55227 26.4557C6.27046 26.7375 5.92992 26.8784 5.53068 26.8784C5.13144 26.8784 4.80265 26.7375 4.54432 26.4557ZM15.5 23.9545C13.1515 23.9545 11.1553 23.1326 9.51136 21.4886C7.86742 19.8447 7.04546 17.8485 7.04546 15.5C7.04546 13.1515 7.86742 11.1553 9.51136 9.51136C11.1553 7.86742 13.1515 7.04545 15.5 7.04545C17.8485 7.04545 19.8447 7.86742 21.4886 9.51136C23.1326 11.1553 23.9545 13.1515 23.9545 15.5C23.9545 17.8485 23.1326 19.8447 21.4886 21.4886C19.8447 23.1326 17.8485 23.9545 15.5 23.9545Z"
              fill="#2F2F2F"
            />
            <path
              d="M23.2839 16.1072C23.2839 20.5703 19.7972 24.143 15.5511 24.143C11.305 24.143 7.81836 20.5703 7.81836 16.1072C7.81836 11.6442 11.305 8.07153 15.5511 8.07153C19.7972 8.07153 23.2839 11.6442 23.2839 16.1072Z"
              fill="#F5F5F5"
              stroke="#2F2F2F"
              strokeWidth="1.5"
            />
          </svg>

          <div>{t("main.settings.main.theme")}</div>
        </div>

        <div className={styles.setting}>
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9173 19.052H8.00898C3.59148 19.052 1.61523 17.0758 1.61523 12.6583V8.00825C1.61523 3.59075 3.59148 1.6145 8.00898 1.6145H12.659C17.0765 1.6145 19.0527 3.59075 19.0527 8.00825V12.9166C19.0527 13.4462 18.6265 13.8724 18.0969 13.8853C14.9969 13.937 13.9377 15.0091 13.8861 18.0962C13.8732 18.6258 13.4469 19.052 12.9173 19.052ZM8.00898 3.552C4.67648 3.552 3.55273 4.67575 3.55273 8.00825V12.6583C3.55273 15.9908 4.67648 17.1145 8.00898 17.1145H12.0002C12.3102 13.9628 13.9636 12.3224 17.1152 11.9995V8.00825C17.1152 4.67575 15.9915 3.552 12.659 3.552H8.00898Z"
              fill="#2F2F2F"
            />
            <path
              d="M6.71669 8.56252C6.41961 8.56252 6.10961 8.42044 5.92878 8.14919C5.85494 8.04489 5.80238 7.92706 5.77411 7.80244C5.74583 7.67781 5.74239 7.54884 5.76398 7.42289C5.78558 7.29693 5.83178 7.17647 5.89995 7.06838C5.96812 6.96029 6.05692 6.86669 6.16128 6.79294C7.16878 6.08252 8.52503 6.06961 9.54544 6.76711C9.98461 7.06419 10.1009 7.67127 9.80378 8.11044C9.50669 8.54961 8.89961 8.66586 8.46044 8.36877C8.28774 8.25405 8.08452 8.19394 7.87721 8.19624C7.66989 8.19854 7.46805 8.26316 7.29794 8.38169C7.10419 8.51086 6.91044 8.56252 6.71669 8.56252ZM11.8834 8.56252C11.5863 8.56252 11.2763 8.42044 11.0954 8.14919C11.0216 8.04489 10.9691 7.92706 10.9408 7.80244C10.9125 7.67781 10.9091 7.54884 10.9307 7.42289C10.9522 7.29693 10.9984 7.17647 11.0666 7.06838C11.1348 6.96029 11.2236 6.86669 11.3279 6.79294C12.3354 6.08252 13.6917 6.06961 14.7121 6.76711C15.1513 7.06419 15.2675 7.67127 14.9704 8.11044C14.6734 8.54961 14.0663 8.66586 13.6271 8.36877C13.4544 8.25405 13.2512 8.19394 13.0439 8.19624C12.8366 8.19854 12.6347 8.26316 12.4646 8.38169C12.2709 8.51086 12.0771 8.56252 11.8834 8.56252ZM10.54 15.7196H7.54336C6.62628 15.7196 5.87711 14.9705 5.87711 14.0534C5.87711 11.5992 7.87919 9.59715 10.3334 9.59715C11.3409 9.59715 12.3354 9.9459 13.1234 10.5788C13.5367 10.9146 13.6142 11.5217 13.2784 11.9351C12.9425 12.3484 12.3354 12.413 11.9221 12.0901C11.47 11.7284 10.9275 11.5346 10.3463 11.5346C9.05461 11.5346 7.98253 12.5163 7.84044 13.7821H10.5529C11.0825 13.7821 11.5217 14.2213 11.5217 14.7509C11.5217 15.2805 11.0696 15.7196 10.54 15.7196ZM22.9917 29.3855H18.3417C13.9242 29.3855 11.9479 27.4092 11.9479 22.9917V18.0834C12.0254 13.963 13.9629 12.0255 18.0704 11.948H22.9917C27.4092 11.948 29.3854 13.9242 29.3854 18.3417V22.9917C29.3854 27.4092 27.4092 29.3855 22.9917 29.3855ZM18.0834 13.8855C15.0092 13.9371 13.9371 15.0092 13.8854 18.0963V22.9917C13.8854 26.3242 15.0092 27.448 18.3417 27.448H22.9917C26.3242 27.448 27.4479 26.3242 27.4479 22.9917V18.3417C27.4479 15.0092 26.3242 13.8855 22.9917 13.8855H18.0834Z"
              fill="#2F2F2F"
            />
            <path
              d="M18.2001 18.8946C17.593 18.8946 16.9989 18.7138 16.4951 18.3521C16.3908 18.2783 16.302 18.1847 16.2339 18.0766C16.1657 17.9685 16.1196 17.8481 16.098 17.7221C16.0764 17.5962 16.0798 17.4672 16.1081 17.3426C16.1363 17.218 16.1888 17.1002 16.2626 16.9958C16.3364 16.8915 16.43 16.8028 16.5381 16.7346C16.6462 16.6665 16.7666 16.6203 16.8926 16.5987C17.0185 16.5771 17.1475 16.5805 17.2721 16.6088C17.3967 16.637 17.5145 16.6896 17.6189 16.7633C17.789 16.8819 17.9908 16.9465 18.1981 16.9488C18.4054 16.9511 18.6087 16.891 18.7814 16.7763C19.2205 16.4792 19.8276 16.5825 20.1247 17.0346C20.4218 17.4738 20.3184 18.0808 19.8664 18.3779C19.3626 18.7267 18.7814 18.8946 18.2001 18.8946ZM23.3668 18.8946C22.7597 18.8946 22.1655 18.7138 21.6618 18.3521C21.5575 18.2783 21.4687 18.1847 21.4006 18.0766C21.3324 17.9685 21.2862 17.8481 21.2646 17.7221C21.2431 17.5962 21.2465 17.4672 21.2747 17.3426C21.303 17.218 21.3555 17.1002 21.4293 16.9958C21.5031 16.8915 21.5967 16.8028 21.7048 16.7346C21.8129 16.6665 21.9333 16.6203 22.0593 16.5987C22.1852 16.5771 22.3142 16.5805 22.4388 16.6088C22.5634 16.637 22.6812 16.6896 22.7855 16.7633C22.9556 16.8819 23.1575 16.9465 23.3648 16.9488C23.5721 16.9511 23.7753 16.891 23.948 16.7763C24.3872 16.4792 24.9943 16.5825 25.2914 17.0346C25.5884 17.4738 25.4851 18.0808 25.033 18.3779C24.5293 18.7267 23.948 18.8946 23.3668 18.8946ZM20.6672 26.053C18.213 26.053 16.2109 24.0509 16.2109 21.5968C16.2109 20.6797 16.9601 19.9305 17.8772 19.9305H23.4572C24.3743 19.9305 25.1234 20.6797 25.1234 21.5968C25.1234 24.0509 23.1214 26.053 20.6672 26.053ZM18.1614 21.868C18.2905 23.1338 19.3626 24.1155 20.6672 24.1155C21.9718 24.1155 23.0309 23.1338 23.173 21.868H18.1614Z"
              fill="black"
            />
          </svg>

          <div>{t("main.settings.main.joined")}</div>
        </div>

        <div className={styles.setting}>
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5007 19.0521C14.9711 19.0521 14.5319 18.6129 14.5319 18.0833V11.625C14.5319 11.0954 14.9711 10.6562 15.5007 10.6562C16.0302 10.6562 16.4694 11.0954 16.4694 11.625V18.0833C16.4694 18.6129 16.0302 19.0521 15.5007 19.0521ZM15.5007 23.2487C15.4232 23.2487 15.3327 23.2358 15.2423 23.2229C15.1614 23.2088 15.083 23.1827 15.0098 23.1454C14.9275 23.1171 14.8493 23.0781 14.7773 23.0291L14.5836 22.8741C14.3511 22.6287 14.209 22.2929 14.209 21.957C14.209 21.6212 14.3511 21.2854 14.5836 21.04L14.7773 20.885C14.8548 20.8333 14.9323 20.7945 15.0098 20.7687C15.0873 20.73 15.1648 20.7041 15.2423 20.6912C15.4102 20.6525 15.5911 20.6525 15.7461 20.6912C15.8365 20.7041 15.914 20.73 15.9915 20.7687C16.069 20.7945 16.1465 20.8333 16.224 20.885L16.4177 21.04C16.6502 21.2854 16.7923 21.6212 16.7923 21.957C16.7923 22.2929 16.6502 22.6287 16.4177 22.8741L16.224 23.0291C16.1465 23.0808 16.069 23.1195 15.9915 23.1454C15.914 23.1841 15.8365 23.21 15.7461 23.2229C15.6686 23.2358 15.5782 23.2487 15.5007 23.2487Z"
              fill="#2F2F2F"
            />
            <path
              d="M23.3266 28.6234H7.67155C5.1528 28.6234 3.22822 27.7063 2.24655 26.053C1.2778 24.3996 1.40697 22.2684 2.63405 20.0596L10.4616 5.98046C11.7532 3.65546 13.5357 2.37671 15.4991 2.37671C17.4624 2.37671 19.2449 3.65546 20.5366 5.98046L28.3641 20.0725C29.5911 22.2813 29.7332 24.3996 28.7516 26.0659C27.7699 27.7063 25.8453 28.6234 23.3266 28.6234ZM15.4991 4.31421C14.2849 4.31421 13.0966 5.24421 12.1536 6.92338L4.33905 21.0155C3.46072 22.5913 3.31864 24.038 3.92572 25.0842C4.5328 26.1305 5.87614 26.6988 7.68447 26.6988H23.3395C25.1478 26.6988 26.4782 26.1305 27.0982 25.0842C27.7182 24.038 27.5632 22.6042 26.6849 21.0155L18.8445 6.92338C17.9016 5.24421 16.7132 4.31421 15.4991 4.31421Z"
              fill="#2F2F2F"
            />
          </svg>

          <div>{t("main.settings.main.info")}</div>
        </div>

        <div className={styles.setting}>
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 29.3855C15.3377 29.3869 15.1776 29.3469 15.035 29.2692L3.41002 22.8109C3.25668 22.7278 3.12881 22.6046 3.04008 22.4544C2.95135 22.3043 2.9051 22.1328 2.90627 21.9584V9.04175C2.90627 8.693 3.10002 8.37008 3.41002 8.18925L15.035 1.73092C15.3321 1.563 15.6809 1.563 15.9779 1.73092L27.6029 8.18925C27.9129 8.35717 28.1067 8.68008 28.1067 9.04175V15.5001C28.1067 15.823 27.9517 16.1201 27.6934 16.3009L23.8054 19.0005L27.6159 21.1188C27.9259 21.2868 28.1196 21.6097 28.1196 21.9713V28.4297C28.1196 28.7784 27.9259 29.1013 27.6159 29.2822C27.4652 29.3671 27.2943 29.4095 27.1214 29.405C26.9486 29.4004 26.7802 29.349 26.6342 29.2563L21.9325 26.3113L15.965 29.2951C15.7971 29.3468 15.655 29.3855 15.5 29.3855ZM4.84377 21.3901L15.5259 27.3188L21.5321 24.3222C21.8292 24.1672 22.1909 24.193 22.475 24.3609L26.1563 26.6601V22.5138L21.4934 19.9176C21.3494 19.8378 21.2285 19.7222 21.1425 19.5818C21.0564 19.4415 21.0082 19.2813 21.0025 19.1168C20.9896 18.7809 21.1446 18.458 21.4159 18.2772L26.1692 14.9834V9.59717L15.5129 3.68133L4.85669 9.59717V21.3901H4.84377Z"
              fill="#2F2F2F"
            />
            <path
              d="M15.4994 23.6518C15.337 23.6532 15.177 23.6132 15.0344 23.5356L8.57604 19.9447C8.4227 19.8616 8.29482 19.7384 8.20609 19.5883C8.11737 19.4381 8.07111 19.2667 8.07229 19.0922V11.9106C8.07229 11.5618 8.26604 11.2389 8.57604 11.0581L15.0344 7.46725C15.3315 7.29933 15.6802 7.29933 15.9773 7.46725L22.4356 11.0581C22.7456 11.226 22.9394 11.5489 22.9394 11.9106V19.0922C22.9394 19.441 22.7456 19.7639 22.4356 19.9447L15.9773 23.5356C15.8223 23.6002 15.6673 23.6518 15.4994 23.6518ZM10.0098 18.5239L15.4994 21.5722L20.989 18.5239V12.4918L15.4994 9.43058L10.0098 12.4789V18.5239Z"
              fill="#2F2F2F"
            />
            <path
              d="M9.04239 12.8933C8.88739 12.8933 8.71947 12.8546 8.57739 12.7771L3.41072 9.89667C3.19202 9.76869 3.03218 9.56011 2.96546 9.31566C2.89873 9.07121 2.93044 8.81035 3.05379 8.589C3.17713 8.36766 3.38229 8.20345 3.62528 8.13159C3.86827 8.05973 4.12974 8.08593 4.35364 8.20459L9.5203 11.085C9.9853 11.3433 10.1532 11.9375 9.89489 12.4025C9.70114 12.7125 9.37822 12.8933 9.04239 12.8933ZM3.87572 22.927C3.66029 22.9276 3.45075 22.8567 3.28 22.7253C3.10924 22.594 2.98692 22.4096 2.93224 22.2012C2.87756 21.9929 2.89361 21.7722 2.97787 21.574C3.06213 21.3757 3.20983 21.211 3.3978 21.1058L8.56447 18.2253C8.78836 18.1067 9.04984 18.0805 9.29282 18.1523C9.53581 18.2242 9.74097 18.3884 9.86432 18.6098C9.98766 18.8311 10.0194 19.092 9.95265 19.3364C9.88593 19.5809 9.72608 19.7894 9.50739 19.9174L4.34072 22.7978C4.19864 22.8883 4.03072 22.927 3.87572 22.927ZM21.9591 12.8908C21.7436 12.8913 21.5341 12.8204 21.3633 12.6891C21.1926 12.5577 21.0703 12.3734 21.0156 12.165C20.9609 11.9566 20.9769 11.736 21.0612 11.5377C21.1455 11.3394 21.2932 11.1748 21.4811 11.0695L26.6478 8.18909C26.8717 8.07043 27.1332 8.04423 27.3762 8.11609C27.6191 8.18795 27.8243 8.35216 27.9477 8.57351C28.071 8.79485 28.1027 9.05571 28.036 9.30016C27.9693 9.54461 27.8094 9.75318 27.5907 9.88117L22.4241 12.7616C22.282 12.852 22.127 12.8908 21.9591 12.8908ZM15.5007 8.71867C14.9711 8.71867 14.532 8.2795 14.532 7.74992V2.58325C14.532 2.05367 14.9711 1.6145 15.5007 1.6145C16.0303 1.6145 16.4695 2.05367 16.4695 2.58325V7.74992C16.4695 8.2795 16.0303 8.71867 15.5007 8.71867ZM15.5007 29.3853C14.9711 29.3853 14.532 28.9462 14.532 28.4166V23.2499C14.532 22.7203 14.9711 22.2812 15.5007 22.2812C16.0303 22.2812 16.4695 22.7203 16.4695 23.2499V28.4166C16.4695 28.9462 16.0303 29.3853 15.5007 29.3853ZM22.9278 19.3749H20.9903V25.8333H22.9278V19.3749Z"
              fill="black"
            />
          </svg>

          <div>{t("main.settings.main.help")}</div>
        </div>
      </div>

      <a className={styles.logout} onClick={async () => await mutateAsync()}>
        {t("main.settings.main.logout")}
      </a>
    </>
  );
};
