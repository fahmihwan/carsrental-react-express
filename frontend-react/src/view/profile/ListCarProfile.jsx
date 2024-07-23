import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import LayoutService from "../layouts/LayoutService";
import { createCar, deleteCarById, findCarByUserId, updateCar } from "../../api/cars";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";

export default function ListCarProfile() {
    const [cars, setCars] = useState('')


    const [carId, setCarId] = useState('')
    const [dailyRentalPrice, setDailyRentalPrice] = useState('')
    const [merk, setMerk] = useState('')
    const [year, setYear] = useState('')
    const [licensePlate, setLicensePlate] = useState('')


    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        findCarByUserId(userId).then((res) => setCars(res.data))
    }, [])

    const openModalEdit = (car) => {
        setCarId(car.id)
        setMerk(car.merk)
        setDailyRentalPrice(car.daily_rental_price)
        setYear(car.year)
        setLicensePlate(car.license_plate)
        document.getElementsByClassName('modal')[0].showModal()
    }

    const openModalCreate = () => {
        setCarId("")
        setMerk("")
        setDailyRentalPrice("")
        setYear("")
        setLicensePlate("")
        document.getElementsByClassName('modal-create')[0].showModal()
    }


    const handleUpdate = async (e) => {
        e.preventDefault()
        await updateCar(carId, {
            "daily_rental_price": dailyRentalPrice,
            "merk": merk,
            "license_plate": licensePlate,
            "year": year,
        });
        await findCarByUserId(userId).then((res) => setCars(res.data))
        document.getElementsByClassName('modal')[0].close()
    }

    const handleDelete = async (id) => {
        const isDelete = confirm('Apakah anda ingin menghapus data?')
        if (isDelete) {
            await deleteCarById(id).then((res) => {
                console.log(res)
            })
            findCarByUserId(userId).then((res) => setCars(res.data))
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        await createCar({
            "daily_rental_price": dailyRentalPrice,
            "merk": merk,
            "user_id": userId,
            "license_plate": licensePlate,
            "year": year,
        });
        await findCarByUserId(userId).then((res) => setCars(res.data))
        document.getElementsByClassName('modal-create')[0].close()

    }







    return (
        <LayoutService>
            <div className="w-full flex px-20">
                <div className="mr-10 menu bg-neutral text-base-content  w-96 p-4 rounded-2xl h-[100vh]">
                    <Sidebar />
                </div>
                <div>
                    <div className="mb-5 flex justify-between">
                        <h1 className="text-3xl">List Car</h1>
                        <button onClick={openModalCreate} className="btn btn-outline btn-primary">Tambah</button>
                    </div>
                    <div className="w-[1200px] ">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>IMG</th>
                                        <th>Merk</th>
                                        <th>Tahun</th>
                                        <th>Plat</th>
                                        <th>Harga sewa (per hari)</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {cars.length > 0 && cars.map((car, index) => (
                                        <tr className="" key={index}>
                                            <th>{index + 1}</th>
                                            <td>
                                                <div style={{ width: "200px" }}>
                                                    <figure >
                                                        <img
                                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg/2880px-2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg"
                                                            alt="Movie" />
                                                    </figure>
                                                </div>
                                            </td>
                                            <td>{car.merk}</td>
                                            <td>{car.year}</td>
                                            <td>{car.license_plate}</td>
                                            <td>{car.daily_rental_price}</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline btn-warning mr-5" onClick={() => openModalEdit(car)}>Edit</button>
                                                <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDelete(car.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        {/* modal */}
                        <dialog className="modal">
                            <div className="modal-box w-4/12 max-w-5xl" >
                                <h3 className="font-bold text-lg">Edit Car</h3>
                                <p className="py-4"></p>
                                <div className="" >
                                    <form method="dialog" onSubmit={handleUpdate}>
                                        <div className="w-full">
                                            <div className="w-full mb-3">
                                                <TextInput placeholder={""} value={merk || ''} handleChange={(e) => setMerk(e.target.value)} />
                                            </div>
                                            <div className="w-full mb-3">
                                                <TextInput placeholder={""} value={year || ''} handleChange={(e) => setYear(e.target.value)} />
                                            </div>
                                            <div className="w-full mb-3">
                                                <TextInput placeholder={""} value={licensePlate || ''} handleChange={(e) => setLicensePlate(e.target.value)} />
                                            </div>
                                            <div className="w-full mb-3">
                                                <TextInput placeholder={""} value={dailyRentalPrice || ''} handleChange={(e) => setDailyRentalPrice(e.target.value)} />
                                            </div>

                                            <div className="w-full mb-3">
                                                <Button type={"submit"} title={"UPDATE"} />
                                            </div>
                                        </div>
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>


                        <dialog className="modal modal-create">
                            <div className="modal-box w-4/12 max-w-5xl" >
                                <h3 className="font-bold text-lg">Create Car</h3>
                                <p className="py-4"></p>
                                <div className="" >
                                    <form method="dialog" onSubmit={handleCreate}>
                                        <div className="w-full">
                                            <div className="w-full mb-3">
                                                <TextInput placeholder={"merk"} value={merk || ''} handleChange={(e) => setMerk(e.target.value)} />
                                            </div>
                                            <div className="w-full mb-3">
                                                <TextInput placeholder={"tahun"} value={year || ''} handleChange={(e) => setYear(e.target.value)} />
                                            </div>
                                            <div className="w-full mb-3">
                                                <TextInput placeholder={"plat"} value={licensePlate || ''} handleChange={(e) => setLicensePlate(e.target.value)} />
                                            </div>
                                            <div className="w-full mb-3">
                                                <TextInput placeholder={"sewa harian"} value={dailyRentalPrice || ''} handleChange={(e) => setDailyRentalPrice(e.target.value)} />
                                            </div>
                                            <div className="w-full mb-3 flex justify-start">
                                                <button className="btn me-2" onClick={() => document.getElementsByClassName('modal-create')[0].close()}>Close</button>
                                                <Button type={"submit"} title={"Add"} />

                                            </div>

                                        </div>

                                    </form>
                                </div>
                            </div>
                        </dialog>

                    </div>
                </div>
            </div>
        </LayoutService>
    )

}