
import { useEffect } from "react";
import { useAuthContext } from "../store/contexts/AuthContext"
import { useNavigate, To, useLocation } from "react-router-dom";
export const UnauthorizedPage = () => {

    const { isLoggedIn } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true })
        }
    }, [isLoggedIn, navigate, from])

    if (isLoggedIn) {
        // ничего не показываем во время редиректа
        return null;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col w-fit items-center m-[110px] gap-4 rounded-2xl p-10 bg-gradient-to-br from-[rgba(38,41,82,0.85)] to-[rgba(25,28,70,0.9)]
        text-white shadow-2xl shadow-blue-900/50 backdrop-blur-sm font-medium leading-relaxed text-lg transition-all">
                <h2>Для просмотра этой страницы необходимо войти в систему</h2>
                <div className="flex w-fit items-center gap-4">
                    <button 
                        onClick={() => { navigate(-1 as unknown as To, { replace: true }); }}
                        className="bg-gray-400 text-gray-600 rounded-lg hover:bg-gray-200 w-[100px] transition-all"
                    >
                        Назад
                    </button>
                    <button 
                        onClick={() => { navigate('/login', { state: { from: location }}) }}
                        className="bg-blue-500 text-gray-100 rounded-lg hover:bg-blue-400 w-[100px] transition-all"
                    >
                        Войти
                    </button>
                </div>
            </div>
        </div>
    )
}