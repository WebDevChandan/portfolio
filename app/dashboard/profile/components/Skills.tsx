"use client";
import { ChangeEvent, useState } from 'react';

export default function Skills() {
    const [rangeValues, setRangeValues] = useState({
        html: 90,
        css: 60,
        js: 70,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>, skill: string) => {
        setRangeValues({
            ...rangeValues,
            [skill]:parseInt(e.target.value, 10),
        });
    };


    return (
        <div className="row">
            <div className="skill-item">
                <p>HTML</p>
                <div className="range-container inner-shadow">
                    <input
                        type="range"
                        className='range-bar'
                        min={0} max={100}
                        value={rangeValues.html}
                        onChange={(e) => handleChange(e, "html")}
                        name='html'
                    />
                    <span>{`${rangeValues.html}%`}</span>
                </div>
            </div>
            <div className="skill-item">
                <p>CSS</p>
                <div className="range-container inner-shadow">
                    <input
                        type="range"
                        className='range-bar'
                        min={0} max={100}
                        value={rangeValues.css}
                        onChange={(e) => handleChange(e, "css")}
                        name='css'
                    />
                    <span>{`${rangeValues.css}%`}</span>
                </div>
            </div>
            <div className="skill-item">
                <p>JS</p>
                <div className="range-container inner-shadow">
                    <input
                        type="range"
                        className='range-bar'
                        min={0} max={100}
                        value={rangeValues.js}
                        onChange={(e) => handleChange(e, "js")}
                        name='js'
                    />
                    <span>{`${rangeValues.js}%`}</span>
                </div>
            </div>
        </div>
    )
}
