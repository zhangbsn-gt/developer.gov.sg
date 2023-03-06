---
title: XCA FAQs
layout: layout-page-sidenav
description: XCA FAQs
single_level_nav: true
_data: single-level-nav
faqs:
  - name: Is XCA meant to replace my primary code-scanning solution?
    description: >
      No, XCA augments existing code scanning solutions, including custom rules based on past vulnerabilities that may not be available in generic default rulesets. As such, it targets specific, known vulnerable code patterns with a high true positive rate instead of general code hygiene or potential vulnerabilities.
  - name: Why does XCA use Semgrep instead of any other code-scanning engine?
    description: >
      The Semgrep OSS Engine is already integrated into GitLab SAST and does not require additional modifications.
  - name: Where are the vulnerabilities logged?
    description: >
       Vulnerabilities discovered from XCA CI are stored in the GitLab project as a Vulnerability Report.
---

{% include faqs-app.html sectionName="FAQs" sectionDescription=page.section_description faqData=page.faqs %}
