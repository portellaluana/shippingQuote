<template>
  <button :type="type" class="base-button" @click="$emit('click')">
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
.base-button {
  background-color: #02aeef;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 16px;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
}
.base-button:hover {
  background-color: #028ecc;
}
</style>