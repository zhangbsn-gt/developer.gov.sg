---
title: Purple HATS Use Cases
layout: layout-page-sidenav
description: Use Cases for Purple HATS
single_level_nav: true
_data: single-level-nav
---

### Improving website accessibility for screen reader users

Screen reader users are not able to understand and navigate across the different website pages because all the navigational buttons read out as “Buttons”. By using Purple HATS, agencies will be able to:

- Scan through the entire website and identify and generate the report on the accessibility-related code issues.
- With the report, developers will be able to quickly pick out similar code issues and refer to the WCAG clause which provide more information and possible solutions
- If the affected code is part of a component, fixing it at the component level may improve the accessibility across all other pages that uses the component
- The other accessibility issues in the report can also be used to plan the team’s accessibility roadmap.

<figure style="text-align: center">
      <img src="/assets/img/Fig-2-Purple-HATS.png" width="75%" height="75%" alt="Fig 2: A screenshot of the Purple HATS Accessibility Site Report."/>
	      <figcaption>Fig 2: A screenshot of the Purple HATS Accessibility Site Report.</figcaption>
    </figure>

<figure style="text-align: center">
      <img src="/assets/img/Fig-3-Purple-HATS.png" width="75%" height="75%" alt="Fig 3: A screenshot showing how the Accessibility Site Report makes recommendations for improvements."/>
	      <figcaption>Fig 3: A screenshot showing how the Accessibility Site Report makes recommendations for improvements. </figcaption>
    </figure>

    
### Prioritising accessibility improvements

To help agencies improve their websites' accessibility, Purple HATS report will group accessibility issues into 2 buckets: “Must-Fix” and “Good-to-Fix”.

-  **Must-Fix issues**: These issues require immediate attention as they create significant barriers for Persons with Disabilities (PWDs), preventing them from accessing essential content or features. For example, the absence of form labels hinders accessibility, as they are crucial for screen reader users to understand input expectations and navigate the form effectively.
-  **Good-to-Fix issues**: These issues may pose challenges for PWDs, but do not completely hinder their access to essential content or features. An example is ensuring that all page content is contained within appropriate landmarks, making navigation easier for screen reader users. Content outside of these landmarks can be difficult to find and the content’s purpose may be unclear, making it inconvenient for screen reader users.


Users should prioritise the “Must-Fix” issues first to prevent the exclusion of PWDs. To assist users in prioritisation, the report also provides additional information on each issue, such as:

- Why it matters: An explanation of the impact and implications of the issue on accessibility.
- WCAG Success Criteria conformance: Identification of the specific violation of the Web Content Accessibility Guidelines (WCAG) associated with the issue.
- Location of each occurrence: The specific areas or pages where the issue is present on the website or platform.
- Recommended fixes: Suggestions and guidance on how to address and resolve the issue effectively.

<figure style="text-align: center">
      <img src="/assets/img/Fig-4-Purple-HATS.png" width="75%" height="75%" alt="Fig 4: The Accessibility Site Report helps you to prioritise the accessibility fixes for your website."/>
	      <figcaption>Fig 4: The Accessibility Site Report helps you to prioritise the accessibility fixes for your website. </figcaption>
    </figure>

### Continuously scanning for website accessibility

Scenario: An agency website is currently undergoing a sprint where accessibility fixes have been made. A DevOps engineer in the agency wants to ensure that these fixes have not disrupted any other part of the code base.

To do so, the engineer can run Purple HATS on any CI/CD tool which supports Docker-based runners. 

The specific instructions provided below are for SHIP GitLab, and the steps show how to implement Purple HATS in the CI/CD pipeline:

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
    b. Copy the contents of [gitlab-pipeline-template.yml](https://github.com/GovTechSG/purple-hats/blob/master/gitlab-pipeline-template.yml){:target="\_blank"} and configure the following:<br />
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

    # Name:E-mail for telemetry data
    A11Y_SCAN_NAME_EMAIL: "John Doe:john@domain.com"
    ```
    &nbsp;&nbsp;&nbsp;&nbsp;iv. Commit the changes to GitLab.<br />
    c. Check to see if the pipeline starts by navigating to your project > CI/CD > Jobs. You will then see the job complete, and the following:<br />
    &nbsp;&nbsp;&nbsp;&nbsp;i. &nbsp;&nbsp;A summary of total issue count and issue breakdown will be in the job log.<br />
    &nbsp;&nbsp;&nbsp;&nbsp;ii. &nbsp;A generated Purple HATS report can be downloaded at “Job artefacts” panel on the right panel as shown in the screenshot below.
    
  <figure style="text-align: center">
      <img src="/assets/img/purple-hats-fig-4.png" width="75%" height="75%" alt="Fig 5: A screenshot of tthe GitLab pipeline running an accessibility scan."/>
	      <figcaption>Fig 5: A screenshot of the GitLab pipeline running an accessibility scan.</figcaption>
    </figure>
    
4. After the user has configured and run an accessibility scan in GitLab CI/CD pipeline, the results will be uploaded as a Job Artifact.

<figure style="text-align: center">
      <img src="/assets/img/Fig-6-Purple-HATS.png" width="75%" height="75%" alt="Fig 6: Screenshot of a Job artifact uploading."/>
	      <figcaption>Fig 6: Screenshot of a Job artifact uploading.</figcaption>
    </figure>

   The user can access the scan results by browsing the CI/CD Job page, and clicking the Download button under Job artifacts to view the report.html file which contains the Purple HATS report.

<figure style="text-align: center">
      <img src="/assets/img/Fig-7-Purple-HATS.png" width="75%" height="75%" alt="Fig 7: Screenshot showing the location of the report.html file."/>
	      <figcaption>Fig 7: Screenshot showing the location of the report.html file.</figcaption>
    </figure>
    
