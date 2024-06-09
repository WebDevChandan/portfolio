import { ThumbImage } from "@/app/certificate/components";

export default function PortfolioThumbImage({ title, altText, src }: { title: string, altText: string, src: string }) {
  return (
      <>
          <div className="portfolio-item-img">
              <ThumbImage
                  width={319.95}
                  height={28.83}
                  src={src}
                  altText={altText}
                  title={title}
              />
              <span className="view-project">view project</span>
          </div>
          <p className="portfolio-item-title">{title}</p>
      </>
  )
}
