export type EducationDetailType = {
    id: string,
    from: string,
    to: string,
    info: string,
    degree: string,
    institution: {
        title: string;
        location: string;
    },
}[]

export type ManageEducationProps = {
    education: EducationDetailType[number]; // single education object
    isNewEducation: boolean;
};
