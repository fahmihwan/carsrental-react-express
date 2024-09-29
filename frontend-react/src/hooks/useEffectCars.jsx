import { useEffect, useState } from "react";
import { findCarByUserId } from "../api/cars";

const useEffectCars = (userId) => {
    const [dataCar, setDataCar] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (userId) => {
        try {
            const response = await findCarByUserId(userId);
            setDataCar(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData(userId);
    }, [userId]);

    return { dataCar, error, fetchData };
};

export default useEffectCars;
