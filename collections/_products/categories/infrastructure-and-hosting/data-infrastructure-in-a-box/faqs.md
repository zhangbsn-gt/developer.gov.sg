---
title: DIAB FAQs
layout: layout-page-sidenav
description: Data Infrastructure in a Box (DIAB) FAQs
single_level_nav: true
_data: single-level-nav
faqs:
  - name: Is DIAB available for Azure and GCC Plus?
    description: >
      As of now, DIAB only provides AWS-native resources for GCC2.0. In future, the product team plans to provide a version for Microsoft Azure on GCC2.0. There are currently no plans to onboard GCC Plus.
  - name: Is there any subscription cost or payment fee to use DIAB?
    description: >
      Presently, DIAB is free of charge for agencies to use. However, in future, cost recovery measures may be put in place.
  - name: Does DIAB come with a GCC environment?
    description: >
      No, agencies have to use DIAB to provision data infrastructure resources directly into their own GCC environment.
  - name: If I use DIAB to deploy data infrastructure, must I still do my own VAPT?
    description: >
      Yes, even though DIAB has conducted and passed VAPT before release, agencies will still have to do the necessary risk and security assessments to secure their systems, applications and datasets.
  - name: How can my agency onboard and use DIAB?
    description: >
      Agencies can contact the product team through this <a href="https://form.gov.sg/62280856ba91100012050933" target="_blank">form</a> to indicate interest in onboarding DIAB, or to arrange for a discussion.
  - name: Can my agency use DIAB with vendor assistance?
    description: >
      Yes, agencies can use DIAB with vendor assistance. However, agencies should ensure that the vendors read and comply with DIAB’s Terms of Use.
---

{% include faqs-app.html sectionName="FAQs" sectionDescription=page.section_description faqData=page.faqs %}
