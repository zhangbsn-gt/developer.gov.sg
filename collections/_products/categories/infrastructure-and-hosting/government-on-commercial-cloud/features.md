---
title: Government on Commercial Cloud Features
layout: layout-page-sidenav
description: Features provided by Government on Commercial Cloud.
single_level_nav: true
_data: single-level-nav
---

### Simplified onboarding process
We have streamlined GCC 2.0's onboarding process and experience to ensure that it is on par with the standard industry practice. Users can onboard GCC 2.0 solely through their TechPass account. This effort has reduced the onboarding time from four weeks to less than a week. Simplified onboarding enables engineers to come on board quickly and start their development activities immediately.

### Automated workflows
The workflow for creating tenant accounts, Cloud Service Provider (CSP) accounts, and managing cloud users are automated in GCC 2.0, shortening the turnaround time and eliminating the need to create service requests. Furthermore, agencies need not apply for a dedicated single mail account for each cloud account now.

### Enhanced cybersecurity
Public officers can access government engineering resources from their GSIB devices. However, if they want to access these resources from their internet device, they need to onboard the device into Secure Engineering Environment Device Platform (SEED), to allow it to become a Government Managed Device (GMD). SEED provides greater visibility of the endpoints leading to continuous, real-time security posture analysis. It is a paradigm shift from the traditional perimeter-based security model to a Zero Trust model.

If a non-compliant device tries to access government engineering resources, SEED automatically revokes access for this device. End-to-end encryption is also available for the transactions between the GMD and the hosted service.

### Reduced cost
Strategies such as re-engineering the GCC platform to streamline GCC onboarding, automating the workflows of tenant account and CSP account provisions, and using cloud-native solutions have reduced overall expenses.

For example, in GCC 2.0, Jumphosts are replaced with cloud-native solutions such as Session Manager and Fleet Manager for Linux and Windows workloads. All these translate into higher productivity and cost savings in the workforce as engineers can now deliver services in a shorter turnaround time.

### Improved observability, auditability, and monitoring
GCC 2.0 adopts a Policy-as-Code approach. Thus, policies are defined, updated, shared and enforced as code. This means all resources provided, by default, will have a policy compliance check. 

GCC 2.0's compliance checking happens in real-time to check for security vulnerabilities. The Policy-as-Code defines the identity used to access your CSP console or dashboard. Cloudflare Access Control determines who can access government engineering resources by applying access control policies and replacing the need for VPNs.

### Continuous compliance
A light-touch approach towards cloud-native solutions is adopted. Native solutions such as [AWS Config](https://aws.amazon.com/config/){:target="_blank"} are used to achieve continuous compliance. By default, all the resources provisioned have a policy compliance check as well. By defining policies as codes, the latency in security assessments is reduced, making it possible to evaluate the compliance state of cloud workloads quickly and for resource configuration changes to be detected earlier. Services such as [EventBridge](https://aws.amazon.com/eventbridge/){:target="_blank"} also help to detect specific user activities.

### Remote administration
Native solutions from CSPs enable remote administrators to manage, access and troubleshoot cloud resources, including Elastic Compute Cloud instances and virtual machines. They provide a consistent way to gather operational insights, carry out routine management tasks, track your development, access test and production environments, and proactively act on events or active incidents.

For example, [AWS System Manager](https://aws.amazon.com/systems-manager/){:target="_blank"} with AWS Systems Manager Agent (SSM Agent) allows remote administration such as Secure Shell (SSH) terminal remote administration and Remote Desktop Protocol (RDP) remote adminisration with Fleet Manager, configuration management, patching operating systems, and the execution of Policy-as-Code inspections.   

### Continuous log export and retention capability
GCC 2.0 enables users to collate logs and findings from your cloud services and export them to a centralised location, such as the Log S3 bucket on the core login account. Authorised users from agencies can then access your cloud account logs and findings from this centralised location.


