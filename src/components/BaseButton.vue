<template>
  <button :type="type" :classe="classe">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    classe: String,
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>

<style scoped>
.primary-btn {
  background-color: #02aeef;

  border: none;

  font-weight: 700;

  color: white;
  width: 100%;
}
.primary-btn:hover {
  background-color: #028ecc;
}
.secondary-btn,
.primary-btn {
  border-radius: 6px;
  font-size: 14px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.secondary-btn {
  width: 100%;
  background-color: white;
  border: 1px solid #02aeef;
  font-weight: 700;
  color: #02aeef;
  margin: 8px 0;
}
</style>