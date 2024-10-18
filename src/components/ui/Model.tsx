import { ReactNode } from "react";
import { Dialog,DialogPanel, DialogTitle } from "@headlessui/react";

interface IProps {
  isOpen: boolean;
  title?: string;
  className?:string;
  children: ReactNode;
  closeModal: () => void;
}


const Model = ({ isOpen, title, children, closeModal ,className}: IProps) => {
  return (
    <>
      <Dialog
        onClose={closeModal}
        open={isOpen}
        transition
        className={`flex-col fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0 backdrop-blur-md`}
      >
        <DialogPanel
          className={`max-w-lg space-y-4 bg-white p-4 rounded-md shadow-md w-96 ${className}`}
        >
          {title && (
            <DialogTitle className="font-bold text-gray-700 text-center text-3xl ">
              {title}
            </DialogTitle>
          )}
          <div className="flex gap-4 justify-center p-5">{children}</div>
        </DialogPanel>
      </Dialog>
    </>
  );
};
export default Model;
