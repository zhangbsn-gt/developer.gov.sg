---
title: 'Case Study: Wireless Alert Alarm System'
layout: layout-page-sidenav
description: Wireless Alert Alarm System (WaaS) - The Case Study for Personal Alert Button (PAB)  
single_level_nav: true
_data: single-level-nav
---

## The Innovation Journey of GovTech's Sensors and Internet of Things Division

### Executive Summary

This case study illustrates GovTech’s practical application of technology and design principles, as well as the significance of cross-divisional and agency partnerships in creating a solution that addresses the community’s needs. Applicable across the Government, this report will be especially useful for policymakers, planners, product owners and public officers working on the ground with citizens.

## Introduction

### Background

In February 2018, the [**Sensors and Internet of Things (SIOT)**](https://www.tech.gov.sg/capability-centre-siot){:target="_blank"} division in GovTech embarked on a journey to upgrade the old **Alert Alarm System (AAS)** that was first set up in 1993.

The AAS is a pull cord system implemented for seniors living alone in the Housing & Development Board (HDB) rental flats. When in distress, seniors can activate the alarm siren (at the void deck) through pulling the cord installed at home, to alert neighbours and good Samaritans within hearing distance. Although the AAS was also connected to support staff in [Senior Activity Centres](https://www.aic.sg/care-services/senior-activity-centre){:target="_blank"}<sup>1</sup>, the servicing period was limited to standard working hours during the day.

In collaboration with HDB, Ministry of Health (MOH) and vendors from the private sector, SIOT partnered the Government Digital Services (GDS) team in GovTech to design a reliable and intuitive system for elderly users and telecare operators. HDB coined this the **Wireless Alert Alarm System (WAAS)** that comprises a hardware **Personal Alert Button (PAB)** and guaranteed 24/7 connectivity to caregivers.

### Sensors and Internet of Things Division's Innovation Journey

Back in 1993, HDB commissioned the installation of the **Alert Alarm System (AAS)** in rental block units of seniors living alone. The AAS consist of a hardwired pull-cord, intended to serve as a handy tool for elderly users to alert people in the vicinity of their plight; particularly during emergency situations that require immediate assistance, such as a fall. Once pulled, a siren would be triggered to alert passers-by of the case.

However, the AAS had some drawbacks.

For example, the pull-cord required wiring to a power source. Once wiring was done, there would be no flexibility to shift its position if required. In some homes, the length of the pull-cord was sometimes too long or short. The old technologies in AAS were sometimes unreliable, resulting in false alarms. Moreover, its response model was completely dependent on the discretion of neighbours and typical servicing hours of SACs which are not open at night. For some, the loud alarm siren of the AAS was also a source of embarrassment as it meant the entire block would be alerted of their distress.

<figure style="text-align: center">
  <img
    src="/assets/img/PAB_image.png" width="50%" height="50%" 
    alt="Fig 1: AAS pull-cord installed in out-of-reach spots and lengthy cords"
  />
  <figcaption>Fig 1: AAS pull-cord installed in out-of-reach spots and lengthy cords</figcaption>
</figure>

### GovTech SIOT’s Proposed Solution

When it was time for a tech refresh in 2018, GovTech was approached by HDB to design a hardware-based alert system to improve the AAS.

Tapping in-house capabilities, SIOT partnered with colleagues from GDS to meet the challenge of coming up with a user-centric, sustainable yet cost-effective solution for this group of seniors.

Armed with user data collected from interview sessions with almost 80 seniors, the teams conceptualised a new **Wireless Alert Alarm System (WAAS)** that consists of a **Personal Alert Button (PAB)** installed in seniors’ homes, complemented with backend administration systems and forming a holistic ecosystem of geriatric care.

The PAB is installed in easily accessible locations in seniors’ homes and is linked to a guaranteed responder. When seniors require help, they can simply press the battery-operated button and the trigger will alert SACs and Careline’s 24/7 telecare operators. Upon triaging the situation, emergency services and/or healthcare providers will provide in-person assistance if needed.

<figure style="text-align: center">
  <img
    src="/assets/img/PAB pic 3.jpg" width="30%" height="30%" 
    alt="Fig 2: PAB installed a washroom"
  />
  <figcaption>Fig 2: PAB installed in a washroom</figcaption>
</figure>


Compared to the pull-cord AAS system, the technology upgrade provides **greater flexibility in where the devices can be installed and a longer device lifespan** as the hardware IoT button is subject to less wear-and-tear.

### The Agile Development Process

Leveraging strong in-house capabilities, the team worked on enhancements through an iterative process and continuous feedback loop with stakeholders.

At the system level, a pain point identified was that the existing app was not connected to any backend case management systems, resulting in telecare operators and healthcare providers not being unable to track the elderly users' health history and medical conditions. 

The team also discovered that agency stakeholders were using their own systems with different data fields and records.  Moreover, some of those systems were built more than 10 years ago, comprising locally stored data that could only be extracted through a floppy disk. This resulted in various sources of truth and a lack of real-time visibility from a WOG perspective.

As a consolidated overview is essential for cross-agency work, SIOT enlisted the help of GDS to design a **Case Management System (CMS)**. The CMS addresses the need of stakeholders to log each PAB trigger as a case in its centralised portal storing standardised information (health records, case history, etc.) of seniors, while allowing concurrent access for multiple users.

To securely and remotely monitor and manage the PABs, SIOT used [**DECADA Cloud**](/products/categories/sensor-platforms-and-internet-of-things/decada-cloud/overview.html){:target="_blank"} – the centralised platform that serve as WOG IoT Stack for secure data aggregation and device management – to monitor device information such as battery life, signal strength, device heartbeat, and while onboarding the device, data such as the address that it is installed in and the occupants’ basic medical data to facilitate triaging, are also securely stored.

Built upon the original requirements from HDB’s WAAS, GovTech’s SIOT and GDS productised the system- comprised of components PAB, DECADA, the CMS, 24/7 response model - into what is now known as the [**Government Assisted Living Ecosystem (GALE)**](/products/categories/digital-solutions-to-address-covid-19/government-assisted-living-ecosystem/overview.html){:target="_blank"}.

<figure style="text-align: center">
  <img
    src="/assets/img/waas-figure-3.png" 
    alt="Fig 3: GALE Features"
  />
  <figcaption>Fig 3: GALE Features</figcaption>
</figure>

There were also improvements made at the PAB device level to better suit the needs of users.

**PAB Version 1**

In the first design of the button, once the PAB is pressed, seniors can record an audio clip of up to ten seconds detailing their condition; this clip is automatically saved to the database and made available to the tele-operators for triaging. Although battery-efficient, this **one-way communication system** was still insufficient for accurate triages.

If insufficient information was relayed, telecare operators would contact seniors’ mobile phones (sponsored by [Temasek Foundation](https://www.temasekfoundation.org.sg/home){:target="_blank"}<sup>2</sup>). However, calls often failed to go through due to various reasons, such as low prepaid card value and lack of smartphone literacy. In some cases of false alarm, even though a cancellation function had already been built into the PAB, not all seniors knew how to use it. As a result, instances of false triggers were hard to discern.

**PAB Version 2**

As part of the agile development process, the team worked with a vendor to roll out a button that can support **two-way intercom** to enable operators to triage and confirm real cases more effectively.

The improved version eliminated the need to equip seniors with landlines/mobile phones, as it allows for up to four minutes of two-way voice calls. The longer talk-time enabled more meaningful exchanges between seniors and telecare operators, who are now able to determine the level of assistance required more accurately. When compared to the original version of the button, the new version has reduced false emergency activations by 4%.

<figure style="text-align: center">
  <img
    src="/assets/img/waas-figure-4.png" 
    alt="Fig 4: WAAS Intervention model"
  />
  <figcaption>Fig 4: WAAS Intervention model</figcaption>
</figure>

In line with the SIOT’s principles of implementing cost-effective systems, the team engaged the expertise of an external vendor to incorporate a 4G LTE module into the PAB using a SIM card, while ensuring that this function did not take up much battery life. The new and improved PAB can be kept in operation for up to five years even with the longer call duration of four minutes.

### Takeaways

The whole process of AAS growing into GALE was an iterative, incremental, and progressive one, supported by GovTech teams, agency stakeholders, industry partners and end users.

SIOT embarked on the WAAS journey with the main aim of improving the usability of the helpline system for vulnerable seniors living alone. Despite meeting this goal with the PAB, the team did not stop there and continued to expand it into the WAAS as a living solution that can pivot flexibly to meet changing needs.

The team was able to build new features quickly as existing tech from GovTech were taken apart and used as building blocks – aligning with SIOT’s belief that tech need not always be expensive, or complicated.

In summary, these are the steps taken by GovTech teams:

1. Understand the current shortcomings and come up with matching solutions.
2. Identify gaps and explore new, feasible solutions to improve functionality.
3. Iteratively and consistently monitor the project to further improve it for users.

### What's Next

The SIOT team is continually and agilely working to refine the WAAS in anticipation of new challenges that may arise. Currently, we are working with partners to push it out to all rental flats across the nation. As of July 2022, the WAAS has assisted in 400 life-threatening cases, and has reached more than 10,000 vulnerable seniors living alone.

### Call for collaboration

SIOT’s capabilities stretch across a variety of development work, and we strive to deliver meaningful projects for citizens, businesses, and public officers. Reach out to us at gale_support@tech.gov.sg if you are interested to collaborate.

Find out more about what we do:

- [Sensor Platforms and Internet of Things](/products/categories/sensor-platforms-and-internet-of-things/){:target="_blank"}
- [SIOT Medium Blogs](https://medium.com/siot-govtech){:target="_blank"}

<br/>

<sup>1</sup>Senior Activity Centres can be found in the void decks of HDB rental blocks and manage emergency alert response calls.<br />
<sup>2</sup>Temasek Foundation International is a Singapore-based non-profit organisation under the philanthropic arm of the Singapore state sovereign fund Temasek Holdings.

---

## Annex

### How GovTech Drives Innovation with the Singapore Government Tech Stack

Public sector innovation is essential to fulfil the three pillars of Singapore's Smart Nation vision –  Digital Government, Digital Economy, and Digital Society. An innovative culture drives collaboration across the Government, improvements in government products and services, and development of user-centric technologies. This is crucial in increasing adoption rates among citizens and businesses as the Singapore Government strives for inclusivity and accessibility in design.

To enable government agencies to build digital services quickly and effectively, GovTech is building up the [Singapore Government Tech Stack (SGTS)](/singapore-government-tech-stack/overview/){:target="_blank"}, a common platform that streamlines and simplifies development processes. With the SGTS, agencies have access to reusable components for application development, such as Runtime (e.g. deployment types like containers and serverless) and Orchestration & Management (e.g., CI/CD, API Gateway and Service Proxy). This allows public officers to **build less and deliver more**.

[DECADA](/products/categories/sensor-platforms-and-internet-of-things/decada-cloud/overview.html){:target="_blank"} is part of the SGTS and managed by SIOT. Leveraging this Whole-of-Government (WOG) IoT infrastructure, SIOT designs and implements solutions for agencies’ use cases.

In line with GovTech’s values of being **Agile, Bold, and Collaborative**, SIOT often partners with various teams within GovTech and/or other agencies to drive impactful projects for public good. When approached by agencies, the team will first evaluate the project requirements, use cases, and whether the scope aligns with GovTech’s organisational strategy and the Smart Nation directive. If viable, SIOT then comes up with a high-level solutioning and determines the required level of involvement from other GovTech divisions.
