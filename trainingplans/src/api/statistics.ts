

export const getStatistics = async (period: string) => {

    const response = await fetch(`http://localhost:7000/gateway/Statistics/get/${period}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    })

    return response.json();

}