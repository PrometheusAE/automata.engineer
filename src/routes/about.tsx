import { createFileRoute } from '@tanstack/react-router'
import { Award, Code2, Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/about')({
  component: About,
})

const certifications = [
  { name: 'CompTIA Security+', issuer: 'CompTIA', year: '2022', status: 'Active' },
  { name: 'CompTIA Network+', issuer: 'CompTIA', year: '2021', status: 'Active' },
  { name: 'Fortinet NSE 4', issuer: 'Fortinet', year: '2023', status: 'Active' },
  { name: 'CIS Controls v8 Implementation', issuer: 'CIS', year: '2023', status: 'Active' },
  { name: 'Tailscale Certified Admin', issuer: 'Tailscale', year: '2024', status: 'Active' },
  { name: 'Proxmox VE Administrator', issuer: 'Proxmox', year: '2023', status: 'Active' },
]

const techStack: { category: string; items: string[] }[] = [
  { category: 'Networking', items: ['Fortinet FortiGate', 'Cisco IOS/NX-OS', 'pfSense/OPNsense', 'VyOS', 'BGP/OSPF', 'VLAN/802.1Q'] },
  { category: 'Security', items: ['Wazuh SIEM/XDR', 'Suricata IDS', 'OpenVAS', 'Fail2ban', 'Authelia', 'CIS Controls v8'] },
  { category: 'Cloud & Virt', items: ['Proxmox VE', 'KVM/QEMU', 'Akamai Connected Cloud', 'Ceph Storage', 'Docker', 'LXC'] },
  { category: 'IAM', items: ['Tailscale', 'Keycloak', 'FreeIPA', 'Passbolt', 'HashiCorp Vault', 'YubiKey/TOTP'] },
  { category: 'Automation', items: ['Terraform', 'Ansible', 'Python', 'Bash', 'GitLab CI/CD', 'Gitea/Woodpecker'] },
  { category: 'Observability', items: ['Zabbix', 'Prometheus', 'Grafana', 'Netbox', 'ELK Stack'] },
]

const experience = [
  {
    title: 'Senior Network & Security Engineer',
    company: 'Automata Systems',
    period: '2022 — Present',
    summary: 'Lead architect for Zero Trust network transformation. Designed and deployed hybrid cloud infrastructure, SIEM/XDR platform, and organization-wide CIS Controls implementation.',
    tags: ['Fortinet', 'Tailscale', 'Wazuh', 'Proxmox', 'Terraform'],
  },
  {
    title: 'Network Engineer',
    company: 'Infrastructure Works Ltd.',
    period: '2019 — 2022',
    summary: 'Managed multi-site enterprise networks across 8 locations. Implemented SD-WAN overlay, network access control, and first-generation SIEM deployment.',
    tags: ['Cisco', 'FortiGate', 'OSPF', '802.1X', 'Splunk'],
  },
  {
    title: 'Systems Administrator',
    company: 'TechBase Solutions',
    period: '2017 — 2019',
    summary: 'Linux and Windows server administration, virtualization (VMware ESXi), backup management, and network monitoring.',
    tags: ['Linux', 'VMware', 'Bash', 'Zabbix', 'Active Directory'],
  },
]

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Profile</p>
        <h1 className="text-3xl font-bold font-mono text-foreground mb-3">About</h1>
      </div>

      {/* Profile summary */}
      <div className="border border-border rounded-lg p-6 bg-card mb-8">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 overflow-hidden">
            <img src="/logo.png" alt="Automata Engineer" className="w-full h-full object-contain p-1" />
          </div>
          <div>
            <h2 className="font-mono font-bold text-xl text-foreground mb-1">Automata Engineer</h2>
            <p className="text-sm text-primary font-mono mb-3">Network · Cybersecurity · Cloud Infrastructure</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Engineering professional specializing in enterprise networking, cybersecurity architecture, and hybrid cloud infrastructure.
              7+ years designing and operating resilient systems with a philosophy rooted in Zero Trust principles, CIS Controls,
              and NIST frameworks. Passionate about automation, measurable security outcomes, and self-hosted infrastructure.
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <section className="mb-10">
        <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Engineering Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Zero Trust',
              body: 'Trust no user, device, or network by default. Every access request is authenticated, authorized, and continuously verified regardless of network location.',
              color: 'text-cyan-400',
            },
            {
              title: 'CIS Controls',
              body: 'Prioritize security actions by impact. CIS Controls v8 provides a prescriptive, measurable roadmap from basic hygiene to advanced security operations.',
              color: 'text-emerald-400',
            },
            {
              title: 'NIST CSF',
              body: 'Structure security programs around Identify, Protect, Detect, Respond, and Recover. Risk-based decision making at every layer of the stack.',
              color: 'text-violet-400',
            },
          ].map(({ title, body, color }) => (
            <div key={title} className="border border-border rounded-lg p-5 bg-card">
              <h3 className={`font-mono font-semibold text-sm mb-2 ${color}`}>{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-10">
        <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Experience</h2>
        <div className="space-y-4">
          {experience.map((job) => (
            <div key={job.title} className="border border-border rounded-lg p-5 bg-card">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-mono font-semibold text-foreground text-sm">{job.title}</h3>
                  <p className="text-xs text-muted-foreground">{job.company}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground shrink-0 border border-border px-2 py-0.5 rounded">{job.period}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{job.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {job.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-10">
        <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {certifications.map((cert) => (
            <div key={cert.name} className="border border-border rounded-lg p-4 bg-card flex items-center gap-3">
              <Award className="text-primary shrink-0" size={18} />
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm text-foreground font-medium truncate">{cert.name}</p>
                <p className="text-xs text-muted-foreground">{cert.issuer} · {cert.year}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 font-mono shrink-0">{cert.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-10">
        <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techStack.map(({ category, items }) => (
            <div key={category} className="border border-border rounded-lg p-4 bg-card">
              <h3 className="text-xs font-mono text-primary uppercase tracking-wider mb-3">{category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CV Download CTA */}
      <div className="border border-primary/20 rounded-lg p-6 bg-primary/5 text-center">
        <Code2 className="text-primary mx-auto mb-3" size={24} />
        <h3 className="font-mono font-semibold text-foreground mb-2">Full Technical CV</h3>
        <p className="text-sm text-muted-foreground mb-4">Download the complete CV with detailed project history, architecture diagrams, and references.</p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded font-mono text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Download size={14} />
          Request CV
        </a>
      </div>
    </div>
  )
}
