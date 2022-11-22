const getRequest = async (url) => {
    return fetch(url, {
        method: "GET", 
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'User-Agent': 'request'
        },
    })
    .then(response => {
        return response.json().then(data => {
            return data;
        });
    });
}

export const searchByUserName = async username => {
    const url = `https://api.github.com/users/${username}`;
    const response = await getRequest(url);
    return response;
}

export const getRepositoriesByUserName = async username => {
    const url = `https://api.github.com/users/${username}/repos`;
    const response = await getRequest(url);
    return response;

}