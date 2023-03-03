---
title: Mobile Application Security Hygiene (MASH) – A Security Scanner for Mobile Applications  
layout: layout-page-sidenav
category: Cybersecurity
_data: single-level-nav
redirect_from:
    - /products/categories/cybersecurity/mash/
    - /products/categories/cybersecurity/mash.html
sub_collection_render: true
single_level_nav: true
collection_group: [Singapore Government Tech Stack, What's New]
sgts_collection_group: [toolchain]
sgts_layer_group: [base]
sgts_title: MASH
description: MASH performs security scanning on iOS (IPA) and Android (APK) mobile application files from the outside-in. Find out more.
---

![MASH header banner](/assets/img/MASH-HeaderBanner-v2.png)

MASH is a GovTech-developed Static Application Security Testing (SAST) tool that can be used to identify common vulnerabilities or unnecessary exposures in mobile applications. 

MASH takes an “outside-in” approach, by extracting content from iOS (.ipa) and Android OS (.apk) files to identify potential vulnerabilities and the unintended exposure of sensitive data such as hardcoded secret keys, debugging information and Application Programming Interface (API) key strings. Support for Android OS .aab files will be added in a future release.

Additionally, MASH has the functionality to test mobile-specific settings, such as analysing the P-list file for iOS configurations, or the AndroidManifest.xml file for Android configurations. For Android applications, MASH will attempt to decompile the APK file for deeper analysis.

MASH is a part of the [Singapore Government Tech Stack (SGTS)](/singapore-government-tech-stack/){:target="_blank"} and can be integrated with [SHIP-HATS](/products/categories/devops/ship-hats/overview.html){:target="_blank"}. Developers are encouraged to use MASH as a security hygiene check before their applications undergo Vulnerability Assessment and Penetration Testing (VAPT).

### Key Features

- Platform-agnostic accessibility 
- Continuous Integration, Continuous Delivery/Deployment (CI/CD) integration
- Leverages industry standards

### Contact Us

{% include contact-us-form.html %}
