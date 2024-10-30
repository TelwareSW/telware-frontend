import * as yup from "yup";

const BIO_MAX_LENGTH = 120;

const ValidationSchema = yup.object({
  profilePicture: yup.string(),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string(),
  bio: yup.string().max(BIO_MAX_LENGTH, "Bio must be 160 characters or less"),
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .matches(/^[a-zA-Z0-9_]*$/, "Username must be alphanumeric"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  phone: yup.string().matches(/^[0-9]*$/, "Phone number must be numeric"),
});

export { ValidationSchema, BIO_MAX_LENGTH };
