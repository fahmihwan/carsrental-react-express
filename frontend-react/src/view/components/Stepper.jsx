import { Link } from "react-router-dom"

export default function Stepper({ isStepNumberActive }) {


    const liActive = "text-blue-600 dark:text-blue-500"
    const spanActive = "border-blue-600"
    const spanDeactive = "border-gray-500"

    return (
        <div className="mb-5">
            <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                <li className={`flex items-center ${isStepNumberActive == 1 && liActive}`}>
                    <Link className="flex items-center" to="/home">
                        <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${isStepNumberActive == 1 ? spanActive : spanDeactive} rounded-full shrink-0 `}>
                            1
                        </span>
                        Create request
                        <svg
                            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 12 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m7 9 4-4-4-4M1 9l4-4-4-4"
                            />
                        </svg>
                    </Link>

                </li>
                <li className={`flex items-center ${isStepNumberActive == 2 && liActive}`}>
                    <Link className="flex items-center" to="/listcar">
                        <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${isStepNumberActive == 2 ? spanActive : spanDeactive} rounded-full shrink-0 `}>
                            2
                        </span>
                        Choose a vehcile
                        <svg
                            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 12 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m7 9 4-4-4-4M1 9l4-4-4-4"
                            />
                        </svg>
                    </Link>
                </li>
                <li className={`flex items-center ${isStepNumberActive == 3 && liActive}`}>
                    <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${isStepNumberActive == 3 ? spanActive : spanDeactive} rounded-full shrink-0 `}>
                        3
                    </span>
                    Services & book
                    <svg
                        className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m7 9 4-4-4-4M1 9l4-4-4-4"
                        />
                    </svg>
                </li>
                <li className={`flex items-center ${isStepNumberActive == 4 && liActive}`}>
                    <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${isStepNumberActive == 4 ? spanActive : spanDeactive} rounded-full shrink-0 `}>
                        4
                    </span>
                    Summary
                    <svg
                        className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 10"
                    >
                    </svg>
                </li>
            </ol>
        </div>
    )
}