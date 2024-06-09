"use client";
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { LiveBtn, ProjectDetailsCloseBtn, ProjectDetailsOpenBtn, ScreenshotsBtn, WebFrame } from '..';
import { LargeImage } from '@/app/certificate/details/[id]/components';

export default function MainDetails({ src, altText, titleText, webFrameLink }: {
    src: string[];
    altText: string;
    titleText?: string;
    webFrameLink?: string;
}) {
    const [count, setCount] = useState(0);
    const [switchFrameToPic, setSwitchFrameToPic] = useState(true);

    const playPrev = () => count > 0 ? setCount(count - 1) : null;
    const playNext = () => count >= 0 && count < src.length - 1 ? setCount(count + 1) : null;

    return (
        <div className="pp-main">
            <div className="pp-main-inner">
                <ProjectDetailsOpenBtn />
                <ProjectDetailsCloseBtn />
                {(src[count] && webFrameLink) && <LiveBtn active={switchFrameToPic} onClick={() => { !switchFrameToPic ? setSwitchFrameToPic(true) : null }} />}
                {(src[count] && webFrameLink) && <ScreenshotsBtn active={!switchFrameToPic} onClick={() => { switchFrameToPic ? setSwitchFrameToPic(false) : null }} />}

                {src[count] && !switchFrameToPic &&
                    <LargeImage
                        width={1157}
                        height={635}
                        largeImage={src[count]}
                        altText={altText}
                        title={titleText}
                    />}

                {webFrameLink && switchFrameToPic && <WebFrame />}

                {!switchFrameToPic && src.length > 1 &&
                    <div className="pp-counter">
                        {`${count + 1} of ${src.length}`}
                    </div>
                }
            </div>

            {!switchFrameToPic && src.length > 1 &&
                <>
                    <div className="pp-prev"
                        onClick={() => playPrev()}
                        onKeyDown={(e) => e.key == "ArrowLeft" ? playPrev() : null}
                        tabIndex={0}>
                        <i className="fas fa-play"> <FaPlay /></i>
                    </div>
                    <div className="pp-next"
                        onClick={() => playNext()}
                        onKeyDown={(e) => e.key == "ArrowRight" ? playNext() : null}
                        tabIndex={0}>
                        <i className="fas fa-play"><FaPlay /></i>
                    </div>
                </>}
        </div>
    )
}
