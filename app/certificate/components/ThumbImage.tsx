import Image from "next/image";

export default function ThumbImage({ width, height, src, altText, title }: { width: number, height: number, src: string, altText: string, title?: string }) {
    return (
        <Image
            className="animate"
            src={src}
            alt={altText}
            title={title ? title : altText}
            width={width}
            height={height}
            layout="responsive"
            loading="lazy"
            quality={50}
            priority={false}
            unoptimized={true}
            decoding="async"
            sizes="(max-width:1440px) 320px,
                    (max-width: 1024px) 281px,
                    (max-width: 768px) 500px,
                    (max-width: 425px) 365px,
                    (max-width: 320px) 260px"
        />
    )
}
