
import './AuthNavbar.css'
import { useAuthContext } from "../../../../store/contexts/AuthContext"; 
import logoutIcon from '../../../../assets/logout.svg';
import loginIcon from '../../../../assets/login.svg';


 const AuthNavbar = () => {
  const { isLoggedIn, logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  return ( 
      <ul className="">
        {isLoggedIn ? (
          <>
            <li><a href={"/profile"}>Профиль</a></li>
            <li>
              <button
                onClick={handleLogout}
                className="logout-button"
              >
                <img 
                  src={logoutIcon} 
                  className="logout-icon" 
                  alt="Выйти" 
                />
                <span>Выйти</span>              
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href={"/login"}
                className="login-link"
              >
                <img 
                    src={loginIcon} 
                    className="login-icon" 
                    alt="Войти" 
                  />
                  <span>Войти</span>  
              </a>
            </li>
            <li><a href={"/register"}>Регистрация</a></li>
          </>
        )}
      </ul>
  );
};

export default AuthNavbar;
