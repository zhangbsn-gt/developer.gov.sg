---
title: 'DECADA Embedded - Microcontroller-Class Devices that Communicates with DECADA Cloud'
layout: layout-page-sidenav
category: Sensors and IOT
description: DECADA Embedded (formerly known as MANUCA) are a family of microcontroller-class devices that can communicate directly to DECADA Cloud.
bios:
  - name: Christopher Tong, Product Manager
    img_src: XXXXXXXX
    desc: |
      Chris is the Product Manager for DECADA Embedded. He graduated with an undergraduate degree in Operations Research and a Master’s of Science in Civil Engineering from UC Berkeley. A former Smart Nation Resident Fellow at GovTech, his current areas of focus include infrastructure, IOT, and lighting systems. Chris is interested in all things to do with cities and urbanisation.
---

### Overview

DECADA Embedded (formerly known as MANUCA) are a family of microcontroller-class devices that can communicate directly to DECADA Cloud.

Microcontroller-class devices are prevalent in an IoT network, as they are low in cost and extremely energy efficient at scale. Depending on the hardware specifications, they can play the role of a node and/or a simple gateway. These resource-constrained devices run off kilobytes to megabytes of flash memory and RAM, which requires a different approach to software development. 

### What is DECADA Embedded?

As part of the Singapore Government Tech Stack, DECADA Embedded provides software reference designs to hasten development time. By extending the reference examples, developers will be able to add their custom application logics for their use cases, while not having to fret over how onboarding and communication are done with DECADA Cloud in the software.

#Why Should DECADA Embedded be Adopted?

Organisations who wish to connect their microcontroller-class devices to GovTech’s IoT Cloud (DECADA Cloud) will be able to cut software development time significantly when they reference our open-sourced examples. We provide the following RTOS reference examples, which can be compiled and run straight out-of-the-box:
- MbedOS: https://github.com/GovTechSIOT/decada-embedded-example-mbedos
- Zephyr: https://github.com/GovTechSIOT/decada-embedded-example-zephyr

### How Do You Use DECADA Embedded?

Refer to README.md of the respective decada-embedded-example-* repository.

### Success Stories

SafeEntry Gateway prototypes were based on decada-embedded-example-mbedos, which gave developers the speed to iterate the business logic, instead of handling cloud connection logic.

<figure style="text-align: center">
  <img
    src="/assets/img/decada-embedded-fig1.png" width="75%" height="75%" 
    alt="Fig 1: Early prototype of SafeEntry Gateway"
  />
  <figcaption>Fig 1: Early prototype of SafeEntry Gateway</figcaption>
</figure>

[Sport Singapore](https://www.sportsingapore.gov.sg/) and [National Parks Board (NParks)](https://www.nparks.gov.sg/) used IoT devices based on decada-embedded-example-mbedos software for their smart lighting works.

<figure style="text-align: center">
  <img
    src="/assets/img/decada-embedded-fig2.png" width="75%" height="75%" 
    alt="Fig 2: Smart Lamppost at Singapore Botanic Gardens"
  />
  <figcaption>Fig 2: Smart Lamppost at Singapore Botanic Gardens</figcaption>
</figure>

### What's Next?

Generic implementation of Secure Boot Process and Firmware Over-the-Air (FOTA) Update are currently in the pipeline. Stay tuned!

### Contact Information

For enquiries, contact Christopher Tong (Product Manager) at <christopher_tong@tech.gov.sg>.

### Meet the Team!

<div class="card-grid-container grid-25rem">
  {% for bios in page.bios %}
  {% assign img_url = "/assets/img/" | append: bios.img_src %}
  <div class="sgds-card">
    <div class="sgds-card-content">
      <img style="float: left; margin-right: 20px;" src="{{ img_url }}" alt="{{ bios.name}}">
      <p><strong>{{ bios.name}}</strong><br>
        {{ bios.desc }}
      </p>
    </div>
  </div>
  {% endfor %}  
</div>
