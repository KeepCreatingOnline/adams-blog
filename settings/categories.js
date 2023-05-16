// create the categories for the blog
// const categories = {
//     "category-id": {
//         name: "Category Name",
//         description: "A description of what you cover in the topic, **you can use markup!**",
//         metaDescription: "This is optional, but if you used markup in your description, include a plain text description here for SEO",
//     },
// }
// if the blog doesn't need categories, empty the categories object e.g const categories = {};

const categories = {
    "tech": { 
        name: "Tech",
        description: "Cool tech I like.",
    },
    "coding": {
        name: "Coding",
        description: "Coding projects I am thinking about.",
    },
    "design": {
        name: "Design",
        description: "Design topics that I'm thinking about.",
    },
    "general": {
        name: "General",
        description: "Whatever.",
    },
    "political": {
        name: "Political",
        description: "Clearly Wrongthink.",
    },
    "ideas": {
        name: "Ideas",
        description: "The most resilient parasite.",
    },
    "fiction": {
        name: "Fiction",
        description: "Stuff thats probably not real. Probably...",
    },
    "art": {
        name: "Art",
        description: "All Nature is but Art, unknown to thee;",
    }
};

export default categories;