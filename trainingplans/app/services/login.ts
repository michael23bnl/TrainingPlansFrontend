
export interface LoginUserRequest {
    password: string;
    email: string;
}

export const login = async (loginUserRequest: LoginUserRequest) => {
    await fetch("https://localhost:7000/gateway/Users/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(loginUserRequest),
        credentials: 'include',
    })
}