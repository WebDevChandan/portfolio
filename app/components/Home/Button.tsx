import Link from "next/link";

export default function Button({label, href, target}: {label:string, href?:string, target?: string}) {
  return (
      <Link href={`/${href?href: label.toLowerCase()}`} className="btn-1 outer-shadow hover-in-shadow" target={target} >{label}</Link>
  )
}
