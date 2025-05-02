

export const getStatistics = async () => {

    const response = await fetch("http://localhost:7000/gateway/Statistics/get", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    })

    return response.json();

}