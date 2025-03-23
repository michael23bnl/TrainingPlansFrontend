import { RegisterUserRequest } from "../../api/interfaces";

import { useState } from "react";


interface Props {  
    handleRegister: (request: RegisterUserRequest) => void;
}

export const RegisterUser = ({
    handleRegister
}: Props) => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("User");

    

    const handleOnOk = async () => {
        const registerUserRequest = { userName, password, email, role };
        handleRegister(registerUserRequest);
    };

    return (    
        <div className="flex items-center justify-center border rounded-lg border-red-400">
            <div className="flex flex-col h-full w-fit gap-4 border rounded-lg border-green-400 p-4">

                <input className="p-3 w-96"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                    placeholder="Как к вам обращаться?"
                />
                
                <input className="p-3 w-96"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Пароль"
                />

                <input className="p-3 w-96"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Адрес электронной почты"
                />     

                <select
                    className="p-3 w-96"
                    value={role}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
                    title="Выберите роль пользователя"
                >
                    <option value="User">Пользователь</option>
                    <option value="Trainer">Тренер</option>
                    <option value="Admin">Администратор</option>
                </select>

                <button className="p-3 bg-blue-950" type="button" onClick={() => handleOnOk()}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
);
};