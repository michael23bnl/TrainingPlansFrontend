"use client";

import { login, LoginUserRequest } from "../services/login";
import { LoginUser } from "../components/LoginUser";





export default function LoginPage() {

    const handleLogin = async (request: LoginUserRequest) => {
        await login(request);
    }

    return (
        <div>
           <div>
            

            <LoginUser 
                handleLogin={handleLogin}

            />

            

        </div>
        </div>
    )

}


    
