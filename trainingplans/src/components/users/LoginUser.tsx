import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../store/contexts/AuthContext";
import { LoginUserRequest } from "../../api/interfaces";
import { AuthForm } from "./AuthForm";

interface Props {
    handleLogin: (request: LoginUserRequest) => Promise<{ status: number }>;
}

export const LoginUser = ({ handleLogin }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { login } = useAuthContext();

    const handleSubmit = async () => {
        const response = await handleLogin({ email, password });
        if (response.status === 200) {
            login();
            navigate(from, { replace: true });
        }
    };

    return (
        <AuthForm
            title="Авторизация"
            fields={[
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
            submitButtonText="Войти"
            footer={
                <span className="text-[#f4f4f8] border-[rgba(204,204,224,0.52)] mt-7 mb-5 font-semibold">
                    Ещё не зарегистрированы?{" "}
                    <a
                        href="/register"
                        className="text-blue-500 hover:text-blue-400 duration-200 font-semibold"
                    >
                        Создать аккаунт
                    </a>
                </span>
            }
        />
    );
};
