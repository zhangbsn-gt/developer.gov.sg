---
title: Purple HATS Use Cases
layout: layout-page-sidenav
description: Use Cases for Purple HATS
single_level_nav: true
_data: single-level-nav
---

### Improving website accessibility for screen reader users

A screen reader user provides feedback that they are not able to understand and navigate across the different website pages because all the navigational buttons read out as "Buttons".

**How Purple HATS can help:**

- Purple HATS can scan through the entire website to identify and provide a report on its accessibility-related code issues
- Using the report, developers will be able to quickly pick out similar code issues related to the feedback and refer to the WCAG clause which provides more information and possible solutions
- If the affected code is part of a component, fixing it at the component level may improve the accessibility across all other pages that uses the component
- The other accessibility issues in the report can also be used to plan the team’s accessibility roadmap.

### Prioritising accessibility improvements

A product owner is concerned about the state of their websites’ accessibility and looking to start improving accessibility.

**How Purple HATS can help:**

- Purple HATS scan not only provides a list of accessibility code issues, but the report also provides a recommendation on how these fixes should be prioritised. This enables product owners to have an overview of their website’s accessibility status at the code level
- This report can be used to relay information about the website's accessibility to stakeholders and aid in decisions around accessibility practices
- Based on the team's resourcing, the report can also be used to inform/guide the accessibility roadmap

### Continuously scanning for website accessiblity

A website is currently undergoing a sprint where accessibility fixes have been made, and a DevOps engineer would like to ensure that these fixes have not disrupted any other part of the code base.

**How Purple HATS can help:**

Agencies can run Purple HATS on any CI/CD tool which supports Docker-based runners. The specific instructions provided below are for SHIP GitLab.

The steps below will show you how to implement Purple HATS in the CI / CD pipeline:

1. Create a SHIP GitLab Testing Pipeline under your Project.
2. Build and push the Docker container.<br />
    a. Purple HATS can be installed in a container environment using the included Docker template at Dockerfile.<br />
    b. Build and push the image to your GitLab’s project’s container registry.
    
    ```
    # Checkout the Purple hats repository
    git clone https://github.com/GovTechSG/purple-hats/git
    
    # Navigate to Purple-hats
    cd purple-hats
    
    # Build the image locally
    docker buildx build --platform linux/amd64 -t purple-hats
    
    # Login to your container registry with you username and personal access token
    # You may generate personal access tokens with read registry and write registry permissions at
    # https://sgts.gitlab-dedicated.com/profile/personal_access_tokens
    
    docker login registry.sgts.gitlab-dedicated.com
    
    # Tag your image ready for SHIP GitLab
    docker tag purple-hats:latest registry.sgts.gitlab-dedicated.com/<GitLab username>/<project name>
    
    # Push to the GitLab container registry
    docker push registry.sgts.gitlab-dedicated.com/<GitLab username>/<project name>
    ```  
3. Configure the pipeline on GitLab.<br />
    a. Create .gitlab-ci.yml in a test pipeline in the GitLab Editor. <br />
    b. Copy the contents of gitlab-pipeline-template.yml and configure the following:<br />
    &nbsp;&nbsp;&nbsp;&nbsp;i. &nbsp;&nbsp;Set any tags required to identify the GitLab runner you wish to run your pipeline, e.g. ship_docker.<br />
    &nbsp;&nbsp;&nbsp;&nbsp;ii. &nbsp;Replace <some registry> with the URL to docker image.<br />
    &nbsp;&nbsp;&nbsp;&nbsp;iii. Edit the accessibility scan parameters with the type of scan you want to run:<br />
  
    ```
    # URL of the website or sitemap
    A11Y_SCAN_URL: "https://example.com"

    # Set the scan type [choices: "sitemap:", "website"]
    A11Y_SCAN_TYPE: "website"

    # Set the maximum number of pages to scan [default: 100]
    A11Y_SCAN_MAX_NUM_PAGES: 100
  
    # Zip filename of the artifact
    A11Y_SCAN_ARTIFACT_NAME: "ally-scan-results.zip"
    ```
    &nbsp;&nbsp;&nbsp;&nbsp;iv. Commit the changes to GitLab.<br />
    c. Check to see if the pipeline starts by navigating to your project > CI/CD > Jobs. You will then see the job complete, and the following:<br />
    &nbsp;&nbsp;&nbsp;&nbsp;i. &nbsp;&nbsp;A summary of total issue count and issue breakdown will be in the job log.<br />
    &nbsp;&nbsp;&nbsp;&nbsp;ii. &nbsp;A generated Purple HATS report can be downloaded at “Job artefacts” panel on the right panel as shown in the screenshot below.
    
  <figure style="text-align: center">
      <img src="/assets/img/purple-hats-fig-4.png" width="70%" height="70%" alt="Fig 1:A screenshot of the Gitlab pipeline running an accessibility scan."/>
	      <figcaption>Fig 1: A screenshot of the GitLab pipeline running an accessibility scan.</figcaption>
    </figure>
