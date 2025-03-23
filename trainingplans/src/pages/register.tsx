"use client";

import { register } from "../api/users";
import { RegisterUserRequest } from "../api/interfaces";
import { RegisterUser } from "../components/users/RegisterUser";


export function RegistrationPage() {

    const handleRegister = async (request: RegisterUserRequest) => {
        await register(request);
    }
    
    return (
        <div>
           <div>
            <RegisterUser 
                handleRegister={handleRegister}
            />
        </div>
        </div>
    )
}


    
