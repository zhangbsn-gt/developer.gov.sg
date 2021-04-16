---
title: Ensuring Secure Migration of Data to the Cloud
layout: layout-blog
author: Seet Yu Fei
description: >
  Secure Data Migration
tags:
  - security
  - migration
---
 ## ENSURING SECURE MIGRATION OF DATA TO THE CLOUD

Secure Data Migration is an essential step in cloud adoption, which involves **transferring data from an on-premise environment to a cloud environment**. This migration can be broadly classified into two categories:

[!(assets/img/secure_data_mig_off_online_img01.png)]

### USING THE APPROPRIATE MIGRATION APPROACH

The table below highlights several considerations for project teams when deciding which migration approach to use. 



**MANAGING SECURITY RISKS OF MIGRATING DATA TO THE CLOUD

Before migration, a risk assessment for the chosen approach should be completed with mitigation in place. This is to reduce undesirable impacts such as loss of data confidentiality and/or integrity. The table below describes key security risk areas associated with data migration and the recommended mitigation measures.

**OFFLINE MIGRATION**

**RISK AREA**

**MITIGATING MEASURES**

**Mishandling of Media storage**

In the event where there is improper (or lack of) sanitisation on the media used for migration or that the media is not encrypted and has gone missing, there is a risk of exposing classified and sensitive data stored in the media to unauthorised personnel.

**Impact:** Data confidentiality

·        Ensure that the CSP has a media sanitisation regime which adheres to best practices (e.g. NIST 800-88r1) when using CSP-provisioned media (e.g. Azure Data Box)

·        Ensure that a Wipe Certificate is issued as proof of proper sanitisation when using CSP-provisioned media

**ONLINE MIGRATION**

**RISK AREA**

**MITIGATING MEASURES**

**Unauthorised Data Access**

In the event where a compromised Internet device is used for data migration (e.g. malware infected), there is a risk of unauthorised access to classified and sensitive data.

**Impact**: Data confidentiality

·        Provision Internet devices for carrying out administration activities (i.e. data transfer) and ensure the devices are only used for the stated purpose.

·        Scan the device for poor security posture/malware with an endpoint anti-malware solution before use.

**Unprotected Data in Transit**

In the event where unprotected data (e.g. in clear text) is sent in transit and routed over the Internet, there is a risk of unauthorised access to classified and sensitive data.

**Impact:** Data confidentiality

·        Ensure protection of data in transit using strong encryption (e.g. AES-256).

·        If doing an online migration, use a site-site VPN solution (e.g. Azure ExpressRoute) to prevent data from routing over the public Internet.

**Unnecessary Access Rights**

In the event where there are discrepancies in user access post-migration, there is a risk of unauthorised access to classified and sensitive data.

**Impact:** Data confidentiality

·        Ensure data is adequately protected at destination by reviewing and reconciling user access post-migration to identify discrepancies and remove unnecessary access rights.

**Unrecorded Data Changes**

In the event where there is unexpected corruption, changes or loss of data, there is a risk of data being tampered intentionally or unintentionally.

**Impact:** Data integrity

·        Create a manifest containing an index of all copied files with data integrity hashes and verify against the hashes where necessary.

·        Monitor progress during the migration process to ensure that migration is completed successfully.

·        Validate items like the schema and number of records post-migration.

**KEY TAKEAWAYS FOR PROJECT TEAMS**

·       Always first identify the security risks for data migration to cloud environments.

·       Be mindful of the security objectives, and adopt measures to protect the confidentiality and integrity of data throughout the entire migration process.
