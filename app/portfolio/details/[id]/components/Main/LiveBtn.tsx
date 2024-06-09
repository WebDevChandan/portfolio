import { ReactEventHandler } from "react";

export default function LiveBtn({ active, onClick }: { active:boolean, onClick: ReactEventHandler }) {
    return (
        <div className={`${active ? "inner-shadow" :"outer-shadow hover-in-shadow"} pp-project-live-btn`} onClick={onClick}>
            Watch Live
        </div>
    )
}
