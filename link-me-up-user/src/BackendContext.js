import { createContext, useContext } from "react";

export const BackendContext = createContext();

export const BackendProvider = ({children}) => {
    const backendURL = process.env.BACKEND_URL || "https://link-me-up-backend.vercel.app"

    return(
        <BackendContext.Provider value={backendURL}>
            {children}
        </BackendContext.Provider>
    )
}

export const BackendURL = () => {
    return useContext(BackendContext)
}