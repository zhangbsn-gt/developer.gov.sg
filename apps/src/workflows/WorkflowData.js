const STAGES = {
  BEGINNER: {
    tag: "beginner",
    title: "and I'm just getting started"
  },
  ADVANCED: {
    tag: "advanced",
    title: "and I've done this before"
  }
};

const APPLICATIONS = {
  STATIC_WEBSITE: {
    tag: "static website",
    title: "I need to build a static website"
  },
  DYNAMIC_WEBSITE: {
    tag: "dynamic website",
    title: "I need to build a dynamic website"
  },
  TRANSACTIONAL_WEBSITE: {
    tag: "transactional website",
    title: "I need to build a transactional digital service"
  }
  //MOBILE_APP: "mobile app",
  //DESIGNER_TEMPLATE: "designer template"
};

const CATEGORIES = [
  {
    tag: "introduction",
    title: "Introduction",
    description:
      "Understand the Agile Software Development lifecycle and our efforts in delivering transformative digital projects for Singapore."
  },
  {
    tag: "concept",
    title: "Concept Phase",
    description:
      "Collaborate with stakeholders to map out your problem space, strengthen your value proposition and plan out your requirements, be it in terms of funding or manpower."
  },
  {
    tag: "inception",
    title: "Inception Phase",
    description:
      "Identify with your team the technical complexity of the solution space and ensure stakeholders are in agreement on the scope of your project."
  },
  {
    tag: "construction",
    title: "Construction and Iteration",
    description:
      "Incrementally deliver high-quality working software while meeting the changing needs of your stakeholders."
  },
  {
    tag: "release",
    title: "Release",
    description:
      "Bring development and operations closer by automating your entire development workflow up to release in order to deliver features, changes and fixes with more speed and reliability."
  },
  {
    tag: "production",
    title: "Production",
    description:
      "Make sure your system is reliable and always in line with the needs of your users."
  },
  {
    tag: "retirement",
    title: "Retirement",
    description:
      "Ensure that your users face minimal impact to business operations while you complete the termination of your product."
  }
];

export { STAGES, APPLICATIONS, CATEGORIES };
