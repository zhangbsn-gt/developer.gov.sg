---
title: GovWallet – The e-Wallet Module that Makes Government Disbursements a Breeze
layout: layout-page-sidenav
category: Platform
sub_collection_render: true
single_level_nav: true
_data: single-level-nav
collection_group: [Citizen-facing Products]
redirect_from:
  - /products/categories/platform/govwallet/
  - /products/categories/platform/govwallet.html
  - /technologies/platform/govwallet/
  - /technologies/platform/govwallet.html
sgts_collection_group: [payment]
sgts_layer_group: [services]
sgts_title: GovWallet
collection_group: [Singapore Government Tech Stack]
description: GovWallet facilitates the distribution of pay-outs from government agencies to beneficiaries, conveniently and securely.

---

![GovWallet header banner for Singapore Government Developer Portal](/assets/img/GovWallet-HeaderBanner-v1b.png)

[GovWallet](https://www.wallet.gov.sg/){:target="_blank"} is a digital wallet module that Government agencies can use to disburse monies and credits to citizens and beneficiaries conveniently and securely.

GovWallet is part of the Service layer of the [Singapore Government Tech Stack (SGTS)](https://www.developer.tech.gov.sg/singapore-government-tech-stack/){:target="_blank"}. As a backend service module, GovWallet can be integrated with any government mobile applications (e.g. LifeSG and Singpass) to allow beneficiaries to spend the credits at merchants with PayNow and NETS e-payment methods. It is also integrated with ATMs to facilitate cash disbursement to people without banking accounts.

GovWallet allows the agencies to maintain control of their distribution exercises, while beneficiaries can track their pay-out and spending history via various frontend channels. One of its key features is that it enables agencies to select specific merchants and control where pay-outs can be used.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wZTU7YibAVU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

By leveraging local banks’ PayNow and NETS e-Payment ecosystems, GovWallet is able to perform instant transfers from agencies to the merchants. For beneficiaries without bank accounts and mobile devices, the GovWallet team has partnered with the Central Provision Fund Board (CPFB) and OCBC Bank to allow beneficiaries to withdraw their pay-outs from OCBC’s ATMs.

It started off as an internal pilot project by GovTech’s Government Digital Services (GDS) team to enable GovTech to credit staff benefits into GovWallet and allows the recipients to transfer these benefits to their PayNow accounts or use them at merchants that accept the PayNow e-Payment method.

GovTech’s Government Digital Services (GDS) team built and deployed GovWallet fully on the cloud, which allows the team to flexibly scale compute and storage capacities based on the data demands of the respective campaigns. Adopting a serverless architecture allowed the team to focus on making GovWallet more cost-efficient, performant, and responsive to traffic surge.

Agencies no longer need to develop individual systems to conduct their respective distribution exercises, and beneficiaries can easily access their government pay-outs through familiar app interfaces.

Since then, GovWallet has received interest from many organisations to be used in household and social assistance programmes, sector-specific relief programmes, and even staff recognition programmes.

### Key Benefits

- **For beneficiaries**

GovWallet retains familiar user experience by integrating with existing government apps. It provides beneficiaries a view of their government pay-outs and spending, allows immediate access to their available government pay-outs and reminds beneficiaries to spend their remaining credit balance.
What used to take multiple steps and even a visit to a service counter can now be done anytime, anywhere by beneficiaries. It also helps to reduce confusion on how much pay-outs have been received, and enhances security by removing the need for beneficiaries to click on potentially suspicious SMSes.

It also promotes inclusion because even people without bank accounts can view and utilise their government pay-outs via apps like LifeSG.

- **For merchants**

GovWallet makes payments to merchants a convenient and seamless process.  Payments are made through the PayNow and NETS e-payments infrastructure, which means that fund transfers are instant. Many merchants are already onboard PayNow and NETS, so no additional sign-ups or additional equipment are required.

This makes it easier for e-commerce platforms like Shopee and Lazada, and charity organisations like ComChest and Giving.sg, to participate in government disbursement programmes, as there are now lower barriers of entry on the e-payment front.

- **For government agencies**

GovWallet makes it easy for agencies to design e-credits and voucher schemes that are more targeted, and to disburse to beneficiaries in a secure and convenient way. It also reduces the need for the physical printing of vouchers and the manpower required to manage related administrative tasks.

Agencies can specify the list of merchants that qualify for each scheme. For example, they can ensure that the credits or vouchers have to be spent at heartland shops or at merchants that meet healthy lifestyle standards.

### Key Features

- Control of where pay-outs can be spent
- Control of pay-outs validity period
- Integration with frontend interfaces
- Supports PayNow and NETS payment
- Supports GovCash (withdrawal of pay-outs in cash via ATMs)

Refer to the [Features](/products/categories/platform/govwallet/features){:target="_blank"} tab for more details.

### Success Stories

MINDEF and the Ministry of Home Affairs are currently using GovWallet to disburse NS recognition benefits for more than 1 million SAF, SCDF and SPF men through the LifeSG app. CPFB has also tapped on GovWallet to create GovCash to administer the Workfare Income Supplement and GST Voucher schemes, which replaces cheque issuance to all their unbanked recipients. 

The unbanked citizens can withdraw their pay-outs from the OCBC ATMs integrated with GovWallet, or spend their pay-outs via the LifeSG app.

As a backend module, GovWallet has integrated with LifeSG, Singpass and Healthy 365 apps, servicing around 1.3 million users.

The team has also worked with bank industry partners such as DBS, OCBC and NETS to provide more spending options for the citizens. Users on GovWallet can spend their funds at merchants with PayNow and/or NETS payment rails. This means tapping into the PayNow payment ecosystem of 164,000 merchants and the NETS payment ecosystem of 43,000 merchants today.

### Pricing

For queries about GovWallet’s pricing and transaction costs, contact the product team through this [form](https://form.gov.sg/62280856ba91100012050933){:target="_blank"}.

### Contact Us

{% include contact-us-form.html %}
