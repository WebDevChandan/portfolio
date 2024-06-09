import { PrismaClient } from "@prisma/client";
import { MyImage } from "../components";
import { AboutMe, AboutTabs, Education, Experience, Skill, SocialLinks, Title } from "./components";
import './styles/about.scss';


const prisma = new PrismaClient();

const fetchAboutDetails = async () => {
    try {
        const aboutData = await prisma.about.findFirst({
            select: {
                info: true,
                img: true,
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
        <section className="about-section section" id="about">
            <div className="container">
                <Title title="About Me" subTitle="Main Info" />
                {
                    aboutData && (
                        <div className="row">
                            <div className="about-img">
                                <MyImage src={aboutData?.img} />
                                <SocialLinks />
                            </div>
                            <AboutMe info={aboutData!.info} />
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
            </div>
        </section>
    )
}
