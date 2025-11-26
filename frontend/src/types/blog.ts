interface BlogPost {
    id: string,
    title: string,
    date: Date,
    description: string,
    categories: string[],
    read_time: number,
    post_url: string,
    image_url?: string,
}

interface GetBlogPostsData {
    blog_posts: BlogPost[]
}

export type {BlogPost, GetBlogPostsData}