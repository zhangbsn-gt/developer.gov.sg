---
title: MASH FAQs
layout: layout-page-sidenav
description: MASH FAQs
single_level_nav: true
_data: single-level-nav
faqs:
  - name: Is MASH accessible via SHIP-HATS integration only?
    description: >
      MASH is platform agnostic. Developers can access the MASH APIs using <a href="https://www.developer.tech.gov.sg/products/categories/cybersecurity/seed" target="_blank">SEED</a>-enabled devices.
  - name: Is there a Graphical User Interface (GUI) for MASH?
    description: >
      The current release of MASH is only accessible via APIs.
  - name: Is MASH a replacement for other SAST integration?
    description: >
      MASH does not replace, but complements, other available SAST tools. MASH takes an “outside-in” approach by analysing mobile application packages, which differs from common SAST tools that focus on source code scanning.
  - name: I have some questions about MASH integration. How do I seek assistance?
    description: >
      Please reach out to the MASH team through this <a href="https://form.gov.sg/62280856ba91100012050933" target="_blank">form</a>.
---

{% include faqs-app.html sectionName="FAQs" sectionDescription=page.section_description faqData=page.faqs %}
