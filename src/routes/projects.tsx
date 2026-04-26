import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { marked } from 'marked'
import { useState } from 'react'
import { Shield, Cloud, Wifi, ChevronDown, ChevronRight, AlertTriangle, CheckCircle, Target, BookOpen, Download, ExternalLink } from 'lucide-react'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

const projectDetails = [
  {
    id: 'zero-trust-network',
    icon: Shield,
    color: 'text-cyan-400',
    title: 'Zero Trust Network',
    subtitle: 'End-to-end Zero Trust architecture for a distributed organization',
    tags: ['Tailscale', 'Fortinet', 'Wazuh', 'CIS Controls', 'Authelia', 'OIDC'],
    status: 'Production',
    overview: `Complete Zero Trust Network Access (ZTNA) implementation replacing legacy perimeter-based VPN with identity-aware, device-posture-checked access. Covers corporate headquarters, remote branch offices, and work-from-home employees.`,
    problem: `The organization relied on a traditional hub-and-spoke VPN that granted broad network access once authenticated. Lateral movement risk was high, logging was minimal, and there was no device health enforcement. A compromised credential equated to full network access.`,
    architecture: `Identity Provider (Keycloak)
         │  OIDC/SAML
    ┌────┴──────────────────────┐
    │     Tailscale Control Plane │
    │     Access Policy Engine    │
    └────┬──────────────────────┘
         │  Encrypted mesh (WireGuard)
   ┌─────┼─────────┬──────────────┐
   │     │         │              │
HQ Site  Branch  Remote    Cloud workloads
  │      │       Workers        │
  └──────┴──────────┴────────────┘
         Wazuh agents on all nodes
         Continuous posture checks`,
    steps: [
      'Deployed Keycloak as identity provider with LDAP backend and hardware MFA',
      'Replaced site VPNs with Tailscale mesh — zero open inbound ports',
      'Defined ACL policies: default-deny, explicit allow per role and resource',
      'Deployed Authelia reverse proxy for app-level authentication',
      'Rolled out Wazuh agents across all endpoints for continuous monitoring',
      'Migrated DNS to split-horizon with MagicDNS for service discovery',
    ],
    challenges: [
      'Legacy applications relying on IP-based access controls required wrapper proxies',
      'User training for hardware MFA rollout (YubiKeys for privileged users)',
      'Coordinating simultaneous VPN cutover across 4 sites without downtime',
    ],
    outcomes: [
      'Eliminated perimeter VPN — attack surface reduced by ~80%',
      'Full device posture enforcement: non-compliant devices auto-blocked',
      'All access logged and correlated in Wazuh SIEM',
      'CIS Controls IG1 and IG2 fully implemented and documented',
    ],
  },
  {
    id: 'hybrid-cloud',
    icon: Cloud,
    color: 'text-violet-400',
    title: 'Hybrid Cloud Infrastructure',
    subtitle: 'Akamai Connected Cloud + on-premises KVM with unified management',
    tags: ['Akamai', 'KVM', 'Proxmox', 'Terraform', 'Ansible', 'Zabbix', 'Ceph'],
    status: 'Production',
    overview: `Hybrid cloud platform combining a 3-node Proxmox/KVM cluster for primary workloads with Akamai Connected Cloud (Linode) for burst capacity, edge nodes, and object storage. Fully managed via Terraform and Ansible, with Zabbix providing unified observability.`,
    problem: `Organisation ran an aging VMware environment with no cloud integration, manual VM provisioning (tickets + weeks of wait), no disaster recovery automation, and monitoring gaps. Scaling was constrained by on-prem hardware limits.`,
    architecture: `┌──────────────────────────────────────────────────┐
│              On-Premises (Primary)                │
│  Proxmox Cluster (3 nodes, HA)                    │
│  ├─ Ceph RBD (30TB usable, 3x replication)        │
│  ├─ OVS networking (VLAN-backed VM networks)      │
│  └─ KVM guests: databases, internal services      │
└─────────────────┬────────────────────────────────┘
                  │  IPsec VPN (redundant)
┌─────────────────┴────────────────────────────────┐
│              Akamai Connected Cloud               │
│  ├─ Edge nodes (3 regions) — public-facing apps   │
│  ├─ Object storage (S3-compatible backups)        │
│  └─ Burst VMs (auto-provisioned via Terraform)    │
└──────────────────────────────────────────────────┘
           Zabbix unified monitoring ↑`,
    steps: [
      'Migrated VMware workloads to Proxmox — zero-downtime using storage live migration',
      'Built Ceph cluster across 3 nodes with NVMe journals and SAS data drives',
      'Wrote Terraform provider configs for Proxmox and Akamai/Linode resources',
      'Created Ansible roles for base OS hardening, monitoring agent, and app deployment',
      'Established IPsec tunnels between on-prem and Akamai regions',
      'Configured Zabbix with auto-discovery and custom dashboards for hybrid view',
    ],
    challenges: [
      'Ceph rebalancing during node additions caused temporary IOPS degradation',
      'Terraform Proxmox provider instability required custom wrapper scripts',
      'IPsec key rotation without disrupting active tunnel sessions',
    ],
    outcomes: [
      'VM provisioning time reduced from 2 weeks to under 5 minutes',
      'RTO improved from >4 hours to <30 minutes with automated DR runbooks',
      'Unified observability across on-prem and cloud in single Zabbix instance',
      'Infrastructure fully version-controlled — all changes via Git MR',
    ],
  },
  {
    id: 'secure-remote-access',
    icon: Wifi,
    color: 'text-emerald-400',
    title: 'Secure Remote Access with Tailscale',
    subtitle: 'VPN-less remote access mesh with centralized access control',
    tags: ['Tailscale', 'Nextcloud', 'Passbolt', 'MFA', 'Exit Nodes', 'ACLs'],
    status: 'Production',
    overview: `Modern remote access platform replacing traditional IPsec VPN with Tailscale WireGuard mesh. Integrated with self-hosted Nextcloud for file collaboration and Passbolt for team credential management — all access gated by device identity and MFA.`,
    problem: `Legacy SSL VPN solution required split-tunneling configuration per device, had no device health checks, offered no visibility into resource access, and was a single point of failure. Remote workers experienced high latency for cloud-hosted resources.`,
    architecture: `Remote Device (any OS)
   └─ Tailscale agent
          │ WireGuard (UDP)
          ▼
   Tailscale Control Plane
   ├─ ACL policy evaluation
   ├─ Device posture check
   └─ MagicDNS resolution
          │
   ┌──────┴───────────────────┐
   │  Internal Resources       │
   ├─ Nextcloud (files/collab) │
   ├─ Passbolt (passwords)     │
   ├─ Gitea (code repos)       │
   ├─ Internal dashboards      │
   └─ Exit node → internet     │
   └───────────────────────────┘
   All access logged + Wazuh correlated`,
    steps: [
      'Deployed Tailscale on all endpoints (Windows, macOS, Linux, iOS/Android)',
      'Defined role-based ACLs: developers, ops, read-only, admin with tag-based rules',
      'Configured exit nodes for regions requiring traffic inspection',
      'Deployed Passbolt self-hosted with team collections and emergency access',
      'Integrated Nextcloud with LDAP for SSO and share access auditing',
      'Enabled Tailscale audit logs forwarded to Wazuh for SIEM correlation',
    ],
    challenges: [
      'NAT traversal edge cases with some double-NAT home networks required DERP relay tuning',
      'Migrating team credentials from legacy password spreadsheets to Passbolt',
      'Nextcloud performance tuning for large file sync (chunked upload configuration)',
    ],
    outcomes: [
      'VPN client eliminated — zero user-facing VPN configuration required',
      'Latency for cloud resources improved by 40-60% (direct WireGuard paths)',
      'All credential sharing now audited via Passbolt activity logs',
      'Remote access incidents reduced to zero in first 6 months post-deployment',
    ],
  },
]

