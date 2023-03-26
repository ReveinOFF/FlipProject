import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { InView } from "react-intersection-observer";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { FPMenu } from "../../Components/MainComponents/FPMenu/FPMenu";
import { History } from "../../Components/MainComponents/History/History";
import { ToastActionTypes } from "../../Components/Toast/store/type";
import { useTypedSelector } from "../../Hooks/useTypedSelector";
import { NotificationType } from "../../Interface/Notification";
import { FollowUser } from "../../Interface/Profile";
import styles from "./Main.module.scss";
import * as signalR from "@microsoft/signalr";
import { formatDate } from "../../Components/Convertor/formatDate";
import EmojiPicker, { Theme, EmojiStyle } from "emoji-picker-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { LazyLoading } from "../../Components/LazyLoading/LazyLoading";

const AutosizeTextarea = ({ value, onKeyPress, onChange }) => {
  const textAreaRef = useRef<any>(null);
  const [t] = useTranslation("translation");

  useEffect(() => {
    if (textAreaRef.current) {
      if (textAreaRef.current.scrollHeight > 122) return;
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);

  return (
    <>
      <textarea
        rows={1}
        placeholder={t("main.main.input").toString()}
        ref={textAreaRef}
        value={value}
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
    </>
  );
};

export const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t] = useTranslation("translation");
  const myUser = useTypedSelector((state) => state.auth.user);

  const ref = useRef<HTMLDivElement[]>([]);
  const ref2 = useRef<any>(null);
  const [emojiShow, setEmojiShow] = useState<boolean[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string[]>([]);
  const [data, setData] = useState<any>();
  const [connection, setConnection] = useState<any>();
  const [page, setPage] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    document.title = t("main.main.title_page");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_BASE_HUBS + "notification", {
        accessTokenFactory: () => token as string,
      })
      .configureLogging(signalR.LogLevel.None)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start();
    }
  }, [connection]);

  const getPost = async () => {
    const { data } = await axios.get(`post/get-posts?page=${page}`);

    return data;
  };

  const {
    isLoading,
    data: dataPost,
    refetch,
  } = useQuery("getPost", getPost, {
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (dataPost?.length > 0) {
      if (data) setData((prev) => [...prev, dataPost]);
      else setData(dataPost);
    }
  }, [dataPost]);

  // useEffect(() => {
  //   if (textAreaRef.current) {
  //     if (textAreaRef.current.scrollHeight > 122) return;
  //     textAreaRef.current.style.height = "0px";
  //     const scrollHeight = textAreaRef.current.scrollHeight;
  //     textAreaRef.current.style.height = scrollHeight + "px";
  //   }
  // }, [currentValue]);

  const closeHistory = () => {
    setShow(false);
  };

  const Follow = async (profileId, index) => {
    const follow: FollowUser = { UserId: myUser?.id, FollowId: profileId };

    await axios.post("user/follow", follow).then((res) => {
      if (res.status === 200) {
        connection
          .invoke(
            "SendNotification",
            myUser?.id,
            profileId,
            NotificationType.Follow
          )
          .then(() => {
            const post = [...data];
            post[index].isFollowed = true;
            setData(post);

            dispatch({
              type: ToastActionTypes.SHOW,
              payload: {
                message: t("toast.success.follow"),
                type: "success",
              },
            });
          });
      } else
        dispatch({
          type: ToastActionTypes.SHOW,
          payload: {
            message: t("toast.error.follow"),
            type: "error",
          },
        });
    });
  };

  const UnFollow = async (profileId, index) => {
    await axios
      .delete(`user/${myUser?.id}/unfollow/${profileId}`)
      .then((res) => {
        if (res.status === 200) {
          const post = [...data];
          post[index].isFollowed = false;
          setData(post);

          dispatch({
            type: ToastActionTypes.SHOW,
            payload: {
              message: t("toast.success.unfollow"),
              type: "success",
            },
          });
        } else
          dispatch({
            type: ToastActionTypes.SHOW,
            payload: {
              message: t("toast.error.unfollow"),
              type: "error",
            },
          });
      });
  };

  const Like = async (postId, index) => {
    const res = await axios.post(
      "post/add-reaction",
      {
        userId: myUser?.id,
        postId: postId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      setData((prevState) => {
        const newValueState = [...prevState];
        newValueState[index].reactions.push(myUser?.id);
        return newValueState;
      });
    }
  };

  const UnLike = async (postId, index) => {
    const res = await axios.delete(
      `post/remove/${myUser?.id}/reaction/${postId}`
    );

    if (res.status === 200) {
      setData((prevState) => {
        const newValueState = [...prevState];
        const idx = newValueState[index].reactions.indexOf(myUser?.id);
        newValueState[index].reactions.splice(idx, 1);
        return newValueState;
      });
    }
  };

  const viewChange = async (inView, postId, index) => {
    if (inView) {
      const res = await axios.post(`post/add-views`, postId, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setData((prevState) => {
          const newValueState = [...prevState];
          newValueState[index].views += 1;
          return newValueState;
        });
      }
    }
  };

  const SendMessage = async (event, postId, index) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (currentValue.length > 0) {
        await axios.post(
          "post/add-commentary",
          {
            text: currentValue[index],
            userId: myUser?.id,
            postId: postId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setCurrentValue((prevState) => {
          const newValueState = [...prevState];
          newValueState[index] = "";
          return newValueState;
        });
      }
    }
  };

  const addBookmark = async (id) => {
    const res = await axios.post("post/add-bookmarks", id, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.success.add-bookmark-post"),
          type: "success",
        },
      });
    }
  };

  return (
    <>
      {isLoading && <LazyLoading />}

      <History show={show} onClick={closeHistory} />

      <FPMenu show={showMenu} onClick={() => setShowMenu(false)} />

      {/* <div className={styles.header}>
        <div className={styles.history}>
          <div className={styles.image}>
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1663 13.8125H1.83301C0.842175 13.8125 0.0205078 12.9908 0.0205078 12C0.0205078 11.0092 0.842175 10.1875 1.83301 10.1875H21.1663C22.1572 10.1875 22.9788 11.0092 22.9788 12C22.9788 12.9908 22.1572 13.8125 21.1663 13.8125Z"
                fill="url(#paint0_linear_0_1)"
              />
              <path
                d="M11.5 23.4793C10.5092 23.4793 9.6875 22.6577 9.6875 21.6668V2.3335C9.6875 1.34266 10.5092 0.520996 11.5 0.520996C12.4908 0.520996 13.3125 1.34266 13.3125 2.3335V21.6668C13.3125 22.6577 12.4908 23.4793 11.5 23.4793Z"
                fill="url(#paint1_linear_0_1)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_0_1"
                  x1="-4.43217"
                  y1="13.45"
                  x2="22.8606"
                  y2="9.6362"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#48D824" />
                  <stop offset="1" stopColor="#10D0EA" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_0_1"
                  x1="8.98445"
                  y1="21.1835"
                  x2="13.3779"
                  y2="21.1682"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#48D824" />
                  <stop offset="1" stopColor="#10D0EA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>Ваша розповідь</div>
        </div>
        <div className={styles.history} onClick={() => setShow(true)}>
          <div className={styles.image}>
            <svg
              width="90"
              height="90"
              viewBox="0 0 209 209"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="104.5"
                cy="104.5"
                r="102.029"
                fill="url(#paint0_linear_1675_10359)"
                fillOpacity="0.5"
                stroke="#2F2F2F"
                strokeWidth="4.94119"
              />
              <path
                d="M77.3984 78.5C77.3984 85.4036 71.802 91 64.8984 91C57.9949 91 52.3984 85.4036 52.3984 78.5C52.3984 71.5964 57.9949 66 64.8984 66C71.802 66 77.3984 71.5964 77.3984 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M157.398 78.5C157.398 85.4036 151.802 91 144.898 91C137.995 91 132.398 85.4036 132.398 78.5C132.398 71.5964 137.995 66 144.898 66C151.802 66 157.398 71.5964 157.398 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M84.8984 146H124.898"
                stroke="#2F2F2F"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1675_10359"
                  x1="-40.5348"
                  y1="188.1"
                  x2="212.652"
                  y2="182.514"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#48D824" />
                  <stop offset="1" stopColor="#10D0EA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.name}>Носеїв Норсоч</div>
        </div>
        <div className={styles.history} onClick={() => setShow(true)}>
          <div className={styles.image}>
            <svg
              width="90"
              height="90"
              viewBox="0 0 209 209"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="104.5"
                cy="104.5"
                r="102.029"
                fill="url(#paint0_linear_1675_10359)"
                fillOpacity="0.5"
                stroke="#2F2F2F"
                strokeWidth="4.94119"
              />
              <path
                d="M77.3984 78.5C77.3984 85.4036 71.802 91 64.8984 91C57.9949 91 52.3984 85.4036 52.3984 78.5C52.3984 71.5964 57.9949 66 64.8984 66C71.802 66 77.3984 71.5964 77.3984 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M157.398 78.5C157.398 85.4036 151.802 91 144.898 91C137.995 91 132.398 85.4036 132.398 78.5C132.398 71.5964 137.995 66 144.898 66C151.802 66 157.398 71.5964 157.398 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M84.8984 146H124.898"
                stroke="#2F2F2F"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1675_10359"
                  x1="-40.5348"
                  y1="188.1"
                  x2="212.652"
                  y2="182.514"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#48D824" />
                  <stop offset="1" stopColor="#10D0EA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.name}>Носеїв Норсоч</div>
        </div>
        <div className={styles.history} onClick={() => setShow(true)}>
          <div className={styles.image}>
            <svg
              width="90"
              height="90"
              viewBox="0 0 209 209"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="104.5"
                cy="104.5"
                r="102.029"
                fill="url(#paint0_linear_1675_10359)"
                fillOpacity="0.5"
                stroke="#2F2F2F"
                strokeWidth="4.94119"
              />
              <path
                d="M77.3984 78.5C77.3984 85.4036 71.802 91 64.8984 91C57.9949 91 52.3984 85.4036 52.3984 78.5C52.3984 71.5964 57.9949 66 64.8984 66C71.802 66 77.3984 71.5964 77.3984 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M157.398 78.5C157.398 85.4036 151.802 91 144.898 91C137.995 91 132.398 85.4036 132.398 78.5C132.398 71.5964 137.995 66 144.898 66C151.802 66 157.398 71.5964 157.398 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M84.8984 146H124.898"
                stroke="#2F2F2F"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1675_10359"
                  x1="-40.5348"
                  y1="188.1"
                  x2="212.652"
                  y2="182.514"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#48D824" />
                  <stop offset="1" stopColor="#10D0EA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.name}>Носеїв Норсоч</div>
        </div>
        <div className={styles.history} onClick={() => setShow(true)}>
          <div className={styles.image}>
            <svg
              width="90"
              height="90"
              viewBox="0 0 209 209"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="104.5"
                cy="104.5"
                r="102.029"
                fill="url(#paint0_linear_1675_10359)"
                fillOpacity="0.5"
                stroke="#2F2F2F"
                strokeWidth="4.94119"
              />
              <path
                d="M77.3984 78.5C77.3984 85.4036 71.802 91 64.8984 91C57.9949 91 52.3984 85.4036 52.3984 78.5C52.3984 71.5964 57.9949 66 64.8984 66C71.802 66 77.3984 71.5964 77.3984 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M157.398 78.5C157.398 85.4036 151.802 91 144.898 91C137.995 91 132.398 85.4036 132.398 78.5C132.398 71.5964 137.995 66 144.898 66C151.802 66 157.398 71.5964 157.398 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M84.8984 146H124.898"
                stroke="#2F2F2F"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1675_10359"
                  x1="-40.5348"
                  y1="188.1"
                  x2="212.652"
                  y2="182.514"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#48D824" />
                  <stop offset="1" stopColor="#10D0EA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.name}>Носеїв Норсоч</div>
        </div>
        <div className={styles.history} onClick={() => setShow(true)}>
          <div className={styles.image}>
            <svg
              width="90"
              height="90"
              viewBox="0 0 209 209"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="104.5"
                cy="104.5"
                r="102.029"
                fill="url(#paint0_linear_1675_10359)"
                fillOpacity="0.5"
                stroke="#2F2F2F"
                strokeWidth="4.94119"
              />
              <path
                d="M77.3984 78.5C77.3984 85.4036 71.802 91 64.8984 91C57.9949 91 52.3984 85.4036 52.3984 78.5C52.3984 71.5964 57.9949 66 64.8984 66C71.802 66 77.3984 71.5964 77.3984 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M157.398 78.5C157.398 85.4036 151.802 91 144.898 91C137.995 91 132.398 85.4036 132.398 78.5C132.398 71.5964 137.995 66 144.898 66C151.802 66 157.398 71.5964 157.398 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M84.8984 146H124.898"
                stroke="#2F2F2F"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1675_10359"
                  x1="-40.5348"
                  y1="188.1"
                  x2="212.652"
                  y2="182.514"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#48D824" />
                  <stop offset="1" stopColor="#10D0EA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.name}>Носеїв Норсоч</div>
        </div>
        <div className={styles.history} onClick={() => setShow(true)}>
          <div className={styles.image}>
            <svg
              width="90"
              height="90"
              viewBox="0 0 209 209"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="104.5"
                cy="104.5"
                r="102.029"
                fill="url(#paint0_linear_1675_10359)"
                fillOpacity="0.5"
                stroke="#2F2F2F"
                strokeWidth="4.94119"
              />
              <path
                d="M77.3984 78.5C77.3984 85.4036 71.802 91 64.8984 91C57.9949 91 52.3984 85.4036 52.3984 78.5C52.3984 71.5964 57.9949 66 64.8984 66C71.802 66 77.3984 71.5964 77.3984 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M157.398 78.5C157.398 85.4036 151.802 91 144.898 91C137.995 91 132.398 85.4036 132.398 78.5C132.398 71.5964 137.995 66 144.898 66C151.802 66 157.398 71.5964 157.398 78.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M84.8984 146H124.898"
                stroke="#2F2F2F"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1675_10359"
                  x1="-40.5348"
                  y1="188.1"
                  x2="212.652"
                  y2="182.514"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#48D824" />
                  <stop offset="1" stopColor="#10D0EA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.name}>Носеїв Норсоч</div>
        </div>
        <svg
          className={styles.next}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.90981 20.67C8.71981 20.67 8.52981 20.6 8.37981 20.45C8.24033 20.3089 8.16211 20.1185 8.16211 19.92C8.16211 19.7216 8.24033 19.5312 8.37981 19.39L14.8998 12.87C15.3798 12.39 15.3798 11.61 14.8998 11.13L8.37981 4.61002C8.24033 4.46888 8.16211 4.27845 8.16211 4.08002C8.16211 3.88159 8.24033 3.69116 8.37981 3.55002C8.66981 3.26002 9.14981 3.26002 9.43981 3.55002L15.9598 10.07C16.4698 10.58 16.7598 11.27 16.7598 12C16.7598 12.73 16.4798 13.42 15.9598 13.93L9.43981 20.45C9.28981 20.59 9.09981 20.67 8.90981 20.67Z"
            fill="url(#paint0_linear_284_576)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_284_576"
              x1="6.49462"
              y1="18.9363"
              x2="16.9139"
              y2="18.8223"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#48D824" />
              <stop offset="1" stopColor="#10D0EA" />
            </linearGradient>
          </defs>
        </svg>
      </div> */}

      <div className={styles.posts}>
        {data?.map((item, index) => (
          <InView
            as="div"
            async={true}
            ref={ref[index]}
            className={styles.post}
            onChange={async (inView) =>
              await viewChange(inView, item.id, index)
            }
            key={index}
            threshold={1}
            trackVisibility={true}
            delay={5000}
            triggerOnce={true}
          >
            <div className={styles.post_image}>
              {item.file && (
                <img
                  src={`${process.env.REACT_APP_BASE_RESOURCES}PostFiles/${item.id}/${item.file[0]}`}
                  loading="lazy"
                  alt=""
                />
              )}
              <div className={styles.info}>
                <div className={styles.likes}>
                  {item.reactions?.find((el) => el === myUser?.id) ? (
                    <svg
                      onClick={async () => await UnLike(item.id, index)}
                      width="32"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 21.6519C11.69 21.6519 11.39 21.6119 11.14 21.5219C7.32 20.2119 1.25 15.5619 1.25 8.69186C1.25 5.19186 4.08 2.35186 7.56 2.35186C9.25 2.35186 10.83 3.01186 12 4.19186C12.5808 3.60572 13.2726 3.14114 14.0349 2.82523C14.7972 2.50931 15.6148 2.34839 16.44 2.35186C19.92 2.35186 22.75 5.20186 22.75 8.69186C22.75 15.5719 16.68 20.2119 12.86 21.5219C12.61 21.6119 12.31 21.6519 12 21.6519ZM7.56 3.85186C4.91 3.85186 2.75 6.02186 2.75 8.69186C2.75 15.5219 9.32 19.3219 11.63 20.1119C11.81 20.1719 12.2 20.1719 12.38 20.1119C14.68 19.3219 21.26 15.5319 21.26 8.69186C21.26 6.02186 19.1 3.85186 16.45 3.85186C14.93 3.85186 13.52 4.56186 12.61 5.79186C12.33 6.17186 11.69 6.17186 11.41 5.79186C10.9656 5.18894 10.3855 4.69913 9.71667 4.36209C9.04781 4.02505 8.30898 3.85026 7.56 3.85186Z"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="7.35452"
                        cy="7.74184"
                        rx="5.03226"
                        ry="4.64516"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="7.35452"
                        cy="10.0646"
                        rx="5.03226"
                        ry="4.64516"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="15.0967"
                        cy="7.74184"
                        rx="5.03226"
                        ry="4.64516"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="17.419"
                        cy="8.90313"
                        rx="5.03226"
                        ry="5.80645"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="11.9991"
                        cy="14.3226"
                        rx="5.03226"
                        ry="5.80645"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="15.0967"
                        cy="13.5484"
                        rx="5.03226"
                        ry="5.80645"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="9.29045"
                        cy="12.3872"
                        rx="5.41935"
                        ry="6.19355"
                        fill="#FF0000"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={async () => await Like(item.id, index)}
                      width="32"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 21.6521C11.69 21.6521 11.39 21.6121 11.14 21.5221C7.32 20.2121 1.25 15.5621 1.25 8.69211C1.25 5.19211 4.08 2.35211 7.56 2.35211C9.25 2.35211 10.83 3.01211 12 4.19211C12.5808 3.60597 13.2726 3.14139 14.0349 2.82547C14.7972 2.50956 15.6148 2.34864 16.44 2.35211C19.92 2.35211 22.75 5.20211 22.75 8.69211C22.75 15.5721 16.68 20.2121 12.86 21.5221C12.61 21.6121 12.31 21.6521 12 21.6521ZM7.56 3.85211C4.91 3.85211 2.75 6.02211 2.75 8.69211C2.75 15.5221 9.32 19.3221 11.63 20.1121C11.81 20.1721 12.2 20.1721 12.38 20.1121C14.68 19.3221 21.26 15.5321 21.26 8.69211C21.26 6.02211 19.1 3.85211 16.45 3.85211C14.93 3.85211 13.52 4.56211 12.61 5.79211C12.33 6.17211 11.69 6.17211 11.41 5.79211C10.9656 5.18918 10.3855 4.69937 9.71668 4.36234C9.04781 4.0253 8.30898 3.8505 7.56 3.85211Z"
                        fill="#F5F5F5"
                      />
                    </svg>
                  )}
                  <div>{item.reactions?.length}</div>
                </div>
                <div className={styles.showed}>
                  <svg
                    width="32"
                    height="25"
                    viewBox="0 0 32 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12.4706C3.00272 5.82256 8.96217 1 16 1C23.0394 1 28.9973 5.82256 31 12.4706C28.9973 19.1186 23.0394 23.9412 16 23.9412C8.96217 23.9412 3.00272 19.1186 1 12.4706Z"
                      stroke="#F5F5F5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.7162 12.4707C20.7162 13.7744 20.2193 15.0248 19.3349 15.9468C18.4505 16.8687 17.2509 17.3866 16.0002 17.3866C14.7494 17.3866 13.5499 16.8687 12.6655 15.9468C11.781 15.0248 11.2842 13.7744 11.2842 12.4707C11.2842 11.1669 11.781 9.91646 12.6655 8.99454C13.5499 8.07262 14.7494 7.55469 16.0002 7.55469C17.2509 7.55469 18.4505 8.07262 19.3349 8.99454C20.2193 9.91646 20.7162 11.1669 20.7162 12.4707Z"
                      stroke="#F5F5F5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>{item.views}</div>
                </div>
              </div>
            </div>

            <div className={styles.post_data}>
              <div className={styles.profile}>
                <div className={styles.left}>
                  <div className={styles.profile_img}>
                    {item.userImage ? (
                      <img
                        onClick={() => navigate(`/${item.name}`)}
                        loading="lazy"
                        src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${item.userId}/${item.userImage}`}
                        alt=""
                      />
                    ) : (
                      <svg
                        onClick={() => navigate(`/${item.name}`)}
                        width="52"
                        height="52"
                        viewBox="0 0 209 209"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="104.5"
                          cy="104.5"
                          r="102.029"
                          fill="url(#paint0_linear_1675_10359)"
                          fillOpacity="0.5"
                          stroke="#2F2F2F"
                          strokeWidth="4.94119"
                        />
                        <path
                          d="M77.3984 78.5C77.3984 85.4036 71.802 91 64.8984 91C57.9949 91 52.3984 85.4036 52.3984 78.5C52.3984 71.5964 57.9949 66 64.8984 66C71.802 66 77.3984 71.5964 77.3984 78.5Z"
                          fill="#2F2F2F"
                        />
                        <path
                          d="M157.398 78.5C157.398 85.4036 151.802 91 144.898 91C137.995 91 132.398 85.4036 132.398 78.5C132.398 71.5964 137.995 66 144.898 66C151.802 66 157.398 71.5964 157.398 78.5Z"
                          fill="#2F2F2F"
                        />
                        <path
                          d="M84.8984 146H124.898"
                          stroke="#2F2F2F"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_1675_10359"
                            x1="-40.5348"
                            y1="188.1"
                            x2="212.652"
                            y2="182.514"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#48D824" />
                            <stop offset="1" stopColor="#10D0EA" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </div>
                  <div className={styles.profile_nt}>
                    <div
                      className={styles.name}
                      onClick={() => navigate(`/${item.name}`)}
                    >
                      {item.name}
                    </div>
                    <div className={styles.time}>
                      {formatDate(new Date(item.datePosted))}
                    </div>
                  </div>
                  {item.userId !== myUser?.id && (
                    <>
                      {item.isFollowing ? (
                        <button
                          onClick={async () =>
                            await UnFollow(item.userId, index)
                          }
                        >
                          {t("main.main.following")}
                        </button>
                      ) : (
                        <button
                          onClick={async () => await Follow(item.userId, index)}
                        >
                          {t("main.main.follow")}
                        </button>
                      )}
                    </>
                  )}
                </div>
                <div className={styles.right}>
                  <svg
                    onClick={() => addBookmark(item.id)}
                    className={styles.save}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5 11.3979H9.5C9.09 11.3979 8.75 11.0579 8.75 10.6479C8.75 10.2379 9.09 9.89795 9.5 9.89795H14.5C14.91 9.89795 15.25 10.2379 15.25 10.6479C15.25 11.0579 14.91 11.3979 14.5 11.3979Z"
                      fill="#2F2F2F"
                    />
                    <path
                      d="M12 13.96C11.59 13.96 11.25 13.62 11.25 13.21V8.20996C11.25 7.79996 11.59 7.45996 12 7.45996C12.41 7.45996 12.75 7.79996 12.75 8.20996V13.21C12.75 13.62 12.41 13.96 12 13.96Z"
                      fill="#2F2F2F"
                    />
                    <path
                      d="M19.0703 22.75C18.5603 22.75 18.0003 22.6 17.4603 22.29L12.5803 19.58C12.2903 19.42 11.7203 19.42 11.4303 19.58L6.55031 22.29C5.56031 22.84 4.55031 22.9 3.78031 22.44C3.01031 21.99 2.57031 21.08 2.57031 19.95V5.86C2.57031 3.32 4.64031 1.25 7.18031 1.25H16.8303C19.3703 1.25 21.4403 3.32 21.4403 5.86V19.95C21.4403 21.08 21.0003 21.99 20.2303 22.44C19.8803 22.65 19.4803 22.75 19.0703 22.75ZM12.0003 17.96C12.4703 17.96 12.9303 18.06 13.3003 18.27L18.1803 20.98C18.6903 21.27 19.1603 21.33 19.4603 21.15C19.7603 20.97 19.9303 20.54 19.9303 19.95V5.86C19.9303 4.15 18.5303 2.75 16.8203 2.75H7.18031C6.3563 2.75264 5.56679 3.08114 4.98412 3.66381C4.40146 4.24648 4.07295 5.03599 4.07031 5.86V19.95C4.07031 20.54 4.24031 20.98 4.54031 21.15C4.84031 21.32 5.31031 21.27 5.82031 20.98L10.7003 18.27C11.0703 18.06 11.5303 17.96 12.0003 17.96Z"
                      fill="#2F2F2F"
                    />
                  </svg>
                  <svg
                    onClick={() => setShowMenu(true)}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 14.75C3.48 14.75 2.25 13.52 2.25 12C2.25 10.48 3.48 9.25 5 9.25C6.52 9.25 7.75 10.48 7.75 12C7.75 13.52 6.52 14.75 5 14.75ZM5 10.75C4.66848 10.75 4.35054 10.8817 4.11612 11.1161C3.8817 11.3505 3.75 11.6685 3.75 12C3.75 12.3315 3.8817 12.6495 4.11612 12.8839C4.35054 13.1183 4.66848 13.25 5 13.25C5.33152 13.25 5.64946 13.1183 5.88388 12.8839C6.1183 12.6495 6.25 12.3315 6.25 12C6.25 11.6685 6.1183 11.3505 5.88388 11.1161C5.64946 10.8817 5.33152 10.75 5 10.75ZM19 14.75C17.48 14.75 16.25 13.52 16.25 12C16.25 10.48 17.48 9.25 19 9.25C20.52 9.25 21.75 10.48 21.75 12C21.75 13.52 20.52 14.75 19 14.75ZM19 10.75C18.6685 10.75 18.3505 10.8817 18.1161 11.1161C17.8817 11.3505 17.75 11.6685 17.75 12C17.75 12.3315 17.8817 12.6495 18.1161 12.8839C18.3505 13.1183 18.6685 13.25 19 13.25C19.3315 13.25 19.6495 13.1183 19.8839 12.8839C20.1183 12.6495 20.25 12.3315 20.25 12C20.25 11.6685 20.1183 11.3505 19.8839 11.1161C19.6495 10.8817 19.3315 10.75 19 10.75ZM12 14.75C10.48 14.75 9.25 13.52 9.25 12C9.25 10.48 10.48 9.25 12 9.25C13.52 9.25 14.75 10.48 14.75 12C14.75 13.52 13.52 14.75 12 14.75ZM12 10.75C11.6685 10.75 11.3505 10.8817 11.1161 11.1161C10.8817 11.3505 10.75 11.6685 10.75 12C10.75 12.3315 10.8817 12.6495 11.1161 12.8839C11.3505 13.1183 11.6685 13.25 12 13.25C12.3315 13.25 12.6495 13.1183 12.8839 12.8839C13.1183 12.6495 13.25 12.3315 13.25 12C13.25 11.6685 13.1183 11.3505 12.8839 11.1161C12.6495 10.8817 12.3315 10.75 12 10.75Z"
                      fill="#2F2F2F"
                    />
                  </svg>
                </div>
              </div>

              <div className={styles.description}>
                <div className={styles.text}>
                  {item.description?.split(/\n/g).map((item, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        {item}
                        <br />
                      </React.Fragment>
                    );
                  })}
                </div>
                {/* <div className={styles.more}>{t("main.main.show_more")}</div> */}
              </div>

              <div className={styles.commentarys}>
                {item.commentary?.map((comment) => (
                  <div className={styles.commentary} key={comment.id}>
                    <div className={styles.profile_comm}>
                      <div className={styles.image_comm}>
                        {comment.image ? (
                          <img
                            loading="lazy"
                            src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${comment.userId}/${comment.image}`}
                            alt=""
                          />
                        ) : (
                          <svg
                            width="34"
                            height="34"
                            viewBox="0 0 209 209"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="104.5"
                              cy="104.5"
                              r="102.029"
                              fill="url(#paint0_linear_1675_10359)"
                              fillOpacity="0.5"
                              stroke="#2F2F2F"
                              strokeWidth="4.94119"
                            />
                            <path
                              d="M77.3984 78.5C77.3984 85.4036 71.802 91 64.8984 91C57.9949 91 52.3984 85.4036 52.3984 78.5C52.3984 71.5964 57.9949 66 64.8984 66C71.802 66 77.3984 71.5964 77.3984 78.5Z"
                              fill="#2F2F2F"
                            />
                            <path
                              d="M157.398 78.5C157.398 85.4036 151.802 91 144.898 91C137.995 91 132.398 85.4036 132.398 78.5C132.398 71.5964 137.995 66 144.898 66C151.802 66 157.398 71.5964 157.398 78.5Z"
                              fill="#2F2F2F"
                            />
                            <path
                              d="M84.8984 146H124.898"
                              stroke="#2F2F2F"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_1675_10359"
                                x1="-40.5348"
                                y1="188.1"
                                x2="212.652"
                                y2="182.514"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#48D824" />
                                <stop offset="1" stopColor="#10D0EA" />
                              </linearGradient>
                            </defs>
                          </svg>
                        )}
                      </div>
                      <div className={styles.name_comm}>{comment.name}</div>
                      <div className={styles.text_comm}>
                        {comment.text.split(/\n/g).map((item, idx) => {
                          return (
                            <React.Fragment key={idx}>
                              {item}
                              <br />
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.8232 22.064C12.5132 22.064 12.2132 22.024 11.9632 21.934C8.14324 20.624 2.07324 15.974 2.07324 9.10397C2.07324 5.60397 4.90324 2.76397 8.38324 2.76397C10.0732 2.76397 11.6532 3.42397 12.8232 4.60397C13.4041 4.01783 14.0958 3.55325 14.8582 3.23734C15.6205 2.92142 16.4381 2.7605 17.2632 2.76397C20.7432 2.76397 23.5732 5.61397 23.5732 9.10397C23.5732 15.984 17.5032 20.624 13.6832 21.934C13.4332 22.024 13.1332 22.064 12.8232 22.064ZM8.38324 4.26397C5.73324 4.26397 3.57324 6.43397 3.57324 9.10397C3.57324 15.934 10.1432 19.734 12.4532 20.524C12.6332 20.584 13.0232 20.584 13.2032 20.524C15.5032 19.734 22.0832 15.944 22.0832 9.10397C22.0832 6.43397 19.9232 4.26397 17.2732 4.26397C15.7532 4.26397 14.3432 4.97397 13.4332 6.20397C13.1532 6.58397 12.5132 6.58397 12.2332 6.20397C11.7889 5.60105 11.2088 5.11124 10.5399 4.7742C9.87105 4.43716 9.13222 4.26237 8.38324 4.26397Z"
                          fill="#2F2F2F"
                        />
                      </svg>
                    </div>

                    <div className={styles.info_comm}>
                      <div className={styles.time_comm}>
                        {formatDate(new Date(comment.dateCreate))}
                      </div>
                      <div className={styles.count_like}>
                        1 {t("main.main.like")}
                        {/* {`${comment.likeCount} ${t("main.main.like")}`} */}
                      </div>
                      <div className={styles.answer_comm}>
                        {t("main.main.answ")}
                      </div>
                    </div>

                    <div className={styles.answers}>
                      {comment.answer?.map((answ) => (
                        <div className={styles.answer} key={answ.id}>
                          <div className={styles.profile_answ}>
                            <div className={styles.image_answ}>
                              {answ.image ? (
                                <img
                                  loading="lazy"
                                  src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${answ.userId}/${answ.image}`}
                                  alt=""
                                />
                              ) : (
                                <svg
                                  width="34"
                                  height="34"
                                  viewBox="0 0 209 209"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="104.5"
                                    cy="104.5"
                                    r="102.029"
                                    fill="url(#paint0_linear_1675_10359)"
                                    fillOpacity="0.5"
                                    stroke="#2F2F2F"
                                    strokeWidth="4.94119"
                                  />
                                  <path
                                    d="M77.3984 78.5C77.3984 85.4036 71.802 91 64.8984 91C57.9949 91 52.3984 85.4036 52.3984 78.5C52.3984 71.5964 57.9949 66 64.8984 66C71.802 66 77.3984 71.5964 77.3984 78.5Z"
                                    fill="#2F2F2F"
                                  />
                                  <path
                                    d="M157.398 78.5C157.398 85.4036 151.802 91 144.898 91C137.995 91 132.398 85.4036 132.398 78.5C132.398 71.5964 137.995 66 144.898 66C151.802 66 157.398 71.5964 157.398 78.5Z"
                                    fill="#2F2F2F"
                                  />
                                  <path
                                    d="M84.8984 146H124.898"
                                    stroke="#2F2F2F"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                  />
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_1675_10359"
                                      x1="-40.5348"
                                      y1="188.1"
                                      x2="212.652"
                                      y2="182.514"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#48D824" />
                                      <stop offset="1" stopColor="#10D0EA" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              )}
                            </div>
                            <div className={styles.name_answ}>{answ.name}</div>
                            <div className={styles.text_answ}>
                              {answ.text.split(/\n/g).map((item, idx) => {
                                return (
                                  <React.Fragment key={idx}>
                                    {item}
                                    <br />
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </div>
                          <div className={styles.info_answ}>
                            <div className={styles.time_answ}>
                              {formatDate(new Date(answ.dateCreate))}
                            </div>
                            <div className={styles.answ}>
                              {t("main.main.answ")}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.send_comment}>
                <AutosizeTextarea
                  value={currentValue[index]}
                  onKeyPress={(e) => SendMessage(e, item.id, index)}
                  onChange={(e) => {
                    setCurrentValue((prevState) => {
                      const newValueState = [...prevState];
                      newValueState[index] = e.target.value;
                      return newValueState;
                    });
                  }}
                />
                <svg
                  onClick={() => {
                    setEmojiShow((prevState) => {
                      const newEmojiShow = [...prevState];
                      newEmojiShow[index] = !newEmojiShow[index];
                      return newEmojiShow;
                    });
                  }}
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                    fill="#2F2F2F"
                    fillOpacity="0.5"
                  />
                  <path
                    d="M15.5 10.5C14.26 10.5 13.25 9.49 13.25 8.25C13.25 7.01 14.26 6 15.5 6C16.74 6 17.75 7.01 17.75 8.25C17.75 9.49 16.74 10.5 15.5 10.5ZM15.5 7.5C15.09 7.5 14.75 7.84 14.75 8.25C14.75 8.66 15.09 9 15.5 9C15.91 9 16.25 8.66 16.25 8.25C16.25 7.84 15.91 7.5 15.5 7.5ZM8.5 10.5C7.26 10.5 6.25 9.49 6.25 8.25C6.25 7.01 7.26 6 8.5 6C9.74 6 10.75 7.01 10.75 8.25C10.75 9.49 9.74 10.5 8.5 10.5ZM8.5 7.5C8.09 7.5 7.75 7.84 7.75 8.25C7.75 8.66 8.09 9 8.5 9C8.91 9 9.25 8.66 9.25 8.25C9.25 7.84 8.91 7.5 8.5 7.5ZM12 19.45C9.1 19.45 6.75 17.09 6.75 14.2C6.75 13.29 7.49 12.55 8.4 12.55H15.6C16.51 12.55 17.25 13.29 17.25 14.2C17.25 17.09 14.9 19.45 12 19.45ZM8.4 14.05C8.32 14.05 8.25 14.12 8.25 14.2C8.25 16.27 9.93 17.95 12 17.95C14.07 17.95 15.75 16.27 15.75 14.2C15.75 14.12 15.68 14.05 15.6 14.05H8.4Z"
                    fill="#2F2F2F"
                    fillOpacity="0.5"
                  />
                </svg>
                {emojiShow[index] && (
                  <div className={styles.emoji_picker}>
                    <EmojiPicker
                      lazyLoadEmojis={true}
                      emojiStyle={EmojiStyle.NATIVE}
                      onEmojiClick={(e) => {
                        setEmojiShow((prevState) => {
                          const newEmojiShow = [...prevState];
                          newEmojiShow[index] = false;
                          return newEmojiShow;
                        });
                        setCurrentValue((prevState) => {
                          const newValueState = [...prevState];
                          if (currentValue[index])
                            newValueState[index] =
                              currentValue[index] + e.emoji;
                          else newValueState[index] = e.emoji;
                          return newValueState;
                        });
                      }}
                      theme={Theme.LIGHT}
                      width="400px"
                    />
                  </div>
                )}
              </div>
            </div>
          </InView>
        ))}
      </div>
      {!data && (
        <div className={styles.not_find}>
          <div className={styles.nf_question}>?</div>

          <svg
            width="165"
            height="165"
            viewBox="0 0 165 165"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="82.3532"
              cy="82.3532"
              r="79.8826"
              stroke="#2F2F2F"
              strokeOpacity="0.5"
              strokeWidth="4.94119"
            />
            <circle
              cx="110.353"
              cy="52.7058"
              r="13.1765"
              fill="#2F2F2F"
              fillOpacity="0.5"
            />
            <circle
              cx="51.0603"
              cy="52.7058"
              r="13.1765"
              fill="#2F2F2F"
              fillOpacity="0.5"
            />
            <path
              d="M64 119H96.5"
              stroke="#8D8D8D"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <div className={styles.nf_text}>{t("main.main.post_nf")}</div>
        </div>
      )}
      <InView
        as="div"
        async={true}
        ref={ref2}
        trackVisibility={true}
        delay={500}
        onChange={(inView) => {
          if (inView) setPage(page + 1);
        }}
        threshold={0}
      ></InView>
    </>
  );
};
