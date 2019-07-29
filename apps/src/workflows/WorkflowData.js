const STAGES = {
    BEGINNER: {
        tag: "beginner",
        title: "I'm just getting started"
    },
    ADVANCED: {
        tag: "advanced",
        title: "I've done this before"
    }
};

const APPLICATIONS = {
    STATIC_WEBSITE: "static website",
    DYNAMIC_WEBSITE: "dynamic website",
    TRANSACTIONAL_WEBSITE: "transactional website",
    MOBILE_APP: "mobile app",
    DESIGNER_TEMPLATAE: "designer template"
};

const CATEGORIES = [
    {
        tag: "introduction",
        title: "Introduction",
        description:
            "You will understand Agile Software Development Life Cycle, within the context of our efforts on the delivery of transformative digital projects in Singapore Government."
    },
    {
        tag: "concept",
        title: "Concept Phase",
        description:
            "You collaborate with stakeholders to consider this potential project and invest in enough effort to decide whether to consider funding the effort further."
    },
    {
        tag: "inception",
        title: "Inception Phase",
        description:
            "You identify with your team the complexity of the problem space, technical complexity and ability of stakeholders to come to agreement as to the scope."
    },
    {
        tag: "construction",
        title: "Construction and Iteration",
        description:
            "You incrementally deliver high-quality working software which meets the changing needs of our stakeholders."
    },
    {
        tag: "release",
        title: "Release",
        description:
            "You will need to adopt a continuous deployment strategy to automate many of the technical aspects to transit your system into production."
    },
    {
        tag: "production",
        title: "Production",
        description: "You need to keep the system running and help users to use it."
    },
    {
        tag: "retirement",
        title: "Retirement",
        description:
            "You must strive to complete the removal of a system release, or the complete system itself from production with minimal impact to business operations."
    }
];

export { STAGES, APPLICATIONS, CATEGORIES };
