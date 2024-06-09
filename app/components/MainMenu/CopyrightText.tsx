export default function CopyrightText({ footerText }: { footerText?: string }) {
  return (
    <p className={footerText ? "copyright-text-bottom" : "copyright-text"}>
      Copyright &copy; 2020-2023 WebDevChandan {footerText ? footerText : ""}
    </p>
  )
}
