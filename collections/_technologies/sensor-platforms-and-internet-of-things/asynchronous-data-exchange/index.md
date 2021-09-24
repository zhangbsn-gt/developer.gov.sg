---
title: Asynchronous Data Exchange (ADEX) – Empowering a Smart Nation
layout: layout-page-sidenav
category: Sensors and IOT
description: >
  ADEX is a centralised data exchange platform for the whole of government (WOG) that allows for seamless data sharing and event streaming.
---

### Overview

Asynchronous Data Exchange (ADEX) is a centralised, self-service data exchange and event streaming platform for WOG and local business entities to share and receive lightweight, real-time data securely.

ADEX originated as the Sensor Data Exchange (SDX), part of the Smart Nation Sensor Platform (SNSP). Currently, ADEX has broadened its scope to support the exchange of both sensor and non-sensor data. In this context, non-sensor data may also refer to processed sensor data (i.e. raw sensor data after processing/analytics). For example, mall footfalls are considered as raw sensor data (i.e. how many steps counted at Level 1 of a shopping centre). After processing/analytics, the data can be defined as "Level 1 is at 80% capacity", which can be considered as non-sensor data.

ADEX is part of the [Singapore Government Tech Stack (SGTS)](https://www.developer.tech.gov.sg/singapore-government-tech-stack/overview/index.html). It is positioned as one of the Communications components, along with [API Exchange (APEX)](https://www.developer.tech.gov.sg/technologies/data-and-apis/apex.html) it is part of the Base Layer of SGTS.

ADEX is hosted on the [Government Commercial Cloud (GCC)](https://www.developer.tech.gov.sg/technologies/infrastructure-and-hosting/government-commercial-cloud.html). It can support an exchange of data that is up to the RESTRICTED classification and considered NON-SENSITIVE.

### What is ADEX?

ADEX provides WOG with real-time, asynchronous, fire-and-forget data transfer. Agencies can look forward to making better, real-time decisions based on up-to-date information with ADEX.

ADEX enables government agencies to publish and subscribe to real-time data using a self-service portal in GCC, both on the GCC Internet and GCC Intranet.

Agencies can either connect via Intranet through the SGWAN interface or via MPLS from their private network. Agencies can use ADEX to discover and share event data such as status updates or event streams in real-time, across Internet and Intranet. Subscribers will receive updates as soon as the events are published. Publishers can choose who will be able to subscribe.

This diagram shows the components of ADEX and its ability to distribute real-time data across networks. More details on ADEX can be found in [this video](https://d3uzjhjcl6zsbz.cloudfront.net/ADEX-overview.mp4).

<figure style="text-align: center">
  <img
    src="/collections/_technologies/sensor-platforms-and-internet-of-things/asynchronous-data-exchange/HowADEXWorks.jpg" width="100%" height="100%" 
    alt="Fig 1: How ADEX works"
  />
  <figcaption>Fig 1: How ADEX works</figcaption>
</figure>

### Differences between APEX & ADEX
