<template>
  <div class="toast-container">
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      :class="`toast toast-${toast.type}`"
    >
      <div class="icon">
        <img :src="getIcon(toast.type)" alt="icon" />
      </div>
      <div class="message">
        <strong>{{ toast.title }}</strong>
        <p>{{ toast.message }}</p>
      </div>
      <BaseButton class="close-icon" @click="removeToast(index)"></BaseButton>
    </div>
  </div>
</template>

<script>
import emitter from "@/utils/eventBus";
import BaseButton from "./BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      toasts: [],
    };
  },
  methods: {
    addToast(type, title, message) {
      const toast = { type, title, message };
      this.toasts.push(toast);
      setTimeout(() => {
        this.toasts.shift();
      }, 5000);
    },
    removeToast(index) {
      this.toasts.splice(index, 1);
    },
    getIcon(type) {
      switch (type) {
        case "success":
          return "/success.png";
        case "error":
          return "/error.png";
        case "info":
          return "/info.png";
        case "warning":
          return "/warning.png";
        default:
          return "";
      }
    },
  },
  created() {
    emitter.emit("register-toast", this.addToast);
  },
};
</script>

<style>
.toast {
  width: 300px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  gap: 16px;
  border-left: 12px solid #ff355a;
}
img {
  width: 20px;
  height: 20px;
}
.message {
  color: #3c4151;
  text-align: left;
}
.close-icon {
  width: 12px;
  height: 12px;
  background-image: url("@/assets/close-icon.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  bottom: 60px;
  right: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
  opacity: 0.5;
}
.icon {
  display: flex;
}
p {
  font-size: 12px;
  margin: 0;
}
.toast-container {
  position: absolute;
  top: 20px;
  right: -200px;
}
</style>
