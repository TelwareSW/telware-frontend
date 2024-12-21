import { userStatus } from "types/admin";
export const MOCK_USER1 = {
  id: "1",
  email: "johndoe@example.com",
  password: "1234",
  screenFirstName: "John",
  screenLastName: "Doe",
  bio: "Hello, I'm John Doe",
  photo: "",
  username: "johndoe",
  phoneNumber: "0123456789",
  status: "Online",
  screenName: "John Doe",
  state: userStatus.active,
};

export const MOCK_USER2 = {
  id: "2",
  email: "ay7aga@example.com",
  password: "1234",
  firstName: "ay",
  lastName: "7aga",
  bio: "Hello, I'm ay 7aga",
  photo: "",
  username: "Ay 7aga",
  phoneNumber: "0123456798",
  status: "Online",
  screenName: "Ay 7aga",
  state: userStatus.active,
};

export const BANNNED = {
  id: "3",
  email: "banned@gmail.com",
  password: "1234",
  firstName: "المصفوع",
  lastName: "من",
  bio: "أهلا أنا المصفوع من شخصيا",
  photo: "",
  username: "theBannedUser",
  phoneNumber: "0125456798",
  status: "Online",
  screenName: "theBannedUser",
  state: userStatus.banned,
};

export const DEACTIVATED = {
  id: "4",
  email: "deactivated@gmail.com",
  password: "1234",
  firstName: "Mr. ",
  lastName: "deactivtaed",
  bio: "أهلا أنا المصفوع من شخصيا",
  photo: "",
  username: "theDeactivatedUser",
  phoneNumber: "0125451598",
  status: "Online",
  screenName: "theDeactivatedUser",
  state: userStatus.deactivated,
};
export const ADMIN = {
  id: "5",
  screenFirstName: "Eng.",
  screenLastName: "Hashish",
  email: "admin@gmail.com",
  password: "12345678",
  username: "admin",
  isAdmin: true,
};

export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vY2tVc2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
