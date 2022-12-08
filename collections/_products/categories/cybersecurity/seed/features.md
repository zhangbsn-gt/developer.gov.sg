---
title: SEED Features
layout: layout-page-sidenav
description: Features provided by SEED.
single_level_nav: true
_data: single-level-nav
---

SEED comprises the following components:

### TechPass 
TechPass is an IAM solution that is equipped with Single Sign On (SSO). It taps on Azure Active Directory, which is an enterprise identity service from Microsoft.

It complies with the [Government Instruction Manual for ICT&SS Management](https://www.developer.tech.gov.sg/guidelines/standards-and-best-practices/instruction-manual-for-ict-ss-management.html){:target="_blank"}(also known as IM8). It utilises popular open standards [OAuth 2.0](https://oauth.net/2/){:target="_blank"}, [OpenID Connect](https://openid.net/connect/){:target="_blank"}, and Security Assertion Markup Language 2.0 for authentication and authorisation processes.

The benefits of TechPass include:

- For product owners:
  - Simplified IAM solution with easy integration and without procurement complexities
  - Ready-to-use: Reduce time-to-market before your product or service goes live
  - The [TechPass portal](https://portal.techpass.gov.sg/public/home){:target="_blank"} lets you conveniently manage users.

- For users:
  - With SSO, users can enjoy convenient access to multiple developer services while only signing in once
  - Users can retrieve access logs to validate sessions

### Cloudflare Teams
Cloudflare Teams comprises of Cloudflare WARP, Cloudflare Gateway and Cloudflare Access. It is a security platform that enforces Zero trust network access, making connections to the Internet and applications faster and safer.

Cloudflare WARP is a replacement for traditional VPN clients. Cloudflare WARP will route a device's traffic requests to Cloudflare for layer 7 traffic filtering and provide device attestation information during authentication to GCC 2.0 and SGTS services.

Users will need the Cloudflare WARP client authenticated against Cloudflare for Teams and Tanium to log into GCC 2.0 and SGTS.

### DEEP (Development Environment Endpoint Posture)
DEEP is the device management layer of the Mobile Device Management (MDM) platform. It establishes a robust security baseline automatically and prevents insecure or compromised devices from accessing engineering resources.

DEEP manages the following:
- Microsoft Intune – Provides device and application management, including remote application deployment and selective device wipe 
- MDATP (Microsoft Defender Advanced Threat Prevention) – Enterprise-class vulnerability management, threat detection and response security solution
- Tanium – Endpoint assets and posture management. Tanium Works with Cloudflare to ensure posture-based conditional access

