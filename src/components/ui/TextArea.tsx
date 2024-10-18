import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
const TextArea = ({...rest}:IProps)=>{
  return (
    <textarea className=" pl-3 p-2 border-[1px] border-gray-300 shadow-md focus:border-indigo-600 focus:outline-none focus:ring-1
    rounded-md"
    rows={6}
    cols={38}
    {...rest} />
  );
}
export default TextArea
