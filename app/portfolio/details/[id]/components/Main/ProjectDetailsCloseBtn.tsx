"use client";

import { useRouter } from "next/navigation";

export default function ProjectDetailsCloseBtn() {
  const router = useRouter();

  return (
      <div className="pp-close outer-shadow hover-in-shadow" onClick={()=>router.back()}>
          &times;
      </div>
  )
}
