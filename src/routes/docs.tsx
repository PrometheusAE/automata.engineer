import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { BookOpen, FileText, Terminal, AlertTriangle, Shield, ChevronRight, ChevronDown } from 'lucide-react'

export const Route = createFileRoute('/docs')({
  component: Docs,
})

type DocEntry = {
  title: string
  type: 'policy' | 'runbook' | 'guide' | 'troubleshoot' | 'control'
  tags: string[]
  content: string
}

type DocSection = {
  id: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
  title: string
  description: string
  entries: DocEntry[]
}

const docSections: DocSection[] = [
  {
    id: 'policies',
    icon: Shield,
    color: 'text-cyan-400',
    title: 'Policies & Standards',
    description: 'Organizational security policies aligned to CIS Controls v8 and NIST CSF.',
    entries: [
      {
        title: 'Acceptable Use Policy (AUP)',
        type: 'policy',
        tags: ['CIS IG1', 'User Access'],
        content: `## Purpose
Define acceptable use of organizational computing resources to protect information assets.

## Scope
Applies to all employees, contractors, and third parties with access to organization systems.

## Policy
- All systems must be used for legitimate business purposes only.
- Users must not attempt to bypass security controls or access unauthorized data.
- Passwords must meet complexity requirements (min 16 chars, MFA required for privileged accounts).
- Unencrypted sensitive data must not be stored on portable media or personal cloud services.

## Enforcement
Violations may result in access revocation, disciplinary action, or legal proceedings.

## Review Cycle
Annually or after significant security incidents.`,
      },
      {
        title: 'Password & Credential Management Policy',
        type: 'policy',
        tags: ['CIS 5', 'IAM', 'Passbolt'],
        content: `## Requirements
- All service accounts: unique credentials, stored in Passbolt team vaults.
- No shared credentials for privileged access (break-glass procedures documented separately).
- Passwords rotated every 90 days for privileged accounts; 180 days for service accounts.
- SSH keys: 4096-bit RSA or ED25519 only; passphrase required for all private keys.

## Tools
- **Passbolt** (self-hosted): team credential management, access auditing.
- **HashiCorp Vault**: dynamic secrets for CI/CD pipelines.

## Break-Glass Procedure
Sealed envelopes in physical safe. Dual-person integrity for access.`,
      },
      {
        title: 'Patch & Vulnerability Management Policy',
        type: 'policy',
        tags: ['CIS 7', 'Vulnerability', 'OpenVAS'],
        content: `## Patch SLAs
| Severity | Timeframe |
|---|---|
| Critical (CVSS ≥ 9.0) | 24 hours |
| High (CVSS 7.0–8.9) | 7 days |
| Medium (CVSS 4.0–6.9) | 30 days |
| Low | Next maintenance window |

## Scanning Schedule
- Weekly authenticated scans via OpenVAS/Greenbone.
- Scan results reviewed weekly by security team.
- Exceptions require documented business justification and compensating controls.`,
      },
    ],
  },
  {
    id: 'runbooks',
    icon: Terminal,
    color: 'text-emerald-400',
    title: 'Runbooks',
    description: 'Step-by-step operational procedures for routine and emergency tasks.',
    entries: [
      {
        title: 'Firewall Rule Change Runbook',
        type: 'runbook',
        tags: ['Fortinet', 'Change Management', 'FortiOS'],
        content: `## Prerequisites
- Change request approved in ticketing system.
- Maintenance window confirmed or emergency change authorized.

## Steps

### 1. Pre-change backup
\`\`\`bash
# FortiGate CLI backup via SSH
execute backup config management-station <filename>
\`\`\`

### 2. Validate change request
- Review source/destination, service, action, logging requirement.
- Confirm no overlap with existing rules.

### 3. Implement rule (FortiGate GUI or CLI)
\`\`\`bash
config firewall policy
  edit 0
    set name "CHANGE-TICKET-1234"
    set srcintf "inside"
    set dstintf "outside"
    set srcaddr "srv-web-01"
    set dstaddr "8.8.8.8/32"
    set action accept
    set schedule "always"
    set service "DNS"
    set logtraffic all
  next
end
\`\`\`

### 4. Test & verify
- Confirm traffic flows as expected.
- Check Wazuh for unexpected alerts.

### 5. Update documentation
- Netbox firewall rule register.
- Close change ticket with outcome notes.`,
      },
      {
        title: 'Incident Response Runbook — Ransomware',
        type: 'runbook',
        tags: ['IR', 'Ransomware', 'Wazuh', 'Containment'],
        content: `## Severity: P1 — Immediate Response

## Detection Indicators
- Wazuh alert: mass file extension changes.
- Unusual outbound traffic to unknown IPs.
- User reports of encrypted files with ransom note.

## Containment (first 15 minutes)
1. **Isolate** affected hosts: remove from network at switch port level.
   \`\`\`bash
   # Cisco switch
   interface GigabitEthernet0/X
     shutdown
   \`\`\`
2. **Preserve** memory snapshot if possible (Volatility compatible).
3. **Block** C2 IPs at FortiGate if identified.

## Eradication
4. Identify patient zero via Wazuh timeline.
5. Audit all accounts for credential exposure — force password reset.
6. Remove malware artifacts; restore from known-good backup.

## Recovery
7. Restore from last clean Ceph snapshot or backup.
8. Validate integrity before reconnecting to network.
9. Monitor restored systems with enhanced logging for 72 hours.

## Post-Incident
- Complete incident report within 5 business days.
- CIS Controls gap review.
- Schedule tabletop exercise within 30 days.`,
      },
    ],
  },
  {
    id: 'guides',
    icon: BookOpen,
    color: 'text-violet-400',
    title: 'Deployment Guides',
    description: 'Complete installation and configuration guides for key infrastructure components.',
    entries: [
      {
        title: 'Tailscale Deployment Guide',
        type: 'guide',
        tags: ['Tailscale', 'WireGuard', 'Zero Trust', 'ACLs'],
        content: `## Overview
Deploy Tailscale for Zero Trust mesh networking. This guide covers initial setup, ACL policy design, and exit node configuration.

## Installation (Linux)
\`\`\`bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up --authkey=<key> --advertise-tags=tag:server
\`\`\`

## ACL Policy (HuJSON)
\`\`\`json
{
  "tagOwners": {
    "tag:server":  ["autogroup:admin"],
    "tag:client":  ["autogroup:member"]
  },
  "acls": [
    {
      "action": "accept",
      "src":    ["tag:client"],
      "dst":    ["tag:server:443,22,80"]
    },
    {
      "action": "accept",
      "src":    ["autogroup:admin"],
      "dst":    ["*:*"]
    }
  ],
  "ssh": [
    {
      "action": "accept",
      "src":    ["autogroup:admin"],
      "dst":    ["tag:server"],
      "users":  ["autogroup:nonroot"]
    }
  ]
}
\`\`\`

## Exit Node Setup
\`\`\`bash
# On exit node host
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
sudo tailscale up --advertise-exit-node
\`\`\``,
      },
      {
        title: 'Wazuh SIEM Deployment Guide',
        type: 'guide',
        tags: ['Wazuh', 'SIEM', 'XDR', 'Agents'],
        content: `## Architecture
Central Wazuh Manager + Elasticsearch + Kibana (single-node for <50 agents; cluster for production).

## Manager Installation (Docker Compose)
\`\`\`bash
git clone https://github.com/wazuh/wazuh-docker.git
cd wazuh-docker/single-node
docker compose up -d
\`\`\`

## Agent Deployment (Linux)
\`\`\`bash
# Add Wazuh repo
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --dearmor -o /usr/share/keyrings/wazuh.gpg
echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | tee /etc/apt/sources.list.d/wazuh.list
apt update && apt install wazuh-agent

# Configure and register
WAZUH_MANAGER='<manager-ip>' WAZUH_AGENT_NAME='host01' apt install wazuh-agent
systemctl enable --now wazuh-agent
\`\`\`

## Critical Rules to Enable
- FIM (File Integrity Monitoring) on /etc, /bin, /usr
- Log analysis: auth.log, syslog, audit.log
- Vulnerability detection scanner
- CIS benchmark checks (optional module)`,
      },
    ],
  },
  {
    id: 'troubleshoot',
    icon: AlertTriangle,
    color: 'text-amber-400',
    title: 'Troubleshooting Guides',
    description: 'Diagnostic procedures and resolution steps for common infrastructure issues.',
    entries: [
      {
        title: 'Network Connectivity Troubleshooting',
        type: 'troubleshoot',
        tags: ['Networking', 'VLAN', 'Routing', 'Firewall'],
        content: `## Systematic Approach (OSI Bottom-Up)

### Layer 1 — Physical
\`\`\`bash
ip link show           # Check interface state
ethtool eth0           # Speed/duplex negotiation
\`\`\`

### Layer 2 — Data Link
\`\`\`bash
bridge fdb show        # MAC table
vconfig show           # VLAN membership (legacy)
ip -d link show        # VLAN details
\`\`\`

### Layer 3 — Network
\`\`\`bash
ip route show          # Routing table
ip route get 8.8.8.8   # Route for specific dest
traceroute -n 8.8.8.8  # Hop-by-hop trace
\`\`\`

### Firewall Check (FortiGate)
\`\`\`bash
# FortiGate debug flow (real-time packet trace)
diagnose debug flow filter addr <src-ip>
diagnose debug flow show function-name enable
diagnose debug enable
diagnose debug flow trace start 100
\`\`\`

### Common Issues
| Symptom | Likely Cause | Fix |
|---|---|---|
| VLAN traffic dropped | Native VLAN mismatch | Check trunk config both ends |
| Route not propagating | OSPF neighbor down | Check hello/dead timers, auth |
| Firewall implicit deny | Missing policy | Add explicit permit with logging |`,
      },
    ],
  },
  {
    id: 'cis',
    icon: FileText,
    color: 'text-rose-400',
    title: 'CIS Controls Implementation',
    description: 'Implementation notes for CIS Controls v8 mapped to tooling and evidence.',
    entries: [
      {
        title: 'CIS Controls v8 — Implementation Status',
        type: 'control',
        tags: ['CIS v8', 'Compliance', 'IG1', 'IG2'],
        content: `## Implementation Group 1 (Basic Cyber Hygiene)

| Control | Title | Status | Tool |
|---|---|---|---|
| CIS 1 | Inventory of Enterprise Assets | ✅ Done | Netbox |
| CIS 2 | Inventory of Software Assets | ✅ Done | Netbox + Wazuh |
| CIS 3 | Data Protection | ✅ Done | Policy + encryption |
| CIS 4 | Secure Configuration | ✅ Done | Ansible hardening |
| CIS 5 | Account Management | ✅ Done | FreeIPA + Passbolt |
| CIS 6 | Access Control Management | ✅ Done | RBAC + Tailscale ACLs |
| CIS 7 | Continuous Vulnerability Mgmt | ✅ Done | OpenVAS weekly |
| CIS 8 | Audit Log Management | ✅ Done | Wazuh + auditd |
| CIS 9 | Email & Web Browser Protection | 🔄 In Progress | DNS filtering |
| CIS 10 | Malware Defenses | ✅ Done | Wazuh XDR + ClamAV |
| CIS 11 | Data Recovery | ✅ Done | Ceph snapshots + S3 |
| CIS 12 | Network Infrastructure Mgmt | ✅ Done | Netbox + IaC |

## Implementation Group 2 (Additional Controls)

| Control | Title | Status | Tool |
|---|---|---|---|
| CIS 13 | Network Monitoring | ✅ Done | Zabbix + Suricata |
| CIS 14 | Security Awareness Training | 🔄 In Progress | KnowBe4 planned |
| CIS 16 | Application Software Security | 🔄 In Progress | SAST in CI/CD |
| CIS 17 | Incident Response Mgmt | ✅ Done | Runbooks + tabletop |`,
      },
    ],
  },
]

