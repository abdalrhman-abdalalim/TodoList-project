import { ILoginInputForm, IRegisterInputForm } from "../interfaces";

export const RegisterInputForm: IRegisterInputForm[] = [
  {
    name: "UserName",
    type: "text",
    placeholder: "Enter your username",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "Email",
    type: "text",
    placeholder: "Enter your email address",
    validation: {
      required: true,
      pattern: /^[^@]+@[^@]+\.[^@]{2}}$/,
    },
  },
  {
    name: "Password",
    type: "password",
    placeholder: "Enter your password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
  {
    name: "PasswordConfimation",
    type: "password",
    placeholder: "Enter password confirmation",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const LoginInputForm: ILoginInputForm[] = [
  {
    name: "Email",
    type: "text",
    placeholder: "Enter your email",
    validation: {
      required: true,
      pattern: /^[^@]+@[^@]+\.[^@]{2}}$/,
    },
  },
  {
    name: "Password",
    type: "password",
    placeholder: "Enter your password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];