---
title: Using Cloud Operation to Automate Cybersecurity Posture Management
layout: layout-blog
author: Eugene Sim
description: >
  Serverless computing
tags:
  - cloud security
  - Cloud
  - serverless computing
  - cybersecurity posture
  - Function-as-a-Service
  - FaaS
  - automation
---

It is challenging to manage the cybersecurity posture of a cloud-hosted system, considering the numerous services typically subscribed to it. Data needs to be obtained from disparate logs and adequately enhanced for analysis. Remediation of a security issue can be complex and often needs to be carefully executed to uphold system availability.

Effective cybersecurity posture management requires:

- **Sufficient log insights** to accurately detect security events
- **Proactive remediation** of security issues detected

Manual approaches to log analysis and remediation, however, require significant time and effort, and include the possibility of human error. This article explores how automation can be used to simplify these tasks and help the system achieve a strong cybersecurity posture.

![cloud_operation](/assets/img/co_automation.png)

The following describes the automation tools referenced above.

• **Serverless computing**, also known as **Function-as-a-Service (FaaS)** or simply **serverless**, is a cloud service that enables code execution without the need to manage any underlying platform or infrastructure (e.g. security patching). Some serverless offerings are: AWS Lambda,Azure Functions Serverless Compute and Google Cloud Functions.

• **Infrastructure-as-Code (IaC)** uses scripting to pre-configure and templatise cloud infrastructure or services for automatic deployment, eliminating configuration drift. Some IaC tools and services are: Hashicorp Terraform, AWS CloudFormation, Azure Resource Manager and Google Cloud Deployment Manager.

Apart from time and effort savings, automation improves security by **increasing consistency in processes and minimising the possibility of human error** — the root cause of most security incidents. Due to its advantages, automation should be implemented as far as possible in the cloud.