const typeLabels: Record<DocEntry['type'], string> = {
  policy: 'Policy',
  runbook: 'Runbook',
  guide: 'Guide',
  troubleshoot: 'Troubleshooting',
  control: 'Control',
}

const typeColors: Record<DocEntry['type'], string> = {
  policy: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5',
  runbook: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
  guide: 'text-violet-400 border-violet-400/30 bg-violet-400/5',
  troubleshoot: 'text-amber-400 border-amber-400/30 bg-amber-400/5',
  control: 'text-rose-400 border-rose-400/30 bg-rose-400/5',
}

function DocEntryCard({ entry }: { entry: DocEntry }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-lg bg-background/40 overflow-hidden">
      <button className="w-full text-left px-4 py-3 flex items-center gap-3" onClick={() => setOpen(!open)}>
        {open ? <ChevronDown size={14} className="text-muted-foreground shrink-0" /> : <ChevronRight size={14} className="text-muted-foreground shrink-0" />}
        <span className="font-mono text-sm text-foreground flex-1">{entry.title}</span>
        <span className={`text-xs px-2 py-0.5 rounded border font-mono ${typeColors[entry.type]}`}>{typeLabels[entry.type]}</span>
      </button>
      {open && (
        <div className="border-t border-border px-4 py-4">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {entry.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{t}</span>
            ))}
          </div>
          <div className="prose-ae text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(entry.content) }} />
        </div>
      )}
    </div>
  )
}

