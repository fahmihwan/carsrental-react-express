import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

export const ToastSuccessEl = () => {
    return (
        <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">Item moved successfully.</div>
            <Toast.Toggle />
        </Toast>
    );
};

export const ToastErrorEl = ({ message, onDismiss }) => {
    return (
        <div className="absolute right-0">
            <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                    <HiX className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{message}</div>
                <Toast.Toggle onDismiss={() => onDismiss(false)} />
            </Toast>
        </div>
    );
};
