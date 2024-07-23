import LayoutService from "../layouts/LayoutService";

export default function Home() {
    return (
        <LayoutService>
            <div className="flex justify-center">
                <div className="card w-4/6 bg-neutral text-neutral-content h-96">
                    <div className="card-body">
                        <h1 className="card-title">Discover new rental car deals.!</h1>
                        <p>How much will you save?</p>
                        <div>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Pick-up and Drop-off location"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </label>
                        </div>
                        <div className="w-full flex">
                            <div className="w-5/6 flex">
                                <div className="w-1/4">
                                    <input
                                        type="date"
                                        placeholder="Pick-up"
                                        className="input input-bordered input-accent w-full max-w-xs"
                                    />
                                </div>
                                <div className="w-1/4">
                                    <input
                                        type="date"
                                        placeholder="Pick-up time"
                                        className="input input-bordered input-accent w-full max-w-xs"
                                    />
                                </div>
                                <div className="w-1/4">
                                    <input
                                        type="date"
                                        placeholder="Drop-off"
                                        className="input input-bordered input-accent w-full max-w-xs"
                                    />
                                </div>
                                <div className="w-1/4">
                                    <input
                                        type="date"
                                        placeholder="Drop-off time"
                                        className="input input-bordered input-accent w-full max-w-xs"
                                    />
                                </div>
                            </div>
                            <div className="w-1/6">
                                <div className="card-actions ">
                                    <button className="btn w-full btn-info">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutService>
    );
}
