import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./MessageRoom.module.scss";
import EmojiPicker, { Theme, EmojiStyle } from "emoji-picker-react";
import axios from "axios";
import { useQuery } from "react-query";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { GetMessage } from "../../../Interface/Message";
import * as signalR from "@microsoft/signalr";
import { formatDate } from "../../../Components/Convertor/formatDate";
import { LazyLoading } from "../../../Components/LazyLoading/LazyLoading";
import { useDispatch } from "react-redux";
import { ToastActionTypes } from "../../../Components/Toast/store/type";

export const MessageRoom = () => {
  const myUser = useTypedSelector((state) => state.auth.user);
  const [t] = useTranslation("translation");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<any>(null);
  const messageListRef = useRef<any>(null);
  const [selectFiles, setSelectFiles] = useState<any>(null);
  const [emojiShow, setEmojiShow] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>("");
  const [icon, setIcon] = useState(66);
  const [messages, setMessages] = useState<GetMessage[]>([]);
  const [connection, setConnection] = useState<any>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Chat";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_BASE_HUBS + "chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .configureLogging(signalR.LogLevel.None)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start().then(() => connection.invoke("JoinRoom", id));

      connection.on("ReceiveTyping", (sUserId, isTyping) => {
        if (sUserId === myUser?.id) {
          if (isTyping) setIsTyping(true);
          else setIsTyping(false);
        }
      });
      connection.on("ReceiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        messageListRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [connection]);

  useEffect(() => {
    if (textAreaRef.current) {
      if (textAreaRef.current.scrollHeight > 102) return;

      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
      setIcon(scrollHeight);
    }
  }, [currentValue]);

  const getMessages = async (messageBoxId: string) => {
    const { data } = await axios.get(`message/get-messages/${messageBoxId}`);

    return data;
  };

  const { isLoading, data } = useQuery(
    ["getMessages", id],
    async () => await getMessages(id as string),
    {
      onSuccess: (res) => {
        setMessages(res.messages);
      },
    }
  );

  const SendMessage = async (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (currentValue.length > 0) {
        connection
          .invoke(
            "SendMessage",
            id,
            myUser?.id,
            currentValue,
            selectFiles ? selectFiles : null
          )
          .then(() => {
            setCurrentValue("");
            messageListRef.current?.scrollIntoView({ behavior: "smooth" });
          });
      }
    }
  };

  const fileClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  useEffect(() => {
    setTimeout(
      () => messageListRef.current?.scrollIntoView({ behavior: "smooth" }),
      400
    );
  }, []);

  const handleKeyDown = () => {
    if (textAreaRef.current.value && !isTyping) {
      connection.invoke("UserTyping", id, data?.userId, true);
      setTimeout(() => {
        connection.invoke("UserTyping", id, data?.userId, false);
      }, 5000);
    }
  };

  if (isLoading) return <LazyLoading />;

  return (
    <div className={styles.message}>
      <div className={styles.top}>
        <div className={styles.left}>
          <svg
            onClick={() => navigate(-1)}
            className={styles.back}
            width="33"
            height="30"
            viewBox="0 0 33 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.2859 4.1626C20.5413 4.1626 20.7967 4.2501 20.9984 4.4376C21.1859 4.61402 21.291 4.85206 21.291 5.1001C21.291 5.34814 21.1859 5.58618 20.9984 5.7626L12.2341 13.9126C11.5888 14.5126 11.5888 15.4876 12.2341 16.0876L20.9984 24.2376C21.1859 24.414 21.291 24.6521 21.291 24.9001C21.291 25.1481 21.1859 25.3862 20.9984 25.5626C20.6086 25.9251 19.9633 25.9251 19.5735 25.5626L10.8092 17.4126C10.1236 16.7751 9.7338 15.9126 9.7338 15.0001C9.7338 14.0876 10.1102 13.2251 10.8092 12.5876L19.5735 4.4376C19.7751 4.2626 20.0305 4.1626 20.2859 4.1626Z"
              fill="#2F2F2F"
              fillOpacity="0.6"
            />
          </svg>
          <div className={styles.image}>
            {data?.userImage ? (
              <img
                src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${data?.userId}/${data?.userImage}`}
                alt=""
              />
            ) : (
              <svg
                width="110"
                height="110"
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
          <div className={styles.info}>
            <div className={styles.name}>
              <div className={styles.text}>{data?.nameUser}</div>
              <svg
                className={styles.online}
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8.96484" cy="8" r="8" fill="#2FD57D" />
              </svg>
            </div>
            <div className={styles.write}>
              {isTyping && <>{t("main.message_room.write")}</>}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <svg
            className={styles.phone}
            width="32"
            height="31"
            viewBox="0 0 32 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.8996 29.3853C21.44 29.3853 19.9029 29.0366 18.3142 28.3649C16.7642 27.7062 15.2013 26.802 13.6771 25.7041C12.1659 24.5933 10.7063 23.3533 9.32419 21.997C7.95503 20.6149 6.71503 19.1553 5.61711 17.657C4.50628 16.107 3.61503 14.557 2.98211 13.0587C2.31044 11.457 1.97461 9.907 1.97461 8.44742C1.97461 7.43992 2.15544 6.48409 2.50419 5.59284C2.86586 4.67575 3.44711 3.82325 4.23503 3.087C5.22961 2.10534 6.36628 1.6145 7.58044 1.6145C8.08419 1.6145 8.60086 1.73075 9.04003 1.93742C9.54378 2.16992 9.97003 2.51867 10.28 2.98367L13.2767 7.20742C13.5479 7.582 13.7546 7.94367 13.8967 8.30534C14.0646 8.69284 14.155 9.08034 14.155 9.45492C14.155 9.94575 14.0129 10.4237 13.7417 10.8758C13.5043 11.2792 13.2132 11.6486 12.8763 11.9737L11.9979 12.8908C12.0109 12.9295 12.0238 12.9553 12.0367 12.9812C12.1917 13.2524 12.5017 13.7174 13.0959 14.4149C13.7288 15.1383 14.3229 15.797 14.9171 16.4041C15.6792 17.1533 16.3121 17.7474 16.9063 18.2383C17.6425 18.8583 18.1204 19.1683 18.4046 19.3103L18.3788 19.3749L19.3217 18.4449C19.7221 18.0445 20.1096 17.7474 20.4842 17.5537C21.1946 17.1145 22.0988 17.037 23.0029 17.4116C23.3388 17.5537 23.7004 17.7474 24.0879 18.0187L28.3763 21.067C28.8542 21.3899 29.2029 21.8033 29.4096 22.2941C29.6034 22.7849 29.6938 23.237 29.6938 23.6891C29.6938 24.3091 29.5517 24.9291 29.2804 25.5103C29.0092 26.0916 28.6734 26.5953 28.2471 27.0603C27.5109 27.8741 26.71 28.4553 25.78 28.8299C24.8888 29.1916 23.92 29.3853 22.8996 29.3853ZM7.58044 3.552C6.87003 3.552 6.21128 3.862 5.57836 4.482C4.98419 5.03742 4.57086 5.6445 4.31253 6.30325C4.04128 6.97492 3.91211 7.68534 3.91211 8.44742C3.91211 9.64867 4.19628 10.9533 4.76461 12.2966C5.34586 13.6658 6.15961 15.0866 7.19294 16.5074C8.22628 17.9283 9.40169 19.3103 10.6934 20.6149C11.985 21.8937 13.38 23.082 14.8138 24.1283C16.2088 25.1487 17.6425 25.9753 19.0634 26.5695C21.2721 27.5124 23.3388 27.732 25.0438 27.0216C25.7025 26.7503 26.2838 26.337 26.8134 25.7428C27.1104 25.4199 27.3429 25.0712 27.5367 24.6578C27.6917 24.3349 27.7692 23.9991 27.7692 23.6633C27.7692 23.4566 27.7304 23.2499 27.6271 23.0174C27.5445 22.8574 27.4194 22.7233 27.2654 22.6299L22.9771 19.5816C22.7188 19.4008 22.4863 19.2716 22.2667 19.1812C21.9825 19.0649 21.8663 18.9487 21.4271 19.2199C21.1688 19.3491 20.9363 19.5428 20.6779 19.8012L19.6963 20.7699C19.1925 21.2608 18.4175 21.377 17.8234 21.1574L17.4746 21.0024C16.945 20.7183 16.325 20.2791 15.6404 19.6978C15.0204 19.1683 14.3488 18.5483 13.535 17.7474C12.9021 17.1016 12.2692 16.417 11.6104 15.6549C11.0034 14.9445 10.5642 14.3374 10.2929 13.8337L10.1379 13.4462C10.0604 13.1491 10.0346 12.9812 10.0346 12.8003C10.0346 12.3353 10.2025 11.922 10.5254 11.5991L11.4942 10.5916C11.7525 10.3333 11.9463 10.0878 12.0754 9.86825C12.1788 9.70034 12.2175 9.55825 12.2175 9.42909C12.2175 9.32575 12.1788 9.17075 12.1142 9.01575C12.0238 8.80909 11.8817 8.57659 11.7009 8.33117L8.70419 4.0945C8.58327 3.92096 8.41831 3.78275 8.22628 3.69409C8.01961 3.60367 7.80003 3.552 7.58044 3.552ZM18.3788 19.3878L18.1721 20.2662L18.5209 19.362C18.4563 19.3491 18.4046 19.362 18.3788 19.3878Z"
              fill="url(#paint0_linear_785_4724)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_785_4724"
                x1="-3.40142"
                y1="26.6083"
                x2="30.1782"
                y2="25.8687"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#48D824" />
                <stop offset="1" stopColor="#10D0EA" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className={styles.video}
            width="32"
            height="31"
            viewBox="0 0 32 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1517 25.5103H9.40169C3.70544 25.5103 1.97461 23.7795 1.97461 18.0833V12.9166C1.97461 7.22034 3.70544 5.4895 9.40169 5.4895H17.1517C22.8479 5.4895 24.5788 7.22034 24.5788 12.9166V18.0833C24.5788 23.7795 22.8479 25.5103 17.1517 25.5103ZM9.40169 7.427C4.77753 7.427 3.91211 8.30534 3.91211 12.9166V18.0833C3.91211 22.6945 4.77753 23.5728 9.40169 23.5728H17.1517C21.7759 23.5728 22.6413 22.6945 22.6413 18.0833V12.9166C22.6413 8.30534 21.7759 7.427 17.1517 7.427H9.40169ZM26.8392 19.6978C26.3096 19.6978 25.8704 19.2587 25.8704 18.7291C25.8704 18.1995 26.3096 17.7603 26.8392 17.7603C27.6013 17.7603 27.7692 17.6441 27.7821 17.6441C27.8079 17.5666 27.8079 17.1145 27.8079 16.7916V14.2083C27.8079 13.8853 27.8079 13.4462 27.7563 13.3299C27.7692 13.3428 27.5496 13.2395 26.8392 13.2395C26.3096 13.2395 25.8704 12.8003 25.8704 12.2708C25.8704 11.7412 26.3096 11.302 26.8392 11.302C29.5259 11.302 29.7454 12.6195 29.7454 14.2083V16.7916C29.7454 18.3803 29.5259 19.6978 26.8392 19.6978Z"
              fill="url(#paint0_linear_785_4725)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_785_4725"
                x1="-3.41144"
                y1="23.5083"
                x2="30.2156"
                y2="22.4791"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#48D824" />
                <stop offset="1" stopColor="#10D0EA" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className={styles.menu}
            width="5"
            height="23"
            viewBox="0 0 5 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="2.35938"
              cy="2.67847"
              r="2"
              fill="url(#paint0_linear_785_4726)"
            />
            <circle
              cx="2.35938"
              cy="11.5"
              r="2"
              fill="url(#paint1_linear_785_4726)"
            />
            <circle
              cx="2.35938"
              cy="20.3213"
              r="2"
              fill="url(#paint2_linear_785_4726)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_785_4726"
                x1="-0.41641"
                y1="4.27847"
                x2="4.42927"
                y2="4.17155"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#48D824" />
                <stop offset="1" stopColor="#10D0EA" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_785_4726"
                x1="-0.41641"
                y1="13.1"
                x2="4.42927"
                y2="12.9931"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#48D824" />
                <stop offset="1" stopColor="#10D0EA" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_785_4726"
                x1="-0.41641"
                y1="21.9213"
                x2="4.42927"
                y2="21.8144"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#48D824" />
                <stop offset="1" stopColor="#10D0EA" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className={styles.time}>{t("main.message_room.time")}</div>
      </div>

      <div className={styles.chat}>
        {messages &&
          messages.map((item) => (
            <div
              className={
                item.userId === myUser?.id
                  ? styles.my_message
                  : styles.someone_message
              }
              key={item.id}
            >
              {item.userId === myUser?.id ? (
                <>
                  <div className={styles.my_date}>
                    {formatDate(new Date(item.dateSender))}
                  </div>
                  <div className={styles.my_text}>
                    {item.messageText.split(/\n/g).map((item, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          {item}
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.someone_text}>{item.messageText}</div>
                  <div className={styles.someone_date}>
                    {formatDate(new Date(item.dateSender))}
                  </div>
                </>
              )}
            </div>
          ))}
        <div ref={messageListRef}></div>
        {/* <div className={styles.showed}>{t("main.message_room.showed")}</div> */}
      </div>

      <div className={styles.bottom}>
        <textarea
          rows={1}
          placeholder={t("main.message_room.text_area").toString()}
          ref={textAreaRef}
          value={currentValue}
          onKeyPress={SendMessage}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setCurrentValue(e.target.value);
          }}
        ></textarea>
        {emojiShow && (
          <div className={styles.emoji_picker}>
            <EmojiPicker
              lazyLoadEmojis={true}
              emojiStyle={EmojiStyle.NATIVE}
              onEmojiClick={(e) => {
                setEmojiShow(false);
                setCurrentValue(currentValue + e.emoji);
              }}
              theme={Theme.LIGHT}
              width="400px"
            />
          </div>
        )}
        <div className={styles.icon} style={{ height: icon }}>
          <input
            type="file"
            max={5}
            ref={hiddenFileInput}
            onChange={async (event: any) => {
              const files = event.currentTarget.files;

              files.forEach((element, index) => {
                if (element.size > 20971520) {
                  files.splice(index, 1);

                  dispatch({
                    type: ToastActionTypes.SHOW,
                    payload: {
                      message: t("toast.error.big_size_file"),
                      type: "error",
                    },
                  });
                }
              });

              setSelectFiles(files);
            }}
            style={{ display: "none" }}
            multiple
          />
          <svg
            className={styles.file}
            onClick={fileClick}
            width="23"
            height="27"
            viewBox="0 0 23 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.76375 3.10017V3.1C0.76375 1.81951 1.86385 0.75 3.25 0.75H14.1505L22.25 8.40768V23.9C22.25 25.1789 21.1378 26.25 19.75 26.25H3.23625C1.8501 26.25 0.75 25.1805 0.75 23.9L0.76375 3.10017ZM3 23.9V24.15H3.25H19.75H20V23.9V9.6V9.35H19.75H13.125V3.1V2.85H12.875H3.25H3V3.1V23.9Z"
              fill="#2F2F2F"
              stroke="#EBEBEB"
              strokeWidth="0.5"
            />
          </svg>
          <svg
            className={styles.emoji}
            onClick={() => setEmojiShow(!emojiShow)}
            width="30"
            height="29"
            viewBox="0 0 30 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.6243 27.4897H11.3743C4.8131 27.4897 2.00977 24.6863 2.00977 18.1251V10.8751C2.00977 4.31383 4.8131 1.5105 11.3743 1.5105H18.6243C25.1856 1.5105 27.9889 4.31383 27.9889 10.8751V18.1251C27.9889 24.6863 25.1856 27.4897 18.6243 27.4897ZM11.3743 3.323C5.80393 3.323 3.82227 5.30466 3.82227 10.8751V18.1251C3.82227 23.6955 5.80393 25.6772 11.3743 25.6772H18.6243C24.1948 25.6772 26.1764 23.6955 26.1764 18.1251V10.8751C26.1764 5.30466 24.1948 3.323 18.6243 3.323H11.3743Z"
              fill="#2F2F2F"
            />
            <path
              d="M13.3565 11.4804C13.1269 11.4804 12.8973 11.3958 12.7161 11.2145C11.8582 10.3566 10.4565 10.3566 9.59858 11.2145C9.24816 11.565 8.66816 11.565 8.31774 11.2145C8.1492 11.044 8.05469 10.8139 8.05469 10.5741C8.05469 10.3344 8.1492 10.1043 8.31774 9.93371C9.87649 8.37496 12.4261 8.37496 13.9969 9.93371C14.3473 10.2841 14.3473 10.8641 13.9969 11.2145C13.8157 11.3958 13.5861 11.4804 13.3565 11.4804ZM16.6432 11.4804C16.4136 11.4804 16.184 11.3958 16.0027 11.2145C15.8342 11.044 15.7397 10.8139 15.7397 10.5741C15.7397 10.3344 15.8342 10.1043 16.0027 9.93371C17.5615 8.37496 20.1111 8.37496 21.6819 9.93371C22.0323 10.2841 22.0323 10.8641 21.6819 11.2145C21.3315 11.565 20.7515 11.565 20.4011 11.2145C19.5432 10.3566 18.1415 10.3566 17.2836 11.2145C17.2012 11.301 17.1017 11.3693 16.9914 11.415C16.8811 11.4608 16.7625 11.4831 16.6432 11.4804ZM10.6498 22.2938C9.55024 22.2938 8.65608 21.3996 8.65608 20.3C8.65608 16.8079 11.4957 13.9563 14.9998 13.9563C18.504 13.9563 21.3436 16.8079 21.3436 20.3C21.3436 21.3996 20.4494 22.2938 19.3498 22.2938H10.6498ZM14.9998 15.7688C12.4986 15.7688 10.4686 17.7988 10.4686 20.3C10.4686 20.3967 10.5532 20.4813 10.6498 20.4813H19.3498C19.4465 20.4813 19.5311 20.3967 19.5311 20.3C19.5311 17.7988 17.5011 15.7688 14.9998 15.7688Z"
              fill="#2F2F2F"
            />
          </svg>
          <svg
            className={styles.audio}
            width="22"
            height="27"
            viewBox="0 0 22 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3361 22.935L12.1196 22.9643V23.1828V25.6034C12.1196 25.9091 12.0005 26.2013 11.7899 26.4159C11.5796 26.6304 11.2953 26.75 11 26.75C10.7047 26.75 10.4204 26.6304 10.2101 26.4159C9.99955 26.2013 9.88043 25.9091 9.88043 25.6034V23.1828V22.9643L9.66392 22.935C7.20074 22.6021 4.93879 21.3686 3.29888 19.4623C1.6589 17.5559 0.752782 15.1064 0.75 12.5688C0.750033 12.2632 0.869144 11.9711 1.07963 11.7565C1.28998 11.542 1.57423 11.4224 1.86957 11.4224C2.1649 11.4224 2.44915 11.542 2.6595 11.7565C2.87002 11.9712 2.98913 12.2633 2.98913 12.569C2.98913 14.7326 3.83197 16.8085 5.33374 18.3399C6.83568 19.8714 8.87379 20.7328 11 20.7328C13.1262 20.7328 15.1643 19.8714 16.6663 18.3399C18.168 16.8085 19.0109 14.7326 19.0109 12.569C19.0109 12.2633 19.13 11.9712 19.3405 11.7565C19.5509 11.542 19.8351 11.4224 20.1304 11.4224C20.4258 11.4224 20.71 11.542 20.9204 11.7565C21.1308 11.9711 21.2499 12.2632 21.25 12.5687C21.2473 15.1063 20.3411 17.5559 18.7011 19.4623C17.0612 21.3686 14.7993 22.6021 12.3361 22.935ZM15.018 16.6731C13.9515 17.7606 12.5061 18.3707 11 18.3707C9.49389 18.3707 8.04846 17.7606 6.98197 16.6731C5.91531 15.5855 5.31522 14.1092 5.31522 12.569V6.05172C5.31522 4.51145 5.91531 3.03523 6.98197 1.94755C8.04846 0.860042 9.49389 0.25 11 0.25C12.5061 0.25 13.9515 0.860042 15.018 1.94755C16.0847 3.03523 16.6848 4.51145 16.6848 6.05172V12.569C16.6848 14.1092 16.0847 15.5855 15.018 16.6731ZM8.56184 3.57249C7.91621 4.23084 7.55435 5.12274 7.55435 6.05172V12.569C7.55435 13.498 7.91621 14.3899 8.56184 15.0482C9.20763 15.7067 10.0846 16.0776 11 16.0776C11.9154 16.0776 12.7924 15.7067 13.4382 15.0482C14.0838 14.3899 14.4457 13.498 14.4457 12.569V6.05172C14.4457 5.12274 14.0838 4.23084 13.4382 3.57249C12.7924 2.91397 11.9154 2.5431 11 2.5431C10.0846 2.5431 9.20763 2.91397 8.56184 3.57249Z"
              fill="#2F2F2F"
              stroke="#EBEBEB"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
