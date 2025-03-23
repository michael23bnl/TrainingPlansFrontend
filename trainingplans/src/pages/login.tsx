"use client";

import { login } from "../api/users";
import { LoginUserRequest } from "../api/interfaces";
import { LoginUser } from "../components/users/LoginUser";

export function LoginPage() {

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


    
