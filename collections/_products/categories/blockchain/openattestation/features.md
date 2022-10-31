---
title: OpenAttestation Features
layout: layout-page-sidenav
description: Features of OpenAttestation
single_level_nav: true
_data: single-level-nav
---

### Verifiable credentials
This feature ensures that the content of a document has not been modified since its creation (except in the event of data omission via the built-in obfuscation mechanism). This is done by wrapping a document through the creation of a data key and signature object.

### Selective disclosure
OpenAttestation users can control what data to share, based on the obfuscation mechanism in place. This can be used to generate a new document containing a subset of the original data and which still allows the recipient to prove the provenance of the document.

### Decentralised rendering
OpenAttestation users can make changes to the codebase without any time lag, improving the speed and efficiency of creating documents. It also means that any external party’s codes will not impact what you are working on. You can also develop custom templates apart from the reference available in the [OpenAttestation gallery](https://gallery.openattestation.com/){:target="\_blank"}.

### Verification of issuer’s identity
The issuers can be identified against the DNS text records, which can be regarded as “the phonebook for the Internet”. The DNS system is a key part of the infrastructure and a decentralised system, which means a lower barrier to entry and no single point of failure.

The verification process primarily seeks to address these questions:
- Has the document been tampered with?
- Is the issuance state of the document valid?
- Is the document issuer’s identity valid?
