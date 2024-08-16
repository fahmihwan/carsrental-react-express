
const apiUrl = 'http://localhost:3000/api';
import Cookies from 'js-cookie'


// import { AuthContext } from '../../context/AuthContext' 
const authenticated = async (formData) => {

    // const { setIsAuthenticated } = useContet(AuthContext)
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        const responseData = await response.json()
        if (responseData.status === 400 || responseData.status === 500) {
            return ['Email atau password tidak valid.', false];
        }

        Cookies.set('user_id', responseData.data.user.id)
        Cookies.set('token', JSON.stringify(responseData.data.token))
        // localStorage.setItem('user_id', responseData.data.user.id)
        // localStorage.setItem('token', JSON.stringify(responseData.data.token))

        return [responseData.message, true]
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export default authenticated