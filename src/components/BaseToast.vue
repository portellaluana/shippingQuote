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
      if (this.toasts.length > 0) {
        this.toasts.shift();
      }

      const toast = { type, title, message };
      this.toasts.push(toast);

      setTimeout(() => {
        this.toasts.shift();
      }, 50000000);
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
}
.toast-container {
  z-index: 3;
  position: absolute;
  top: 20px;
  right: 0;
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

.toast-success {
  border-left: 12px solid #48d666;
}
.toast-error {
  border-left: 12px solid #ff355a;
}
.toast-info {
  border-left: 12px solid #2f86e7;
}
.toast-warning {
  border-left: 12px solid #fbc226;
}
@media (max-width: 940px) {
  .toast-container {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    bottom: auto;
  }
}
</style>
