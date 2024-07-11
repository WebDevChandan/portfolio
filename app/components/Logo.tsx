import Link from "next/link";
import '../styles/logo.scss';

export default function Logo() {
  return (
    <span className="image">
      <div className="logo">
        <Link href="/">C</Link>
      </div>
    </span>
  )
}
