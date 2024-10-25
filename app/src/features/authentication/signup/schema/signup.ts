import * as yup from "yup";

export const schema = yup.object({
  username: yup.string().required("Please enter a username"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password has to be more than eight characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  reCaptchaResponse: yup.string().required("Please validite the reCaptcha"),
});
