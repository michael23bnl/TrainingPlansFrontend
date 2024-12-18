"use client";

import { register, RegisterUserRequest } from "../services/register";
import { RegisterUser } from "../components/RegisterUser";


export default function RegistrationPage() {

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


    
