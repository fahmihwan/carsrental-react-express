import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import LayoutService from "../layouts/LayoutService";
import { createCar, deleteCarById, findCarByUserId, updateCar } from "../../api/cars";
import { InputReactSelectEl, TextInputEl, TextInputUploadEl } from "../components/TextInput";

import Cookies from 'js-cookie';


import CreatableSelect from 'react-select/creatable';
import { getProvince, getRegency } from "../../api/apiwilayah";
import { Modal, Button } from "flowbite-react";


export default function ListCarProfile() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [cars, setCars] = useState('')


    const [carId, setCarId] = useState('')
    const [dailyRentalPrice, setDailyRentalPrice] = useState(0)
    const [merk, setMerk] = useState('')
    const [year, setYear] = useState('')
    const [address, setAddress] = useState('')
    const [licensePlate, setLicensePlate] = useState('')
    const [img, setImg] = useState('')

    const userId = Cookies.get('user_id')

    useEffect(() => {
        findCarByUserId(userId).then((res) => setCars(res.data))
    }, [])

    const openModalEditFunc = (car) => {
        setCarId(car.id)
        setMerk(car.merk)
        setDailyRentalPrice(car.daily_rental_price)
        setYear(car.year)
        setLicensePlate(car.license_plate)
        setAddress(car.address)
        getApiProvince()
        setOpenModalEdit(true)
    }



    const getApiProvince = async () => {
        // await getProvince().then((res) => {
        //     let arrProvince = []
        //     for (let i = 0; i < res.data.length; i++) {
        //         arrProvince.push({ value: res.data[i].id, label: res.data[i].name })
        //     }
        //     console.log(arrProvince);
        //     setAllProvince(arrProvince)
        // })
    }


    const clear = () => {
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
    }

    // const openModalCreate = () => {
    //     getApiProvince()
    //     clear()

    //     document.getElementsByClassName('modal-create')[0].showModal()
    // }


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

    const handleDelete = async (car) => {
        const isDelete = confirm('Apakah anda ingin menghapus data?')
        console.log(car);
        if (isDelete) {
            await deleteCarById(car.id).then((res) => {
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
        getProvince().then((res) => {
            let arrProvince = []
            for (let i = 0; i < res.data.length; i++) {
                arrProvince.push({ value: res.data[i].id, label: res.data[i].name })
            }
            console.log(arrProvince);
            setAllProvince(arrProvince)
        })
        if (province != '' && regency != '') {
            setAddress(`${province} - ${regency}`)
        }
    }, [province, regency])

    return (
        <LayoutService>
            <div className="w-full flex  md:px-0 lg:px-60">
                <div className="mr-10 menu bg-neutral text-base-content  w-3/12 p-4 rounded-2xl h-[100vh]">
                    <Sidebar />
                </div>
                <div className="w-9/12">
                    <div className="mb-5 flex justify-between">
                        <h1 className="text-3xl">List Car</h1>
                        <Button onClick={() => { setOpenModal(true) }}>Add car</Button>
                    </div>
                    <div className=" ">
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
                                            <td className="flex">
                                                <Button size={"sm"} color="warning" className="mr-2 items-center" onClick={() => openModalEditFunc(car)}>Edit</Button>
                                                <Button size={"sm"} color="failure" onClick={() => handleDelete(car)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Modal show={openModal} onClose={() => setOpenModal(false)}>
                            <form action="" method="dialog" encType="multipart/form-data" onSubmit={handleCreate}>
                                <Modal.Header>Create</Modal.Header>
                                <Modal.Body>
                                    <div className="w-full">
                                        <div className="w-full mb-3 flex">
                                            <div className="w-full mr-5">
                                                <TextInputEl className={"w-full"} placeholder={"merk of car"} value={merk || ''} handleChange={(e) => setMerk(e.target.value)} />
                                            </div>
                                            <div className="w-full">
                                                <TextInputEl className={"w-full"} placeholder={"year"} value={year || ''} handleChange={(e) => setYear(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="w-full flex mb-3">
                                            <div className="w-full mr-5">
                                                <TextInputEl className={"w-full"} placeholder={"plat"} value={licensePlate || ''} handleChange={(e) => setLicensePlate(e.target.value)} />
                                            </div>
                                            <div className="w-full mb-3">
                                                <TextInputEl className={"w-full"} placeholder={"price per day"} value={dailyRentalPrice || ''} handleChange={(e) => setDailyRentalPrice(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="w-full flex mb-3">
                                            <div className="w-1/2 ">
                                                <label className="form-control w-full">
                                                    <div className="label">
                                                        <span className="label-text">Province</span>
                                                    </div>
                                                    <InputReactSelectEl
                                                        handleChange={(e) => {
                                                            setProvince(e?.label ? e.label : '')
                                                            setProvinceId(e?.value ? e.value : 0)
                                                        }}
                                                        className="mr-5"
                                                        isClearable
                                                        placeholder={"Province"}
                                                        options={allProvince}
                                                    />
                                                </label>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="form-control w-full  ">
                                                    <div className="label">
                                                        <span className="label-text">Regency</span>
                                                    </div>
                                                    <InputReactSelectEl
                                                        handleChange={(e) => setRegency(e.label)}
                                                        className="mr-5"
                                                        isClearable
                                                        options={allRegency}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mb-3">
                                        <TextInputEl readOnly={true} className={"w-full read-only:bg-gray-300 read-only:text-black"} placeholder={"address"} value={address || ''} handleChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="w-full">
                                        <div className="w-full mb-3">
                                            <TextInputUploadEl id="file-upload" className={"w-full mr-5 "} placeholder={"image"} handleChange={(e) => setImg(e.target.files[0])} />
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        type="submit"
                                    >Submit</Button>

                                    <Button color="gray" onClick={() => setOpenModal(false)}>
                                        Decline
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>


                        <Modal show={openModalEdit} onClose={() => setOpenModalEdit(false)}>
                            <form action="" method="dialog" encType="multipart/form-data" onSubmit={handleUpdate}>
                                <Modal.Header>Edit</Modal.Header>
                                <Modal.Body>

                                    <div className="w-full">
                                        <div className="w-full mb-3 flex">
                                            <div className="w-full mr-5">
                                                <TextInputEl className={"w-full"} placeholder={"merk of car"} value={merk || ''} handleChange={(e) => setMerk(e.target.value)} />
                                            </div>
                                            <div className="w-full">
                                                <TextInputEl className={"w-full"} placeholder={"year"} value={year || ''} handleChange={(e) => setYear(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="w-full flex mb-3">
                                            <div className="w-full mr-5">
                                                <TextInputEl className={"w-full"} placeholder={"plat"} value={licensePlate || ''} handleChange={(e) => setLicensePlate(e.target.value)} />
                                            </div>
                                            <div className="w-full mb-3">
                                                <TextInputEl className={"w-full"} placeholder={"price per day"} value={dailyRentalPrice || ''} handleChange={(e) => setDailyRentalPrice(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="w-full flex mb-3">
                                            <div className="w-1/2 ">
                                                <label className="form-control w-full">
                                                    <div className="label">
                                                        <span className="label-text">Province</span>
                                                    </div>
                                                    <InputReactSelectEl
                                                        handleChange={(e) => {
                                                            setProvince(e?.label ? e.label : '')
                                                            setProvinceId(e?.value ? e.value : 0)
                                                        }}
                                                        className="mr-5"
                                                        isClearable
                                                        placeholder={"Province"}
                                                        options={allProvince}
                                                    />
                                                </label>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="form-control w-full  ">
                                                    <div className="label">
                                                        <span className="label-text">Regency</span>
                                                    </div>
                                                    <InputReactSelectEl
                                                        handleChange={(e) => setRegency(e.label)}
                                                        className="mr-5"
                                                        isClearable
                                                        options={allRegency}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mb-3">
                                        <TextInputEl readOnly={true} className={"w-full read-only:bg-gray-300 read-only:text-black"} placeholder={"address"} value={address || ''} handleChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="w-full">
                                        <div className="w-full mb-3">
                                            <TextInputUploadEl id="file-upload" className={"w-full mr-5 "} placeholder={"image"} handleChange={(e) => setImg(e.target.files[0])} />
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        type="submit"
                                    >Submit</Button>

                                    <Button color="gray" onClick={() => setOpenModalEdit(false)}>
                                        Decline
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>




                    </div>
                </div >
            </div >
        </LayoutService >
    )

}