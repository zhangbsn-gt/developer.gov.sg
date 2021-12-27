---
title: Video Analytics System (VAS) – Enable. Exchange. Expand.
layout: layout-page-sidenav
category: Analytics
sub_collection_render: true
description: >
  VAS is a central platform that enable Government agencies to develop in-house video analytics solutions. 
bios:
---

### Overview

With the amount and quality of video data collected increasing every day, Video Analytics (VA) algorithms are gaining popularity in use-cases that include situational awareness, post-incident investigation, real-time analysis and monitoring, and extraction of insights and trends for further analysis.

VA is already being used in counting number of pedestrians to assess pathway effectiveness, counting number of fish feed to optimise the operations of aquaculture hatcheries, and many others.

Government agencies who are new to VA often find themselves these questions: How can we kickstart a VA project quickly and effortlessly? How can we leverage our own and other agencies’ videos for analysis? Is it possible to develop our own VA models without being locked in by private commercial vendors? How can we make use of the existing VA algorithms by GovTech?

Having worked with multiple agencies on a myriad of CCTV and VA requirements, GovTech’s Data Science & Artificial Intelligence Division (DSAID) developed the Video Analytics System (VAS), a central platform for agencies to meet their VA needs.

<figure style="text-align: center">
  <img
    src="/assets/img/vas-fig1.png" width="100%" height="100%" 
    alt="Fig 1: VAS"
  />
  <figcaption>Fig 1: VAS</figcaption>
</figure>

### What is VAS?

As a central platform, VAS aims to:
- Enable agencies to develop and deploy VA solutions.
- Exchange video data and analytics expertise across the whole-of-government (WOG).
- Expand the video sensor network and insights derived.

The key components of VAS are:

**Media Hub (video sharing platform)**
- Supports the upload, playback, search, request, and sharing of videos.
- Stream videos from cameras for on-demand viewing.

**Insights Service (VA-as-a-service)**
- Generate insights for your videos based on readily developed VA services for detection and counting of relevant events and objects
- Currently available VA Services:
  - Smoking action detection
  - Personal Mobility Devices (PMDs) / pedestrians / cyclists’ detection
  - Vehicle Dwell Time analysis and number plate recognition
- Allows customisation of regions of interest.
- Generate shareable reports and be notified when the analysis is completed.
- Export reports in CSV format for custom analysis.

**VA Enablement Service (VideoIO)**
- Train VA model based on a selection of common deep learning model options to detect objects of interest.
- Curate and manage custom datasets for the training process.
- Review and perform annotation for both video and images.
- Initial and monitor model training runs and be notified when the training has completed. 
- Test VA model by performing predictions using custom trained model versions.
- Export prediction results to CSV/JSON formats.

**Metadata Service**
- Search and filter aggregated metadata according to available attributes, such as Vehicle Type (e.g., bicycle or Personal Mobility Device (PMD)), Event Type Attribute (e.g., Smoking), and Spatial Attributes (e.g., postal code).

<figure style="text-align: center">
  <img
    src="/assets/img/vas-fig2.png" width="100%" height="100%" 
    alt="Fig 2: VAS components"
  />
  <figcaption>Fig 2: VAS components</figcaption>
</figure>

