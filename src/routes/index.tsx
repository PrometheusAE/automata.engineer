import { createFileRoute, Link } from '@tanstack/react-router'
import { allBlogs, allJobs, allProjects } from 'content-collections'
import { Shield, Network, Cloud, Lock, Terminal, ArrowRight, Server, CheckCircle, Calendar, Briefcase } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

const highlights = [
  {
    icon: Network,
    label: 'Network Support',
    desc: 'TCP/IP troubleshooting, firewall basics, endpoint connectivity, infrastructure documentation',
    color: 'text-cyan-400',
  },
  {
    icon: Shield,
    label: 'Security Operations',
    desc: 'CIS Controls participation, SIEM exposure, authentication support, practical security hardening',
    color: 'text-emerald-400',
  },
  {
    icon: Cloud,
    label: 'Systems & Platforms',
    desc: 'Windows, Linux, macOS, Microsoft 365, server support, workstation deployment',
    color: 'text-violet-400',
  },
  {
    icon: Lock,
    label: 'Identity & Access',
    desc: 'Entra ID, MFA support, account provisioning, permissions, mailbox access',
    color: 'text-amber-400',
  },
]

function Home() {
  const featuredProjects = allProjects.slice(0, 3)
  const recentPosts = [...allBlogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
  const experience = [...allJobs]
    .sort((a, b) => Number(b.startDate) - Number(a.startDate))
    .slice(0, 2)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden ae-grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">
          <div className="grid md:grid-cols-[1fr_auto] items-center gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Systems Online
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-mono leading-tight mb-6">
                <span className="text-foreground">Automata</span>
                <br />
                <span className="text-primary ae-glow">Engineer</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                Professional portfolio focused on IT support, network administration,
                Microsoft 365 operations, and security-minded infrastructure work.
              </p>
              <p className="text-sm text-muted-foreground font-mono mb-10">
                // IT Support · Networking · Microsoft 365 · Security Operations
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-2xl">
                {[
                  { label: 'Projects', value: String(allProjects.length) },
                  { label: 'Articles', value: String(allBlogs.length) },
                  { label: 'Roles', value: String(allJobs.length) },
                  { label: 'Platforms', value: '3' },
                ].map((item) => (
                  <div key={item.label} className="border border-border rounded-lg bg-card/60 px-4 py-3">
                    <p className="text-lg font-mono font-bold text-primary">{item.value}</p>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded font-mono text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  View Projects
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded font-mono text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  Explore Solutions
                  <Server size={16} />
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <img
                src="/logo.png"
                alt="Automata Engineer"
                className="w-64 lg:w-80 object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Overview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Domains</h2>
          <h3 className="text-2xl font-bold font-mono text-foreground">Core Competencies</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="border border-border rounded-lg p-5 bg-card ae-card-glow transition-all">
              <Icon className={`${color} mb-3`} size={22} />
              <h4 className="font-mono font-semibold text-foreground mb-2 text-sm">{label}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Portfolio</h2>
            <h3 className="text-2xl font-bold font-mono text-foreground">Featured Implementations</h3>
          </div>
          <Link
            to="/projects"
            className="text-sm font-mono text-primary hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            All projects <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((p) => (
            <Link
              key={p._meta.path}
              to="/projects"
              className="group border border-border rounded-lg p-6 bg-card hover:border-primary/50 transition-all ae-card-glow block"
            >
              <h4 className="font-mono font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Experience Snapshot */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Experience</h2>
            <h3 className="text-2xl font-bold font-mono text-foreground">Recent Roles</h3>
          </div>
          <Link
            to="/about"
            className="text-sm font-mono text-primary hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            Full profile <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experience.map((job) => (
            <div key={job._meta.path} className="border border-border rounded-lg p-6 bg-card">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h4 className="font-mono font-semibold text-foreground">{job.jobTitle}</h4>
                  <p className="text-sm text-primary">{job.company}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground border border-border rounded px-2 py-1">
                  {job.startDate}{job.endDate ? ` - ${job.endDate}` : ' - Present'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{job.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {job.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Writing</h2>
            <h3 className="text-2xl font-bold font-mono text-foreground">Latest Articles</h3>
          </div>
          <Link
            to="/blog/"
            className="text-sm font-mono text-primary hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            Visit blog <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post._meta.path}
              to="/blog/$slug"
              params={{ slug: post._meta.path }}
              className="group border border-border rounded-lg p-6 bg-card hover:border-primary/50 transition-all ae-card-glow"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-3">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
              <h4 className="font-mono font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
        <div className="mb-10">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Philosophy</h2>
          <h3 className="text-2xl font-bold font-mono text-foreground">Engineering Principles</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'User Support', points: ['Clear troubleshooting flow', 'Fast issue isolation', 'Accurate ticket updates', 'Reliable follow-through'] },
            { title: 'Security Practice', points: ['MFA and identity support', 'CIS Controls exposure', 'Security-aware documentation', 'Practical hardening'] },
            { title: 'Infrastructure Growth', points: ['Home lab experimentation', 'Hybrid environment learning', 'Network administration practice', 'Continuous improvement'] },
          ].map(({ title, points }) => (
            <div key={title} className="border border-border rounded-lg p-6 bg-card">
              <h4 className="font-mono font-semibold text-primary mb-4 text-sm">{title}</h4>
              <ul className="space-y-2">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={14} className="text-primary shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
        <div className="border border-primary/20 rounded-lg p-8 md:p-12 bg-primary/5 text-center">
          <Terminal className="text-primary mx-auto mb-4" size={32} />
          <h3 className="text-2xl font-bold font-mono text-foreground mb-3">Need a solution engineered?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            This site reflects real experience in IT support, networking, Microsoft 365 administration, and security-focused infrastructure work.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded font-mono text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Submit Service Request
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
