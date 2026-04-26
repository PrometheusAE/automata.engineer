import { createFileRoute, Link } from '@tanstack/react-router'
import { allBlogs } from 'content-collections'
import { marked } from 'marked'
import { ArrowLeft, Calendar } from 'lucide-react'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
})

function BlogPost() {
  const { slug } = Route.useParams()
  const post = allBlogs.find((p) => p._meta.path === slug)

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-mono font-bold text-foreground mb-4">Post not found</h1>
          <Link to="/blog/" className="text-primary hover:opacity-80 font-mono text-sm">← Back to blog</Link>
        </div>
      </div>
    )
  }

  const html = marked(post.content)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        to="/blog/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 font-mono text-sm transition-colors"
      >
        <ArrowLeft size={14} />
        Back to blog
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold font-mono text-foreground mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span>{post.author}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{tag}</span>
            ))}
          </div>
        </header>

        <div
          className="prose-ae text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </div>
  )
}
