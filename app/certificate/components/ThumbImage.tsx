import Image from "next/image";

export default function ThumbImage({ width, height, src, altText, title }: { width: number, height: number, src: string, altText: string, title?: string}) {

    return (
        <Image
            className="animate"
            src={src}
            alt={altText}
            title={title ? title : altText}
            width={width}
            height={height}
            loading="lazy"
            quality={50}
            priority={false}
            sizes="(min-width: 1220px) 320px, (min-width: 1000px) calc(23.5vw + 38px), (min-width: 780px) calc(50vw - 60px), calc(100vw - 60px)"
        />
    )
}
