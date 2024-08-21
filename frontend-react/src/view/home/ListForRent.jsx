import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { getCars } from './../../api/cars'
import { Link } from "react-router-dom";

export default function ListForRent() {

    const [cars, setCars] = useState([])

    useEffect(() => {
        getCars().then((res) => setCars(res.data));
        console.log(cars);
    }, [])

    const filterCars = () => {

    }


    return (
        <LayoutService>
            <div className="w-full flex px-20">
                <div className="w-2/6 flex justify-end  ">
                    <div className="card bg-primary text-primary-content w-96 mx-10 h-[600px]">
                        <div className="card-body">
                            <div className="w-full flex  justify-between">
                                <span className="card-title">Filter</span>
                                <span>Clear all filters</span>
                            </div>
                            <div className="w-full">
                                <b>Price per day</b>
                                <div className="bg-neutral p-5 rounded-lg">
                                    <div className="form-control">
                                        <label className="cursor-pointer label">
                                            <span className="label-text text-white">IDR 0 - IDR 100,000</span>
                                            <input type="checkbox" onChange={filterCars('0-100')} defaultChecked className="checkbox checkbox-info" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="cursor-pointer label">
                                            <span className="label-text text-white">IDR 100,000 - IDR 200,000</span>
                                            <input type="checkbox" defaultChecked onChange={filterCars('0-100')} className="checkbox checkbox-info" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="cursor-pointer label">
                                            <span className="label-text text-white">IDR 200,000 - IDR 300,000</span>
                                            <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="cursor-pointer label">
                                            <span className="label-text text-white">IDR 300,000 - IDR 400,000</span>
                                            <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="cursor-pointer label">
                                            <span className="label-text text-white">IDR 400,000 +</span>
                                            <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                                        </label>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
                <div className="w-4/6 ">

                    <div className="mb-5">
                        <h1>5 Cars Available</h1>
                    </div>
                    <div>
                        {
                            cars?.length > 0 ? cars.map((car, index) => (

                                <div key={index} className="card card-side shadow-xl bg-neutral text-neutral-content  mb-10">
                                    <div style={{ width: "400px" }}>
                                        <figure >
                                            <img
                                                // src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg/2880px-2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg"
                                                src={`http://localhost:3000/uploads/` + car.file}
                                                alt="Movie" />
                                        </figure>
                                    </div>

                                    <div className="card-body">
                                        <h2 className="card-title"> {car.merk}</h2>
                                        <p>{car.year} {car.license_plate}</p>
                                        <p className="text-2xl">IDR {car.daily_rental_price}</p>

                                        <p>Jakarta - Pasar Rebo</p>
                                        <div className="card-actions justify-end">
                                            <Link className="btn btn-primary" to={`/listcar/${car.id}/detailforrent`}>View Detail</Link>
                                        </div>
                                    </div>
                                </div>
                            )) : <p>data tidak tesedia</p>

                        }

                    </div>

                </div>
            </div>
        </LayoutService>
    );
}
