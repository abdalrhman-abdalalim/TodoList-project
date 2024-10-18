import * as yup from "yup";

export const RegisterSchema = yup.object({
  UserName: yup
    .string()
    .required("username is required")
    .min(5, "username should be at least 5 characters"),
  Email: yup
    .string()
    .required("emai address is required")
    .matches(/^[^@]+@[^@]+\.[^@.]{2,}$/, "Not a vaid email address."),
  Password: yup
    .string()
    .required("password is required")
    .min(6, "password should be at least 6 characters"),
  PasswordConfimation: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("Password")], "Passwords must match"),
});

export const LoginSchema = yup.object({
  Email: yup
    .string()
    .required("emai address is required")
    .matches(/^[^@]+@[^@]+\.[^@.]{2,}$/, "Not a vaid email address."),
  Password: yup
    .string()
    .required("password is required")
    .min(6, "password should be at least 6 characters"),
});