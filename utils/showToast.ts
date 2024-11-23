import { Flip, toast } from "react-toastify";

export const showToast = (type: "error" | "success", message: string) => {
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

    if (type === "error") {
        return toast.error(message, {...toastConfig});
    } else if (type === "success") {
        return toast.success(message, {...toastConfig});
    }
    return null;
};
