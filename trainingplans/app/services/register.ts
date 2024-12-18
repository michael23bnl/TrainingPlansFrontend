export interface RegisterUserRequest {
    userName: string;
    password: string;
    email: string;
}

export const register = async (registerUserRequest: RegisterUserRequest) => {
    await fetch("https://localhost:7000/gateway/Users/register", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(registerUserRequest),
    })
}