<template>
  <div id="app">
    <ShippingForm
      @show-modal="showModal"
      @open-modal-historico="openModalHistorico"
    />
    <ModalCEP v-if="isModalVisible" @close-modal="closeModal" />
    <ModalHistorico
      :showModal="isModalHistoricoVisible"
      :data="shipmentData"
      @close="closeModalHistorico"
    />
  </div>
</template>

<script>
import ShippingForm from "./components/ShippingForm.vue";
import ModalCEP from "./components/ModalCEP.vue";
import ModalHistorico from "./components/ModalHistorico.vue";

export default {
  components: {
    ShippingForm,
    ModalCEP,
    ModalHistorico,
  },
  data() {
    return {
      isModalVisible: false,
      isModalHistoricoVisible: false,
      shipmentData: null,
    };
  },
  methods: {
    openModalHistorico() {
      console.log("app entrada");

      const quoteHistory = localStorage.getItem("quote-history");
      if (quoteHistory) {
        this.shipmentData = JSON.parse(quoteHistory);
      }

      this.isModalHistoricoVisible = true;
    },
    closeModalHistorico() {
      this.isModalHistoricoVisible = false;
    },
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
  box-sizing: border-box;
  background-image: url("/public/background.svg");
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  overflow: hidden;
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
@media (max-width: 940px) {
  body {
    overflow: scroll;
  }
}
</style>