import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { RegisterInputForm } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../validation";
import instance from "../config/axios.config";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorObj, IAxiosError } from "../interfaces";
import { useNavigate } from "react-router-dom";

type Inputs = {
  UserName: string; // Ensure these match the API requirements
  Email: string;
  Password: string;
  PasswordConfimation: string; // Ensure this matches as well
};
const Register = () => {
  // States
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(RegisterSchema),
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Form data before sending:", data); // Log the data to see its values
    const formData = new FormData();
    formData.append("UserName", data.UserName); // Use the correct field names
    formData.append("Email", data.Email);
    formData.append("Password", data.Password);
    formData.append("PasswordConfimation", data.PasswordConfimation); // Ensure correct spelling

    setIsLoading(true);

    try {
      const { status } = await instance.post("/Account/Register", formData);
      if (status === 200) {
        toast.success(
          "You will navigate to the login page after 2 seconds to Login!",
          {
            position: "bottom-center",
            duration: 2000,
            style: {
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
            },
          }
        );  
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      const errorObj = error as AxiosError<IAxiosError>;
      if (errorObj.response?.data) {
        if (typeof errorObj.response.data === "string") {
          toast.error(`${errorObj.response.data}`, {
            position: "bottom-center",
            duration: 2000,
          });
        } else if (Array.isArray(errorObj.response.data)) {
          errorObj.response.data.map((er: ErrorObj) => {
            toast.error(`${er.description}`, {
              position: "bottom-center",
              duration: 2000,
            });
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Renders
  const RenderInputForm = RegisterInputForm.map(
    ({ placeholder, name, type, validation }, indx) => (
      <div key={indx}>
        <Input
          placeholder={placeholder}
          type={type}
          {...register(name, validation)}
        />
        <Toaster />
        {errors[name] && <InputErrorMsg msg={errors[name]?.message} />}
      </div>
    )
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 mt-5 text-2xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-3 mt-[-5px]" onSubmit={handleSubmit(onSubmit)}>
        {RenderInputForm}
        <Button className="m-auto w-80" isLoading={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
