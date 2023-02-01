import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import "./AuthBgStyle.scss";

export const AuthBg = () => {
  const [mode, setMode] = useState<string>("light");

  const theme = useTypedSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
  }, [theme]);

  const LightOrDarkMode = () => {
    if (mode === "light") {
      localStorage.setItem("LightDarkMode", "dark");
      setMode("dark");
      dispatch({ type: "Theme", payload: { mode: "dark" } });
    } else {
      localStorage.setItem("LightDarkMode", "light");
      setMode("light");
      dispatch({ type: "Theme", payload: { mode: "light" } });
    }
  };

  return (
    <div className={`main-auth ${mode}`}>
      <div className="bg-setting">
        <div className="language">
          {mode === "light" ? (
            <svg
              className="lan-svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 12.41 22.41 12.75 22 12.75C21.59 12.75 21.25 12.41 21.25 12C21.25 6.9 17.1 2.75 12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C12.41 21.25 12.75 21.59 12.75 22C12.75 22.41 12.41 22.75 12 22.75Z"
                fill="#575757"
              />
              <path
                d="M9.00024 21.75H8.00024C7.59024 21.75 7.25024 21.41 7.25024 21C7.25024 20.59 7.57024 20.26 7.98024 20.25C6.41023 14.862 6.41023 9.13795 7.98024 3.74999C7.78498 3.74428 7.5996 3.66281 7.46335 3.52282C7.3271 3.38284 7.25067 3.19533 7.25024 2.99999C7.25024 2.58999 7.59024 2.24999 8.00024 2.24999H9.00024C9.24024 2.24999 9.47023 2.36999 9.61023 2.55999C9.75024 2.75999 9.79024 3.00999 9.71024 3.23999C7.83024 8.93211 7.83024 15.0779 9.71024 20.77C9.79024 21 9.75024 21.25 9.61023 21.45C9.47023 21.65 9.24024 21.75 9.00024 21.75ZM16.4602 12.748C16.0502 12.748 15.7102 12.408 15.7102 11.998C15.7102 9.01799 15.2302 6.06799 14.2902 3.23799C14.1602 2.84799 14.3702 2.41799 14.7602 2.28799C15.1502 2.15799 15.5802 2.36799 15.7102 2.75799C16.7002 5.73799 17.2102 8.84799 17.2102 11.998C17.2102 12.408 16.8702 12.748 16.4602 12.748Z"
                fill="#575757"
              />
              <path
                d="M12.0002 17.2101C9.20018 17.2101 6.43018 16.8101 3.75018 16.0201C3.74018 16.4201 3.41018 16.7501 3.00018 16.7501C2.59018 16.7501 2.25018 16.4101 2.25018 16.0001V15.0001C2.25018 14.7601 2.37018 14.5301 2.56018 14.3901C2.75018 14.2501 3.01018 14.2101 3.24018 14.2901C6.07018 15.2301 9.02018 15.7101 12.0002 15.7101C12.4102 15.7101 12.7502 16.0501 12.7502 16.4601C12.7502 16.8701 12.4102 17.2101 12.0002 17.2101ZM21.0002 9.75008C20.9202 9.75008 20.8402 9.74008 20.7602 9.71008C15.0681 7.83008 8.9223 7.83008 3.23018 9.71008C3.04185 9.77276 2.83639 9.75855 2.65848 9.67053C2.48058 9.58252 2.34462 9.42782 2.28018 9.24008C2.15018 8.85008 2.36018 8.42008 2.75018 8.29008C8.74605 6.30012 15.2243 6.30012 21.2202 8.29008C21.6102 8.42008 21.8202 8.85008 21.6902 9.24008C21.6102 9.55008 21.3102 9.75008 21.0002 9.75008ZM15.8202 22.7501C15.4402 22.7501 15.0802 22.6101 14.8202 22.3501C14.5102 22.0401 14.3702 21.5901 14.4402 21.1201L14.6302 19.7701C14.6802 19.4201 14.8902 19.0001 15.1402 18.7501L18.6802 15.2101C19.1602 14.7301 19.6302 14.4801 20.1402 14.4301C20.7702 14.3701 21.3802 14.6301 21.9602 15.2101C22.5402 15.7901 22.8002 16.4001 22.7402 17.0301C22.6902 17.5301 22.4302 18.0101 21.9602 18.4901L18.4202 22.0301C18.1702 22.2801 17.7602 22.4901 17.4102 22.5401L16.0602 22.7301C15.9702 22.7401 15.9002 22.7501 15.8202 22.7501ZM20.3102 15.9201H20.2802C20.1402 15.9301 19.9502 16.0501 19.7402 16.2701L16.2002 19.8101C16.1597 19.8592 16.1322 19.9176 16.1202 19.9801L15.9402 21.2301L17.1902 21.0501C17.2302 21.0401 17.3302 20.9901 17.3602 20.9601L20.9002 17.4201C21.1102 17.2101 21.2402 17.0201 21.2502 16.8801C21.2702 16.6801 21.0702 16.4401 20.9002 16.2701C20.7402 16.1101 20.5102 15.9201 20.3102 15.9201Z"
                fill="#575757"
              />
              <path
                d="M20.9201 19.2211C20.8501 19.2211 20.7801 19.2111 20.7201 19.1911C20.0676 19.0059 19.4734 18.657 18.9938 18.1774C18.5142 17.6978 18.1653 17.1036 17.9801 16.4511C17.8701 16.0511 18.1001 15.6411 18.5001 15.5311C18.9001 15.4211 19.3101 15.6511 19.4301 16.0511C19.6601 16.8711 20.3101 17.5211 21.1301 17.7511C21.5301 17.8611 21.7601 18.2811 21.6501 18.6711C21.5501 19.0011 21.2501 19.2211 20.9201 19.2211Z"
                fill="#575757"
              />
            </svg>
          ) : (
            <svg
              className="lan-svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 12.41 22.41 12.75 22 12.75C21.59 12.75 21.25 12.41 21.25 12C21.25 6.9 17.1 2.75 12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C12.41 21.25 12.75 21.59 12.75 22C12.75 22.41 12.41 22.75 12 22.75Z"
                fill="#F5F5F5"
              />
              <path
                d="M9.00024 21.75H8.00024C7.59024 21.75 7.25024 21.41 7.25024 21C7.25024 20.59 7.57024 20.26 7.98024 20.25C6.41023 14.862 6.41023 9.13795 7.98024 3.74999C7.78498 3.74428 7.5996 3.66281 7.46335 3.52282C7.3271 3.38284 7.25067 3.19533 7.25024 2.99999C7.25024 2.58999 7.59024 2.24999 8.00024 2.24999H9.00024C9.24024 2.24999 9.47023 2.36999 9.61023 2.55999C9.75024 2.75999 9.79024 3.00999 9.71024 3.23999C7.83024 8.93211 7.83024 15.0779 9.71024 20.77C9.79024 21 9.75024 21.25 9.61023 21.45C9.47023 21.65 9.24024 21.75 9.00024 21.75ZM16.4602 12.748C16.0502 12.748 15.7102 12.408 15.7102 11.998C15.7102 9.01799 15.2302 6.06799 14.2902 3.23799C14.1602 2.84799 14.3702 2.41799 14.7602 2.28799C15.1502 2.15799 15.5802 2.36799 15.7102 2.75799C16.7002 5.73799 17.2102 8.84799 17.2102 11.998C17.2102 12.408 16.8702 12.748 16.4602 12.748Z"
                fill="#F5F5F5"
              />
              <path
                d="M12.0002 17.2098C9.20018 17.2098 6.43018 16.8098 3.75018 16.0198C3.74018 16.4198 3.41018 16.7498 3.00018 16.7498C2.59018 16.7498 2.25018 16.4098 2.25018 15.9998V14.9998C2.25018 14.7598 2.37018 14.5298 2.56018 14.3898C2.75018 14.2498 3.01018 14.2098 3.24018 14.2898C6.07018 15.2298 9.02018 15.7098 12.0002 15.7098C12.4102 15.7098 12.7502 16.0498 12.7502 16.4598C12.7502 16.8698 12.4102 17.2098 12.0002 17.2098ZM21.0002 9.74984C20.9202 9.74984 20.8402 9.73984 20.7602 9.70984C15.0681 7.82984 8.9223 7.82984 3.23018 9.70984C3.04185 9.77252 2.83639 9.7583 2.65848 9.67029C2.48058 9.58227 2.34462 9.42757 2.28018 9.23984C2.15018 8.84984 2.36018 8.41984 2.75018 8.28984C8.74605 6.29987 15.2243 6.29987 21.2202 8.28984C21.6102 8.41984 21.8202 8.84984 21.6902 9.23984C21.6102 9.54984 21.3102 9.74984 21.0002 9.74984ZM15.8202 22.7498C15.4402 22.7498 15.0802 22.6098 14.8202 22.3498C14.5102 22.0398 14.3702 21.5898 14.4402 21.1198L14.6302 19.7698C14.6802 19.4198 14.8902 18.9998 15.1402 18.7498L18.6802 15.2098C19.1602 14.7298 19.6302 14.4798 20.1402 14.4298C20.7702 14.3698 21.3802 14.6298 21.9602 15.2098C22.5402 15.7898 22.8002 16.3998 22.7402 17.0298C22.6902 17.5298 22.4302 18.0098 21.9602 18.4898L18.4202 22.0298C18.1702 22.2798 17.7602 22.4898 17.4102 22.5398L16.0602 22.7298C15.9702 22.7398 15.9002 22.7498 15.8202 22.7498ZM20.3102 15.9198H20.2802C20.1402 15.9298 19.9502 16.0498 19.7402 16.2698L16.2002 19.8098C16.1597 19.8589 16.1322 19.9174 16.1202 19.9798L15.9402 21.2298L17.1902 21.0498C17.2302 21.0398 17.3302 20.9898 17.3602 20.9598L20.9002 17.4198C21.1102 17.2098 21.2402 17.0198 21.2502 16.8798C21.2702 16.6798 21.0702 16.4398 20.9002 16.2698C20.7402 16.1098 20.5102 15.9198 20.3102 15.9198Z"
                fill="#F5F5F5"
              />
              <path
                d="M20.9201 19.2209C20.8501 19.2209 20.7801 19.2109 20.7201 19.1909C20.0676 19.0057 19.4734 18.6567 18.9938 18.1772C18.5142 17.6976 18.1653 17.1033 17.9801 16.4509C17.8701 16.0509 18.1001 15.6409 18.5001 15.5309C18.9001 15.4209 19.3101 15.6509 19.4301 16.0509C19.6601 16.8709 20.3101 17.5209 21.1301 17.7509C21.5301 17.8609 21.7601 18.2809 21.6501 18.6709C21.5501 19.0009 21.2501 19.2209 20.9201 19.2209Z"
                fill="#F5F5F5"
              />
            </svg>
          )}
          <div className="lan-type">
            <div className="lan-name">UA</div>
          </div>
        </div>
        <div className="l_d-mode" onClick={LightOrDarkMode}>
          {mode === "light" ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9634 3.84922C10.681 3.84922 10.4445 3.75684 10.2538 3.57208C10.0624 3.38796 9.96674 3.15957 9.96674 2.88692V0.962306C9.96674 0.689653 10.0624 0.460945 10.2538 0.276182C10.4445 0.0920605 10.681 0 10.9634 0C11.2458 0 11.4827 0.0920605 11.674 0.276182C11.8647 0.460945 11.9601 0.689653 11.9601 0.962306V2.88692C11.9601 3.15957 11.8647 3.38796 11.674 3.57208C11.4827 3.75684 11.2458 3.84922 10.9634 3.84922ZM15.897 5.82195C15.7142 5.64553 15.6229 5.42484 15.6229 5.15988C15.6229 4.89557 15.7142 4.66718 15.897 4.47472L17.2923 3.10344C17.4916 2.91098 17.7282 2.81475 18.0019 2.81475C18.2763 2.81475 18.5132 2.91098 18.7126 3.10344C18.8953 3.27986 18.9866 3.5044 18.9866 3.77705C18.9866 4.0497 18.8953 4.27424 18.7126 4.45067L17.2923 5.82195C17.1096 5.99837 16.877 6.08659 16.5946 6.08659C16.3122 6.08659 16.0797 5.99837 15.897 5.82195ZM18.9368 11.5477C18.6544 11.5477 18.4179 11.4553 18.2272 11.2705C18.0358 11.0864 17.9401 10.858 17.9401 10.5854C17.9401 10.3127 18.0358 10.084 18.2272 9.89924C18.4179 9.71512 18.6544 9.62306 18.9368 9.62306H20.9302C21.2125 9.62306 21.4491 9.71512 21.6398 9.89924C21.8312 10.084 21.9268 10.3127 21.9268 10.5854C21.9268 10.858 21.8312 11.0864 21.6398 11.2705C21.4491 11.4553 21.2125 11.5477 20.9302 11.5477H18.9368ZM10.9634 21.1707C10.681 21.1707 10.4445 21.0784 10.2538 20.8936C10.0624 20.7095 9.96674 20.4811 9.96674 20.2084V18.2838C9.96674 18.0112 10.0624 17.7828 10.2538 17.5987C10.4445 17.4139 10.681 17.3215 10.9634 17.3215C11.2458 17.3215 11.4827 17.4139 11.674 17.5987C11.8647 17.7828 11.9601 18.0112 11.9601 18.2838V20.2084C11.9601 20.4811 11.8647 20.7095 11.674 20.8936C11.4827 21.0784 11.2458 21.1707 10.9634 21.1707ZM4.63453 5.82195L3.21427 4.47472C3.01494 4.28226 2.91527 4.0497 2.91527 3.77705C2.91527 3.5044 3.01494 3.27986 3.21427 3.10344C3.397 2.92701 3.62955 2.8388 3.91195 2.8388C4.19434 2.8388 4.42689 2.92701 4.60962 3.10344L6.02988 4.47472C6.2126 4.65115 6.30396 4.87568 6.30396 5.14834C6.30396 5.42099 6.2126 5.64553 6.02988 5.82195C5.83054 5.99837 5.59799 6.08659 5.33221 6.08659C5.06643 6.08659 4.83387 5.99837 4.63453 5.82195ZM17.2923 18.0673L15.897 16.696C15.7142 16.5035 15.6229 16.2752 15.6229 16.0108C15.6229 15.7459 15.7142 15.5252 15.897 15.3488C16.0797 15.1724 16.3082 15.0841 16.5827 15.0841C16.8564 15.0841 17.093 15.1724 17.2923 15.3488L18.7126 16.696C18.9119 16.8724 19.0072 17.097 18.9986 17.3696C18.9906 17.6423 18.8953 17.8748 18.7126 18.0673C18.5132 18.2598 18.2724 18.356 17.99 18.356C17.7076 18.356 17.475 18.2598 17.2923 18.0673ZM0.996674 11.5477C0.714283 11.5477 0.477739 11.4553 0.287042 11.2705C0.0956807 11.0864 0 10.858 0 10.5854C0 10.3127 0.0956807 10.084 0.287042 9.89924C0.477739 9.71512 0.714283 9.62306 0.996674 9.62306H2.99002C3.27241 9.62306 3.50929 9.71512 3.70065 9.89924C3.89135 10.084 3.9867 10.3127 3.9867 10.5854C3.9867 10.858 3.89135 11.0864 3.70065 11.2705C3.50929 11.4553 3.27241 11.5477 2.99002 11.5477H0.996674ZM3.21427 18.0673C3.03155 17.8909 2.94019 17.6663 2.94019 17.3937C2.94019 17.121 3.03155 16.8965 3.21427 16.7201L4.63453 15.3488C4.81726 15.1724 5.04583 15.0841 5.32025 15.0841C5.594 15.0841 5.83054 15.1724 6.02988 15.3488C6.22921 15.5412 6.32888 15.7699 6.32888 16.0349C6.32888 16.2992 6.22921 16.5276 6.02988 16.7201L4.63453 18.0673C4.4352 18.2598 4.19434 18.356 3.91195 18.356C3.62955 18.356 3.397 18.2598 3.21427 18.0673ZM10.9634 16.3592C9.30229 16.3592 7.89034 15.7979 6.72755 14.6752C5.56476 13.5525 4.98337 12.1892 4.98337 10.5854C4.98337 8.98152 5.56476 7.61826 6.72755 6.49557C7.89034 5.37288 9.30229 4.81153 10.9634 4.81153C12.6245 4.81153 14.0365 5.37288 15.1993 6.49557C16.3621 7.61826 16.9435 8.98152 16.9435 10.5854C16.9435 12.1892 16.3621 13.5525 15.1993 14.6752C14.0365 15.7979 12.6245 16.3592 10.9634 16.3592Z"
                fill="#2F2F2F"
              />
              <circle
                cx="11"
                cy="11"
                r="5.25"
                fill="white"
                stroke="#2F2F2F"
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.51494 6.23987C5.26284 7.59096 4.50467 9.32596 4.36366 11.1629C4.22264 12.9998 4.70708 14.8306 5.73823 16.3577C6.76937 17.8848 8.28661 19.0185 10.0433 19.5744C11.8 20.1304 13.6929 20.0759 15.4143 19.4199C10.0437 14.4493 9.8451 9.32084 14.8135 3.9527C13.3542 3.52316 11.8041 3.50968 10.3379 3.91379C8.87168 4.3179 7.54762 5.12352 6.51494 6.23987Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="bg-auth">
        <div className="block-img bi1"></div>
        <div className="block-img bi2"></div>
        <div className="block-img bi3"></div>
        <div className="block-img bi4"></div>
        <div className="block-img bi5"></div>
        <div className="block-img bi6"></div>
        <div className="block-img bi7"></div>
        <div className="block-img bi8"></div>
        <div className="block-img bi9"></div>

        <div className="super-small-ball" />

        <div className="heart heart-gray h1" />
        <div className="heart heart-gray h2" />
        <div className="heart heart-gray h3" />
        <div className="heart heart-gray h4" />
        <div className="heart heart-lightgray h5" />

        <div className="small-ball small-gray sb1" />
        <div className="small-ball small-gray sb2" />
        <div className="small-ball small-lightgray sb3" />

        <div className="small-medium-ball smb1" />
        <div className="small-medium-ball smb2" />
        <div className="small-medium-ball smb3" />
        <div className="smb4" />

        <div className="big-medium-ball bm-gray bm1" />
        <div className="big-medium-ball bm-gray bm2" />
        <div className="big-medium-ball bm-lightgray bm3" />
        <div className="big-medium-ball bm-lightgray bm4" />

        <div className="big-ball" />
      </div>
      <div className="center">
        <Outlet />
      </div>
      <div className="footer">© 2023 Flip</div>
    </div>
  );
};
