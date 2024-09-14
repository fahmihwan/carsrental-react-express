import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import LayoutService from "../layouts/LayoutService";

import Cookies from 'js-cookie';

import { fCalculatePaginateIteration, fFormatRupiah, fGeneratePaginationNumber } from "../../utils/utils";
import { transactionHistory } from "../../api/users";
import { PaginationEl } from "../components/Pagination";



export default function ListTransactionHistory() {
    const apiUrl = import.meta.env.VITE_API_BE_URL
    const [listTransaction, setListTransaction] = useState([])


    // paginate
    const [paginatePage, setPaginatePage] = useState(1)
    const [paginateLimit, setpaginateLimit] = useState(5)
    const [paginateTotalItem, setPaginateTotalItem] = useState(0)
    const [paginateTotalPage, setPaginateTotalPage] = useState(0)


    const userId = Cookies.get('user_id')

    useEffect(() => {
        transactionHistory(userId, paginatePage, paginateLimit).then((res) => {
            setListTransaction(res.items)
            setPaginatePage(res.page)
            setpaginateLimit(res.limit)
            setPaginateTotalItem(res.totalItems)
            setPaginateTotalPage(res.totalPages)
        })
    }, [paginatePage])
    const generatePaginateNumbers = fGeneratePaginationNumber(paginatePage, paginateTotalPage, paginateLimit)


    return (
        <LayoutService>
            <div className="w-full flex  md:px-0 lg:px-60">
                <div className="mr-10 menu bg-neutral text-base-content  w-3/12 p-4 rounded-2xl h-[100vh]">
                    <Sidebar />
                </div>
                <div className="w-9/12 bg-white p-5 rounded-lg">
                    <div className="mb-5 flex justify-between">
                        <h1 className="text-3xl">List Car</h1>

                    </div>
                    <div className="">
                        <div className="overflow-x-auto">
                            <table className="table ">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Merk</th>
                                        <th>Pickup</th>
                                        <th>Total</th>
                                        <th>VA numbers</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listTransaction.length > 0 && listTransaction.map((car, index) => {
                                        return (
                                            <tr className="border-t-2 border-t-gray-100" key={index}>
                                                <th>{fCalculatePaginateIteration(paginatePage, paginateLimit) + index}</th>
                                                <td className="p-5">
                                                    {car.merk}
                                                    <div style={{ width: "200px" }}>
                                                        <figure>
                                                            <img
                                                                src={`${apiUrl}/uploads/` + car.file}
                                                                alt="Movie" />
                                                        </figure>
                                                    </div>
                                                </td>
                                                <td className="p-5">{car.pickup_location}</td>
                                                <td className="p-2">{'Rp ' + fFormatRupiah(car.m_gross_amount)}</td>
                                                <td className="p-5">{car.m_va_number}</td>
                                                <td>{car.m_transaction_status}</td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <PaginationEl
                            generatePageNumbers={generatePaginateNumbers}
                            paginatePage={paginatePage}
                            setPaginatePage={setPaginatePage}
                            paginateTotalPage={paginateTotalPage}
                            paginateTotalItem={paginateTotalItem} />
                    </div>
                </div >
            </div >
        </LayoutService >
    )

}