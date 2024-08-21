import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import LayoutService from "../layouts/LayoutService";
import { createCar, deleteCarById, findCarByUserId, updateCar } from "../../api/cars";
import { TextInput, TextInputUpload } from "../components/TextInput";
import { Button } from "../components/Button";



import CreatableSelect from 'react-select/creatable';
import { getProvince, getRegency } from "../../api/apiwilayah";


export default function ListCarProfile() {


    const [cars, setCars] = useState('')


    const [carId, setCarId] = useState('')
    const [dailyRentalPrice, setDailyRentalPrice] = useState(0)
    const [merk, setMerk] = useState('')
    const [year, setYear] = useState('')
    const [address, setAddress] = useState('')
    const [licensePlate, setLicensePlate] = useState('')
    const [img, setImg] = useState('')


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
        setAddress(car.address)
        document.getElementsByClassName('modal')[0].showModal()
    }

    const openModalCreate = () => {
        setCarId("")
        setMerk("")
        setDailyRentalPrice(0)
        setYear("")
        setLicensePlate("")
        setAddress("")
        setImg("")
        setProvince("")
        setRegency("")
        setAllProvince([])
        setAllRegency([])
        setProvinceId(0)
        document.getElementsByClassName('modal-create')[0].showModal()
    }


    const handleUpdate = async (e) => {
        e.preventDefault()
        await updateCar(carId, {
            "merk": merk,
            "license_plate": licensePlate,
            "daily_rental_price": dailyRentalPrice,
            "user_id": userId,
            "year": year,
            'file': img,
            'address': address
        }).then((res) => console.log(res))
            .catch(err => console.log(err))

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
            'file': img,
            'address': address
        });
        await findCarByUserId(userId).then((res) => setCars(res.data))
        document.getElementsByClassName('modal-create')[0].close()
    }

    const [allProvince, setAllProvince] = useState([])
    const [provinceId, setProvinceId] = useState(0)
    const [allRegency, setAllRegency] = useState([])
    const [province, setProvince] = useState('')
    const [regency, setRegency] = useState('')


    useEffect(() => {
        getProvince().then((res) => {
            let arrProvince = []
            for (let i = 0; i < res.data.length; i++) {
                arrProvince.push({
                    value: res.data[i].id,
                    label: res.data[i].name
                })
            }
            setAllProvince(arrProvince)
        })
    }, [])

    useEffect(() => {
        if (provinceId != 0) {
            getRegency(provinceId).then((res) => {
                let arrRegency = []
                for (let i = 0; i < res.data.length; i++) {
                    arrRegency.push({
                        value: res.data[i].id,
                        label: res.data[i].name
                    })
                }
                setAllRegency(arrRegency)
            })
        }
    }, [provinceId])

    useEffect(() => {
        console.log(province != '' && regency != '');
        if (province != '' && regency != '') {
            setAddress(`${province} - ${regency}`)
        }
    }, [province, regency])

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
                                        <th>Address</th>
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
                                                    <figure>
                                                        <img
                                                            src={`http://localhost:3000/uploads/` + car.file}
                                                            alt="Movie" />
                                                    </figure>
                                                </div>
                                            </td>
                                            <td>{car.merk}</td>
                                            <td>{car.year}</td>
                                            <td>{car.license_plate}</td>
                                            <td>{car.daily_rental_price}</td>
                                            <td>{car.address}</td>
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
                        <dialog className="modal modal-create">
                            <div className="modal-box w-4/12 max-w-5xl" >
                                <h3 className="font-bold text-lg">Edit Car</h3>
                                <p className="py-4"></p>
                                <div className="" >
                                    <form action="" method="dialog" encType="multipart/form-data" onSubmit={handleUpdate}>
                                        <div className="w-full">
                                            <div className="w-full mb-3 flex">
                                                <div className="w-full mr-5">
                                                    <TextInput className={"w-full"} placeholder={"merk of car"} value={merk || ''} handleChange={(e) => setMerk(e.target.value)} />
                                                </div>
                                                <div className="w-full">
                                                    <TextInput className={"w-full"} placeholder={"year"} value={year || ''} handleChange={(e) => setYear(e.target.value)} />
                                                </div>

                                            </div>
                                            <div className="w-full flex mb-3">
                                                <div className="w-full  flex mr-5">
                                                    <TextInput className={"w-full"} placeholder={"plat"} value={licensePlate || ''} handleChange={(e) => setLicensePlate(e.target.value)} />
                                                </div>
                                                <div className="w-full mb-3">
                                                    <TextInput className={"w-full"} placeholder={"price per day"} value={dailyRentalPrice || ''} handleChange={(e) => setDailyRentalPrice(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="w-full flex mb-3">
                                                <div className="w-1/2 ">
                                                    <label className="form-control w-full">
                                                        <div className="label">
                                                            <span className="label-text">Province</span>
                                                        </div>
                                                        <CreatableSelect
                                                            onChange={(e) => {
                                                                setProvince(e?.label ? e.label : '')
                                                                setProvinceId(e?.value ? e.value : 0)
                                                            }}
                                                            className="mr-5"
                                                            placeholder="Province"
                                                            isClearable options={allProvince} />
                                                    </label>
                                                </div>
                                                <div className="w-1/2">
                                                    <label className="form-control w-full  ">
                                                        <div className="label">
                                                            <span className="label-text">Regency</span>
                                                        </div>
                                                        <CreatableSelect
                                                            className="mr-5"
                                                            placeholder="Regency"
                                                            onChange={(e) => setRegency(e.label)}
                                                            isClearable options={allRegency} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <TextInput readOnly={true} className={"w-full read-only:bg-gray-300 read-only:text-black"} placeholder={"address"} value={address || ''} handleChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                        <div className="w-full">
                                            <div className="w-full mb-3">
                                                <TextInputUpload className={"w-full mr-5 "} placeholder={"image"} handleChange={(e) => setImg(e.target.files[0])} />
                                            </div>
                                        </div>


                                        <div className="w-full mb-3 flex justify-start">
                                            <a className="btn me-2" onClick={() => document.getElementsByClassName('modal-create')[0].close()}>Close</a>
                                            <Button type={"submit"} title={"Submit"} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                        <dialog className="modal modal-create">
                            <div className="modal-box w-4/12 md:w-6/12 max-w-5xl" >
                                <h3 className="font-bold text-lg">Create Car</h3>
                                <p className="py-4"></p>
                                <div className="" >
                                    <form action="" method="dialog" encType="multipart/form-data" onSubmit={handleCreate}>
                                        <div className="w-full">
                                            <div className="w-full mb-3 flex">
                                                <div className="w-full mr-5">
                                                    <TextInput className={"w-full"} placeholder={"merk of car"} value={merk || ''} handleChange={(e) => setMerk(e.target.value)} />
                                                </div>
                                                <div className="w-full">
                                                    <TextInput className={"w-full"} placeholder={"year"} value={year || ''} handleChange={(e) => setYear(e.target.value)} />
                                                </div>

                                            </div>
                                            <div className="w-full flex mb-3">
                                                <div className="w-full  flex mr-5">
                                                    <TextInput className={"w-full"} placeholder={"plat"} value={licensePlate || ''} handleChange={(e) => setLicensePlate(e.target.value)} />
                                                </div>
                                                <div className="w-full mb-3">
                                                    <TextInput className={"w-full"} placeholder={"price per day"} value={dailyRentalPrice || ''} handleChange={(e) => setDailyRentalPrice(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="w-full flex mb-3">
                                                <div className="w-1/2 ">
                                                    <label className="form-control w-full">
                                                        <div className="label">
                                                            <span className="label-text">Province</span>
                                                        </div>
                                                        <CreatableSelect
                                                            onChange={(e) => {
                                                                setProvince(e?.label ? e.label : '')
                                                                setProvinceId(e?.value ? e.value : 0)
                                                            }}
                                                            className="mr-5"
                                                            placeholder="Province"
                                                            isClearable options={allProvince} />
                                                    </label>
                                                </div>
                                                <div className="w-1/2">
                                                    <label className="form-control w-full  ">
                                                        <div className="label">
                                                            <span className="label-text">Regency</span>
                                                        </div>
                                                        <CreatableSelect
                                                            className="mr-5"
                                                            placeholder="Regency"
                                                            onChange={(e) => setRegency(e.label)}
                                                            isClearable options={allRegency} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <TextInput readOnly={true} className={"w-full read-only:bg-gray-300 read-only:text-black"} placeholder={"address"} value={address || ''} handleChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                        <div className="w-full">
                                            <div className="w-full mb-3">
                                                <TextInputUpload className={"w-full mr-5 "} placeholder={"image"} handleChange={(e) => setImg(e.target.files[0])} />
                                            </div>
                                        </div>


                                        <div className="w-full mb-3 flex justify-start">
                                            <a className="btn me-2" onClick={() => document.getElementsByClassName('modal-create')[0].close()}>Close</a>
                                            <Button type={"submit"} title={"Submit"} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                    </div>
                </div >
            </div >
        </LayoutService >
    )

}