export default function Title({title, subTitle}: {title: string, subTitle: string}) {
  return (
      <div className="row">
          <div className="section-title">
              <h2 data-heading={subTitle}>{title}</h2>
          </div>
      </div>
  )
}
