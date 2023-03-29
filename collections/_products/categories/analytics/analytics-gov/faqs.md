---
title: Analytics.gov FAQs
layout: layout-page-sidenav
description: Analytics.gov FAQs
single_level_nav: true
_data: single-level-nav
faqs:
  - name: What is Analytics.gov (AG)? What is AG used for?
    description: >
      AG serves as a Whole-Of-Government (WOG) data exploitation platform, which can only be accessed via GSIB machines to support agencies' analysis of data.
      <br/>
      <br/>AG allows for cross-agency collaboration via the use of various analytical tools and code repositories that are made available on this central platform.
      
  - name: Who can use AG?
    description: >
      AG is a WOG platform open to all public service officers with a valid gov.sg email account and non-SE GSIB machine.

  - name: How do I get access to use AG?
    description: >
      To get access, you would need to register for an account. The account creation request will take about five working days, and an email with your account details will be sent to you.
      <br/>
      <br/>Your AG@GDC/GCC account will be provisioned based on the tools, data classification and other requirements as indicated on your account registration form.
 
  - name: I have been provisioned a user account, but there’s an error when I try to access the AG website. What may be the issue and what should I do?
    description: >
      Although you have been provisioned a user account, your agency needs to ensure that the relevant firewalls are open in order for you to access the AG website. Kindly check with your agency’s IT team to verify if this has been done already.
      <br/>
      <br/>Otherwise, please contact the Analytics.gov product team via this <a href="https://form.gov.sg/62280856ba91100012050933" target="_blank">form</a> to confirm which firewalls need to be opened.
      
  - name: What are the tools available in AG?
    description: >
      The following tools are available on AG now: JupyterLab, RStudio, VS Code (AG@GCC only), GitLab, Nexus Repository, Tableau (AG@GDC only), and Qlik Sense (AG@GDC only).
      <br/>
      <br/>More tools will be made available in AG@GCC, such as Amazon Sagemaker Studio, in later releases, so please keep an eye out for them.

  - name: Is there any subscription cost or payment fee to use AG?
    description: >
      Presently, there is no cost for using AG, except for Tableau and QlikSense on AG@GDC, which are on a ‘Bring Your Own License’ (BYOL) model. For Tableau and Qliksense on AG@GDC, please contact the Analytics.gov product team via this <a href="https://form.gov.sg/62280856ba91100012050933" target="_blank">form</a> before procuring the licenses.
  
  - name: Can I use Analytics.gov to access data from my agency’s database system?
    description: >
      For AG users to access data from their agency's database systems, there is a requirement to set up connectivity between AG and the agency's system(s). The agency may contact the product team via this <a href="https://form.gov.sg/62280856ba91100012050933" target="_blank">form</a> to arrange for an exploratory discussion.
---

{% include faqs-app.html sectionName="FAQs" sectionDescription=page.section_description faqData=page.faqs %}
