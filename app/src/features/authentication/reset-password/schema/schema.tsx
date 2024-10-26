import * as yup from "yup";

export const schema = yup.object({
  newPassword: yup
    .string()
    .min(8, "Password has to be more than eight characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});
