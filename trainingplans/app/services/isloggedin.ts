
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