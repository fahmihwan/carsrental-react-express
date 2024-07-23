

const apiUrl = 'http://localhost:3000/api';

export const getCars = async () => {
    try {
        const response = await fetch(`${apiUrl}/cars`, {
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

export const createCar = async (payload) => {
    try {
        const response = await fetch(`${apiUrl}/car`, {
            method: 'POST',
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

export const findCarByUserId = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/car/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error;
    }
}

export const findCarById = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/car/${id}`, {
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


export const deleteCarById = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/car/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error;
    }
}


export const updateCar = async (id, payload) => {
    try {
        const response = await fetch(`${apiUrl}/car/${id}`, {
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