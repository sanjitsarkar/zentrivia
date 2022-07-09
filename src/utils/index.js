import toast from "react-hot-toast";
export { callApi } from "./callApi";

export function timeSince(date) {
  date = new Date(date);
  let seconds = Math.abs(Math.floor((new Date() - date) / 1000));

  let interval = seconds / 31536000;
  let res;
  if (interval > 1) {
    interval = Math.floor(interval);
    res = interval + " year";
    if (interval !== 1) return res + "s";
    return res;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    interval = Math.floor(interval);
    res = interval + " month";
    if (interval !== 1) return res + "s";
    return res;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    interval = Math.floor(interval);
    res = interval + " day";
    if (interval !== 1) return res + "s";
    return res;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    interval = Math.floor(interval);
    res = interval + " hour";
    if (interval !== 1) return res + "s";
    return res;
  }
  interval = seconds / 60;
  if (interval > 1) {
    interval = Math.floor(interval);
    res = interval + " minute";
    if (interval !== 1) return res + "s";
    return res;
  }
  interval = Math.floor(interval);
  res = interval + " second";
  if (interval !== 1) return res + "s";
  if (interval < 1) return "Just now";
  return res;
}
export function convertTimestampToDate(timestamp) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date(timestamp);

  return (
    months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
  );
}

export const NOT_AVAILABLE_IMAGE_URL =
  "https://booyah.live/ssr/_next/static/images/empty-vod-dark-mode.404178ec.png";

export const formatError = (err) => {
  if (err.response.data.errors) {
    return err.response.data.errors.join(", ");
  }
  return err.message;
};

export const GUEST_CREDENTIAL = {
  email: "johndoe@gmail.com",
  password: "123456",
};

export const initialSignupCredState = {
  email: "",
  password: "",
  phoneNo: "",
  confirmPassword: "",
  name: "",
};
export const initialReminderState = {
  title: "",
  message: "",
  status: "pending",
  sendTime: Date.now(),
};

export const COVER_PHOTO_PLACEHOLDER =
  "https://static.vecteezy.com/system/resources/previews/002/909/206/non_2x/abstract-background-for-landing-pages-banner-placeholder-cover-book-and-print-geometric-pettern-on-screen-gradient-colors-design-vector.jpg";
export const PROFILE_PIC_PLACEHOLDER =
  "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-7.jpg";
export const notify = (content, type = "success") => toast(content, { type });
export const initialLoginCredState = { email: "", password: "" };
export const initialState = {
  status: "idle",
  data: [],
  error: null,
};

export const formatDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  date = new Date(date);
  return (
    date.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    }) +
    ", " +
    months[date.getMonth()] +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear()
  );
};
export const formatUserInfo = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    totalReminder: user.totalReminder,
  };
};
