---
title: Getting Started with ADEX
layout: layout-page-sidenav
description: Onboarding steps for ADEX
single_level_nav: true
_data: single-level-nav
---

Instead of using secure file transfer protocol (SFTP) or application programming interface (API) for tightly coupled data transfers, Agencies can use ADEX by enrolling as a Publisher to provide data, or a Subscriber to consume data via a self-service platform. Agencies can look forward to making better, real-time decisions based on up-to-date information with ADEX.

### Onboarding steps

1. Submit the [enquiry form](https://form.gov.sg/62280856ba91100012050933){:target="_blank"} to get in touch with ADEX Team to discuss your agency’s use case, operational requirements, intention to enrol as publisher and/or subscriber on ADEX, and implementation timeline.
2. Sign the ADEX Services Sheet (SS), which together with GovTech’s Universal Service Terms (UST) for Public Sector Entities, form the Memorandum of Understanding (MOU). The SS and UST will be shared upon request after initial discussion.
3. Fill in the ADEX Service Request Form (shared upon request) to submit IP addresses for IP Whitelisting.
4. Create an account with ADEX here via an Internet-enabled PC or laptop. Ensure that you register with a valid government agency’s email address.
5. Upon creating an account, the system will send a verification email to the email address you provided.
6. Once you are successfully signed in, create a Team and invite team members to explore the portal together with agency members.
7. Click on ‘Create’ to start a new Project and add a topic to begin publishing and/or subscribing to data for that topic.
8. Set up an MQTT connection by using an MQTT client (e.g. MQTTBox can be used but for testing only) to establish the mandatory connection before Publisher can start publishing data or Subscriber can start consuming data for that topic.
  - The content inside each MQTT message is known as “payload”. ADEX is capable of transferring text-based payloads and binary payloads. Each payload should be lightweight and less than 1 MB. An example of a binary payload is shown below:

<figure style="text-align: center">
  <img
    src="/assets/img/products/adex-payload.png" width="100%" height="100%"
    alt="Fig 2: ADEX payload"
  />
  <figcaption>Fig 2: ADEX payload</figcaption>
</figure>

