import { BlogPost, GetBlogPostsData } from '../types/blog';
import './Blog.css';
import { useQuery, gql } from '@apollo/client'

const GET_BLOG_POSTS = gql`
    query GetBlogPosts {
        blog_posts {
            id
            title
            date
            description
            categories
            read_time
            post_url
            image_url
        }
    }
`

function Blog() {
    const { data, loading } = useQuery<GetBlogPostsData>(GET_BLOG_POSTS)

    if (loading) return <p>Loading...</p>

    return (
        <div className="blog">
            <div className="container">
                <header className="blog-header">
                    <h1 className="page-title">Blog</h1>
                    <p className="page-description">
                        My Medium blog posts about software engineering, AI and science.
                    </p>
                </header>

                <div className="blog-posts">
                    {data?.blog_posts.map((post : BlogPost) => (
                        <article key={post.id} className="blog-post-card" onClick={() => window.open(post.post_url, '_blank')}>
                            <div className="post-meta">
                                <span className="post-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <span className="post-read-time">{post.read_time} min read</span>
                            </div>
                            <h2 className="post-card-title">{post.title}</h2>
                            {post.image_url && (
                                <div className="post-image">
                                    <img src={post.image_url} alt={post.title} />
                                </div>
                            )}
                            <p className="post-card-excerpt">{post.description}</p>
                            <div className="post-categories">
                                {post.categories.map((category, index) => (
                                    <span key={index} className="category-badge">{category}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Blog;
