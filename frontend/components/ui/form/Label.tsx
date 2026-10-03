import type { ReactNode } from "react";

export interface IFormLabel{
    htmlFor?:string,
    children?:ReactNode,
    className?:string

}

export const FormLabel =({ htmlFor="",children,className=""}:Readonly<IFormLabel>)=>{
    return (
      <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium text-gray-700 ${className}`}
      >
        {children}
      </label>
    );
}