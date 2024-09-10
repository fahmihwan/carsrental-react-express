import { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import LayoutService from "../layouts/LayoutService";

import { useSelector } from "react-redux";
import { getDetailBooking } from "../../api/bookings";
import moment from 'moment'
import { useLocation, useParams } from "react-router-dom";

export default function Summary() {
    const startedBooking = useSelector((state) => state.startedBooking);
    const [detailBooking, setDetailBooking] = useState({})

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const order_id = queryParams.get('order_id')
    const transaction_id = queryParams.get('transaction_id')


    useEffect(() => {
        console.log(order_id);
        console.log(transaction_id);

        getDetailBooking(order_id, transaction_id).then((res) => {
            let features = res.data[0].features.split(",")
            res.data[0].listFeatures = [];

            for (let j = 0; j < features.length; j++) {
                res.data[0].listFeatures.push(features[j])
            }

            setDetailBooking(res.data[0])
        })
    }, [])



    const formatRupiah = (number) => {
        let format = new Intl.NumberFormat('id-ID', {
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
        return format

    };

    return (
        <LayoutService>
            <div className="w-full  px-0 md:px-10 lg:px-20 xl:px-60 ">
                <div className="w-full">
                    <Stepper isStepNumberActive={4} />
                </div>

                <div className="w-full  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Summary
                    </h5>

                    <div>
                        <div
                            // key={index}
                            style={{ width: "" }}
                            className="flex w-full mb-5  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <img
                                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:max-w-72 md:rounded-none md:rounded-s-lg"
                                src={`http://localhost:3000/uploads/` + detailBooking.file}
                                alt=""
                            />
                            <div className=" justify-between   w-full">
                                <div className="card-body pl-2 ">
                                    <h2 className="text-2xl"> {detailBooking.merk}</h2>
                                    <div className="flex w-full items-center">
                                        <div className="w-4/12 p-2 ">
                                            {/* <p>{car.year} {car.license_plate}</p> */}
                                            <p>{detailBooking.address}</p>
                                            <p>{detailBooking.year}</p>
                                            <p>{detailBooking.license_plate}</p>
                                        </div>
                                        <div className="w-5/12">
                                            <ul className="max-w-xs text-gray-500 list-disc list-inside dark:text-gray-400">
                                                {
                                                    detailBooking?.listFeatures?.map((d, i) => {
                                                        let splitType = d.split('~')
                                                        if (splitType[1].split(' ').join('') == 'PASSENGERS') {
                                                            return <li key={i} className="mr-2">{splitType[0]}</li>
                                                        }
                                                        if (splitType[1].split(' ').join('') == 'BAGS') {
                                                            return <li key={i} className="mr-2">{splitType[0]}</li>
                                                        }
                                                        if (splitType[1].split(' ').join('') == 'TRANSMISSION') {
                                                            return <li key={i} className="mr-2">{splitType[0]}</li>
                                                        }
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div className="w-3/12 border-l-2 h-[100%] items-center flex  p-2">
                                            <div className="">
                                                <p className="text-xl mb-3">IDR {formatRupiah(detailBooking.daily_rental_price)}</p>
                                                <div>
                                                    {/* <Link className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={`/listcar/${car.id}/detailforrent`}>View Detail</Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* tes */}
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex">
                            <div className="w-full mr-10">
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border" >
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Info Schedule
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    data
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    Pickup Location
                                                </th>
                                                <td className="px-6 py-4">{detailBooking.pickup_location}</td>

                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    Dropoff  Location
                                                </th>
                                                <td className="px-6 py-4">{detailBooking.dropoff_location}</td>

                                            </tr>
                                            <tr className="bg-white dark:bg-gray-800">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    Pickup Schedule
                                                </th>
                                                <td className="px-6 py-4">{moment(detailBooking.pickup_schedule).format('ddd, D MMMM YYYY')}</td>
                                            </tr>
                                            <tr className="bg-white dark:bg-gray-800">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    Dropoff Schedule
                                                </th>
                                                <td className="px-6 py-4">{moment(detailBooking.dropoff_schedule).format('ddd, D MMMM YYYY')}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Info Transaction
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    data
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    Bank
                                                </th>
                                                <td className="px-6 py-4">{detailBooking.m_bank}</td>

                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    Total
                                                </th>
                                                <td className="px-6 py-4">{formatRupiah(detailBooking.m_gross_amount)}</td>

                                            </tr>
                                            <tr className="bg-white dark:bg-gray-800">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    Paymen type
                                                </th>
                                                <td className="px-6 py-4">{detailBooking.m_payment_type}</td>
                                            </tr>
                                            <tr className="bg-white dark:bg-gray-800">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    Transaction Status
                                                </th>
                                                <td className="px-6 py-4">{detailBooking.m_transaction_status}</td>
                                            </tr>
                                            <tr className="bg-white dark:bg-gray-800">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    Expiry Time
                                                </th>
                                                <td className="px-6 py-4">{moment(detailBooking.m_expiry_time).format('ddd, D MMMM YYYY')}</td>
                                            </tr>
                                            {detailBooking.m_va_number && (
                                                <tr className="bg-white dark:bg-gray-800">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        Va Number
                                                    </th>
                                                    <td className="px-6 py-4">{detailBooking.m_va_number}</td>
                                                </tr>
                                            )}
                                            {detailBooking.m_bill_key && (
                                                <tr className="bg-white dark:bg-gray-800">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        Bill Key
                                                    </th>
                                                    <td className="px-6 py-4">{detailBooking.m_bill_key}</td>
                                                </tr>
                                            )}
                                            {detailBooking.m_biller_code && (
                                                <tr className="bg-white dark:bg-gray-800">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        Biller Code
                                                    </th>
                                                    <td className="px-6 py-4">{detailBooking.m_biller_code}</td>
                                                </tr>
                                            )}
                                            {detailBooking.m_permata_va_number && (
                                                <tr className="bg-white dark:bg-gray-800">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        Permata VA Number
                                                    </th>
                                                    <td className="px-6 py-4">{detailBooking.m_permata_va_number}</td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

            </div>
        </LayoutService >
    );
}
