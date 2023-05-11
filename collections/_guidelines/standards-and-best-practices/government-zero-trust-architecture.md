---
title: Government Zero Trust Architecture (GovZTA)
layout: layout-page-sidenav
redirect_from:
    - /guidelines/standards-and-best-practices/government-zero-trust-architecture.html
sub_collection_render: true
category: Standards & Best Practices
description: Government Zero Trust Architecture provides government agencies with a framework for adopting Zero Trust security practices. Find out more here!
---

![Header banner for Government Zero Trust Architecture by GovTech's Cyber Security Group](/assets/img/govzta-logo.png)

### Overview

The Government Zero Trust Architecture (GovZTA) provides a framework for the Singapore Government to implement Zero Trust, which is based on the core principle of "never trust, always verify."  

It is projected that organisations can lose up to USD10.5 trillion annually by 2025 due to cyber-attacks [(McKinsey, 2022)](https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/cybersecurity/new-survey-reveals-2-trillion-dollar-market-opportunity-for-cybersecurity-technology-and-service-providers){:target="_blank"}. The rise in cyber-attacks coupled with the Government’s ongoing digital transformation and move to a cloud-first strategy has underlined the importance of an enhanced cybersecurity framework. 

In alignment to this trend, GovZTA is developed as an architecture that assumes no user, application or device is trusted. Thus, constant verifications are needed to allow defenders to put in effective mitigation measures to limit the impact of attacks. This adopts a layered defense approach throughout the stages of a cyber kill chain.  

### Objective

The GovZTA aims to strengthen the Government’s cybersecurity posture while maintaining a balance between risks and usability. Through GovZTA, agencies can adopt a risk informed stance when enhancing user experience, speed of implementation strategies, and cyber resiliency. GovZTA also shortens threat detection timeframes and enhances the visibility of an agency’s assets. 

### Scope

The GovZTA provides an overarching Enterprise Security Architecture to guide the coherent development of applications, infrastructure, and cybersecurity controls. It covers all aspects of an agency’s digital estate (identity, infrastructure, systems, and applications) to ensure that trust is enforced and established under appropriate perimeters. 

<figure style="text-align: center">
  <img
    src="/assets/img/GovZTA-2-v2.png" 
    alt="Fig 1: Illustration of how the GovZTA enforces and establishes trust over all aspects of a digital estate."
  />
  <figcaption>Fig 1: Illustration of how the GovZTA enforces and establishes trust over all aspects of a digital estate.</figcaption>
</figure>

### Target Audience and Adoption Criteria

The GovZTA is applicable to all Government agencies as a part of our Government's digital transformation journey. Through enhancements to government infrastructure and upskilling of our officers, GovZTA will gradually be operationalised into the Government’s overarching digital estate.

### Standards, Guidelines and Assessment Criteria

The GovZTA is governed by four key principles (apply least privilege and enforce access control, limit lateral movement, integrate security automation and orchestration and, enhance detection and response) and their desired outcomes as shown in the table below. This ensures end-to-end security enforcement and departs from the traditional cybersecurity approach in defining network perimeters as either “trusted” or “untrusted”. 

<figure style="text-align: center">
  <img
    src="/assets/img/GovZTA-1-v3.png" 
    alt="Fig 2: Table of the four GovZTA principles."
  />
  <figcaption>Fig 2: Table of the four GovZTA principles.</figcaption>
</figure>

Guided by the four GovZTA principles, an implementation framework made up of five technical pillars (identity, devices, networks, applications, and data) and two enablers (visibility and automation, governance) was developed.  This framework (Fig. 3) provides the fundamental building block for agencies to implement a coordinated, harmonised, and prioritised Zero Trust model.   It incorporates various capabilities such as dynamic risk-based access control, central policy enforcement, identity-centric continuous validation and verification, software-defined security, automation and orchestration, full-stack monitoring, etc. to strengthen an agency’s overall defense.

<figure style="text-align: center">
  <img
    src="/assets/img/GovZTA-3-v2.png" 
    alt="Fig 3: The five pillars and two enablers of the GovZTA implementation framework."
  />
  <figcaption>Fig 3: The five pillars and two enablers of the GovZTA implementation framework.</figcaption>
</figure>

At the core of these capabilities is the “Zero Trust Engine”.  It comprises of two key components: the Policy Decision Point (PDP) or authority source, and the Policy Enforcement Point (PEP) or the gatekeeper. The PEP ensures that the subject is authentic, and the request is valid, by using judgments from the PDP before any access is granted as shown in Fig. 4 below.  Every connection or transaction within the network passes through this “Zero Trust Engine” for verification and validation.

<figure style="text-align: center">
  <img
    src="/assets/img/GovZTA-4-v2.png" 
    alt="Fig 4: Illustration of the roles of the PDP and PEP in the Zero Trust Engine."
  />
  <figcaption>Fig 4: Illustration of the roles of the PDP and PEP in the Zero Trust Engine.</figcaption>
</figure>

Unlike traditional security measures that strengthen the perimeter and provide individuals with persistent access once granted, GovZTA can strengthen every boundary within the pillars and perform continual access verifications.  The “Zero Trust Engine” enforces and authorises how identity and endpoints access resources by continually examining and ensuring that each new request and credentials are legitimate.  It also assesses contextual attributes such as the requestor’s device health to ensure compliance.  

<figure style="text-align: center">
  <img
    src="/assets/img/GovZTA-5-v2.png" 
    alt="Fig 5: Differences between a traditional security approach and Zero Trust framework."
  />
  <figcaption>Fig 5: Differences between a traditional security approach and Zero Trust framework.</figcaption>
</figure>

### What's Next?

GovZTA is being evaluated for adoption across the Government. In the meantime, Zero Trust policy developments and building of capabilities are ongoing through close collaborations with stakeholders such as government product teams, and Ministry and Agency Chief Information Security Officers (MCISO and ACISO). 

To stay abreast on the latest GovZTA developments, keep a lookout for more updates through newsletters, blogs, and clinic sessions by GovTech’s Cyber Security Group!

### Contact Information

Please fill up this [form](https://form.gov.sg/#!/62280856ba91100012050933){:target="_blank"} if you have further queries.
