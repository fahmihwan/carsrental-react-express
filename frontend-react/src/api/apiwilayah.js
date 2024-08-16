const apiUrl = 'http://localhost:3000/api';



export const getProvince = async () => {
    try {
        const response = await fetch(`${apiUrl}/api-wilayah/province`, {
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

export const getRegency = async (provinceid) => {
    try {
        const response = await fetch(`${apiUrl}/api-wilayah/regency/${provinceid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        return data;
    } catch (error) {
        return error;
    }
}