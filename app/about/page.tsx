import prisma from "@/utils/prisma";
import { MyImage } from "../components";
import { AboutMe, AboutTabs, Education, Experience, Skill, SocialLinks, Title } from "./components";
import './styles/about.scss';
import { Suspense } from "react";
import Loading from "../components/Loading";

const fetchAboutDetails = async () => {
    try {
        const aboutData = await prisma.personalInfo.findFirst({
            select: {
                about: true,
                myImages: true,
            }
        });

        return aboutData;
    } catch (error) {
        console.log("Error fetching about data: ", error);
        return null;
    }
}

export default async function About() {
    const tabsComponent = [
        {
            label: "skills",
            component: <Skill />,
            active: true,
        },
        {
            label: "experience",
            component: <Experience />,
            active: false,
        },
        {
            label: "education",
            component: <Education />,
            active: false,
        },

    ]

    const aboutData = await fetchAboutDetails();

    return (
        <section className="other-section section" id="about">
            <div className="container">
                <Title title="About Me" subTitle="Main Info" />
                <Suspense fallback={<Loading />}>
                    {
                        aboutData && (
                            <div className="row">
                                <div className="about-img">
                                    <MyImage src={aboutData?.myImages[1]} />
                                    <SocialLinks />
                                </div>
                                <AboutMe info={aboutData!.about} />
                            </div>
                        )
                    }

                    <AboutTabs />

                    {tabsComponent.map(({ label, component, active }, index) => (
                        <div className="row" key={index}>
                            <div className={`${active ? "active" : ""} ${label} tab-content`}>
                                <div className="row">
                                    {component}
                                </div>
                            </div>
                        </div>
                    ))}
                </Suspense>
            </div>
        </section>
    )
}
