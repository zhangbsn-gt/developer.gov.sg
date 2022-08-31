---
title: Verify (Digital Certificates) Features
layout: layout-page-sidenav
description: Features of Verify (Digital Certificates).
single_level_nav: true
_data: single-level-nav
---

### Validity Check

Verify checks if the digital document such as a vaccination certificate has been **issued or revoked/no longer valid** against a repository on the blockchain.

For example, if a new vaccine turns out to be ineffective, the respective vaccination certificates can be revoked.


### Anti-tampering detection 

Verify can check if a document has been **tampered with** against a repository on the blockchain.

For example, if someone has forged information on a digital document, the document will not be successfully validated.

### Verification of certificate issuer

As part of the provenance of the digital document, the issuer is checked against the domain name system (DNS) records. 

As verification is done completely client-side, there is no need for backend integration and thus no data privacy concerns. Only the hash value, a cryptographically produced unique string is on the blockchain as part of verification against that of an .OA document – think of it as a fingerprint check for a file.