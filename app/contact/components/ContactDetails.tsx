import prisma from "@/utils/prisma";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";


const fetchContactDetails = async () => {
    try {
        const [contact] = await prisma.personalInfo.findMany({
            select: {
                contact: {
                    select: {
                        label: true,
                        detail: true,
                    }
                }
            }
        })
        return contact;
    } catch (error) {
        console.log("Error Fetching skill Data: ", error)
        return null;
    }
}
export default async function ContactDetails() {
    const contactDetailsDatas = await fetchContactDetails();

    const contactIcon = [<FaWhatsapp />, <FaEnvelope />, <FaMapMarkerAlt />];

    return (
        <div className="row">
            {contactDetailsDatas?.contact &&
                (contactDetailsDatas.contact?.map(({ label, detail }, index) => (
                    <div className="contact-item" key={index}>
                        <div className="contact-item-inner outer-shadow">
                            <i>{contactIcon[index]}</i>
                            <span>{label}</span>
                            <p>{detail}</p>
                        </div>
                    </div>
                )))
            }
        </div>
    )
}
