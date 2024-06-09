import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

interface skillDataType {
    name: string,
    level: string,
}

const fetchSkills = async (): Promise<skillDataType[] | null> => {
    try {
        const skillData = await prisma.skill.findMany({
            select: {
                name: true,
                level: true,
            }
        });
        return skillData;
    } catch (error) {
        console.log("Error Fetching skill Data: ", error)
        return null;
    }

}
export default async function Skill() {
    const skillData = await fetchSkills();

    return (
        <>
            {skillData &&
                (skillData?.map(({ name, level }, index) => (
                    <div className="skill-item" key={index}>
                        <p>{name}</p>
                        <div className="progress inner-shadow">
                            <div className="progress-bar" style={{ width: `calc(${level} - 14px)` }}>
                                <span>{level}</span>
                            </div>
                        </div>
                    </div>
                )))
            }
        </>
    )
}
