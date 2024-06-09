
export default function HeaderTitle({title, category}:{title: string, category: string}) {
  return (
      <div className="pp-title">
      <h2>{title}</h2>
      <p>Category - <span className="pp-project-category">{category}</span></p>
      </div>
  )
}
