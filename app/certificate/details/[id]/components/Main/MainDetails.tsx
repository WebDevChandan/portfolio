import CertificateDetailsCloseBtn from "./CertificateDetailsCloseBtn";
import CertificateDetailsOpenBtn from "./CertificateDetailsOpenBtn";
import LargeImage from "./LargeImage";

type mainDetailsType = {
    largeImage: string;
    imgText: string;
} | undefined

export default function MainDetails({ mainDetails }: { mainDetails: mainDetailsType }) {

    return (
        <div className="cp-main-inner">
            <CertificateDetailsOpenBtn />
            <CertificateDetailsCloseBtn />
            <LargeImage width={1282} height={961} largeImage={`/img/certificate/thumb/${mainDetails?.largeImage}`} altText={mainDetails!.imgText} />
        </div>
    )
}
