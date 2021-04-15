---
title: Ensuring Secure Migration of Data to the Cloud
layout: layout-blog
author: Seet Yu Fei
description: >
  Secure Data Migration
---
 ## ENSURING SECURE MIGRATION OF DATA TO THE CLOUD

Secure Data Migration is an essential step in cloud adoption, which involves **transferring data from an on-premise environment to a cloud environment**. This migration can be broadly classified into two categories:

### Online Migration

Data moves across the Internet or a private connection (e.g. site-site VPN)

**Offline Migration**

Data is transferred via a storage appliance (e.g. hard disk drive)

**USING THE APPROPRIATE MIGRATION APPROACH**

The table below highlights several considerations for project teams when deciding which migration approach to use. 

**FACTORS**

**CONSIDERATIONS**

**Security and Governance**

The level of control and responsibility for the security controls to be implemented during migration.

For example, project teams are unable to conduct media sanitisation themselves when using Cloud Service Provider (CSP)-provisioned media for an offline migration. Hence, an online migration is recommended.

**Amount of Data, Time and Speed**

The feasibility of the timeline required to transfer certain amount of data.

For example, transfer of 1PB of data over a dedicated 500Mbps connection requires approximately 8 months to complete. This may not be feasible for a project with a short timeline to complete the migration. Hence, an offline migration is more viable.

**Availability of CSP**

The availability of the CSP service as not all migration services will be available.

For example, Google Cloud Transfer Appliance is an offline migration service that is only available in selected locations: Canada, United States, European Union, Norway and Switzerland. Hence, an online migration is preferred in this case.

**Cost**

All costs involved in the migration.

For example, shipping fees for an offline migration may cost much more than the cost of setting up a dedicated connection. Hence, an online migration is preferable.

**Use Case and Data Type**

The context of the migration.

For example, a one-time massive data migration of data stored on storage disks is conducted more efficiently via an offline service (e.g. AWS Snowball), whereas re-hosting a database system from an on-premise environment to the cloud is conducted better via online migration.

**MANAGING SECURITY RISKS OF MIGRATING DATA TO THE CLOUD**

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
