---
title: Getting started with XCA
layout: layout-page-sidenav
description: Onboarding steps for XCA
single_level_nav: true
_data: single-level-nav
---

All project code hosted on SHIP-HATS 2.0 GitLab are transparently onboarded to XCA.

XCA CI runs in two situations:
1. When a Merge Request is created: Scan changed files in the Merge Request.
2. When new code is committed to the default branch: Scan all files on the default branch.

**To access XCA findings:**

1. When a Merge Request is created: Wait for the job to complete and check the security scanning Merge Request widget.
  <figure style="text-align: center">
    <img src="/assets/img/xca-fig-1-merge-request.png" width="80%" height="80%" />
	    <figcaption>Fig 1: A screenshot of the Merge Request.</figcaption>
  </figure><br />
2. When new code is committed to the default branch: Wait for the job to complete and check the project’s Security & Compliance > Vulnerability Report page. XCA findings are marked as “XCA” under the Identifier and Tool columns.

  <figure style="text-align: center">
    <img
      src="/assets/img/xca-fig-2-report.png" width="80%" height="80%"
    />
	    <figcaption>Fig 2: A screenshot of the XCA findings on the Vulnerability Report page.</figcaption>
  </figure>
