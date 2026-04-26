import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, Lock, HardDrive, Activity, Key, Globe } from 'lucide-react'

export const Route = createFileRoute('/tools')({
  component: Tools,
})

const toolGroups = [
  {
    title: 'Security & Access',
    tools: [
      {
        name: 'Passbolt',
        description: 'Self-hosted password manager with team vaults, audit logs, and end-to-end encryption. GPG-based credential sharing with RBAC.',
        icon: Key,
        color: 'text-cyan-400',
        borderColor: 'border-cyan-400/20',
        bgColor: 'bg-cyan-400/5',
        tags: ['Password Manager', 'IAM', 'Self-Hosted'],
        url: '#',
        urlLabel: 'Open Passbolt',
        note: 'Internal network only — requires Tailscale access',
      },
      {
        name: 'Authelia',
        description: 'Single sign-on and two-factor authentication portal protecting internal web services. OIDC/SAML provider for service access.',
        icon: Lock,
        color: 'text-amber-400',
        borderColor: 'border-amber-400/20',
        bgColor: 'bg-amber-400/5',
        tags: ['SSO', 'MFA', '2FA', 'OIDC'],
        url: '#',
        urlLabel: 'Open Auth Portal',
        note: 'MFA required — TOTP or YubiKey',
      },
    ],
  },
  {
    title: 'Monitoring & Observability',
    tools: [
      {
        name: 'Zabbix',
        description: 'Enterprise network and infrastructure monitoring. Tracks 200+ hosts across on-premises and cloud, with custom dashboards and escalation policies.',
        icon: Activity,
        color: 'text-emerald-400',
        borderColor: 'border-emerald-400/20',
        bgColor: 'bg-emerald-400/5',
        tags: ['Monitoring', 'Alerting', 'SNMP', 'Network'],
        url: '#',
        urlLabel: 'Open Zabbix',
        note: 'Read-only access available — contact admin for write access',
      },
      {
        name: 'Wazuh',
        description: 'SIEM and XDR platform aggregating security events from all endpoints, firewalls, and cloud services. CIS Controls compliance dashboard included.',
        icon: Activity,
        color: 'text-rose-400',
        borderColor: 'border-rose-400/20',
        bgColor: 'bg-rose-400/5',
        tags: ['SIEM', 'XDR', 'Compliance', 'Alerts'],
        url: '#',
        urlLabel: 'Open Wazuh',
        note: 'Security team access — role-based dashboard assignment',
      },
    ],
  },
  {
    title: 'Collaboration & Storage',
    tools: [
      {
        name: 'Nextcloud',
        description: 'Self-hosted file sync and collaboration platform. Shared drives, real-time document editing, calendar, and contacts — no third-party cloud required.',
        icon: HardDrive,
        color: 'text-violet-400',
        borderColor: 'border-violet-400/20',
        bgColor: 'bg-violet-400/5',
        tags: ['File Sync', 'Collaboration', 'Self-Hosted', 'S3'],
        url: '#',
        urlLabel: 'Open Nextcloud',
        note: 'All users — LDAP credentials',
      },
      {
        name: 'Gitea',
        description: 'Lightweight self-hosted Git service for infrastructure-as-code, runbooks, and internal projects. CI/CD integration with Woodpecker CI.',
        icon: Globe,
        color: 'text-blue-400',
        borderColor: 'border-blue-400/20',
        bgColor: 'bg-blue-400/5',
        tags: ['Git', 'IaC', 'CI/CD', 'Self-Hosted'],
        url: '#',
        urlLabel: 'Open Gitea',
        note: 'Developers and ops — SSH key or HTTPS',
      },
    ],
  },
]

function Tools() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Services</p>
        <h1 className="text-3xl font-bold font-mono text-foreground mb-3">Tools & Services</h1>
        <p className="text-muted-foreground max-w-xl">
          Internal tools and dashboards. Most services require Tailscale network access and LDAP authentication.
        </p>
      </div>

      <div className="mb-8 border border-amber-400/20 rounded-lg p-4 bg-amber-400/5 flex items-start gap-3">
        <Lock size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-mono text-amber-400 font-semibold mb-1">Access Requirements</p>
          <p className="text-sm text-muted-foreground">All internal services require Tailscale connectivity and valid LDAP credentials. Connect to the Tailscale network before accessing any tool below.</p>
        </div>
      </div>

      <div className="space-y-8">
        {toolGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">{group.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.tools.map((tool) => {
                const Icon = tool.icon
                return (
                  <div
                    key={tool.name}
                    className={`border ${tool.borderColor} ${tool.bgColor} rounded-lg p-5 ae-card-glow flex flex-col`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Icon className={`${tool.color} mt-0.5 shrink-0`} size={20} />
                      <div>
                        <h3 className="font-mono font-semibold text-foreground text-sm">{tool.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{tool.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tool.tags.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{t}</span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <a
                        href={tool.url}
                        className={`inline-flex items-center gap-2 text-sm font-mono ${tool.color} hover:opacity-80 transition-opacity mb-2`}
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={14} />
                        {tool.urlLabel}
                      </a>
                      <p className="text-xs text-muted-foreground">{tool.note}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
