import { ReactEventHandler } from "react";

export default function ScreenshotsBtn({ active, onClick }: { active: boolean, onClick: ReactEventHandler }) {
  return (
    <div className={`${active ? "inner-shadow" : "outer-shadow hover-in-shadow"} pp-project-screenshots-btn`} onClick={onClick}>
          Screenshots
      </div>
  )
}
