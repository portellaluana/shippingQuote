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
.primary-btn:disabled {
  background-color: #b3b3b368;
  color: #3c41518a;
}
.secondary-btn {
  background-color: white;
  border: 1px solid #02aeef;
  color: #02aeef;
  display: flex;
  align-items: center;
}
.secondary-btn:hover {
  background-color: #02aeef;
  border: 1px solid #02aeef;
  color: white;
}

.link-btn {
  color: #02aeef;
  text-decoration: underline;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 10px;
  padding: 0;
  margin: 0 0 4px 0;
}

.primary-btn-text {
  background-color: transparent;
  border: none;
  font-weight: 800;
  color: #02aeef;
  width: auto;
  margin: 0;
  padding: 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
}

.primary-btn-text:hover {
  background-color: transparent;
}

@media (max-width: 940px) {
  .secondary-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>