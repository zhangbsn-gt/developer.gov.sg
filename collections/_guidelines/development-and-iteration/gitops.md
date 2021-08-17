---
title: GitOps
layout: layout-page-sidenav
description: GitOps shifts DevOps operational processes to rely on the Git repository platform as the single source of truth.
---

### What is GitOps?

GitOps shifts DevOps operational processes to rely on the Git repository platform as the single source of truth.

### What are the key components of GitOps?

<b>Infrastructure as Code (IaC)</b>

DevOps practitioners use declarative Infrastructure as Code (IaC) languages such as Terraform, Amazon Web Services (AWS) CloudFormation, Azure BluePrints and Google Cloud Platform (GCP) Cloud Deployment Manager to express the state of their cloud infrastructure.

IaC captures the state of the system infrastructure, enabling records of past and present states to be kept in version control.

<b>Git Merge Requests</b>

DevOps practitioners follow Git conventions when developing their IaC.

The master/main branch is usually used to represent the current state of the infrastructure. DevOps practitioners use feature branches to make changes to the master/main branch and raise merge requests to deploy their changes.

In some scenarios, some teams may want an additional staging branch to ensure that changes to system infrastructure are deployed successfully before merging the staging branch to the master branch.

<b>Continuous Integration/Continuous Development (CI/CD) Automation</b>

Once the merge request is raised, the testing CI/CD pipeline is triggered and captured. The team reviews all build artifacts and test suite reports.

In the discussion thread for the merge request, the software development team can raise concerns and discuss the impacts of the change. The feature branch can be revised, and the CI/CD pipeline retriggered to address any issues.

Authorized approvers then vote to approve the merge request. The master branch CI/CD pipeline is configured to deploy the changes to the production environment upon approval.

<b>“Shifting Left”</b>

“Shifting Left” is important to software developers to have faster feedback cycles. It is better to conduct comprehensive testing in your CI/CD pipeline to catch any issues that could impact the system:

- Code Validation and Linting

- IaC Plans and Change Delta Analysis, Cost Projection 

- Policy as Code (PAC) tests to ensure that your IaC is compliant with security policy

- Static Application Security Testing to ensure your application code is free from known vulnerabilities

- Dynamic Application Security Testing to ensure your staging environment is free from known vulnerabilities

### How Can You Benefit from GitOps?

- <b>Auditable changes:</b> All pertinent information regarding the change, including change plans, test results, discussions and actions by approving authorities are captured in the pull request discussion thread, which acts as an audit log.

- <b>Faster feedback cycle:</b> Reviewing change reports and addressing change issues, approving changes and deploying automatically from the Git repository platform is more time-efficient than holding a Change Advisory Board meeting and manually performing changes on Cloud Providers’ management consoles or performing remote administration.

- <b>Spin up a new production environment from IaC:</b> All versions of the IaC are captured in the Git repository, allowing for recovery and rollback to previous known working deployments.

- <b> Improved Developer Experience (DevX):</b> Software development teams get to use familiar Git, CI/CD tools to perform operations on the system, reducing cognitive load.

- <b>Master branch reflects the state of the infrastructure:</b> As all states are kept in version control, it is easy to perform a rollback to a known working state or spin up new environments.

- <b>Reduces system attack vectors:</b> Using GitOps exclusively for deployment, in conjunction with using Immutable Infrastructure and using Configuration Management tools, reduce the need for manual system administration, and therefore reduces the attack vectors for a system.

### How is the Government Adopting GitOps?

Through several initiatives, we are improving our security policies and guidelines to encourage agencies to:
- Adopt Infrastructure as Code (IaC).
- Build their secure CI/CD pipelines on [SHIP](https://www.developer.tech.gov.sg/singapore-government-tech-stack/toolchain/overview.html){:target="_blank"}, our Singapore Government Tech Stack (SGTS) Git Repository platform.
- Leverage cloud-native solutions on the [Government Commercial Cloud](https://www.tech.gov.sg/products-and-services/government-commercial-cloud/){:target="_blank"}, our Cloud Hosting Environment on AWS, Azure and GCP.     
- Deploy and host cloud-native applications as containers to Kubernetes using GitOps on [Container Stack](https://www.developer.tech.gov.sg/singapore-government-tech-stack/runtime/container-stack){:target="_blank"}, our cloud-based container hosting platform that forms part of the SGTS Runtime Baselayer components that provide modern hosting options for system infrastructure.

### GitOps for Kubernetes

Deployment configurations to Kubernetes can be defined declaratively as YAML manifests. These manifest files can be stored in Git, representing the Kubernetes cluster’s desired state. These files are then deployed to Kubernetes as part of CI/CD, ensuring that the desired state matches the live state. 

Changes to these configurations, whether application image updates or operations tasks are carried out through Git. Git serves as an “Immutability Firewall” in GitOps for all changes to your Kubernetes cluster.

There are two main ways to achieve GitOps for Kubernetes: the “Push” or “Pull” Model.

<b>Push Model</b>

The Push Model represents a typical CI/CD pipeline, whereby Merge Requests trigger CI/CD pipelines to run and push the manifests files in Git to the Kubernetes cluster to be deployed.

<b>Pull Model</b>

The Pull Model makes use of GitOps Kubernetes Operators, which are deployed within the Kubernetes cluster, to watch for changes to the manifests files in Git, either by periodically polling or Git webhooks. Upon discovering changes, these GitOps Operators pull the changes from Git and deploy them to the cluster.

By continuously watching for changes in Git, the Pull Model affords benefits not found in the Push Model, such as:

- <b>Automatic synchronization and retries:</b> Should there be unexpected failures during deployments, auto-retry, auto-pruning and auto-healing mechanisms in GitOps, operators continuously ensure that configurations in Git are deployed to the cluster. 
- <b>Real-time visibility of cluster state:</b> With automated retry mechanisms, the desired state in Git accurately reflects the live state of the cluster.
- <b>Reduced vector of attack:</b> Sensitive credentials for privileged access to the Kubernetes cluster no longer need to be provided to any CI/CD pipeline for deployments since the GitOps operator residing in the cluster itself handles all deployments.


