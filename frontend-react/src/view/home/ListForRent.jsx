import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { getCars } from './../../api/cars'
import { Link } from "react-router-dom";
import { Avatar, Card, Checkbox, Label, List } from "flowbite-react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'

export default function ListForRent() {


    const [cars, setCars] = useState([])

    let cek = "2 baggages, 6 seats, Automatic Transmission".split(',')
    // console.log(cek);

    useEffect(() => {
        getCars().then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                let features = res.data[i].features.split(",")
                res.data[i].listFeatures = [];
                for (let j = 0; j < features.length; j++) {
                    res.data[i].listFeatures.push(features[j])
                }
            }
            setCars(res.data)
        });
        // console.log(cars);
    }, [])

    const filterCars = () => {

    }


    return (
        <LayoutService>
            <div className="w-full flex px-20">
                <div className="w-2/6 flex justify-start  ">



                    <div className=" bg-white w-96 h-[600px]  rounded-lg p-5 ">


                        <div className="">
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-5">
                                Filter <br />
                                Price per day
                            </h5>


                            <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                                <List.Item className="pb-3 sm:pb-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <Checkbox id="promotion" />
                                        <div className="min-w-0 flex-1">

                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">IDR 0 - IDR 100,000</div>
                                    </div>
                                </List.Item>
                                <List.Item className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <Checkbox id="promotion" />
                                        <div className="min-w-0 flex-1">
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">IDR 100,000 - IDR 200,000</div>
                                    </div>
                                </List.Item>
                                <List.Item className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <Checkbox id="promotion" />
                                        <div className="min-w-0 flex-1">
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">IDR 200,000 - IDR 300,000</div>
                                    </div>
                                </List.Item>
                                <List.Item className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <Checkbox id="promotion" />
                                        <div className="min-w-0 flex-1">

                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">IDR 400,000 - IDR 500,000</div>
                                    </div>
                                </List.Item>
                            </List>

                        </div>
                    </div>




                </div>
                <div className="w-4/6 ">

                    <div className="mb-5">
                        <h1>5 Cars Available</h1>
                        {/* <FontAwesomeIcon icon={byPrefixAndName.fas['house']} /> */}
                    </div>
                    <div className=" flex flex-col">
                        {
                            cars?.length > 0 ? cars.map((car, index) => (
                                <div
                                    key={index}
                                    style={{ width: "" }}
                                    className="flex w-full mb-5  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <img
                                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-s-lg"
                                        src={`http://localhost:3000/uploads/` + car.file}
                                        alt=""
                                    />
                                    <div className="flex flex-col justify-between p-4 leading-normal w-full">
                                        <div className="card-body">
                                            <h2 className="card-title"> {car.merk}</h2>
                                            <div className="w-full flex border">
                                                <div className="w-1/2">
                                                    <ul className="flex">
                                                        {car.listFeatures.map((d) => (
                                                            <li className="mr-2">{d}</li>
                                                        ))}
                                                    </ul>


                                                </div>
                                                <div className="w-1/2">
                                                    dsadasd
                                                </div>
                                            </div>


                                            <p>{car.year} {car.license_plate}</p>
                                            <p className="text-2xl">IDR {car.daily_rental_price}</p>
                                            <p>Jakarta - Pasar Rebo</p>
                                            <div className="card-actions justify-end">
                                                <Link className="btn btn-primary" to={`/listcar/${car.id}/detailforrent`}>View Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                // </div>
                            )) : <p>data tidak tesedia</p>

                        }

                    </div>

                </div>
            </div>
        </LayoutService >
    );
}
