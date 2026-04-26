---
title: "Zero Trust Architecture: From Theory to Production"
date: "2026-02-10"
summary: "A practical walkthrough of implementing Zero Trust Network Access for a distributed organization — lessons learned, tooling choices, and what actually works."
tags: ["Zero Trust", "Tailscale", "Networking", "Security"]
author: "Automata Engineer"
---

## Why Zero Trust?

The perimeter model is dead. Once an attacker (or a misconfigured service) is inside your network, traditional security gives them enormous lateral movement capability. Zero Trust inverts this: **never trust, always verify** — regardless of whether traffic is inside or outside the corporate network.

## The Stack We Chose

After evaluating several options, the production stack landed on:

- **Tailscale** for mesh connectivity (WireGuard under the hood)
- **Keycloak** as the identity provider (OIDC/SAML)
- **Authelia** as an application-level reverse proxy with MFA
- **Wazuh** for continuous monitoring and posture assessment

## Key Lessons

### 1. Start with Identity
Before touching the network, get identity right. Deploy your IdP, enforce MFA, and build your LDAP/AD integration. Everything else depends on this.

### 2. Default-Deny ACLs
In Tailscale, the default posture should be deny-all with explicit allows. Model your ACLs around service tags, not IP addresses.

```json
{
  "acls": [
    { "action": "accept", "src": ["tag:developer"], "dst": ["tag:dev-server:22,443"] },
    { "action": "accept", "src": ["tag:ops"], "dst": ["*:*"] }
  ]
}
```

### 3. Migrate Incrementally
Don't cut VPN on day one. Run both in parallel, migrate workloads, validate, then decommission the old VPN.

## Outcomes

After 6 months in production: zero unauthorized access incidents, full device posture enforcement, and all access logged in the SIEM. The attack surface reduction alone justified the migration.
