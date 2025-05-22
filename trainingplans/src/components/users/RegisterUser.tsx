import { useState } from "react";
import { RegisterUserRequest } from "../../api/interfaces";
import { AuthForm } from "./AuthForm";

interface Props {
    handleRegister: (request: RegisterUserRequest) => void;
}

export const RegisterUser = ({ handleRegister }: Props) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        handleRegister({ userName, email, password });
    };

    return (
        <AuthForm
            title="Регистрация"
            fields={[
                {
                    name: "userName",
                    value: userName,
                    placeholder: "Как к вам обращаться?",
                    onChange: setUserName,
                },
                {
                    name: "email",
                    value: email,
                    placeholder: "Адрес электронной почты",
                    onChange: setEmail,
                },
                {
                    name: "password",
                    value: password,
                    placeholder: "Пароль",
                    type: "password",
                    onChange: setPassword,
                },
            ]}
            onSubmit={handleSubmit}
            submitButtonText="Зарегистрироваться"
            footer={
                <span className="text-[#f4f4f8] border-[rgba(204,204,224,0.52)] mt-7 mb-5 font-semibold">
                    Уже есть аккаунт?{" "}
                    <a
                        href="/login"
                        className="text-blue-500 hover:text-blue-400 duration-200 font-semibold"
                    >
                        Войти
                    </a>
                </span>
            }
        />
    );
};
