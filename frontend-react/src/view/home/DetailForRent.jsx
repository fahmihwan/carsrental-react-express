import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { findCarById } from "../../api/cars";
import { useParams } from "react-router-dom";

export default function DetailForRent() {
    const { id } = useParams()

    const [car, setCar] = useState({})

    useEffect(() => {
        findCarById(id).then((res) => setCar(res.data));

        // console.log(car);
    }, [])

    console.log(car);
    return (
        <LayoutService>
            <div className="w-full flex px-20">
                <div className="w-4/6 ">

                    <div>
                        <div className="card card-side bg-neutral text-neutral-content shadow-xl  mb-10">
                            <div style={{ width: "400px" }}>
                                <figure>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg/2880px-2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg"
                                        alt="Movie" />
                                </figure>
                            </div>

                            <div className="card-body">
                                <h2 className="card-title">{car.merk}</h2>
                                <p>{car.year} {car.license_plate}</p>
                                <p className="text-2xl">IDR {car.daily_rental_price}</p>
                                <p>Jakarta - Pasar Rebo</p>
                            </div>
                        </div>


                        <div className="card  bg-neutral text-neutral-content shadow-xl  mb-10">
                            <h1>Driver Details</h1>
                            {/* <b>Name : </b> <p>Fahmi ichwan</p> */}
                            <p><b>Name : </b> Fahmi ichwa</p>
                            <p><b>Email : </b> Fahmi ichwa</p>
                            <p><b>Phone number: </b> Fahmi ichwa</p>
                        </div>

                        <div>


                        </div>
                    </div>

                </div>
                <div className="w-2/6 flex justify-end  ">
                    <div className="flex flex-col">
                        <div className="card bg-primary text-primary-content w-96 mb-10">
                            <div className="card-body">
                                <h2 className="card-title">Pick-up and drop-off</h2>
                                <div className="w-full ">
                                    <div className="11/12  border-l-4 px-5">
                                        <div className="mb-10">
                                            <p>Wed, 26 Jun · 10:00</p>
                                            <b className="">Jakarta - Pasar Rebo</b>
                                        </div>
                                        <div>
                                            <p>Wed, 26 Jun · 10:00</p>
                                            <b className="">Jakarta - Pasar Rebo</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-primary text-primary-content w-96">
                            <div className="card-body">
                                <h2 className="card-title">Car price breakdown  </h2>
                                <div>
                                    <p>Car hire charge : <b>IDR 3,523,919.00</b></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutService>
    );
}
