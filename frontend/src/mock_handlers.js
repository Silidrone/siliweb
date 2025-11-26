import { graphql, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'

const mockProjects = (length) => {
    return Array.from({ length }, () => ({
        id: faker.string.uuid(),
        title: faker.airline.airport().name,
        description: faker.lorem.paragraph(),
        technologies: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => faker.person.jobDescriptor()),
        github: faker.internet.url(),
        featured: faker.datatype.boolean(),
    }));
};

const mockBlogPosts = (length) => {
    return Array.from({ length }, () => ({
        id: faker.string.uuid(),
        title: faker.airline.airport().name,
        date: faker.date.anytime(),
        description: faker.lorem.paragraph(),
        categories: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => faker.hacker.noun()),
        readTime: `${faker.number.int({ min: 1, max: 40 })} min read`,
        url: faker.internet.url(),
        image: faker.datatype.boolean() ? faker.image.url() : null,
    }))
}

const handlers = [
    graphql.query('GetProjects', () => (
        HttpResponse.json({
            data: {
                projects: mockProjects(6),
            }
        })
    )),
    graphql.query('GetBlogPosts', () => (
        HttpResponse.json({
            data: {
                blog_posts: mockBlogPosts(15),
            }
        })
    ))
]

export default handlers;