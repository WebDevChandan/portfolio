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
            layout="responsive"
            loading="lazy"
            quality={60}
            priority={false}
            unoptimized={true}
            decoding="async"
            sizes="(max-width: 1440px) 1200px,
                    (max-width: 1024px) 846px,
                    (max-width: 768px) 629px,
                    (max-width: 425px) 337px,
                    (max-width: 320px) 295px"
        />
    )
}
