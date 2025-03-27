<template>
  <div v-if="showModal" class="modal">
    <div v-if="localData && localData.length > 0" class="modal-container">
      <div class="modal-title">
        <h4>Histórico de cotações</h4>
      </div>
      <div class="modal-header">
        <div v-for="(item, index) in itens" :key="index">
          <p class="header-item">{{ item }}</p>
        </div>
      </div>
      <div id="modal-body">
        <ul v-for="(item, index) in localData" :key="index">
          <li id="list-number">#{{ index + 1 }}</li>
          <li><span>Origem:</span> {{ item.SellerCEP }}</li>
          <li><span>Destino:</span> {{ item.RecipientCEP }}</li>
          <li>
            <span>Valor declarado:</span>R$ {{ item.ShipmentInvoiceValue }}
          </li>

          <div
            v-for="(shippingItem, idx) in item.ShippingItemArray"
            :key="idx"
            class="shipping-array"
          >
            <li><span>Quantidade:</span> {{ shippingItem.Quantity }}</li>
            <li><span>Peso:</span> {{ shippingItem.Weight }}</li>
            <li><span>Largura:</span> {{ shippingItem.Width }}</li>
            <li><span>Altura:</span> {{ shippingItem.Height }}</li>
            <li><span>Comprimento:</span> {{ shippingItem.Length }}</li>
          </div>
        </ul>
      </div>

      <BaseButton class="close-icon" @click="close" />
      <BaseButton class="primary-btn" @click="clearHistory">
        Limpar histórico
      </BaseButton>
    </div>
  </div>

  <div v-if="showModal" class="filter" @click="close"></div>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  data() {
    return {
      components: {
        BaseButton,
      },
      itens: [
        "",
        "Origem",
        "Destino",
        "Valor",
        "Quantidade",
        "Peso",
        "Largura",
        "Altura",
        "Comprimento",
      ],
      localData: [],
    };
  },
  props: {
    showModal: Boolean,
    data: Array,
  },
  watch: {
    data(newData) {
      this.localData = [...newData];
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    clearHistory() {
      localStorage.removeItem("quote-history");

      this.localData = [];

      this.$emit("close");
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
  width: auto;
  margin: 16px 0;
  border-radius: 6px;
  font-size: 14px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.3s;
}
.primary-btn:hover {
  background-color: #028ecc;
}

.modal-container {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}
li {
  list-style: none;
  width: 100px;
  font-size: 12px;
  text-align: left;
  align-items: center;
}
ul {
  border-bottom: 1px solid #02aeef;
  width: 900px;
  align-items: center;
  padding: 8px 0;
  margin: 6px 0;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: end;
}

ul:last-child {
  border-bottom: none;
}

.shipping-array {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  margin: 6px 0 0;
}

li span {
  display: none;
}

.close-icon {
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  opacity: 0.5;
  background-color: transparent;
  width: 12px;
  height: 12px;
  position: absolute;
  top: 12px;
  right: 12px;
  background-image: url("@/assets/close-icon.png");
}

.filter {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

p {
  display: flex;
  font-size: 10px;
  width: 100px;
}

#list-number {
  font-size: 14px;
  font-weight: 800;
  color: #3c41512e;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-item {
  font-size: 11px;
  text-transform: uppercase;
}
.modal-header {
  display: flex;
}
.modal-header > div {
  width: 100px;
  display: flex;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-weight: 500;
}

.modal-header h3 {
  margin: 0;
}

.modal-header button {
  background-color: red;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

#modal-body {
  max-height: 354px;
  overflow-y: auto;
  display: inline-flex;
  flex-direction: column;
}

#modal-body::-webkit-scrollbar {
  width: 8px;
}

#modal-body::-webkit-scrollbar-thumb {
  background-color: #02aeef;
  border-radius: 10px;
}

#modal-body::-webkit-scrollbar-thumb:hover {
  background-color: #02aeef;
}

#modal-body::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}
.modal {
  background-color: white;
  padding: 22px;
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (max-width: 940px) {
  #list-number {
    justify-content: start;
  }
  h4 {
    margin: 0 0 20px 0;
  }
  ul {
    display: inline-flex;
    flex-direction: column;
    padding: 0;
    align-items: start;
    padding-bottom: 8px;
    margin: 0 16px 8px 0;
    width: auto;
  }
  .shipping-array {
    display: inline-flex;
    flex-direction: column;
    padding: 0;
    align-items: start;
    padding: 8px 0;
  }

  .shipping-array:first-child {
    padding-top: 16px;
  }
  li {
    font-size: 12px;
    font-weight: 400;
    display: flex;
    margin-right: 12px;
    width: 100%;
  }

  li span {
    font-weight: 300;
    display: flex;
  }

  .modal-header {
    display: none;
  }
  .modal {
    background-color: white;
    padding: 22px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 2;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
