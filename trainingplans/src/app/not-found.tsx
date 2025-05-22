
import { useNavigate, To } from "react-router-dom"


export const NotFoundPage = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1 as unknown as To, { replace: true });
    };

    const handleGoHome = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className="flex flex-col items-center m-[110px] gap-4">
            <h1 className="font-bold text-9xl">404</h1>
            <h2 className="font-semibold text-4xl">Страница не найдена</h2>
            <span>К сожалению, неверно набран адрес или такой страницы на сайте больше не существует.</span>
            <div className="flex flex-row w-[350px] justify-between">
                <button
                    onClick={handleGoBack}
                    className="bg-[#ffffff] hover:bg-[#f4f4f8] border border-blue-500 !text-blue-600 w-[165px] rounded transition-colors p-2"
                >
                    Вернуться назад
                </button>
                <button
                    onClick={handleGoHome}
                    className="bg-blue-500 hover:bg-blue-300 w-[165px] rounded transition-colors"
                >
                    На главную
                </button>
            </div>
        </div>
    )
}