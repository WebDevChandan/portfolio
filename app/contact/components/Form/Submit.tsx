"use client";
import { checkAllFields } from "./ValidationRules";

export default function Submit() {
    return (
        <div className="row">
            <div className="submit-btn">
                <button type="submit" className="btn-1 outer-shadow hover-in-shadow" name="submit"
                    onClick={(e) => { e.preventDefault(); checkAllFields(); }}>Send Message</button>
            </div>
        </div>
    )
}
