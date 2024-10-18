export interface IRegisterInputForm {
  name: "UserName" | "Email" | "Password" | "PasswordConfimation";
  type: string;
  placeholder: string;
  validation: {
    required: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface ILoginInputForm {
  name: "Email" | "Password";
  type: string;
  placeholder: string;
  validation: {
    required: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}



export interface IAxiosError {
  response:{
    data:ErrorObj[]|string;
  }
}
export interface ErrorObj {
  code: string;
  description: string;
}

export interface ITodo {
  name:string,
  description:string,
  id?:number,
  toDoListId?:number,
  createdOn?:string;
}