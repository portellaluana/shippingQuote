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
  margin-bottom: 8px;
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
  background-color: white;
  border: 1px solid #028ecc;
  color: #028ecc;
  display: flex;
  align-items: center;
}
.secondary-btn:hover {
  background-color: #028ecc;
  border: 1px solid #028ecc;
  color: white;
}

.link-btn {
  color: #028ecc;
  text-decoration: underline;
  background-color: transparent;
  border: none;
}

@media (max-width: 768px) {
  .secondary-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>