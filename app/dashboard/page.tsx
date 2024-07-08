import { Title } from "../components";

export default function page() {
  return (
    <section className="other-section section" id="about">
            <div className="container">
                <Title title="Welcome Admin" subTitle="Login" />
                {/* <Suspense fallback={<Loading />}>
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
                </Suspense> */}
            </div>
        </section>
  )
}
