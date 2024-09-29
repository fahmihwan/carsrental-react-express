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

    // custome delete data
    //   const deleteData = async (id) => {
    //     try {
    //       const response = await fetch(`${url}/${id}`, {
    //         method: 'DELETE',
    //       });

    //       if (!response.ok) {
    //         throw new Error('Failed to delete data');
    //       }

    //       // Setelah berhasil dihapus, kita bisa memperbarui state data
    //       setData((prevData) => prevData.filter(item => item.id !== id));
    //     } catch (error) {
    //       setError(error.message);
    //     }
    //   };
    return { dataCar, error, fetchData };
};

export default useEffectCars;
