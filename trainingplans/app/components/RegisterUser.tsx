import { RegisterUserRequest } from "../services/register";
import "../globals.css";

import { useEffect, useState } from "react";


interface Props {  
    handleRegister: (request: RegisterUserRequest) => void;
}

export const RegisterUser = ({
    handleRegister
}: Props) => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    

    const handleOnOk = async () => {
        const registerUserRequest = { userName, password, email };
        handleRegister(registerUserRequest);
    };

    return (    
        <div className="register__form">
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                placeholder="Имя пользователя"
            />
            
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
                            Зарегистрироваться
                        </button>

        </div>
   
);
};