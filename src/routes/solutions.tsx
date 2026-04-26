import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Network, Shield, Cloud, Lock, Cpu, ChevronDown, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/solutions')({
  component: Solutions,
})

const domains = [
  {
    id: 'network',
    icon: Network,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-400/30',
    bgColor: 'bg-cyan-400/5',
    title: 'Network Infrastructure',
    tagline: 'Resilient, segmented, observable networks',
    description:
      'Design and deployment of enterprise network architectures with hardware firewalls, SD-WAN fabrics, dynamic routing, and full traffic visibility. Every network is engineered for performance, segmentation, and compliance.',
    technologies: ['Fortinet FortiGate', 'Cisco IOS/NX-OS', 'pfSense/OPNsense', 'VyOS', 'OSPF/BGP', 'VLAN/802.1Q', 'LACP Bonding', 'NetFlow/sFlow'],
    useCases: [
      'Multi-site WAN with SD-WAN failover and QoS',
      'VLAN micro-segmentation for server/IoT/guest isolation',
      'BGP peering for multi-provider redundancy',
      'Network access control (NAC) and 802.1X port security',
    ],
    architecture: `┌─────────────────────────────────────────┐
│             INTERNET / WAN                │
└────────────────┬────────────────────────┘
                 │  Dual ISP (BGP / ECMP)
         ┌───────┴────────┐
         │  FortiGate NGFW │  ← IPS/IDS, SSL Inspect
         └───────┬────────┘
                 │  VLAN Trunk (802.1Q)
    ┌────────────┼────────────┐
    │            │            │
 VLAN 10     VLAN 20      VLAN 30
 Servers    Workstations    IoT
    │            │            │
 [L3 Switch Core — OSPF Internal Routing]`,
  },
  {
    id: 'cybersecurity',
    icon: Shield,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-400/30',
    bgColor: 'bg-emerald-400/5',
    title: 'Cybersecurity',
    tagline: 'Defense-in-depth with measurable controls',
    description:
      'Full security stack implementation following CIS Controls v8 and NIST CSF. Includes SIEM/XDR deployment, vulnerability management, incident response playbooks, and continuous compliance monitoring.',
    technologies: ['Wazuh SIEM/XDR', 'Suricata IDS', 'OpenVAS/Greenbone', 'Fail2ban', 'CIS-CAT Pro', 'OSSEC', 'Lynis', 'Auditd'],
    useCases: [
      'SIEM deployment with alert triage and escalation workflows',
      'CIS Controls v8 Implementation Group 1/2 hardening',
      'Vulnerability scan scheduling and remediation tracking',
      'Incident response tabletop exercises and runbook creation',
    ],
    architecture: `┌──────────────────────────────────────┐
│         Security Operations           │
│  Wazuh Manager ← Agents (all hosts)   │
│  Suricata IDS  ← Network tap/span     │
└────────────────┬─────────────────────┘
                 │ Alerts / Events
         ┌───────┴────────┐
         │  Dashboards     │  Kibana / Grafana
         │  Runbooks       │  Confluence/Docs
         │  Ticketing      │  Incident queue
         └─────────────────┘`,
  },
  {
    id: 'cloud',
    icon: Cloud,
    color: 'text-violet-400',
    borderColor: 'border-violet-400/30',
    bgColor: 'bg-violet-400/5',
    title: 'Cloud & Virtualization',
    tagline: 'Hybrid infrastructure with IaC automation',
    description:
      'Hybrid cloud architectures combining on-premises KVM/Proxmox virtualization with cloud providers. Infrastructure-as-Code with Terraform and Ansible for repeatable, auditable deployments.',
    technologies: ['Proxmox VE', 'KVM/QEMU', 'Akamai Connected Cloud', 'Terraform', 'Ansible', 'Docker', 'Ceph Storage', 'Packer'],
    useCases: [
      'Hybrid cloud with on-prem KVM + Akamai burst capacity',
      'Terraform-managed VM lifecycle and network provisioning',
      'Ansible playbooks for OS hardening and app deployment',
      'Storage cluster with Ceph RBD and CephFS',
    ],
    architecture: `On-Premises               Cloud (Akamai)
┌─────────────────┐     ┌──────────────────┐
│  Proxmox Cluster │◄────►  Linode/Akamai   │
│  ├─ VM pool      │ VPN │  ├─ Edge nodes    │
│  ├─ Ceph storage │     │  ├─ Object store  │
│  └─ OVS network  │     │  └─ Load balancer │
└─────────────────┘     └──────────────────┘
       ↑ Terraform + Ansible IaC ↑`,
  },
  {
    id: 'iam',
    icon: Lock,
    color: 'text-amber-400',
    borderColor: 'border-amber-400/30',
    bgColor: 'bg-amber-400/5',
    title: 'Identity & Access Management',
    tagline: 'Least-privilege access with Zero Trust enforcement',
    description:
      'Comprehensive IAM deployments including self-hosted credential management, LDAP/AD integration, MFA enforcement, and Zero Trust access policies for internal services.',
    technologies: ['Passbolt (self-hosted)', 'FreeIPA / OpenLDAP', 'Authelia', 'Keycloak', 'YubiKey / TOTP', 'Tailscale ACLs', 'HashiCorp Vault', 'RBAC policies'],
    useCases: [
      'Self-hosted password manager with team vaults and audit logs',
      'SSO with Keycloak for internal services',
      'Hardware security key (YubiKey) MFA rollout',
      'LDAP-backed RBAC for Linux/network device access',
    ],
    architecture: `┌───────────────────────────────────┐
│         Identity Plane             │
│  Keycloak SSO ← LDAP/FreeIPA      │
│  ├─ SAML/OIDC → Internal apps     │
│  ├─ MFA (TOTP / YubiKey)          │
│  └─ Audit logs → Wazuh SIEM       │
└──────────────────┬────────────────┘
                   │ Access policies
         ┌─────────┴──────────┐
         │  Tailscale ACLs    │  Zero Trust mesh
         │  Authelia proxy    │  App-level MFA
         └────────────────────┘`,
  },
  {
    id: 'devops',
    icon: Cpu,
    color: 'text-rose-400',
    borderColor: 'border-rose-400/30',
    bgColor: 'bg-rose-400/5',
    title: 'Automation & DevOps',
    tagline: 'Infrastructure automation and CI/CD pipelines',
    description:
      'Automation-first approach to infrastructure management: GitOps workflows, CI/CD for infrastructure changes, automated compliance checks, and self-healing runbooks.',
    technologies: ['GitLab CI/CD', 'Ansible Tower/AWX', 'Python / Bash', 'Prometheus + Grafana', 'Zabbix', 'Netbox (IPAM)', 'n8n Automation', 'Gitea'],
    useCases: [
      'GitOps pipeline for Terraform/Ansible infrastructure changes',
      'Automated CIS benchmark scans on every deployment',
      'Prometheus alerting with PagerDuty/webhook escalation',
      'IPAM/DCIM with Netbox for full asset inventory',
    ],
    architecture: `Git Push → GitLab CI
         ↓
  ┌──────────────────┐
  │  Pipeline stages  │
  │  1. Lint/Validate │
  │  2. Plan (Terraform)│
  │  3. Ansible dry-run│
  │  4. Apply (gated) │
  │  5. CIS scan      │
  └──────────┬────────┘
             ↓
    Infrastructure updated
    Zabbix/Prometheus monitoring`,
  },
]

