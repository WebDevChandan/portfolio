"use client";
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

let setTestiSliderContainerwidth = false;



export default function NavigationHandler() {
    let [testiNavigationCount, setTestiNavigationCount] = useState(0);

    useEffect(() => {
        testiCardSetup();
    }, []);

    const testiCardSetup = () => {
        const testiSliderContainer = document.querySelector('.testi-slider-container')! as HTMLElement;
        const testiItems = document.querySelectorAll('.testi-item');
        const sliderContainerWidth: number = testiSliderContainer?.offsetWidth;

        if (!setTestiSliderContainerwidth) {
            testiSliderContainer.style.width = `${sliderContainerWidth * testiItems.length}px`;
            setTestiSliderContainerwidth = true;
        }

        testiItems.forEach((item: Element, index) => {
            const testimonialCard = item as HTMLElement;
            testimonialCard.style.width = `${sliderContainerWidth / testiItems.length}px`;

            if (testimonialCard.classList.contains('active')) {
                const marginLeft = testimonialCard?.offsetWidth * index;
                testiSliderContainer.style.marginLeft = `-${marginLeft}px`;
                setTestiNavigationCount(-index);
            }
        });
    }

    const testiCardNavigation = (direction: string) => {
        const testiSliderContainer = document.querySelector('.testi-slider-container')! as HTMLElement,
            testimonialCard = document.querySelector('.testi-item')! as HTMLElement;

        if (direction === "left" || direction === "ArrowLeft") {
            if (testiNavigationCount === 0)
                testiNavigationCount = -(testiSliderContainer.childElementCount - 1);
            else
                setTestiNavigationCount(++testiNavigationCount);
        }

        if (direction === "right" || direction === "ArrowRight") {
            if (testiNavigationCount === -(testiSliderContainer.childElementCount - 1))
                testiNavigationCount = 0;
            else
                setTestiNavigationCount(--testiNavigationCount);
        }

        testiSliderContainer.style.marginLeft = `calc(${testimonialCard?.offsetWidth}px * ${testiNavigationCount})`;
    }


    return (
        <>
            <span className="prev outer-shadow hover-in-shadow" onClick={() => testiCardNavigation("left")}
                onKeyDown={(e) => testiCardNavigation(e.key)} tabIndex={0}>
                <i><FaAngleLeft /></i>
            </span>
            <span className="next outer-shadow hover-in-shadow" onClick={() => testiCardNavigation("right")}
                onKeyDown={(e) => testiCardNavigation(e.key)} tabIndex={0}>
                <i><FaAngleRight /></i>
            </span>
        </>
    )
}
