import { LoginUserRequest } from "../services/login";
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

    

    const handleOnOk = async () => {
        const loginUserRequest = { password, email };
        handleLogin(loginUserRequest);
    };

    return (    
        <div className="login__form">
                       
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Пароль"
            />

            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Адрес электронной почты"
            />     

            <button 
                            onClick={() => handleOnOk()} 
                            style={{ flex: 1 }}
                        >
                            Войти
                        </button>

        </div>
   
);
};