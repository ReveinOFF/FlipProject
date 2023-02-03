import { useState } from "react";
import Calendar from "react-calendar";
import "./CustomCalendar.scss";

export const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        nextLabel={
          <svg
            width="26"
            height="23"
            viewBox="0 0 26 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="26" height="23" rx="6" fill="#F2F5FF" />
            <path
              d="M17.6544 9.86053C18.7935 10.6566 18.7935 12.3431 17.6544 13.1392L11.8957 17.1639C10.57 18.0904 8.75 17.142 8.75 15.5246L8.75 7.47509C8.75 5.85772 10.57 4.90926 11.8957 5.83578L17.6544 9.86053Z"
              fill="#8C99C3"
            />
          </svg>
        }
        prevLabel={
          <svg
            width="26"
            height="23"
            viewBox="0 0 26 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="26"
              height="23"
              rx="6"
              transform="matrix(-1 9.2024e-09 -7.60198e-09 1 26 0)"
              fill="#F2F5FF"
            />
            <path
              d="M8.34557 9.86053C7.20652 10.6566 7.20652 12.3431 8.34557 13.1392L14.1043 17.1639C15.43 18.0904 17.25 17.142 17.25 15.5246L17.25 7.47509C17.25 5.85772 15.43 4.90926 14.1043 5.83578L8.34557 9.86053Z"
              fill="#8C99C3"
            />
          </svg>
        }
      />
    </div>
  );
};
