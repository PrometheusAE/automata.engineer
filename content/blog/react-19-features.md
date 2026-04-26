---
title: "CIS Controls v8: Practical IG1 Implementation Guide"
date: "2026-03-01"
summary: "How to implement CIS Controls Implementation Group 1 in a small-to-medium organization using open-source tools, without a dedicated security team."
tags: ["CIS Controls", "Hardening", "Compliance", "Wazuh", "OpenVAS"]
author: "Automata Engineer"
---

## What Is IG1?

CIS Controls v8 organizes 153 safeguards into three Implementation Groups. **IG1** is the minimum baseline — 56 safeguards considered essential cyber hygiene for any organization.

## The 5 Most Impactful IG1 Controls

### CIS 1 & 2: Asset Inventory
You can't protect what you don't know about. Deploy **Netbox** for network asset tracking and use Wazuh's asset discovery to auto-populate your inventory.

### CIS 4: Secure Configuration
Use Ansible roles to enforce CIS benchmark configurations on Linux hosts:

```bash
ansible-galaxy install devsec.hardening
```

Apply the `os_hardening` and `ssh_hardening` roles to every new server.

### CIS 5: Account Management
- No shared accounts
- Privileged accounts require MFA (YubiKey or TOTP)
- Service accounts in Passbolt with quarterly rotation

### CIS 7: Vulnerability Management
Weekly authenticated scans with **OpenVAS/Greenbone**. Anything CVSS ≥ 9.0 gets patched within 24 hours — documented in your change log.

### CIS 8: Audit Log Management
Central log aggregation in **Wazuh**. Enable `auditd` on all Linux hosts and forward to the manager. Retention: 90 days online, 1 year cold storage.

## Measuring Progress

Track your IG1 status in a simple spreadsheet or wiki page. Wazuh's SCA (Security Configuration Assessment) module can automate much of the evidence gathering.

Start with IG1. Get 100% before touching IG2. Measurable progress beats theoretical completeness.
