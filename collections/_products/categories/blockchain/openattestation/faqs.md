---
title: OpenAttestation FAQs
layout: layout-page-sidenav
description: OpenAttestation FAQs
single_level_nav: true
_data: single-level-nav
faqs:
  - name: How can I have an estimate of the costs involved in using the Ethereum smart contracts for OpenAttestation? 
    description: >
      You can refer to the <a href="https://www.openattestation.com/docs/docs-section/appendix/contract-costs/" target="_blank">OpenAttestation Contract Costs page</a> for a breakdown of the estimates.
  - name: What is Gas for OpenAttestation transactions on the Ethereum network? 
    description: >
      For more information on Gas and Gas Prices, check out <a href="https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas" target="_blank">this article</a>.
  - name: What is the theoretical storage limit of a smart contract for OpenAttestation?
    description: >
      It is 2^261 bytes. Check out this <a href="https://ethereum.stackexchange.com/questions/1038/is-there-a-theoretical-limit-for-amount-of-data-that-a-contract-can-store/1040#1040" target="_blank">Stack Overflow post</a> for more information.
  - name: Can I create multiple text file (TXT) records under the same domain/subdomain? 
    description: >
      Yes. You can make use of multiple TXT records to point to multiple Ethereum addresses (e.g. document stores or DIDs). Keep in mind each TXT record should only contain one Ethereum address record.
---

{% include faqs-app.html sectionName="FAQs" sectionDescription=page.section_description faqData=page.faqs %}
