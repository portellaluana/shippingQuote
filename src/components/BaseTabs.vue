<template>
  <div class="tabs">
    <div class="tab-buttons">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: tab === modelValue }"
        @click="changeTab(tab)"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tab-content">
      <slot v-if="modelValue === tabs[0]" :name="tabs[0]"></slot>
      <slot v-else :name="tabs[1]"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeTab(tab) {
      this.$emit("update:modelValue", tab);
    },
  },
};
</script>

<style scoped>
.tabs {
  max-width: 90%;
  background: white;
  border-radius: 8px;
  min-width: 1040px;
  min-height: 298px;
}

.tab-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.tab-buttons button {
  flex: 1;
  background: none;
  border: none;
  padding: 12px;
  cursor: pointer;
  font-weight: bold;
  color: #3333334c;
  transition: color 0.3s ease-in-out;
  border-radius: 8px;
}

.tab-buttons button.active {
  color: #02aeef;
  background-color: white;
}

.tab-buttons button {
  background-color: #f1f5f9;
}

@media (max-width: 768px) {
  .tabs {
    min-width: 300px;
    min-height: 584px;
  }
}
@media (min-width: 768px) {
  .tabs {
    min-width: 700px;
    max-width: 700px;
  }
}
@media (min-width: 1080px) {
  .tabs {
    min-width: 1040px;
  }
}
</style>
