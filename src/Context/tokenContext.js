import { useEffect } from "react";
import { createContext, useState } from "react";


export let tokenContext = createContext()

function TokenContextProvider({ children }) {
    const [token, setToken] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("userToken"))
            setToken(localStorage.getItem("userToken"));
        else setToken(null);
    }, []);

    return <TokenContextProvider value={{ token, setToken }}>{children}</TokenContextProvider>
}

export default TokenContextProvider;

