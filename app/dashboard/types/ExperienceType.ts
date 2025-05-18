export type ExperienceDetailType = {
    id: string,
    from: string,
    to: string,
    role: string,
    experienceDetail: string,
    organization: {
        title: string;
        location: string;
    },
}[]

export type ManageExeprienceProps = {
    experience: ExperienceDetailType[number]; // single education object
    isNewExperience: boolean;
};
