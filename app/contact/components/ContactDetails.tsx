import { PrismaClient } from "@prisma/client";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa"

const prisma = new PrismaClient();

const fetchContactDetails = async () => {
    try {
        const contactDetail = await prisma.contact.findMany({
            select: {
                label: true,
                details: true,
            }
        })
        return contactDetail;
    } catch (error) {
        console.log("Error Fetching skill Data: ", error)
        return null;
    }
}
export default async function ContactDetails() {
    const contactDetailsDatas = await fetchContactDetails();

    const contactIcon = [<FaPhone />, <FaEnvelope />, <FaMapMarkerAlt />];

    return (
        <div className="row">
            {contactDetailsDatas &&
                (contactDetailsDatas?.map(({ label, details }, index) => (
                    <div className="contact-item" key={index}>
                        <div className="contact-item-inner outer-shadow">
                            <i>{contactIcon[index]}</i>
                            <span>{label}</span>
                            <p>{details}</p>
                        </div>
                    </div>
                )))
            }
        </div>
    )
}
