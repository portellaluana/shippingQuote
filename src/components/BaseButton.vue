<template>
  <button :type="type" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>
<style scoped>
button {
  background-color: #02aeef;
  border-radius: 2px;
  border: none;
  font-size: 10px;
  padding: 4px 8px;
  color: white;
  font-weight: 700;
  width: 90px;
  height: 32px;
}
</style>