function renderSimpleMarkdown(md: string): string {
  return md
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre class="text-xs font-mono text-primary/90 bg-background/60 border border-border rounded p-3 overflow-x-auto my-3 whitespace-pre"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
    )
    .replace(/^## (.+)$/gm, '<h2 class="text-sm font-mono font-semibold text-foreground mt-4 mb-2">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider mt-3 mb-2">$1</h3>')
    .replace(/^\| (.+) \|$/gm, (match) => {
      const cells = match.split('|').filter((c) => c.trim() && c.trim() !== '---')
      if (!cells.length) return ''
      return `<div class="flex gap-4 font-mono text-xs py-1 border-b border-border/50">${cells.map((c) => `<span class="text-muted-foreground flex-1">${c.trim()}</span>`).join('')}</div>`
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="text-primary bg-background/60 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="text-muted-foreground ml-4 list-disc mb-1">$1</li>')
    .replace(/\n\n/g, '<br/>')
}

function SectionAccordion({ section }: { section: DocSection }) {
  const [open, setOpen] = useState(false)
  const Icon = section.icon

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        className="w-full text-left p-5 flex items-center gap-4 hover:bg-muted/30 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <Icon className={`${section.color} shrink-0`} size={20} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-mono font-semibold text-foreground">{section.title}</h3>
            {open ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
        </div>
      </button>
      {open && (
        <div className="border-t border-border p-4 space-y-2 bg-card/50">
          {section.entries.map((entry) => (
            <DocEntryCard key={entry.title} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}

function Docs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Knowledge Base</p>
        <h1 className="text-3xl font-bold font-mono text-foreground mb-3">Documentation</h1>
        <p className="text-muted-foreground max-w-xl">
          Policies, runbooks, deployment guides, and CIS Controls implementation documentation. Click any section to browse entries.
        </p>
      </div>

      <div className="space-y-3">
        {docSections.map((section) => (
          <SectionAccordion key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}
