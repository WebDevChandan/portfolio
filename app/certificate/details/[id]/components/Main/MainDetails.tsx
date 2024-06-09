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
            <LargeImage width={869} height={1152} largeImage={`/img/certificate/thumb/${mainDetails?.largeImage}`} altText={mainDetails!.imgText} />
        </div>
    )
}
