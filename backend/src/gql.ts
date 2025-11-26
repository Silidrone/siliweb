import { blogPostRepo, projectRepo } from "./db/repos";

const typeDefs = `
    type Project {
      id: ID!
      title: String!
      description: String!
      technologies: [String!]!
      github: String!
      featured: Boolean
      demo: String
      order: Int
    }

    type BlogPost {
      id: ID!
      title: String!
      date: String!
      description: String!
      categories: [String!]!
      read_time: Int
      post_url: String!
      image_url: String
    }

    type Query {
      blog_posts: [BlogPost!]!
      projects: [Project!]!
    }
`;

const resolvers = {
    Query: {
        blog_posts: async () => {
            return await blogPostRepo.getAll()
        },
        projects: async () => {
            return await projectRepo.getAll()
        }
    }
}

export { typeDefs, resolvers };
