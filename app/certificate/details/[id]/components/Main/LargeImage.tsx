import Image from "next/image";

export default function LargeImage(
    { width, height, largeImage, altText }:
        { width: number, height: number, largeImage: string, altText: string, title?: string }) {
    return (
        <Image
            className="cp-img pp-img outer-shadow"
            width={width}
            height={height}
            src={largeImage}
            alt={altText}
            loading="lazy"
            quality={65}
            priority={false}
            sizes="(max-width: 768px) 429px, 900px"
        />
    )
}
