import prisma from "@/utils/prisma";

type skillDataType = {
    skills: {
        name: string;
        level: string;
    }[];
};

const fetchSkills = async (): Promise<skillDataType | null> => {
    try {
        const [skills] = await prisma.personalInfo.findMany({
            select: {
                skills: {
                    select: {
                        name: true,
                        level: true,
                    }
                }
            }
        });
        return skills;

    } catch (error) {
        console.log("Error Fetching skill Data: ", error)
        return null;
    }
}

export default async function Skills() {
    const skillData = await fetchSkills();

    return (
        <>
            {skillData?.skills &&
                (skillData?.skills?.map(({ name, level }, index) => (
                    <div className="skill-item" key={index}>
                        <p>{name}</p>
                        <div className="progress inner-shadow">
                            <div className="progress-bar" style={{ width: `calc(${level}% - 14px)` }}>
                                <span className="progress-level">{level}%</span>
                            </div>
                        </div>
                    </div>
                )))
            }
        </>
    )
}
