

import { useAuthContext } from "../contexts/AuthContext";  // Импортируем хук из контекста

 const AuthNavbar = () => {
  const { isLoggedIn, logout } = useAuthContext(); // Извлекаем состояние и функцию из контекста

  const handleLogout = () => {
    logout(); // Вызываем функцию выхода
  };

  return ( 
      <ul className="flex justify-between gap-5">
        {isLoggedIn ? (
          <>
            <li><a href={"/profile"}>Профиль</a></li>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <li><a href={"/login"}>Войти</a></li>
            <li><a href={"/register"}>Регистрация</a></li>
          </>
        )}
      </ul>
  );
};

export default AuthNavbar;
