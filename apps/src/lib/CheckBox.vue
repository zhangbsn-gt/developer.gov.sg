<template>
  <div
    class="control d-flex padding--left--xs is-flex"
    style="justify-content: start; align-items: center; width: 100%"
  >
    <div class="checkbox d-flex align-items--center">
      <input
        type="checkbox"
        :checked="model"
        :id="checkboxID"
        :value="checkboxValue"
        class="margin--right"
        style="transform: scale(1.5)"
        @input="onInput"
      />
      <label class="checkbox" style="flex-grow: 1" :for="checkboxID">
        {{ checkboxLabel }}
      </label>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    checkboxID: {
      type: String,
      required: true,
    },
    checkboxValue: {
      type: String,
      required: true,
    },
    checkboxLabel: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  setup(props) {},
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    onInput(event) {
      // If the checkbox is checked, add the value to the array
      if (event.target.checked) {
        this.model.push(event.target.value);
      } else {
        // If the checkbox is not checked, find the index of the value in the array and remove it
        const index = this.model.indexOf(event.target.value);
        this.model.splice(index, 1);
      }

      // Emit the new value to the parent component
      this.$emit("input", this.model);
    },
  },
};
</script>
