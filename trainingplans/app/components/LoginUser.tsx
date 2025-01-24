import { LoginUserRequest } from "../services/login";
import { useAuthContext } from "../contexts/AuthContext";
import "../globals.css";

import { useEffect, useState } from "react";


interface Props {  
    handleLogin: (request: LoginUserRequest) => void;
}

export const LoginUser = ({
    handleLogin
}: Props) => {
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    
    const { login } = useAuthContext();

    const handleOnOk = async () => {
        const loginUserRequest = { password, email };
        login();
        handleLogin(loginUserRequest);
    };

    return (    
        <div className="flex items-center justify-center">
            <div className="flex flex-col h-96 w-1/3 gap-4">
                        
                <input className="p-3"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Пароль"
                />

                <input className="p-3"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Адрес электронной почты"
                />     

                <button className="p-3 bg-blue-950" onClick={() => handleOnOk()}>
                    Войти
                </button>

            </div>
        </div>
);
};