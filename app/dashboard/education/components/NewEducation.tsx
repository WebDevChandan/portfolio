import ModalProvider from "@/app/context/ModalProvider";
import { FaPlus } from "react-icons/fa";
import ModalButton from "../../components/ModalButton";
import ManageEducation from "./ManageEducation";

export default function NewEducation() {
    return (
        <ModalProvider>
            <div className="timeline-item">
                <div className="timeline-item-inner  new-edu-timeline" style={{ padding: '15px 0px' }}>
                    <div className="icon" style={{ cursor: "pointer" }}><FaPlus /></div>
                    <ModalButton label="Add Education">
                        <ManageEducation />
                    </ModalButton>
                </div>
            </div>
        </ModalProvider>
    )
}
