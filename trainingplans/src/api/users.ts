
import { RegisterUserRequest, LoginUserRequest } from "./interfaces"

export const register = async (registerUserRequest: RegisterUserRequest) => {
    await fetch("http://localhost:7000/gateway/Users/register", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(registerUserRequest),
    })
}

export const login = async (loginUserRequest: LoginUserRequest) => {
    const response = await fetch("http://localhost:7000/gateway/Users/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(loginUserRequest),
        credentials: 'include',
    })
    return response;
}

export const logout = async () => {
    await fetch("http://localhost:7000/gateway/Users/logout", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        credentials: 'include',
    })
}

export const isLoggedIn = async () => {
    const response = await fetch("http://localhost:7000/gateway/Users/is-logged-in", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
        credentials: 'include',
    })
    return response.json();
}

