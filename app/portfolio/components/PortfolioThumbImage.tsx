import { ThumbImage } from "@/app/certificate/components";

export default function PortfolioThumbImage({ title, altText, src }: { title: string, altText: string, src: string }) {
  return (
      <>
          <div className="portfolio-item-img">
              <ThumbImage
                  width={320}
                  height={290}
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
