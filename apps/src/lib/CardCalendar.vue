<template>
  <div class="sgds-card">
    <!-- Only available on Mobile View -->
    <slot name="event-status"></slot>
    <div class="sgds-card-content">
      <div class="content-grid is-flex">
        <!--Desktop Calendar Slot -->
        <slot name="calendar"></slot>
        <!--Content Slot -->
        <div>
          <slot name="header"></slot>
          <slot name="content">
            <div>
              <slot name="main-content">
                <slot name="mobile-calender"></slot>
                <slot name="recording"></slot>
                <slot name="category"></slot>
              </slot>
            </div>
            <slot name="front-matter-attributes"></slot>
          </slot>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>
