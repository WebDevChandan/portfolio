import { Flip, toast } from "react-toastify";

export const showToast = (type: "error" | "success" | "info", message: string) => {
    const toastConfig = {
        position: "top-center" as const,
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        transition: Flip,
    };

    switch (type) {
        case "error":
            return toast.error(message, { ...toastConfig });

        case "success":
            return toast.success(message, { ...toastConfig });

        case "info":
            return toast.info(message, { ...toastConfig });

        default:
            break;
    }
};
