'use client'
import type { BaseSyntheticEvent, HTMLInputTypeAttribute } from "react";
import {  useController, type Control, type FieldValues } from "react-hook-form";
//import { Controller } from "react-hook-form"; // for method 2 using controller
import type { Path } from "react-hook-form";

export interface IFormInputProps <T extends FieldValues>{
  type?: HTMLInputTypeAttribute;
  // name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  control?: Control<T>,
  name: Path<T>,
  errMsg?: string | null;
}

// export const FormInput =(props:Readonly<IFormInputProps>)=>{
export const FormInput = <T extends FieldValues>({
  required = false,
  className = "",
  type = "text",
  placeholder = "Enter your value",
  // onChange,
  control,
  name,
  errMsg=null,
}: Readonly<IFormInputProps<T>>) => {

   {/* using concept of hook for form handling (2 methods can use anyone same work) */}
  {/* method 1 */}
  // const {field} = useController({
  //   name:name,
  //   control: control
  // })
  const { field } = useController({
  name,
  control,
});
  return (
    <>
      {/* <input
      type={props.type}
      placeholder={props.placeholder}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
    /> */}

      <input
        required={required}
        type={type}
        {...field}
        value={field.value ?? ""}
        placeholder={placeholder}
        className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 ${className}`}
        // onChange={onChange}
      />
      <span className="text-red-900 text-sm">{errMsg}</span>

      {/* method 2 using controller as in the register form but dynamic  */}

      {/* <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <input
                type={"text"}
                {...field}
                placeholder={"Emily"}
                className={
                  "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                }
              />
              <span className="text-red-900 text-sm">{errMsg}</span>
            </>
          );
        }}
      /> */}
    </>
  );
};


export interface ISingleOption{
  label:string,
  value:string
}
export interface ISelectFormFieldProps <T extends FieldValues>{
  control:Control<T>,
  name:Path<T>,
  options:Array<ISingleOption>
  errMsg?:string | null

}
export const SelectFromField=<T extends FieldValues>({control ,name, errMsg=null, options=[]}:Readonly<ISelectFormFieldProps<T>>)=>{
  const{field}=useController({
    name:name,
    control: control
  })
  return (
    <>
      <select {...field} 
      className="w-full px-4 py-2 border rounded-md">
        <option value="">Select Gender</option>
        {/* <option value="male">Male</option>
        <option value="female">Female</option> */}

        {
          options && options.map((option:ISingleOption, index:number)=>(
                <option key={index} value={option.value}>{option.label}</option>
          ))
        }
      </select>
      <span className="text-red-900 text-sm">{errMsg}</span>
    </>
  );

}


export interface IInputFileProps <T extends FieldValues>{

 multiple?:boolean,
  control?: Control<T>,
  name: Path<T>,
  errMsg?: string | null;
}



export const FileInput =<T extends FieldValues>({
  
  control,
  name,
  errMsg=null,
  multiple=false
}: Readonly<IInputFileProps<T>>) => {
  const {field} = useController({
    name:name, control:control
  })
  return (
     <>
     <input type="file"
     name={name}
     accept="*/image"
     multiple={multiple}
     onChange={(e:BaseSyntheticEvent)=>{
      const files = Object.values(e.target.files);
      if (e.target.multiple){
        field.onChange(files)

      }else {
        field.onChange(files[0])
      }
      // console.log (e.target.files)
     }}
     />
     <span className="text-red-900 text-sm">{errMsg}</span>
     </>

  )
}