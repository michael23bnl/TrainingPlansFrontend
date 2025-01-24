
export const logout = async () => {
    await fetch("http://localhost:7000/gateway/Users/logout", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        credentials: 'include',
    })
}