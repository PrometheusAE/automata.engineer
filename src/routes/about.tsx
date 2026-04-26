import { createFileRoute } from '@tanstack/react-router'
import { allEducations, allJobs } from 'content-collections'
import { Award, Code2, Download } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: About,
})

const certifications = [
  { name: 'CompTIA Network+', issuer: 'CompTIA', year: '2021', status: 'Training' },
  { name: 'Network Security', issuer: 'Professional Development', year: '2023', status: 'Applied' },
  { name: 'Firewall Administration', issuer: 'Professional Development', year: '2023', status: 'Applied' },
  { name: 'CIS Controls Implementation', issuer: 'Professional Practice', year: '2025', status: 'Applied' },
  { name: 'SIEM with Wazuh + Zeek', issuer: 'Hands-on Lab', year: '2025', status: 'Applied' },
  { name: 'Home Lab Hybrid Infrastructure', issuer: 'Independent Practice', year: 'Current', status: 'Current' },
]

const techStack: { category: string; items: string[] }[] = [
  { category: 'Systems', items: ['Linux', 'Windows', 'macOS', 'Workstation Provisioning', 'Server Support', 'Backup Operations'] },
  { category: 'Support', items: ['Technical Troubleshooting', 'Microsoft 365', 'Outlook', 'Teams', 'SharePoint', 'OneDrive'] },
  { category: 'Identity', items: ['Entra ID', 'MFA', 'Account Provisioning', 'Mailbox Access', 'Permissions Support'] },
  { category: 'Networking', items: ['TCP/IP', 'Network Installation', 'Network Support', 'UDM-Pro', 'Cisco Routing', 'Firewall Basics'] },
  { category: 'Security', items: ['Wazuh', 'Zeek', 'CIS Controls', 'Security Monitoring', 'IT Emergency Response'] },
  { category: 'Automation & Lab', items: ['Bash', 'PowerShell', 'KVM', 'FreeIPA', 'FortiGate', 'pfSense', 'Nginx', 'OCI'] },
]

function About() {
  const experience = [...allJobs].sort((a, b) => Number(b.startDate) - Number(a.startDate))
  const education = [...allEducations].sort((a, b) => Number(b.startDate) - Number(a.startDate))

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
            <p className="text-sm text-primary font-mono mb-3">IT Support · Networking · Security Operations</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Experienced IT support analyst with a background in network administration, troubleshooting, and security-focused
              operational support across Linux, Windows, and macOS environments. The profile combines hands-on service desk and
              infrastructure experience with Microsoft 365, Entra ID, CIS Controls work, and an active home lab focused on secure
              hybrid infrastructure.
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
              body: 'Security should not depend on physical location alone. Access decisions need identity verification, least privilege, and practical controls that fit operational reality.',
              color: 'text-cyan-400',
            },
            {
              title: 'Operational Support',
              body: 'Reliable IT support starts with fast troubleshooting, clear communication, and solid documentation so recurring issues become easier to solve and prevent.',
              color: 'text-emerald-400',
            },
            {
              title: 'Continuous Learning',
              body: 'The home lab is where infrastructure, security, and automation skills are tested in practice before they are carried into production-facing work.',
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
            <div key={job._meta.path} className="border border-border rounded-lg p-5 bg-card">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-mono font-semibold text-foreground text-sm">{job.jobTitle}</h3>
                  <p className="text-xs text-muted-foreground">{job.company} · {job.location}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground shrink-0 border border-border px-2 py-0.5 rounded">
                  {job.startDate} — {job.endDate ?? 'Present'}
                </span>
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

      <section className="mb-10">
        <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Education & Training</h2>
        <div className="space-y-4">
          {education.map((entry) => (
            <div key={entry._meta.path} className="border border-border rounded-lg p-5 bg-card">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-mono font-semibold text-foreground text-sm">{entry.school}</h3>
                  <p className="text-sm text-muted-foreground">{entry.summary}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground shrink-0 border border-border px-2 py-0.5 rounded">
                  {entry.startDate}{entry.endDate ? ` — ${entry.endDate}` : ''}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {entry.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{tag}</span>
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
        <p className="text-sm text-muted-foreground mb-4">Request the full CV for detailed experience, training history, and references.</p>
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
