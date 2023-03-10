---
title: ACAS Features
layout: layout-page-sidenav
description: Features provided by ACAS
single_level_nav: true
_data: single-level-nav
---

ACAS consists of these modules:

### Insecure Direct Object Reference (IDOR) Module

IDOR is a type of access control vulnerability that arises when an application uses user-supplied input to access objects directly. If no other controls are in place, an attacker can simply modify the input value to perform actions on other records that they should not have access to.

ACAS modifies Django model objects to use random object identifiers with high entropy, enabling it to harden against IDOR attacks from sequential or guessable identifiers.

### Broken Access Control Module

Broken Access Control vulnerabilities are when a user is allowed access to some resource or perform some action that they are not supposed to. This is typically due to missing authorisation checks before allowing access.

ACAS modifies all Django views to be inaccessible by default. Each view must be explicitly annotated by a decorator with a specific role or permission that should be allowed access.

### Malicious File Upload Module

Malicious File Upload vulnerabilities are when users are allowed to upload files without sufficiently validating file properties such as type, contents, or size. The failure to properly enforce restrictions could allow an attacker to misuse a basic upload function to upload arbitrary and potentially dangerous files that execute on the server when uploaded, or when opened by another user.

ACAS validates magic bytes, or inspects file type headers of all uploaded files to match the file-extension of the uploaded file. In addition, ACAS also checks against a predefined file-extension whitelist, as well as filename sanitisation, file size limits, and optional anti-virus scans and malicious signature checks.

### Server-Sided Request Forgery (SSRF) Module

SSRF vulnerabilities allow an attacker to induce the server-sided application into requesting access to an unintended location such as internal-only services within the organisation’s infrastructure. It can also force the server to connect to external systems, potentially leaking sensitive data such as authorisation credentials.

ACAS requires the use of secure request composition, allowing downstream HTTP requests to backends or third-party APIs. Only whitelisted domains/IPs, paths, and methods can be called, eliminating the possibility of attacker-controlled destinations.

### Cross-site Scripting (XSS) Module

XSS vulnerabilities allow an attacker to compromise and masquerade the interactions a user has with the server-sided application by introducing malicious JavaScript to the user. The attacker can carry out actions and access data a user can perform and access. XSS is particularly damaging if the victim has privileged access on the application.

ACAS removes unsafe template filters or functions from Django. All HTML, including JavaScript that originates from server-side variables, will always escape before it is returned to the client, with further client-side mitigations.

### Remote Code Execution Module

Remote Code Execution or OS command injection vulnerabilities allow attackers to execute arbitrary commands in the application or operating system (OS). This typically compromises the application and all its data completely.

ACAS removes unsafe command injection functions from Django.

### SQL Injection (SQLi) Module

SQLi vulnerabilities are when an attacker interferes with the queries that an application makes to its database. This allows the attacker to access data they are not normally able to retrieve. In some cases, they can even modify or delete data, causing persistent changes to the application’s behavior.

ACAS removes unsafe SQL functions from Django as all interactions with the database are performed securely through the Object-Relational Mapper (ORM) to mitigate the risk.
