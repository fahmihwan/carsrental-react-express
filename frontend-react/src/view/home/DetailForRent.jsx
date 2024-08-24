import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { findCarById } from "../../api/cars";
import { useParams } from "react-router-dom";

export default function DetailForRent() {
    const { id } = useParams()

    const [car, setCar] = useState({})

    useEffect(() => {
        findCarById(id).then((res) => setCar(res.data));
    }, [])

    // const pay = async () => {

    //     const response = await fetch(`http://localhost:3000/api/api-midtrans`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     const data = await response.json()


    //     await window.snap.embed(data.data, {
    //         embedId: 'snap-container'
    //     });
    // }
    return (
        <LayoutService>
            <div className="absolute z-40">
                <div id="snap-container"></div>
            </div>
            <div className="w-full flex px-20">
                <div className="w-4/6 ">

                    <div>
                        <div
                            href="#"
                            className="flex flex-col items-center bg-white border mb-5 border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <img
                                className="object-cover w-full rounded-t-lg  h-[500px] md:h-auto md:w-[300px] md:rounded-none md:rounded-s-lg"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg/2880px-2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg"
                                alt=""
                            />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {car.merk}
                                </h5>
                                <p>{car.year} {car.license_plate}</p>
                                <p className="text-2xl">IDR {car.daily_rental_price}</p>
                                <p>Jakarta - Pasar Rebo</p>
                            </div>
                        </div>


                        <div
                            href="#"
                            className="flex flex-col items-center bg-white border mb-5 border-gray-200 rounded-lg shadow md:flex-row md:max-w-full "
                        >

                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Driver Details
                                </h5>
                                <h1></h1>
                                {/* <b>Name : </b> <p>Fahmi ichwan</p> */}
                                <p><b>Name : </b> Fahmi ichwa</p>
                                <p><b>Email : </b> Fahmi ichwa</p>
                                <p><b>Phone number: </b> Fahmi ichwa</p>
                            </div>
                        </div>

                        <div className="card  bg-neutral text-neutral-content shadow-xl  mb-10 p-5">

                        </div>

                        <div className="w-full">
                            <div className="flex justify-between">
                                <h1>Total Price</h1>  <p>Rp. 813.000</p>
                            </div>
                            <div>
                                {/* <button onClick={pay} className="btn btn-primary">Pay </button> */}
                            </div>
                        </div>

                        <div>
                            <div class="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" checked="checked" />
                                <div class="collapse-title text-xl font-medium">Virtual Account</div>
                                <div class="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                            <div class="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" />
                                <div class="collapse-title text-xl font-medium">ATM/Other Banks</div>
                                <div class="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                            <div class="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" />
                                <div class="collapse-title text-xl font-medium">Card / Debit Cards</div>
                                <div class="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                            <div class="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" />
                                <div class="collapse-title text-xl font-medium">Convenience Store</div>
                                <div class="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
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
