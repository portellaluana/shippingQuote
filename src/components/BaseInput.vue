<template>
  <div>
    <h6>{{ label }}</h6>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :class="classe"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    classe: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
h6 {
  margin: 16px 0 8px 0;
  text-align: left;
}
input {
  background: #f1f5f9;
  border-radius: 2px;
  border: none;
  font-size: 10px;
  padding: 4px 8px;
  height: 24px;
}

.small {
  width: 110px;
}
</style>
