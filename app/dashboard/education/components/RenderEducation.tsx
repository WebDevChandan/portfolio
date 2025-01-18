"use client";
import { FaEdit, FaGraduationCap } from "react-icons/fa";
import { EducationDetailType } from "../server/educationAction";
import { useState } from "react";

export default function RenderEducation({ educationDetails }: { educationDetails: EducationDetailType }) {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    return (
        (educationDetails?.map(({ from, to, degree, info, institution }, index) => (
            <div className="timeline-item" key={index}>
                <div className="timeline-item-inner outer-shadow">
                    <div
                        className="icon"
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        style={hoverIndex === index ? { cursor: "pointer" } : { cursor: "auto" }}
                    >
                        {hoverIndex === index ? <FaEdit cursor="pointer" /> : <FaGraduationCap />}
                    </div>
                    <span>{from} - {to}</span>
                    <h3>{degree}</h3>
                    <h4>{institution.title}, {institution.location}</h4>
                    <p dangerouslySetInnerHTML={{ __html: info }} />
                </div>
            </div>
        )))
    )
}
