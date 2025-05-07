import { usePathname, useRouter } from "next/navigation";
import { Flip, toast } from "react-toastify";
import { logout } from "../server/logout.action";

export default function useAuth() {
    const router = useRouter();
    const returnUrl = usePathname();

    const logOutHandler = async () => {
        const { message, errorMessage } = await logout();

        if (message) {
            toast.success(message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                transition: Flip,
            });

            router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
        }

        if (errorMessage) {
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                transition: Flip,
            });
        }
    }

    return {
        logOutHandler,
    }
}