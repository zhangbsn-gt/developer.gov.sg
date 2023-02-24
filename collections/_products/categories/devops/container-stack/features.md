---
title: Container Stack Features
layout: layout-page-sidenav
description: Features provided by Container Stack
single_level_nav: true
_data: single-level-nav
---

### Compliance with the Singapore Government’s IM policies

CStack is compliant with the Singapore Government’s Application Infrastructure Architecture Standard (AIAS) and the [Instruction Manual for ICT&SS Management](/guidelines/standards-and-best-practices/instruction-manual-for-ict-ss-management.html){:target="_blank"} policies. CStack adopts a tiered architecture by default (web, app, data) and is designed to comply with the relevant policies related to infrastructure, applications, and containers. Using CStack as your application platform will save you time when you carry out compliance audits related to these sections.

### Managed platform for internet and intranet applications 

With CStack, you can deploy your applications on the internet or intranet. With CStack GEN routable clusters, whitelisting your egress firewalls to the platform ingress will allow end users to access your applications.

### Integration with SGTS products for end-to-end development workflow/tooling  

CStack is integrated with [SHIP-HATS](/products/categories/devops/ship-hats/){:target="_blank"} for source code management and Continuous Integration/Continuous Development (CI/CD) automation. Application logs from your containers will be exported to [StackOps](/products/categories/devops/stackops/){:target="_blank"} so you can benefit from centralised monitoring. All the components of CStack are available using SSO via TechPass and connectivity via [SEED](/products/categories/cybersecurity/seed/){:target="_blank"}.

### Out-of-the-box CI pipeline for building, scanning and signing container images

CStack ships with a base CI pipeline out-of-the-box to get your CI/CD started from day one. Our pipeline ensures that your container images are scanned and signed to protect you from software supply chain threats.

### GitOps built-in to automate/reconcile deployments on Kubernetes

CStack has GitOps built-in, which will miminimise any potential issues in managing drift and orphaned resources while working with Kubernetes. With GitOps, the CStack platform automatically checks your code repositories to reconcile runtime resources with your configuration code.

### Supports custom resource definitions to automate cloud resource configurations

CStack comes with custom resources that enable you to configure/deploy cloud services (e.g. S3, RDS) using custom Kubernetes manifests. Using CStack operators coupled with GitOps, the platform automates and reconciles the state of cloud services with the configuration code in your repositories. 

### Secure cluster communication that is compliant with Government Zero Trust Architecture (GZTA) using service mesh technologies

CStack provides an integrated and managed Service Mesh, which will reduce any potential issues in setting up Mutual Transport Layer Security (mTLS) for service-to-service communication. Instead of configuring and maintaining one yourself, just leverage the CStack platform to enable this for your team.

### Monitoring and troubleshooting applications via dashboards/logs and remote access to Kubernetes

From build to deployment, CStack provides all the necessary tools and automation. Once you launch your applications on CStack, you will want application logs made available to you. CStack pushes application logs to StackOps where you can search your logs from “managed dashboards” on CStack or StackOps. 
While running operations for your applications, you may also want to troubleshoot your deployment using kubectl. CStack provides a managed service that enables you to remotely connect from your developer machine to our clusters for the execution of Command Line Interface (CLI) commands.



