---
title: Terms Search
layout: layout-sidenav
permalink: /terms/
category: Terms
breadcrumb: Terms
---
<div id="terms">
    <label for="search-input">
        Enter an initialism or acronym:
    </label>
    <div v-bind:style="searchBarStyles">
        <input 
            type="text" 
            id="search-input" 
            class="input" 
            placeholder="SGTS"
            v-model="search">
    </div>
    <br>
    <div v-for="term in filteredTerms" 
        v-cloak
        v-bind:style="filteredTermStyle"
        class="sgds-card">
        <div class="sgds-card-content">
            <p class="title">(( term.name ))</p>
            <p class="subtitle">(( term.fullName ))</p>
            <p>(( term.description ))</p>
        </div>
    </div>
</div>
{% if jekyll.environment == "production" %}
   <script src="https://cdn.jsdelivr.net/npm/vue"></script>
{% endif %}
{% if jekyll.environment != "production" %}
   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" type="text/javascript"></script>
{% endif %}

<script src="/assets/js/search-vue-app.js" type="text/javascript"></script>