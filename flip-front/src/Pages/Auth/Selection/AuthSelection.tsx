import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import "./AuthSelStyle.css";

export const AuthSelection = () => {
  const theme = useTypedSelector((state) => state.theme.mode);

  const [mode, setMode] = useState<string>("light");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Welcome to Flip";
  }, []);

  useEffect(() => {
    setMode(`${theme}`);
  }, [theme]);

  return (
    <>
      {mode === "light" ? (
        <svg
          width="257"
          height="175"
          viewBox="0 0 257 175"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M98.92 36.7298C99.5023 37.5024 99.8592 38.4046 99.9906 39.4363C99.9915 39.8233 99.9602 40.2104 99.8966 40.5975C99.8973 40.92 99.8659 41.2426 99.8021 41.5653C99.7393 42.2749 99.3216 42.9531 98.5491 43.6C98.0984 43.9235 97.5186 44.2474 96.8099 44.5715C96.4232 44.7015 96.0042 44.7992 95.5528 44.8647C95.1658 44.8656 94.7144 44.899 94.1986 44.9647C93.8119 45.0946 93.3928 45.1601 92.9413 45.1611C92.4898 45.1622 92.0383 45.1632 91.5868 45.1643L87.233 45.1745L67.0125 45.3187L67.0132 45.6089L66.9534 61.3794C67.4694 61.3782 68.0177 61.3769 68.5982 61.3755C69.2432 61.374 70.0171 61.34 70.9199 61.2733C73.4999 61.2673 75.7897 61.2619 77.7892 61.2572C79.8532 61.2524 82.1107 61.2794 84.5619 61.3381L85.1424 61.3367C85.8519 61.3351 86.5615 61.3657 87.2711 61.4285C88.0451 61.4267 88.8191 61.4249 89.5931 61.4231C90.3028 61.4859 91.0125 61.581 91.7223 61.7083C92.432 61.7711 93.1418 61.9307 93.8519 62.1871C95.0138 62.5713 95.8538 63.1821 96.3717 64.0194C97.0832 64.8563 97.44 65.7262 97.4421 66.6292C97.443 67.0162 97.4439 67.4032 97.4448 67.7902C97.4456 68.1127 97.3819 68.4676 97.2538 68.8549C97.1906 69.371 96.7728 70.017 96.0006 70.7928C95.4857 71.2455 94.8736 71.5372 94.1644 71.6679C93.8422 71.7976 93.4555 71.9276 93.0043 72.0576C92.6175 72.123 92.1984 72.1885 91.747 72.2541C91.2957 72.3196 90.8443 72.3852 90.393 72.4507C90.006 72.4516 89.5545 72.4527 89.0385 72.4539L84.588 72.4644L66.7862 72.6028L66.5486 95.0495L66.5504 95.8235C66.5512 96.146 66.5197 96.4686 66.4559 96.7913C66.4566 97.0493 66.425 97.3396 66.3612 97.6622C66.233 97.985 66.1048 98.3401 65.9767 98.7274C65.913 99.05 65.817 99.3728 65.6888 99.6956C65.2394 100.6 64.8216 101.213 64.4353 101.537C63.727 102.054 62.8571 102.411 61.8256 102.607C60.085 102.998 58.4398 102.809 56.89 102.038C56.567 101.845 56.244 101.62 55.9209 101.363C55.6621 101.041 55.4354 100.655 55.2409 100.204C55.1113 99.9461 55.0463 99.7528 55.046 99.6238L54.7544 99.044C54.5602 98.7219 54.4304 98.3997 54.3651 98.0774C54.2997 97.6905 54.2344 97.3359 54.1692 97.0136C54.1684 96.6911 54.1354 96.3686 54.0701 96.0463C54.0694 95.7238 54.0364 95.4014 53.9711 95.079C53.9054 94.5632 53.9042 94.0472 53.9675 93.531L53.9639 91.983L54.0429 84.4363L54.107 70.5041C54.1666 68.4399 54.194 66.3436 54.189 64.2151C54.184 62.0866 54.1789 59.8936 54.1736 57.6361C54.1036 55.3143 54.0665 53.2503 54.0623 51.4443C54.1225 49.6382 54.2147 47.6707 54.3387 45.5419L54.3376 45.0581C54.4004 44.3485 54.4311 43.7034 54.4298 43.1229C54.4283 42.4779 54.4912 41.8328 54.6187 41.1875C54.7444 39.7682 55.064 38.5097 55.5774 37.4119C56.0263 36.3144 56.6695 35.5389 57.5069 35.0854C58.4731 34.5026 59.5044 34.21 60.6009 34.2074C61.1169 34.2062 61.5362 34.2375 61.8589 34.3012L61.8586 34.2045C63.0196 34.2017 63.9549 34.1995 64.6644 34.1979C65.3739 34.1962 66.0511 34.1946 66.6961 34.1931C67.3411 34.1916 68.0506 34.1899 68.8246 34.1881C69.5985 34.1218 70.6304 34.0871 71.9204 34.0841C77.0803 34.0075 82.1758 33.9956 87.2069 34.0483L87.6907 34.0471C88.4003 34.11 89.1099 34.1405 89.8194 34.1389C90.5934 34.1371 91.3675 34.1675 92.1416 34.2302C92.8511 34.2285 93.5608 34.3236 94.2708 34.5154C94.9806 34.6428 95.6906 34.8346 96.4007 35.091C97.4979 35.4109 98.3377 35.9572 98.92 36.7298ZM118.304 94.5411C118.24 94.8638 118.176 95.1865 118.112 95.5091C118.113 95.7671 118.114 96.0574 118.114 96.3799L117.539 98.413C117.41 98.6713 117.314 98.8327 117.25 98.8974L116.961 99.4786C116.64 100.189 116.061 100.771 115.223 101.224C113.677 102.002 112.033 102.199 110.29 101.816C109.194 101.69 108.322 101.369 107.676 100.855C107.03 100.405 106.577 99.8577 106.318 99.2133C106.058 98.5689 105.863 97.9243 105.733 97.2796C105.537 96.6351 105.439 96.0548 105.438 95.5388L105.311 41.3588C105.31 40.9073 105.309 40.5203 105.308 40.1978C105.372 39.8107 105.436 39.4558 105.499 39.1331C105.563 38.6815 105.626 38.2943 105.69 37.9717C105.818 37.6489 105.947 37.2938 106.075 36.9065C106.267 36.2611 106.62 35.7442 107.135 35.356C107.908 34.7737 108.649 34.4495 109.358 34.3833C109.809 34.2533 110.229 34.1878 110.616 34.1869C111.002 34.1215 111.454 34.0881 111.97 34.0869C112.873 34.0848 113.905 34.3404 115.068 34.8537C115.972 35.3676 116.619 36.0755 117.008 36.9776C117.656 38.2661 117.981 39.4586 117.984 40.5551C118.05 41.2 118.084 42.1674 118.087 43.4574C118.155 44.7472 118.189 45.7147 118.191 46.3597L118.192 46.7467C118.325 48.8104 118.395 50.8097 118.399 52.7447C118.404 54.6152 118.376 56.6793 118.317 58.9369C118.322 61.1299 118.295 63.2585 118.235 65.3227C118.24 67.3222 118.245 69.3217 118.249 71.3212L118.297 91.6386C118.297 91.8966 118.298 92.1546 118.299 92.4126C118.364 92.606 118.396 92.8317 118.397 93.0897C118.399 93.7347 118.367 94.2185 118.304 94.5411ZM137.28 65.5682C137.285 67.3742 137.289 69.406 137.295 71.6635C137.365 73.9208 137.402 76.275 137.408 78.726C137.414 81.1125 137.419 83.499 137.425 85.8855C137.43 88.2075 137.403 90.3683 137.343 92.368C137.281 93.3356 137.187 94.4001 137.061 95.5614C136.934 96.6582 136.679 97.6908 136.294 98.6592C135.909 99.6276 135.298 100.435 134.461 101.082C133.689 101.665 132.625 101.925 131.27 101.864C129.27 101.739 127.817 100.872 126.91 99.2617C126.068 97.6512 125.579 95.3948 125.443 92.4926C125.44 91.0091 125.404 89.3 125.334 87.3651C125.33 85.4301 125.293 83.4629 125.224 81.4636C125.219 79.4641 125.215 77.5291 125.21 75.6586C125.206 73.7236 125.202 71.9821 125.198 70.4341C125.196 69.5311 125.161 68.4347 125.094 67.1448C125.091 65.8548 125.12 64.5325 125.181 63.1779C125.242 61.8232 125.401 60.5328 125.656 59.3067C125.911 58.0161 126.327 56.9509 126.906 56.111C127.356 55.594 128 55.2055 128.838 54.9455C129.676 54.621 130.546 54.4577 131.449 54.4556C132.417 54.4533 133.32 54.6125 134.159 54.933C135.063 55.2534 135.709 55.7034 136.098 56.283C136.357 56.6694 136.551 57.2172 136.682 57.9264C136.813 58.6356 136.911 59.4416 136.978 60.3444C137.109 61.1826 137.176 62.0855 137.178 63.053C137.244 63.9558 137.279 64.7942 137.28 65.5682ZM133.558 46.0334C131.56 46.5541 129.882 46.3645 128.526 45.4647C127.233 44.5002 126.424 43.0831 126.097 41.2133C125.836 39.8594 125.93 38.666 126.379 37.6329C126.828 36.5999 127.503 35.8243 128.405 35.3061C129.307 34.7235 130.338 34.4631 131.499 34.5249C132.661 34.5867 133.823 35.0354 134.986 35.8712C136.084 36.6426 136.86 37.5438 137.314 38.5748C137.832 39.6056 137.996 40.6049 137.805 41.5729C137.678 42.5407 137.261 43.4447 136.553 44.2848C135.846 45.0605 134.847 45.6433 133.558 46.0334ZM171.791 58.618C173.664 59.3876 175.375 60.5124 176.927 61.9922C178.478 63.4076 179.804 65.0493 180.905 66.9172C182.071 68.785 182.946 70.8147 183.532 73.0063C184.182 75.1333 184.509 77.2933 184.514 79.4863C184.587 82.7756 183.82 85.8735 182.214 88.7797C180.673 91.6859 178.131 93.9171 174.587 95.4734C171.88 96.5763 169.076 97.4213 166.175 98.0086C163.339 98.5313 160.372 98.893 157.277 99.0938L157.318 116.799C157.319 117.186 157.256 117.541 157.127 117.864C157.064 118.186 157.032 118.509 157.033 118.831C156.905 119.477 156.745 120.058 156.553 120.574C156.425 121.09 156.233 121.639 155.977 122.22C155.719 122.608 155.462 122.963 155.205 123.286C154.948 123.609 154.658 123.933 154.337 124.256C152.79 125.033 151.178 125.198 149.5 124.751C148.468 124.689 147.629 124.368 146.982 123.789C146.401 123.21 145.98 122.598 145.72 121.954C145.461 121.31 145.233 120.568 145.038 119.73C144.973 119.408 144.907 119.086 144.842 118.763C144.842 118.505 144.841 118.215 144.84 117.893L144.714 64.0028C144.713 63.6158 144.712 63.2288 144.711 62.8418C144.774 62.3902 144.838 61.9385 144.901 61.4868C144.964 60.7127 145.156 59.9382 145.476 59.1635C146.053 57.5496 147.244 56.4503 149.048 55.8656C150.853 55.2809 152.884 55.0181 155.142 55.0773C156.69 55.1382 158.271 55.2957 159.884 55.5499C161.561 55.804 163.142 56.1228 164.627 56.5063C166.175 56.8252 167.563 57.1767 168.789 57.5608C170.016 57.9449 171.016 58.2973 171.791 58.618ZM172.034 79.5156C172.287 77.709 172.058 76.1937 171.346 74.9699C170.698 73.6814 169.76 72.6516 168.533 71.8805C167.305 71.0449 165.885 70.4032 164.271 69.9555C162.722 69.5076 161.173 69.1887 159.625 68.9989C159.431 68.9348 159.109 68.9033 158.657 68.9044C158.27 68.9053 157.819 68.9063 157.303 68.9076C157.308 70.9716 157.312 72.9711 157.317 74.9061C157.386 76.7764 157.39 78.8082 157.331 81.0013L157.346 87.4835C158.83 87.4156 160.377 87.2507 161.989 86.9889C163.666 86.727 165.213 86.3041 166.63 85.7203C168.048 85.1364 169.239 84.3596 170.205 83.3899C171.234 82.42 171.844 81.1285 172.034 79.5156Z"
            fill="black"
          />
          <path
            d="M244 108.5C228.5 148.5 199.656 163.779 163.089 156.956C161.762 156.71 160.453 156.369 159.15 156.038C157.093 155.513 154.987 154.859 155.762 152.081C156.448 149.606 158.415 149.904 160.392 150.349C165.137 151.423 169.924 152.148 174.802 152.252C221.618 153.226 253.971 106.38 236.49 62.9188C236.338 62.5429 236.187 62.1671 236.016 61.8028C235.126 59.8627 234.366 57.7143 236.864 56.5871C239.352 55.4655 240.477 57.376 241.326 59.3803C244.862 65.5 246.5 80.5 246.5 93C246.129 96.9008 245.836 101.926 244.862 104.785L244 108.5Z"
            fill="black"
          />
          <path
            d="M187.875 134.019C188.788 136.932 188.337 139.288 185.872 140.417C183.199 141.636 180.883 140.322 179.686 137.326C178.559 134.486 179.521 131.992 181.902 131.008C184.307 130.015 186.436 131.249 187.879 134.028L187.875 134.019Z"
            fill="black"
          />
          <path
            d="M207.322 123.462C210.094 124.354 211.194 126.232 210.625 128.772C210.032 131.398 207.962 132.556 205.444 132C202.681 131.388 201.447 129.289 202.183 126.534C202.881 123.92 204.922 123.123 207.32 123.47L207.322 123.462Z"
            fill="black"
          />
        </svg>
      ) : (
        <svg
          width="257"
          height="175"
          viewBox="0 0 257 175"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M98.92 36.7298C99.5023 37.5024 99.8592 38.4046 99.9906 39.4363C99.9915 39.8233 99.9602 40.2104 99.8966 40.5975C99.8973 40.92 99.8659 41.2426 99.8021 41.5653C99.7393 42.2749 99.3216 42.9531 98.5491 43.6C98.0984 43.9235 97.5186 44.2474 96.8099 44.5715C96.4232 44.7015 96.0042 44.7992 95.5528 44.8647C95.1658 44.8656 94.7144 44.899 94.1986 44.9647C93.8119 45.0946 93.3928 45.1601 92.9413 45.1611C92.4898 45.1622 92.0383 45.1632 91.5868 45.1643L87.233 45.1745L67.0125 45.3187L67.0132 45.6089L66.9534 61.3794C67.4694 61.3782 68.0177 61.3769 68.5982 61.3755C69.2432 61.374 70.0171 61.34 70.9199 61.2733C73.4999 61.2673 75.7897 61.2619 77.7892 61.2572C79.8532 61.2524 82.1107 61.2794 84.5619 61.3381L85.1424 61.3367C85.8519 61.3351 86.5615 61.3657 87.2711 61.4285C88.0451 61.4267 88.8191 61.4249 89.5931 61.4231C90.3028 61.4859 91.0125 61.581 91.7223 61.7083C92.432 61.7711 93.1418 61.9307 93.8519 62.1871C95.0138 62.5713 95.8538 63.1821 96.3717 64.0194C97.0832 64.8563 97.44 65.7262 97.4421 66.6292C97.443 67.0162 97.4439 67.4032 97.4448 67.7902C97.4456 68.1127 97.3819 68.4676 97.2538 68.8549C97.1906 69.371 96.7728 70.017 96.0006 70.7928C95.4857 71.2455 94.8736 71.5372 94.1644 71.6679C93.8422 71.7976 93.4555 71.9276 93.0043 72.0576C92.6175 72.123 92.1984 72.1885 91.747 72.2541C91.2957 72.3196 90.8443 72.3852 90.393 72.4507C90.006 72.4516 89.5545 72.4527 89.0385 72.4539L84.588 72.4644L66.7862 72.6028L66.5486 95.0495L66.5504 95.8235C66.5512 96.146 66.5197 96.4686 66.4559 96.7913C66.4566 97.0493 66.425 97.3396 66.3612 97.6622C66.233 97.985 66.1048 98.3401 65.9767 98.7274C65.913 99.05 65.817 99.3728 65.6888 99.6956C65.2394 100.6 64.8216 101.213 64.4353 101.537C63.727 102.054 62.8571 102.411 61.8256 102.607C60.085 102.998 58.4398 102.809 56.89 102.038C56.567 101.845 56.244 101.62 55.9209 101.363C55.6621 101.041 55.4354 100.655 55.2409 100.204C55.1113 99.9461 55.0463 99.7528 55.046 99.6238L54.7544 99.044C54.5602 98.7219 54.4304 98.3997 54.3651 98.0774C54.2997 97.6905 54.2344 97.3359 54.1692 97.0136C54.1684 96.6911 54.1354 96.3686 54.0701 96.0463C54.0694 95.7238 54.0364 95.4014 53.9711 95.079C53.9054 94.5632 53.9042 94.0472 53.9675 93.531L53.9639 91.983L54.0429 84.4363L54.107 70.5041C54.1666 68.4399 54.194 66.3436 54.189 64.2151C54.184 62.0866 54.1789 59.8936 54.1736 57.6361C54.1036 55.3143 54.0665 53.2503 54.0623 51.4443C54.1225 49.6382 54.2147 47.6707 54.3387 45.5419L54.3376 45.0581C54.4004 44.3485 54.4311 43.7034 54.4298 43.1229C54.4283 42.4779 54.4912 41.8328 54.6187 41.1875C54.7444 39.7682 55.064 38.5097 55.5774 37.4119C56.0263 36.3144 56.6695 35.5389 57.5069 35.0854C58.4731 34.5026 59.5044 34.21 60.6009 34.2074C61.1169 34.2062 61.5362 34.2375 61.8589 34.3012L61.8586 34.2045C63.0196 34.2017 63.9549 34.1995 64.6644 34.1979C65.3739 34.1962 66.0511 34.1946 66.6961 34.1931C67.3411 34.1916 68.0506 34.1899 68.8246 34.1881C69.5985 34.1218 70.6304 34.0871 71.9204 34.0841C77.0803 34.0075 82.1758 33.9956 87.2069 34.0483L87.6907 34.0471C88.4003 34.11 89.1099 34.1405 89.8194 34.1389C90.5934 34.1371 91.3675 34.1675 92.1416 34.2302C92.8511 34.2285 93.5608 34.3236 94.2708 34.5154C94.9806 34.6428 95.6906 34.8346 96.4007 35.091C97.4979 35.4109 98.3377 35.9572 98.92 36.7298ZM118.304 94.5411C118.24 94.8638 118.176 95.1865 118.112 95.5091C118.113 95.7671 118.114 96.0574 118.114 96.3799L117.539 98.413C117.41 98.6713 117.314 98.8327 117.25 98.8974L116.961 99.4786C116.64 100.189 116.061 100.771 115.223 101.224C113.677 102.002 112.033 102.199 110.29 101.816C109.194 101.69 108.322 101.369 107.676 100.855C107.03 100.405 106.577 99.8577 106.318 99.2133C106.058 98.5689 105.863 97.9243 105.733 97.2796C105.537 96.6351 105.439 96.0548 105.438 95.5388L105.311 41.3588C105.31 40.9073 105.309 40.5203 105.308 40.1978C105.372 39.8107 105.436 39.4558 105.499 39.1331C105.563 38.6815 105.626 38.2943 105.69 37.9717C105.818 37.6489 105.947 37.2938 106.075 36.9065C106.267 36.2611 106.62 35.7442 107.135 35.356C107.908 34.7737 108.649 34.4495 109.358 34.3833C109.809 34.2533 110.229 34.1878 110.616 34.1869C111.002 34.1215 111.454 34.0881 111.97 34.0869C112.873 34.0848 113.905 34.3404 115.068 34.8537C115.972 35.3676 116.619 36.0755 117.008 36.9776C117.656 38.2661 117.981 39.4586 117.984 40.5551C118.05 41.2 118.084 42.1674 118.087 43.4574C118.155 44.7472 118.189 45.7147 118.191 46.3597L118.192 46.7467C118.325 48.8104 118.395 50.8097 118.399 52.7447C118.404 54.6152 118.376 56.6793 118.317 58.9369C118.322 61.1299 118.295 63.2585 118.235 65.3227C118.24 67.3222 118.245 69.3217 118.249 71.3212L118.297 91.6386C118.297 91.8966 118.298 92.1546 118.299 92.4126C118.364 92.606 118.396 92.8317 118.397 93.0897C118.399 93.7347 118.367 94.2185 118.304 94.5411ZM137.28 65.5682C137.285 67.3742 137.289 69.406 137.295 71.6635C137.365 73.9208 137.402 76.275 137.408 78.726C137.414 81.1125 137.419 83.499 137.425 85.8855C137.43 88.2075 137.403 90.3683 137.343 92.368C137.281 93.3356 137.187 94.4001 137.061 95.5614C136.934 96.6582 136.679 97.6908 136.294 98.6592C135.909 99.6276 135.298 100.435 134.461 101.082C133.689 101.665 132.625 101.925 131.27 101.864C129.27 101.739 127.817 100.872 126.91 99.2617C126.068 97.6512 125.579 95.3948 125.443 92.4926C125.44 91.0091 125.404 89.3 125.334 87.3651C125.33 85.4301 125.293 83.4629 125.224 81.4636C125.219 79.4641 125.215 77.5291 125.21 75.6586C125.206 73.7236 125.202 71.9821 125.198 70.4341C125.196 69.5311 125.161 68.4347 125.094 67.1448C125.091 65.8548 125.12 64.5325 125.181 63.1779C125.242 61.8232 125.401 60.5328 125.656 59.3067C125.911 58.0161 126.327 56.9509 126.906 56.111C127.356 55.594 128 55.2055 128.838 54.9455C129.676 54.621 130.546 54.4577 131.449 54.4556C132.417 54.4533 133.32 54.6125 134.159 54.933C135.063 55.2534 135.709 55.7034 136.098 56.283C136.357 56.6694 136.551 57.2172 136.682 57.9264C136.813 58.6356 136.911 59.4416 136.978 60.3444C137.109 61.1826 137.176 62.0855 137.178 63.053C137.244 63.9558 137.279 64.7942 137.28 65.5682ZM133.558 46.0334C131.56 46.5541 129.882 46.3645 128.526 45.4647C127.233 44.5002 126.424 43.0831 126.097 41.2133C125.836 39.8594 125.93 38.666 126.379 37.6329C126.828 36.5999 127.503 35.8243 128.405 35.3061C129.307 34.7235 130.338 34.4631 131.499 34.5249C132.661 34.5867 133.823 35.0354 134.986 35.8712C136.084 36.6426 136.86 37.5438 137.314 38.5748C137.832 39.6056 137.996 40.6049 137.805 41.5729C137.678 42.5407 137.261 43.4447 136.553 44.2848C135.846 45.0605 134.847 45.6433 133.558 46.0334ZM171.791 58.618C173.664 59.3876 175.375 60.5124 176.927 61.9922C178.478 63.4076 179.804 65.0493 180.905 66.9172C182.071 68.785 182.946 70.8147 183.532 73.0063C184.182 75.1333 184.509 77.2933 184.514 79.4863C184.587 82.7756 183.82 85.8735 182.214 88.7797C180.673 91.6859 178.131 93.9171 174.587 95.4734C171.88 96.5763 169.076 97.4213 166.175 98.0086C163.339 98.5313 160.372 98.893 157.277 99.0938L157.318 116.799C157.319 117.186 157.256 117.541 157.127 117.864C157.064 118.186 157.032 118.509 157.033 118.831C156.905 119.477 156.745 120.058 156.553 120.574C156.425 121.09 156.233 121.639 155.977 122.22C155.719 122.608 155.462 122.963 155.205 123.286C154.948 123.609 154.658 123.933 154.337 124.256C152.79 125.033 151.178 125.198 149.5 124.751C148.468 124.689 147.629 124.368 146.982 123.789C146.401 123.21 145.98 122.598 145.72 121.954C145.461 121.31 145.233 120.568 145.038 119.73C144.973 119.408 144.907 119.086 144.842 118.763C144.842 118.505 144.841 118.215 144.84 117.893L144.714 64.0028C144.713 63.6158 144.712 63.2288 144.711 62.8418C144.774 62.3902 144.838 61.9385 144.901 61.4868C144.964 60.7127 145.156 59.9382 145.476 59.1635C146.053 57.5496 147.244 56.4503 149.048 55.8656C150.853 55.2809 152.884 55.0181 155.142 55.0773C156.69 55.1382 158.271 55.2957 159.884 55.5499C161.561 55.804 163.142 56.1228 164.627 56.5063C166.175 56.8252 167.563 57.1767 168.789 57.5608C170.016 57.9449 171.016 58.2973 171.791 58.618ZM172.034 79.5156C172.287 77.709 172.058 76.1937 171.346 74.9699C170.698 73.6814 169.76 72.6516 168.533 71.8805C167.305 71.0449 165.885 70.4032 164.271 69.9555C162.722 69.5076 161.173 69.1887 159.625 68.9989C159.431 68.9348 159.109 68.9033 158.657 68.9044C158.27 68.9053 157.819 68.9063 157.303 68.9076C157.308 70.9716 157.312 72.9711 157.317 74.9061C157.386 76.7764 157.39 78.8082 157.331 81.0013L157.346 87.4835C158.83 87.4156 160.377 87.2507 161.989 86.9889C163.666 86.727 165.213 86.3041 166.63 85.7203C168.048 85.1364 169.239 84.3596 170.205 83.3899C171.234 82.42 171.844 81.1285 172.034 79.5156Z"
            fill="#F5F5F5"
          />
          <path
            d="M244 108.5C228.5 148.5 199.656 163.779 163.089 156.956C161.762 156.71 160.453 156.369 159.15 156.038C157.093 155.513 154.987 154.859 155.762 152.081C156.448 149.606 158.415 149.904 160.392 150.349C165.137 151.423 169.924 152.148 174.802 152.252C221.618 153.226 253.971 106.38 236.49 62.9188C236.338 62.5429 236.187 62.1671 236.016 61.8028C235.126 59.8627 234.366 57.7143 236.864 56.5871C239.352 55.4655 240.477 57.376 241.326 59.3803C244.862 65.5 246.5 80.5 246.5 93C246.129 96.9008 245.836 101.926 244.862 104.785L244 108.5Z"
            fill="#F5F5F5"
          />
          <path
            d="M187.875 134.019C188.788 136.932 188.337 139.288 185.872 140.417C183.199 141.636 180.883 140.322 179.686 137.326C178.559 134.486 179.521 131.992 181.902 131.008C184.307 130.015 186.436 131.249 187.879 134.028L187.875 134.019Z"
            fill="#F5F5F5"
          />
          <path
            d="M207.322 123.462C210.094 124.354 211.194 126.232 210.625 128.772C210.032 131.398 207.962 132.556 205.444 132C202.681 131.388 201.447 129.289 202.183 126.534C202.881 123.92 204.922 123.123 207.32 123.47L207.322 123.462Z"
            fill="#F5F5F5"
          />
        </svg>
      )}
      <div className="description">
        Швидка, надійна соціальна мережа для всіх
      </div>
      <button
        className={`btn btn-login ${mode}-login`}
        onClick={() => navigate("/signin")}
      >
        Увійти
      </button>
      <button
        className={`btn btn-reg ${mode}-reg`}
        onClick={() => navigate("/signup")}
      >
        Зареєструватись
      </button>
    </>
  );
};
