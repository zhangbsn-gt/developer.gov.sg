---
title: CloudSCAPE FAQs
layout: layout-page-sidenav
description: CloudSCAPE FAQs
single_level_nav: true
_data: single-level-nav
faqs:
  - name: What devices can I use to access CloudSCAPE?
    description: >
      Supported devices include non-SE GSIBs, GMDs. GoMax and SE-GSIB devices are not supported.
  - name: What role do I need in CMP to access CloudSCAPE?
    description: >
      You would need to be granted the Cloud Admin role for each CSP account in CMP. A Tenant Admin would need to assign you that role.
  - name: I have successfully logged into CloudSCAPE with TechPass, but I am unable to view my CSP account(s).
    description: >
      Check with your Tenant Admin and/or Tenant Manager that you have been granted Cloud Admin privileges for the CSP account(s). 
  - name: I have a TechPass account but I did not onboard to SEED previously. How do I onboard to SEED now?
    description: >
      You may follow the instructions <a href="https://docs.developer.tech.gov.sg/docs/security-suite-for-engineering-endpoint-devices/prerequisites-for-onboarding?id=seed-provisioning" target="_blank">here</a>
  - name: Why are Microsoft Azure and Google Cloud Platform cloud accounts not listed in CloudSCAPE?
    description: >
      Support for Microsoft Azure and Google Cloud Platform will be available in future.
---

{% include faqs-app.html sectionName="FAQs" sectionDescription=page.section_description faqData=page.faqs %}
