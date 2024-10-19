import * as yup from "yup";

export const schema = yup.object({
  username: yup.string().required("Please enter a username"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  phoneNumber: yup.string().required("Please enter a phone number"),
  password: yup
    .string()
    .min(8, "Password has to be more than eight characters")
    .required("Please enter a password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  reCaptchaResponse: yup.string().required("Please validite the reCaptcha"),
});
