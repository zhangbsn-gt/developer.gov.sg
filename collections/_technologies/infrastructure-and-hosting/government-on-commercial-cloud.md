---
title: Government on Commercial Cloud
layout: layout-page-sidenav
category: Hosting
redirect_from: /singapore-government-tech-stack/government-on-commercial-cloud
sub_collection_render: true
description: >
  GCC is a “wrapper” platform that allows government agencies to adopt commercial cloud solutions to provide secure, seamless and efficient services.
---

### Overview

In late 2018, the Singapore Government announced a five-year plan to migrate most of its information technology (IT) systems from on-premises infrastructure to the commercial Cloud platform to accelerate service delivery and improve services for citizens and businesses. This led to the establishment of the GCC in 2019 to homogenise the onboarding experience and administrative tasks of government agencies on the Cloud, including workload administration, account and billing management, secure access, and compliance to governance policies. In 2020, a whole-of-government (WOG) target to move 70% of eligible government systems onto the Cloud by 2023 was represented in the Digital Government Blueprint. To date, the government has over 600 systems on the Cloud.

Currently, key government services such as [MyCareersFuture](https://www.mycareersfuture.gov.sg/){:target="_blank"}, [GoBusiness](https://www.gobusiness.gov.sg/){:target="_blank"}, [GoBusiness Licensing Portal](https://licence1.business.gov.sg/feportal/web/frontier/home){:target="_blank"}, [SafeEntry](./digital-solutions-to-address-covid-19/safeentry.html){:target="_blank"}, [SupplyAlly](./digital-solutions-to-address-covid-19/supplyally.html){:target="_blank"}, [Whole of Government Application Analytics (WOGAA)](./analytics/wogaa/getting-started.html){:target="_blank"}, and [SHIP-HATS](/singapore-government-tech-stack/toolchain/overview.html){:target="_blank"} utilise the GCC.

Ultimately, cloud migration is not just a data migration exercise, but a holistic strategy to pursue government digital transformation and advancement of citizen and business services through cloud capabilities. For example, during the COVID-19 pandemic, Singapore’s Ministry of Education (MOE) was able to successfully enable home-based learning (HBL) within a week’s notice due to the hosting of its Student Learning Space (SLS) on the GCC, which allowed SLS to tap on cloud IaaS and PaaS functionalities to deliver a seamless and smooth HBL experience for students. This also allowed SLS to meet the increased demand for HBL during the pandemic, by scaling its uptake from 100,000 concurrent students to 300,000 concurrent students. 

### What is GCC?

GCC 1.0 was launched in 2018 as a “wrapper” platform that provides government agencies with a consistent means to adopt commercial cloud solutions offered by Amazon, Microsoft, and Google. However, feedback received include concerns over the tedious process of onboarding the GCC, increased need for automation, cloud native solutions and for less service requests. 
In response to the learning points from GCC 1.0, a rethink was required on how the GCC is built and operated. As such, GCC was redesigned with the following approaches to give rise to GCC 2.0:

- **Software approach to infrastructure:** Utilise Infrastructure-as-Code (IaC) to implement a core cloud platform
- **Encourage more usage of native cloud solutions** with more dynamic configuration controls and less static system wide controls
- **Identity and access management (IAM) focused:** Utilisation of roles for security beyond networks, where multiple accounts are consolidated to Single Sign On (SSO) accounts to enable strong account identity

<figure style="text-align: center">
  <img
    src="/assets/img/GCC-fig1.png" width="70%" height="70%" 
    alt="Fig 1: GCC"
  />
  <figcaption>Fig 1: GCC</figcaption>
</figure>

### What's Next: Announcing GCC 2.0

Based on the feedback from the users, we worked to offer an enhanced GCC 2.0 to:

- Provide **faster response** to changes in policies and business requirements
- Replace components with cloud native solutions to **reduce cost and simplify onboarding process**
- Provide a **productive environment** where engineers can focus on building and delivering innovative solutions and systems

#### GCC 2.0 Features

- **Single Identity**: [TechPass](https://www.developer.tech.gov.sg/singapore-government-tech-stack/service-management/techpass.html){:target="\_blank"} - Single identity, streamlined on/off boarding and simplified access to GCC
- **Endpoint Posture Checks**: SEED - Real-time periodic posture checks with capability to terminate only individual services
- **Access Control**: Cloudflare Access - Realtime secured identity (with MFA) and device posture through an encrypted channel to access GCC
- **Controls & Compliance**: GCC 2.0 Infra - Security controls using identity access management and policy-as-code. GCC 2.0 CMP - Less dependence on cloud management portal for control and enable more automation over service requests
- **Native Workload Administration**: Cloud Native - Relies on more reliable CSP native workload administration

### Getting Started

To know more about GCC 2.0 join a virtual conference, [Stack X Cloud 2021](https://www.developer.tech.gov.sg/communities/events/stack-x-cloud-2021){:target="\_blank"} on 17 November 2021.

While GCC 2.0 gets ready for the pilot phase, agencies can continue to move to GCC 1.0. Sign up for the [GCC Foundation Training](https://www.developer.tech.gov.sg/gcc-foundation-training){:target="\_blank"} for basic training on GCC 1.0.

### Contact Information

For enquiries, contact <info@tech.gov.sg>.
