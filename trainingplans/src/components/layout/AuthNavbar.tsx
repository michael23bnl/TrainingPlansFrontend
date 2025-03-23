

import { useAuthContext } from "../../store/contexts/AuthContext"; 

 const AuthNavbar = () => {
  const { isLoggedIn, logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  return ( 
      <ul className="flex items-center gap-5">
        {isLoggedIn ? (
          <>
            <li><a href={"/profile"}>Профиль</a></li>
            <li><button
              onClick={handleLogout}
              className="bg-red-500 text-white rounded"
            >
              Выйти
            </button></li>
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
