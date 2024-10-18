import { forwardRef, InputHTMLAttributes, Ref } from "react"

interface IProps extends InputHTMLAttributes<HTMLInputElement>{}
const Input = forwardRef(({ ...rest }: IProps,ref:Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      className="block mt-7 mx-auto  w-80 rounded-lg border shadow-md focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none focus:ring-1 bg-Back-color p-4"
      {...rest}
    />
  );
});
export default Input