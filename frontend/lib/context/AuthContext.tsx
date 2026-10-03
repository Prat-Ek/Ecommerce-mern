import { createContext } from "react";
import { IAuthContext } from "../types/AuthTypes";

const AuthContext = createContext<IAuthContext>({
    loggedInUser :null,
    login:async ()=>{},
    getLoggedInUser :async ()=>{},
      logout: async () => {}
})

export default AuthContext