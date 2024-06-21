import Image from "next/image";

export default function MyImage({ src }: { src: string | undefined }) {
    return (
        <div className="img-box inner-shadow">
            <Image
                src={`/img/${src}`}
                className="outer-shadow"
                alt="Chandan Kumar"
                width={405}
                height={405}
                sizes="(max-width: 768px) 300px, 405px"
            />
        </div>
    )
}