function SolutionCard({ domain }: { domain: typeof domains[0] }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = domain.icon

  return (
    <div className={`border ${domain.borderColor} rounded-lg ${domain.bgColor} overflow-hidden transition-all ae-card-glow`}>
      <button
        className="w-full text-left p-6 flex items-start gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <Icon className={`${domain.color} mt-0.5 shrink-0`} size={22} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-mono font-semibold text-foreground">{domain.title}</h3>
            {expanded ? <ChevronDown size={16} className="text-muted-foreground shrink-0" /> : <ChevronRight size={16} className="text-muted-foreground shrink-0" />}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{domain.tagline}</p>
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-border/50 pt-5 space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">{domain.description}</p>

          {/* Architecture diagram */}
          <div>
            <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Architecture Diagram</h4>
            <pre className="text-xs font-mono text-primary/90 bg-background/60 border border-border rounded p-4 overflow-x-auto leading-relaxed whitespace-pre">
              {domain.architecture}
            </pre>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {domain.technologies.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded border border-border text-muted-foreground font-mono bg-background/40">{t}</span>
              ))}
            </div>
          </div>

          {/* Use cases */}
          <div>
            <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Use Cases</h4>
            <ul className="space-y-2">
              {domain.useCases.map((uc) => (
                <li key={uc} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className={`${domain.color} font-mono text-xs mt-0.5 shrink-0`}>▸</span>
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

function Solutions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Catalog</p>
        <h1 className="text-3xl font-bold font-mono text-foreground mb-3">Solutions</h1>
        <p className="text-muted-foreground max-w-xl">
          Engineered solutions across five domains — click any domain to explore technical architecture, technologies, and real-world use cases.
        </p>
      </div>

      <div className="space-y-3">
        {domains.map((d) => (
          <SolutionCard key={d.id} domain={d} />
        ))}
      </div>
    </div>
  )
}
