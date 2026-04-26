import { createFileRoute, Link } from '@tanstack/react-router'
import { Shield, Network, Cloud, Lock, Terminal, ArrowRight, Server, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/')({
  component: Home,
})

const highlights = [
  {
    icon: Network,
    label: 'Network Infrastructure',
    desc: 'SD-WAN, VLAN segmentation, BGP routing, Fortinet NGFW',
    color: 'text-cyan-400',
  },
  {
    icon: Shield,
    label: 'Cybersecurity',
    desc: 'Zero Trust architecture, CIS Controls, SIEM/EDR, Wazuh',
    color: 'text-emerald-400',
  },
  {
    icon: Cloud,
    label: 'Cloud & Virtualization',
    desc: 'Hybrid cloud with Akamai, KVM/Proxmox, IaC with Terraform',
    color: 'text-violet-400',
  },
  {
    icon: Lock,
    label: 'Identity & Access',
    desc: 'Zero Trust IAM, Passbolt, MFA, RBAC policy enforcement',
    color: 'text-amber-400',
  },
]

const featuredProjects = [
  {
    title: 'Zero Trust Network',
    desc: 'End-to-end Zero Trust implementation with micro-segmentation, identity-aware proxies, and continuous verification.',
    tags: ['Tailscale', 'Fortinet', 'Wazuh', 'CIS Controls'],
    slug: 'zero-trust-network',
  },
  {
    title: 'Hybrid Cloud Infrastructure',
    desc: 'Akamai + on-premises hybrid cloud with automated provisioning, unified monitoring, and multi-region failover.',
    tags: ['Akamai', 'KVM', 'Terraform', 'Zabbix'],
    slug: 'hybrid-cloud-infrastructure',
  },
  {
    title: 'Secure Remote Access',
    desc: 'Modern VPN-less remote access using Tailscale mesh networking with centralized access policies.',
    tags: ['Tailscale', 'Nextcloud', 'Passbolt', 'MFA'],
    slug: 'secure-remote-access',
  },
]

function Home() {
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
                Hybrid professional portfolio, documentation hub, and service showcase
                for enterprise networking, cybersecurity, and cloud solutions.
              </p>
              <p className="text-sm text-muted-foreground font-mono mb-10">
                // Zero Trust · CIS Controls · NIST Framework · Defense in Depth
              </p>
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
              key={p.slug}
              to="/projects"
              className="group border border-border rounded-lg p-6 bg-card hover:border-primary/50 transition-all ae-card-glow block"
            >
              <h4 className="font-mono font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{t}</span>
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
            { title: 'Zero Trust Architecture', points: ['Never trust, always verify', 'Least-privilege access', 'Micro-segmentation', 'Continuous monitoring'] },
            { title: 'CIS Controls v8', points: ['Inventory & asset control', 'Data protection', 'Secure configuration', 'Audit log management'] },
            { title: 'NIST Framework', points: ['Identify → Protect → Detect', 'Respond & Recover cycles', 'Risk-based prioritization', 'Continuous improvement'] },
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
            From network redesigns to full security stack deployments — submit a service request and let's build it right.
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
