---
title: Purple HATS FAQs
layout: layout-page-sidenav
description: Purple HATS FAQs
single_level_nav: true
_data: single-level-nav
faqs:
  - name: My team is new to accessibility, how do I get started?
    description: >
      Check out the GovTech A11y Team’s <a href="https://go.gov.sg/govtech-tinya11yguide" target="_blank">Tiny Accessibility Guide</a>. This simple guide will help kickstart your journey to make digital services more inclusive and accessible.
  - name: How can I suggest new features or provide feedback on the product?   
    description: >
      You can share your feedback and suggestions for Puple HATS with the GovTech A11y Team through this <a href="https://form.gov.sg/62280856ba91100012050933" target="_blank">form</a>.
  - name: What does Purple HATS test for? What standard does it map to?
    description: >
      Purple HATS tests for the accessibility issues of websites by scanning the semantic HTML. It identifies areas where accessibility improvements can and should be made. It uses the axe-core engine by Deque Systems that checks against the Web Content Accessibility Guidelines (WCAG) 2.1 rules.
      <br/>
      <br/>WCAG is a set of standards and recommendations to make web content more accessible for Persons with Disabilities (PWDs). There are several layers to WCAG: Principles, Guidelines, Success Criterias, and Level of Conformance.
      <br/>
      <br/>It follows the 4 main principles of POUR: Perceivable, Operable, Understandable, Robust. POUR is further broken down into 13 guidelines which has success criteria to determine whether the guidelines are met according to 3 levels of conformance, namely A, AA, and AAA.
  - name: Is my website fully accessible if Purple HATS does not flag any issues to fix?
    description: >
      No, it will not be considered fully accessible.
      <br/>
      <br/>Purple HATS is an automated accessibility testing tool. For a website to be fully accessible, it is crucial to run comprehensive accessibility assessments to identify issues early — this involves both automated and manual testing, especially with individuals with access needs.
      <br/>
      <br/>For more information on manual accessibility testing, do reach out to the GovTech A11y Team <a href="mailto:accessibility@tech.gov.sg" target="_blank">here</a>.
  - name: What is manual testing for digital accessibility?
    description: >
      Manual testing refers to the process of evaluating and assessing the accessibility of a digital product or website through manual inspection and interaction.
      <br/>
      <br/>It is an important process which fills in the gap that automated tools cannot capture, such as the user experience of navigating a site using assistive technology, or bugs that surface upon human interaction.
      <br/>
      <br/>Hence, manual testing involves human testers who are proficient in carefully examining the various components and features of the digital platform to identify accessibility barriers and issues that may affect users who use assistive technologies to interact with digital products, and who may inadvertently face barriers when using digital services.
      <br/>
      <br/>For more information on manual accessibility testing, do reach out to the GovTech A11y Team <a href="mailto:accessibility@tech.gov.sg" target="_blank">here</a>.
  - name: Can Purple HATS be used to scan pre and post-production sites?
    description: >
      Yes, Purple HATS can scan any website that can be accessed from your laptop or from your CI/CD tool. It can also scan post-login flows, using the Custom Flow feature.
      <br/>
      <br/>The Custom Flow feature allows you to record your steps to login and perform any form actions (typing into form fields, clicks, button presses etc). Purple HATS will then take what you have recorded, to re-play the steps and scan the accessibility of each page.
      <br/>
      <br/>If you have or are planning to code automated end-to-end test suites in JavaScript frameworks such as Cypress or Playwright, you can easily include automated accessibility testing with Purple HATS integration as an npm module in your project.  You may refer to <a href="https://github.com/GovTechSG/purple-hats/blob/master/INTEGRATION.md" target="_blank">this guide</a> for step-by-step instructions.
  - name: I am not familiar with GitHub or Command Line Tools. Is there a way that I can still run Purple HATS?
    description: >
      Yes, you can now do so via the Purple HATS Desktop App, which allows users to use a Graphical User Interface (GUI) to easily scan and download the Purple HATS report for their scanned website.
      <br/>
      <br/>The latest release of the Purple HATS Desktop App can be found <a href="https://github.com/GovTechSG/purple-hats-desktop" target="_blank">here</a>.
  - name: Can Purple HATS scan dynamically generated content such as elements generated via Javascript?
    description: >
      Yes, using the Custom Flow method, Purple HATS will scan the website based on the interactions initiated by the user.
      <br/>
      <br/>Any dynamically generated HTML elements from interactions such as onClick events (e.g. when a button is clicked) will also be scanned and included in the report.
  - name: Can Purple HATS be integrated into existing development workflows and testing frameworks?
    description: >
      Yes. For further instructions on how to integrate Purple HATS, please refer to <a href="https://github.com/GovTechSG/purple-hats/blob/master/INTEGRATION.md" target="_blank">this guide</a>.
  - name: My website is quite large. How many pages can Purple HATS scan?
    description: >
      Depending on the speed of your machine, and the site you are scanning, it can scan upwards of 1,000 pages in less than 5 minutes.
      <br/>
      <br/>However, do take note that some sites may rate limit or and throttle the speed of your scan. To address this, there is an option for you to limit the number of pages to scan.
      <br/>
      <br/>For more information on how to limit the number of pages to scan, please refer to <a href="https://github.com/GovTechSG/purple-hats#how-do-i-limit-number-of-pages-scanned" target="_blank">this step</a>.
  - name: Where can I access Purple HATS?
    description: >
      1.    Use the Desktop App
      <br/>
      <br/>The desktop app can be used to scan your development/production environment via an easy-to-use GUI. To get started, download the latest release <a href="https://github.com/GovTechSG/purple-hats-desktop" target="_blank">here</a>.
      <br/>
      <br/>2.    Through your CI/CD tool
      <br/>
      <br/>      - Check this <a href="https://go.gov.sg/purple-hats" target="_blank">page</a>
      <br/>      - Review the Dockerfile and GitLab template (gitlab-pipeline-template.yml)
      <br/>      - Build and run the template to your pipeline
  - name: I operate mostly on my SOE which is not an internet facing device. Can I run Purple HATS on my GSIB?
    description: >
      Yes, you can now run Purple HATS on your GSIB for testing intranet websites.
      <br/>
      <br/>For more information on how to get started, please reach out to the GovTech A11y Team <a href="mailto:accessibility@tech.gov.sg" target="_blank">here</a>.
  - name: I am experiencing some issues using Purple HATS on my GSIB after the installation. What should I do?
    description: >
      You may need to use an internet-facing device to run Purple HATS.
   
---

{% include faqs-app.html sectionName="FAQs" sectionDescription=page.section_description faqData=page.faqs %}
