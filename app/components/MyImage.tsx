import Image from "next/image";

type MyImageType = {
    src: string | undefined;
    blobImg?: string | null;
}

export default function MyImage({ src, blobImg }: MyImageType) {
    return (
        <div className="img-box inner-shadow">
            <Image
                src={blobImg ? blobImg : src ? `${src}`: `/img/Chandan_Kumar.webp`}
                className="outer-shadow"
                alt="Chandan Kumar"
                width={405}
                height={405}
                sizes="(min-width: 1100px) 400px, (min-width: 780px) calc(46.33vw - 100px), (min-width: 580px) 300px, 210px"
                priority
            />
        </div>
    )
}