|Technical specifications of VAS||
|---|---|
|Hosting Platform|[Government on Commercial Cloud (GCC)](https://www.developer.tech.gov.sg/technologies/infrastructure-and-hosting/government-on-commercial-cloud.html){:target="\_blank"}|
|Architecture Infrastructure Standard|GovTech Application Infrastructure Architecture Standard (AIAS) "H" Model|
|Instruction Manual|[IM8 (ICT&SS Management)](https://www.developer.tech.gov.sg/guidelines/standards-and-best-practices/im8.html){:target="\_blank"}|
|Data Classification|Restricted and below|
|Data Sensitivity|Sensitive (Normal)|

|System requirements of VAS||
|---|---|
|Device|Government Standard Image Build (GSIB)|
|Browser|Google Chrome|
|Minimum Video Resolution|4CIF – 704 x 576p|
|Minimum Framerate|6 FPS|
|Video Container Formats|MP4, MKV, FLV, MJPEG|
|Video Codec Formats|H.264, H.265|
|Image Formats|JPG, JPEG, PNG|
|Annotation Formats|PASCAL VOC|

### Why Should VAS be Adopted?

The benefits provided by VAS include:

-	**Quicker enablement of VA tasks**: Agencies with VA use-cases can benefit from the get-go with the accessible and intuitive system. Users appreciate the ability to quickly generate insights and analysis from videos collected during trials, POCs, and pre-analysis work. 
-	**Reduction in manual analysis**: With VAS’ automated analysis processes, agencies can unlock critical time and cost savings.  For example, to help fish hatcheries optimise the usage of artemia (a type of microorganism used as fish feed), officers from the Singapore Food Agency (SFA) had previously reliedon manual counting of artemia, which can number around 1,000 per sample. With VAS, SFA officers now spend considerably less time conducting laborious manual counting. 
-	**Designed for agencies, by agencies**: Various Design Thinking workshops were held with agencies to seek their inputs. The system is also designed to respond quickly to changes. In sum, VAS is a product that is centered around what agencies need.

### How Do You Use VAS?

Onboarding of the VAS is by invitation only. Interested agencies can fill up this [form](https://go.gov.sg/vasenquiry){:target="\_blank"}. 

### Success Stories

In response to the COVID-19 pandemic, Singapore implemented Circuit Breaker measures in 2020 to contain the spread of the virus. These measures included closure of non-essential workplaces and prohibition of dining-in at eateries. During this Circuit Breaker period, many Singaporeans sought respite in parks and green spaces. As a result, popular parks were congested.

In response, NParks and GovTech collaborated to develop [Safe Distance @ Parks](https://safedistparks.nparks.gov.sg/){:target="\_blank"}. It is a website that provides real-time information on crowd density at Singapore’s green spaces. The website allows users to check crowd density before visiting a park. It also allows the authorities to monitor and prevent the parks from being too crowded.

<figure style="text-align: center">
  <img
    src="/assets/img/vas-fig3.png" width="100%" height="100%" 
    alt="Fig 3: Safe Distance @ Parks"
  />
  <figcaption>Fig 3: Safe Distance @ Parks</figcaption>
</figure>

VAS is a crucial component of Safe Distance @ Parks. It can be understood as the link between physical hardware and the Safe Distance @ Parks website. Input from CCTV cameras physically installed in the parks are sent to VAS for analysis. Thereafter, the analysed information is fed to and displayed on Safe Distance @ Parks.

### What's Next?

Work is in progress for VAS to support the following features in future releases:
Insights Service (VA-as-a-service)
-	Marine vessel / kayak detection
-	Safe distancing measurements and group detection
-	Compliance checks for biometric photo enrolments
-	Selected Commercial off the Shelf (COTS) solutions
-	Enhanced insights reports and API offerings

### Contact Information

For enquiries, fill in this [form](https://go.gov.sg/vasenquiry){:target="\_blank"}. 

### Meet the Team!

<div class="card-grid-container grid-25rem">
  {% for bios in page.bios %}
  {% assign img_url = "/assets/img/" | append: bios.img_src %}
  <div class="sgds-card">
    <div class="sgds-card-content">
      <img style="float: left; margin-right: 20px;" src="{{ img_url }}" alt="{{ bios.name}}">
      <p><strong>{{ bios.name}}</strong><br>
        {{ bios.desc }}
      </p>
    </div>
  </div>
  {% endfor %}  
</div>

Other VAS team members:
-	Bevin Seetoh (VideoIO Full Stack Engineer)
-	Bill Cai (DevOps Technical Lead)
-	Chia Tewan (AI QA Engineer)
-	Goh Kwang Huang (CVX Technical Lead)
-	Henry Luo (VideoIO Technical Lead)
-	Jessica Foo (AI QA Engineer)
-	Muthiah Nachiappan (Insight Service Technical Lead)
-	Muhammad Nazar (DevOps Engineer)
-	Rachel Shong (Agency Engagement Manager)
-	Richard Yan (DevOps Engineer)
-	Ruth Cheng (Agency Engagement Manager)
-	Tan Kai Wei (AI and Software Engineer)
-	Tham Shi Yi (AI QA Engineer)
-	Wang Yadong (Metadata Standards, QA Engineer)
