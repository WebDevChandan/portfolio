import { Button } from "@/app/components";
import { FaPlus } from "react-icons/fa";
import ModalButton from "../../components/ModalButton";
import ModalProvider from "@/app/context/ModalProvider";
import ManageEducation from "./ManageEducation";

export default function NewEducation() {
    return (
        <ModalProvider>
            <div className="timeline-item">
                <div className="timeline-item-inner  new-edu-timeline" style={{ padding: '15px 0px' }}>
                    <div className="icon" style={{ cursor: "pointer" }}><FaPlus /></div>
                    <ModalButton label="Add Education" children={<ManageEducation />} />
                </div>
            </div>
        </ModalProvider>
    )
}
