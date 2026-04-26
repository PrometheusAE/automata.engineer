import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle, Download, ExternalLink, Lock, Network, Router, Server, Shield, Workflow } from 'lucide-react'

export const Route = createFileRoute('/network-diagram')({
  component: NetworkDiagramPage,
})

const zones = [
  {
    title: 'WAN & Edge',
    icon: Network,
    color: 'text-cyan-400',
    border: 'border-cyan-400/30',
    bg: 'bg-cyan-400/5',
    summary:
      'The edge shows two ISP paths terminating on Cisco ISR4331 routers with HSRP providing a resilient virtual gateway at `192.168.100.1`.',
    points: [
      'ISP1 and ISP2 appear as separate upstream paths labeled `wan_isp1` and `wan_isp2`.',
      'Routers A and B suggest first-hop redundancy rather than a single firewall uplink.',
      'This design reduces dependence on one carrier and one hardware edge path.',
    ],
  },
  {
    title: 'Security Boundary',
    icon: Shield,
    color: 'text-emerald-400',
    border: 'border-emerald-400/30',
    bg: 'bg-emerald-400/5',
    summary:
      'FortiGate and pfSense both appear in the topology, which suggests layered security, segmented ingress paths, or a lab-plus-production split.',
    points: [
      'FortiGate is positioned near the WAN-facing segment around `192.168.100.10`.',
      'pfSense appears both as a LAN gateway and as a Tailscale-connected firewall/router node.',
      'Cloud VPN paths are explicitly represented, indicating controlled connectivity to hosted environments.',
    ],
  },
  {
    title: 'Segmentation & Switching',
    icon: Router,
    color: 'text-amber-400',
    border: 'border-amber-400/30',
    bg: 'bg-amber-400/5',
    summary:
      'The diagram exposes 802.1Q segmentation with multiple VLAN-backed bridges and switching infrastructure centered on Cisco gear.',
    points: [
      'VLANs 10, 20, 30 and 142 are visible with subinterfaces and bridge assignments.',
      'A Cisco Catalyst 3850 and a Cisco 1930 switch appear to anchor access and distribution roles.',
      'Bridge names like `br10`, `br20-direct`, `br30`, and `br142` imply direct mapping between host virtualization and VLAN domains.',
    ],
  },
  {
    title: 'Identity & Core Services',
    icon: Lock,
    color: 'text-violet-400',
    border: 'border-violet-400/30',
    bg: 'bg-violet-400/5',
    summary:
      'The internal service layer centers on identity, DNS, credentials, and application support for a Zero Trust-oriented environment.',
    points: [
      'FreeIPA, Keycloak, CoreDNS, Passbolt, and PostgreSQL are all called out explicitly.',
      'Service addressing suggests these run in protected internal segments rather than flat user networks.',
      'This is consistent with centralized identity, SSO, name resolution, and secrets management.',
    ],
  },
  {
    title: 'Compute & Overlay',
    icon: Server,
    color: 'text-rose-400',
    border: 'border-rose-400/30',
    bg: 'bg-rose-400/5',
    summary:
      'Dell R440 and R630 platforms appear to host KVM/libvirt workloads, while Tailscale overlay addresses bind remote, local, and cloud resources into one fabric.',
    points: [
      'The diagram references `KVM/LIVRT` and host L3 presence on `br10` with virtualization-aware networking.',
      'Overlay addresses in the `100.x` range indicate Tailscale nodes across workstations, services, and infrastructure.',
      'The note `tailscale0 -> host networking stack -> br10 -> 192.168.10.1` shows how overlay and local LAN routing are stitched together.',
    ],
  },
]

const findings = [
  'The environment is not just a brochure diagram; it shows real IP addressing, interface labels, bridge names, and host roles.',
  'The topology mixes traditional enterprise routing patterns with modern overlay access through Tailscale.',
  'Identity services are central to the design, which matches the rest of the site’s Zero Trust positioning.',
  'The diagram would benefit from explicit trust-zone labels and a legend if it is meant for external presentation.',
]

function NetworkDiagramPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden ae-grid-bg border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 py-18 md:py-24">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Dedicated Analysis</p>
              <h1 className="text-4xl md:text-6xl font-bold font-mono text-foreground leading-tight mb-4">
                Infrastructure
                <br />
                <span className="text-primary ae-glow">Network Diagram</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
                This page turns the supplied `draw.io` PDF into a web-readable artifact: diagram preview, zone-by-zone analysis,
                and architectural interpretation aligned with the rest of the portfolio.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href="/AEinfranetwork-drawio-1.2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded font-mono text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={15} />
                  Open Original PDF
                </a>
                <a
                  href="/aeinfra-network-diagram.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-border text-foreground rounded font-mono text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  <ExternalLink size={15} />
                  Open PNG Preview
                </a>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-border text-foreground rounded font-mono text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  <ArrowRight size={15} />
                  Back to Projects
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'ISPs', value: '2' },
                  { label: 'Routers', value: '2' },
                  { label: 'Visible VLANs', value: '4+' },
                  { label: 'Core Services', value: '6+' },
                ].map((item) => (
                  <div key={item.label} className="border border-border rounded-lg bg-card/70 px-4 py-3">
                    <p className="text-lg font-mono font-bold text-primary">{item.value}</p>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative border border-border rounded-2xl bg-card/60 p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
              <img
                src="/aeinfra-network-diagram.png"
                alt="AE infrastructure network diagram"
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute top-6 left-6 text-[11px] font-mono px-2 py-1 rounded border border-cyan-400/30 bg-background/85 text-cyan-400">
                Dual WAN / HSRP
              </div>
              <div className="absolute top-[38%] left-[54%] text-[11px] font-mono px-2 py-1 rounded border border-emerald-400/30 bg-background/85 text-emerald-400">
                Firewall Boundary
              </div>
              <div className="absolute bottom-8 left-[12%] text-[11px] font-mono px-2 py-1 rounded border border-violet-400/30 bg-background/85 text-violet-400">
                IAM + Core Services
              </div>
              <div className="absolute bottom-10 right-[10%] text-[11px] font-mono px-2 py-1 rounded border border-rose-400/30 bg-background/85 text-rose-400">
                KVM / Tailscale Overlay
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Zone Reading</p>
          <h2 className="text-2xl font-bold font-mono text-foreground">Architectural Interpretation</h2>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
          <div className="border border-border rounded-xl p-6 bg-card h-fit lg:sticky lg:top-20">
            <div className="flex items-center gap-3 mb-4">
              <Workflow className="text-primary" size={20} />
              <h3 className="font-mono font-semibold text-foreground">Traffic Narrative</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A likely path is: internet ingress through dual ISPs, failover or shared edge through Cisco routers, inspection or policy
              enforcement at FortiGate/pfSense, then segmented east-west routing into virtualization hosts and service VLANs.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Remote and cloud-connected assets are then normalized through Tailscale overlay routing, which reduces direct exposure
              and reinforces identity-aware access over simple network location trust.
            </p>
          </div>

          <div className="space-y-4">
            {zones.map((zone) => {
              const Icon = zone.icon

              return (
                <div key={zone.title} className={`border ${zone.border} ${zone.bg} rounded-xl p-6`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg border border-border bg-background/60 flex items-center justify-center shrink-0">
                      <Icon className={zone.color} size={18} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-mono font-semibold text-foreground mb-2">{zone.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{zone.summary}</p>
                      <ul className="space-y-2">
                        {zone.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle size={14} className={`${zone.color} shrink-0 mt-0.5`} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
        <div className="mb-10">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Assessment</p>
          <h2 className="text-2xl font-bold font-mono text-foreground">Technical Findings</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-xl p-6 bg-card">
            <h3 className="font-mono font-semibold text-foreground mb-4">What the Diagram Communicates Well</h3>
            <ul className="space-y-2">
              {findings.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border rounded-xl p-6 bg-card">
            <h3 className="font-mono font-semibold text-foreground mb-4">Recommended Next Refinements</h3>
            <ul className="space-y-2">
              {[
                'Add explicit trust zones: internet, DMZ, management, server, user, overlay, and cloud.',
                'Normalize naming between devices, VLANs, and service nodes to improve readability for external audiences.',
                'Separate physical topology from logical security flows into two diagrams if this will be used for documentation.',
                'Mask sensitive hostnames or addresses if the page is intended for public-facing publication.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
        <div className="border border-primary/20 rounded-xl p-8 bg-primary/5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Related Pages</p>
              <h2 className="text-2xl font-bold font-mono text-foreground mb-2">Continue Through the Stack</h2>
              <p className="text-sm text-muted-foreground max-w-2xl">
                This artifact now lives as a first-class page in the site and connects naturally to the solutions, tools,
                and implementation write-ups elsewhere in the portfolio.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-border text-foreground rounded font-mono text-sm hover:border-primary hover:text-primary transition-colors"
              >
                <Network size={14} />
                Solutions
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-border text-foreground rounded font-mono text-sm hover:border-primary hover:text-primary transition-colors"
              >
                <Server size={14} />
                Tools
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded font-mono text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <ArrowRight size={14} />
                Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
