/* eslint-disable react/react-in-jsx-scope */
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { SubmitHandler,useForm } from 'react-hook-form';
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { LoginInputForm } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../validation";
import instance from "../config/axios.config";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { IAxiosError } from "../interfaces";
import { useNavigate } from "react-router-dom";

type Inputs = {
  Email: string;
  Password: string;
};




const Login = ()=>{

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(LoginSchema),
  });

  // Renders
  const RenderInputForm = LoginInputForm.map(
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
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Submitted data:", data);
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("Email", data.Email);
      formData.append("Password", data.Password);
      const { status, data: resData } = await instance.post(
        "/Account/Login",
        formData
      );
      console.log(resData)
      if (status === 200) {
        toast.success("You will navigate to the Home page after 2 seconds", {
          position: "bottom-center",
          duration: 2000,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
        localStorage.setItem("loggedInUser", JSON.stringify(resData));
        setTimeout(()=>{
          navigate('/')
        },2000)
      }
    } catch (error) {
      const errorobj = error as AxiosError<IAxiosError>;
      toast.error(`${errorobj.response?.data}`, {
        position: "bottom-center",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
      setTimeout(()=> {
        navigate('/')
      },2000)
    }
  };
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 mt-5 text-2xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-3 mt-[-5px]" onSubmit={handleSubmit(onSubmit)}>
        {RenderInputForm}
        <Button className="m-auto w-80" isLoading={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
export default Login
