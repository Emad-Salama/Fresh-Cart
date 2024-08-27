import { useEffect, useState } from "react";
import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);


export default function AuthContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null)
    console.log(userToken);



    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setUserToken(token);
            const decoded = jwtDecode(token);

            console.log('Auth', decoded.id);
        }
    }, []);


    return <AuthContext.Provider value={{ userToken, setUserToken }}>
        {children}
    </AuthContext.Provider>
}