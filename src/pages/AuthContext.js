import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 서버로부터 로그인 상태를 확인하고 설정하는 로직
        axios
            .get("http://localhost:8080/current-member", {
                withCredentials: true,
            })
            .then((res) => {
                setIsLoggedIn(res.data !== 'anonymousUser');
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
