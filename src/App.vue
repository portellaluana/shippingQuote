<template>
  <div id="app">
    <ShippingForm @show-modal="showModal" />
    <ModalCEP v-if="isModalVisible" @close-modal="closeModal" />
  </div>
</template>

<script>
import ShippingForm from "./components/ShippingForm.vue";
import ModalCEP from "./components/ModalCEP.vue";

export default {
  components: {
    ShippingForm,
    ModalCEP,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>



<style>
body {
  background-image: url("/public/background.svg");
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
}
#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3c4151;
  min-height: 100vh;
  /* background: linear-gradient(257.13deg, #02aeef 0%, #2a3580 88.14%); */
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>