---
title: "Self-Hosted Infrastructure Stack: The Full Picture"
date: "2026-01-20"
summary: "An overview of running a complete self-hosted infrastructure stack — from DNS and identity to monitoring and file sync — without relying on SaaS platforms."
tags: ["Self-Hosted", "Nextcloud", "Gitea", "Passbolt", "Privacy"]
author: "Automata Engineer"
---

## Why Self-Host?

Data sovereignty, cost control, and the ability to audit every component. For security-focused environments, knowing exactly where your data lives and who has access is non-negotiable.

## The Core Stack

| Service | Tool | Purpose |
|---------|------|---------|
| Identity | FreeIPA + Keycloak | LDAP, SSO, MFA |
| Passwords | Passbolt | Team credential management |
| Files | Nextcloud | File sync and collaboration |
| Code | Gitea | Git hosting, IaC repos |
| Monitoring | Zabbix + Wazuh | Infrastructure + security |
| DNS | Pi-hole + Unbound | Ad-block + recursive DNS |

## Key Architectural Decisions

### Everything Behind Tailscale
No public ports. Every service is accessible only via Tailscale mesh. The attack surface is a single WireGuard UDP port per device.

### LDAP-Backed Everything
FreeIPA provides central LDAP. All services authenticate against it. One account, one password, one MFA token.

### Backups First
Before deploying any service: define the backup strategy. Everything backs up to local Ceph snapshots + Akamai Object Storage (S3-compatible). Test restores monthly.

## The Honest Tradeoffs

Self-hosting takes time. Updates, certificate renewals, capacity planning — all yours. For a security professional, this is also the point: you understand every layer of your own infrastructure.
