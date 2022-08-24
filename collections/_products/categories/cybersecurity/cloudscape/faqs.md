---
title: CloudSCAPE FAQs
layout: layout-page-sidenav
description: CloudSCAPE FAQs
single_level_nav: true
_data: single-level-nav
faqs:
  - name: What devices can I use to access CloudSCAPE?
    description: >
      Supported devices include non-SE GSIBs and GMDs. GoMax and SE-GSIB devices are not supported.
  - name: What role do I need in CMP to access CloudSCAPE?
    description: >
      You would need to be granted an eligible* GCC 2.0 User Role for each CSP account in CMP. A Tenant Manager/Admin would need to assign you that role.
      <br /><br />
      * All user roles, excluding “Tenant Billing Admin”, “Cloud Billing” & “Cloud AssumeRole” roles.
  - name: I have successfully logged into CloudSCAPE with TechPass, but I am unable to view my CSP account(s).
    description: >
      Check with your Tenant Manager/Admin that you have been granted an eligible* GCC 2.0 User Role for the CSP account(s) that you would like to have access to.
      <br /><br />
      * All user roles, excluding “Tenant Billing Admin”, “Cloud Billing” & “Cloud AssumeRole” roles.
  - name: I have a TechPass account but I did not onboard to SEED previously. How do I onboard to SEED now?
    description: >
      You may follow the instructions <a href="https://docs.developer.tech.gov.sg/docs/security-suite-for-engineering-endpoint-devices/prerequisites-for-onboarding?id=seed-provisioning" target="_blank">here</a>
  - name: I do not see my Microsoft Azure and Google Cloud Platform cloud accounts being listed in CloudSCAPE.
    description: >
      CloudSCAPE currently supports deployments on AWS only. Support for Microsoft Azure and Google Cloud Platform will be available in the future.
---

{% include faqs-app.html sectionName="FAQs" sectionDescription=page.section_description faqData=page.faqs %}
