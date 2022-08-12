---
title: Getting Started with Secure Infrastructure-as-Code
layout: layout-page-sidenav
description: Secure Infrastructure-as-Code's onboarding steps.
single_level_nav: true
_data: single-level-nav
---

**Accessing code respositories (see our [Resources page](https://www.developer.tech.gov.sg/products/categories/infrastructure-and-hosting/secure-infrastructure-as-code/resources){:target="_blank"} section for more links)**

a) Onboard SHIP-HATS – more information [here](https://docs.developer.tech.gov.sg/docs/ship-hats-documentation/){:target="_blank"}.

b) Access different repositories
- **Module repository:** Terraform modules targeted at individual Cloud resources and services.
- **Sample application repositories:** Simple and fully functional application code that demonstrate various architecture patterns, and utilise modules found in the module repository.

c) For a start, refer to sample application deployments for a step-by-step guide on setting up an AWS S3 backend to store Terraform state files. Basic knowledge of Terraform is required.

**Using modules in the module registry**

Determine the module required and add the module link to the module repository as the module’s source parameter.

a) Information on the modules, their input and output parameters, can be found in the module repository.

<figure style="text-align: center">
  <img
    src="/assets/img/VPC gif.gif" width="70%" height="70%"
  />
	  <figcaption>Fig 1: Module information</figcaption>
</figure>


b) An example of using the Virtual Private Cloud (VPC) module to create a VPC:

``` 
module "vpc" {
 source         = "git::ssh://git@bitbucket-ssh.ship.gov.sg:7999/cloudfuqzk/siac-modules.git//modules/vpc?ref=v0.1.0-alpha"
  project_name   = local.project_name
  vpc_cidr_block = local.vpc_cidr_block
  # 90 days as indicated on IM8 Infra Security
  retention_in_days = 90
  kms_key_id        = module.log_group_kms.arn
}
```
<br>**Contributing to repositories**

Contributions are welcome, and users may raise a PR (Pull Request) to start the review process. More details on the required steps can be found in the respective repositories.

