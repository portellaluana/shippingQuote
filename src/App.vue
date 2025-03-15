<template>
  <div id="app">
    <div class="overlay">
      <ShippingForm msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
import ShippingForm from "./components/ShippingForm.vue";

export default {
  name: "App",
  components: {
    ShippingForm,
  },
};
</script>

<style>
#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3c4151;
  min-height: 100vh;
  background-image: url("./assets/background.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: white;
  padding: 20px;
  width: 60%;
  max-width: 1080px;
}

#app::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  z-index: 0;
}
</style>
