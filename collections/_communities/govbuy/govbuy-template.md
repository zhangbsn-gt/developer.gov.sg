---
title: GovBuy Page Template
layout: layout-page-sidenav
published: no # Make sure this is not published!
---

{% assign jobDetails = site.data.gigs | where: "title", page.title | first %}

{% unless jobDetails.open %}
**The bidding period for this job is over**
{% else %}
<a href="{{ jobDetails.bid_link }}" class="sgds-button is-primary">
  Submit your bid here
</a>
{% endunless %}


### The task

{% comment %}
Fill in here:

A brief description of the task
{% endcomment %}

### The project

{% comment %}
Fill in here:

A brief description of the project this task belongs to
{% endcomment %}

### The team

{% comment %}
Fill in here:

A brief description of the team administering this job
{% endcomment %}

### Deliverables

{% comment %}
Fill in here:

Specific deliverables of the job
{% endcomment %}

### Skills required

{% for skill in jobDetails.skills %}
- {{ skill }}
{% endfor %}

### Offer

{% include govbuy-offer-table.md 
  offer=jobDetails.offer duration=jobDetails.duration
  posted=jobDetails.posted closing=jobDetails.closing %}

### Evaluation methods

{% comment %}
Fill in here:

Specific deliverables of the job
{% endcomment %}