const detailMap = Object.fromEntries(projectDetails.map((project) => [project.title, project]))

type ContentProject = (typeof allProjects)[number]
type ProjectWithDetails = ContentProject & { details: typeof projectDetails[0] }

function ProjectCard({ project }: { project: ProjectWithDetails }) {
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'architecture' | 'steps' | 'outcomes'>('architecture')
  const Icon = project.details.icon

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden ae-card-glow">
      <button
        className="w-full text-left p-6 flex items-start gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <Icon className={`${project.details.color} mt-0.5 shrink-0`} size={22} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-1">
            <h3 className="font-mono font-semibold text-foreground">{project.title}</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono shrink-0">{project.details.status}</span>
              {expanded ? <ChevronDown size={16} className="text-muted-foreground shrink-0" /> : <ChevronRight size={16} className="text-muted-foreground shrink-0" />}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{project.details.subtitle}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{t}</span>
            ))}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border">
          {/* Overview */}
          <div className="p-6 pb-0">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.details.overview}</p>
            <div className="border border-border rounded-lg p-4 bg-background/50 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono text-amber-400 mb-1">Problem Statement</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.details.problem}</p>
                </div>
              </div>
            </div>
            <div className="border border-border rounded-lg p-4 bg-background/50 mb-4">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Repository Summary</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{project.description}</p>
              <div
                className="prose-ae text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: marked(project.content) }}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 mb-0">
            <div className="flex gap-1 border-b border-border">
              {(['architecture', 'steps', 'outcomes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-mono capitalize transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab === 'steps' ? 'Implementation' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'architecture' && (
              <pre className="text-xs font-mono text-primary/90 bg-background/60 border border-border rounded p-4 overflow-x-auto leading-relaxed whitespace-pre">
                {project.details.architecture}
              </pre>
            )}
            {activeTab === 'steps' && (
              <ol className="space-y-3">
                {project.details.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="font-mono text-xs text-primary shrink-0 mt-0.5 w-5">{String(i + 1).padStart(2, '0')}.</span>
                    {s}
                  </li>
                ))}
              </ol>
            )}
            {activeTab === 'outcomes' && (
              <div className="space-y-4">
                <ul className="space-y-2">
                  {project.details.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      {o}
                    </li>
                  ))}
                </ul>
                <div className="border border-border rounded p-4 bg-background/50">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Challenges Encountered</p>
                  <ul className="space-y-2">
                    {project.details.challenges.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Target size={14} className="text-amber-400 shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Projects() {
  const projects = allProjects
    .map((project) => {
      const details = detailMap[project.title]

      if (!details) {
        return null
      }

      return {
        ...project,
        details,
      }
    })
    .filter((project): project is ProjectWithDetails => project !== null)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Portfolio</p>
        <h1 className="text-3xl font-bold font-mono text-foreground mb-3">Projects</h1>
        <p className="text-muted-foreground max-w-xl">
          Real-world implementations with full architecture documentation, implementation notes, and measured outcomes.
        </p>
      </div>

      <section className="mb-10 border border-primary/20 rounded-xl bg-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Architecture Artifact</p>
          <h2 className="text-2xl font-bold font-mono text-foreground mb-3">AE Infrastructure Network Diagram</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            Imported from the supplied `draw.io` PDF. The diagram maps a hybrid environment with dual WAN uplinks,
            Cisco edge redundancy, segmented VLANs, FortiGate and pfSense firewalls, Tailscale overlay networking,
            and identity services running across Dell-based virtualization hosts.
          </p>
        </div>

        <div className="p-6 grid gap-6 lg:grid-cols-[1.3fr_0.9fr] items-start">
          <a
            href="/AEinfranetwork-drawio-1.2.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-border rounded-lg overflow-hidden bg-background/40 hover:border-primary/40 transition-colors"
          >
            <img
              src="/aeinfra-network-diagram.png"
              alt="AE infrastructure network diagram"
              className="w-full h-auto"
            />
          </a>

          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Key Observations</h3>
              <ul className="space-y-2">
                {[
                  'Dual ISP edge with Cisco ISR4331 routers and HSRP virtual gateway at 192.168.100.1.',
                  'Security boundary includes both FortiGate and pfSense, with cloud VPN links and Tailscale overlay addresses in the 100.x range.',
                  'Segmentation is present across management and service VLANs, including 10, 20, 30 and 142 with 802.1Q subinterfaces.',
                  'Core internal services include FreeIPA, Keycloak, CoreDNS, Passbolt, PostgreSQL and Prometheus.',
                  'Compute appears to run on Dell R440 and R630 infrastructure with bridge-backed KVM/libvirt networking.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/network-diagram"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded font-mono text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <BookOpen size={14} />
                Full Analysis
              </Link>
              <a
                href="/AEinfranetwork-drawio-1.2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-border text-foreground rounded font-mono text-sm hover:border-primary hover:text-primary transition-colors"
              >
                <Download size={14} />
                Open PDF
              </a>
              <a
                href="/aeinfra-network-diagram.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-border text-foreground rounded font-mono text-sm hover:border-primary hover:text-primary transition-colors"
              >
                <ExternalLink size={14} />
                Open Preview
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {projects.map((p) => (
          <ProjectCard key={p._meta.path} project={p} />
        ))}
      </div>
    </div>
  )
}
