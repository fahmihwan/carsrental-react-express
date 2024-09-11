const apiUrl = "http://localhost:3000/api";
import Cookies from "js-cookie";

const authenticated = async (formData) => {
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const responseData = await response.json();
        if (responseData.status === 400 || responseData.status === 500) {
            return ["Email or password is not valid.", false];
        }

        Cookies.set("user_id", responseData.data.user.id);
        Cookies.set("token", JSON.stringify(responseData.data.token));
        return [responseData.message, true];
    } catch (error) {
        return false;
    }
};

export default authenticated;
