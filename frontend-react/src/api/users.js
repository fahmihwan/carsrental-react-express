const apiUrl = 'http://localhost:3000/api';



export const findUserById = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json()
        return data;
    } catch (error) {
        return error
    }
}

export const updateUser = async (id, payload) => {
    try {

        // api.defaults.headers.common['Authorization'] = token;
        const response = await fetch(`${apiUrl}/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
}