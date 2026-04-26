import { createFileRoute, Link } from '@tanstack/react-router'
import { allBlogs } from 'content-collections'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
})

function BlogIndex() {
  const posts = [...allBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Technical Writing</p>
        <h1 className="text-3xl font-bold font-mono text-foreground mb-3">Blog</h1>
        <p className="text-muted-foreground max-w-xl">
          Field notes on networking, security, and infrastructure engineering.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post._meta.path}
            to="/blog/$slug"
            params={{ slug: post._meta.path }}
            className="group block border border-border rounded-lg p-5 bg-card hover:border-primary/40 transition-all ae-card-glow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{post.summary}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <span>{post.author}</span>
                </div>
              </div>
              <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
