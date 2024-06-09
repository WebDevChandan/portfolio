import { PrismaClient } from '@prisma/client';
import React from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

const prisma = new PrismaClient();

export const fetchTestimonialData = async () => {
    try {
        const testimonialData = await prisma.testimonial.findMany({
            select: {
                name: true,
                img: true,
                region: true,
                feedback: true,
                active: true,
            }
        })
        return testimonialData;

    } catch (error) {
        console.log("Error Fetching Testimonial Data", error);
        return [];
    }
}

export default async function TestimonialCard() {
    const testimonialData = await fetchTestimonialData();

    return (
        <>
            {testimonialData &&
                (testimonialData?.map(({ name, region, feedback, img, active }, index) => (
                    <div className={`${active ? "active " : ""}testi-item`} key={index}>
                        <i className="left"> <FaQuoteLeft /></i>
                        <i className="right"><FaQuoteRight /></i>
                        <p>{feedback}</p>
                        <img src={`img/testimonial/${img}`} alt="female" />
                        <span>{name}</span>
                        <label className="client_region">
                            {region}
                        </label>
                    </div>
                )))
            }

        </>
    )
}
