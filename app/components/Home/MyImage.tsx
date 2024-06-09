import Image from "next/image";

export default function MyImage({ src }: { src: string | undefined }) {
    return (
        <div className="img-box inner-shadow">
            <Image
                src={`/img/${src}`}
                className="outer-shadow"
                alt="Chandan Kumar"
                width={420}
                height={420}
                layout="responsive"
                priority={true}
                decoding="async"
                sizes="(max-width: 1440px) 400px, (max-width: 768px) 350px, (max-width: 574px) 260px"
            />
        </div>
    )
}
