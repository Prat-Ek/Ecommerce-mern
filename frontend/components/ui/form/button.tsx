import type { ReactNode } from "react";

export interface IFormButton {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const FormButton = ({
  onClick,
  className = "",
  disabled = false,
  children,
  type = "button",
}: Readonly<IFormButton>) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
                     disabled:bg-blue-600/50 disabled:cursor-not-allowed disabled:hover:bg-blue-700/50
                        w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 rounded-md text-sm ${className}
                `}
    >
      {children}
    </button>
  );
};
