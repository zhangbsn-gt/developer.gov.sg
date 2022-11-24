---
title: Technologies in Cloud to Protect Cryptographic Keys
layout: layout-blog
author: Alan Goh
description: >
  Key Management System (KMS) technologies which are integral to protecting data confidentiality and integrity on Cloud

tags:
  - cryptographic key
  - key generation
  - crypto
  - key registration
  - key encrypting key
  - cryptographic key lifecycle
  - key management service
  - data integrity
  - data encryption key
  - customer-managed master key
  - hardware security module master key
---

This article outlines the Key Management System (KMS) technologies which are integral to protecting data confidentiality and integrity on Cloud. Topics covered in this article include various key types, the envelope encryption and implementation strength.

### UNDERLYING PROCESS OF KEY MANAGEMENT SYSTEMS 
The underlying keys for data protection (e.g. encryption and decryption) are depicted in the following table.

![underlying process](/assets/img/underlying_process_KMS01.jpg)

A KMS uses envelop encryption and multiple layers of keys to securely manage keys for the encrypted data. Envelope encryption combines a symmetric encryption algorithm, data encryption keys (DEKs) and key encryption keys (KEKs). The diagram shows the various hierarchy of encryption keys used to protect data. For example, data is first encrypted with DEKs (lowest level) using envelope encryption, which is protected by KEKs (second level). The
latter is then protected by a CMK (third level) and an HMK (highest level). The CMK can also be a key that a Cloud Service Provider (CSP) manages. Agencies should use CMK for greater control over the key as it is generated and managed by the user.

![underlying process](/assets/img/underlying_process_KMS02.jpg)

### HOW KEY MANAGEMENT SYSTEMS PROTECT DATA IN CLOUD
Key Management System technologies are part of the Secret Management control and measures within the Visibility Cloud Tenet.

![KMS protect](/assets/img/protect_keys_KMS.jpg)

Organisations are recommended to subscribe and use CSP native Key Management Service for data protection. Users can create, own and manage keys in a multitenant environment. CSP KMS service provides native integration into its CSP services to encrypt data across workloads following configuration. The following are typical use cases.

![KMS use case](/assets/img/use_cases_KMS.jpg)

KMS implementation can vary from CSP native KMS service, to adding a dedicated HSM Cloud service and further enhance by adding “bringing your own key” to strengthen data and keys protection. The following implementation combinations outline the support for core Key Management functions.

![KMS function](/assets/img/type_functions_KMS.jpg)

Subsequent article(s) will cover implementation using CSP CloudHSM and Bring-Your-Own-Key (BYOK) technologies to augment Cloud native KMS.
