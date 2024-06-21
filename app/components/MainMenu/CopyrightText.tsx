export default function CopyrightText({ footerText }: { footerText?: string }) {
  const currentYear = new Date().getFullYear();
  return (
    <p className={footerText ? "copyright-text-bottom" : "copyright-text"}>
      Copyright &copy; 2020-{currentYear} WebDevChandan {footerText ? footerText : ""}
    </p>
  )
}
