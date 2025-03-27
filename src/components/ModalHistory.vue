<template>
  <div v-if="showModal" class="modal">
    <div v-if="localData && localData.length > 0">
      <div class="modal-container">
        <div class="modal-title">
          <h4>Histórico de cotações</h4>
        </div>
        <div class="modal-header">
          <div v-for="(item, index) in itens" :key="index">
            <p class="header-item">{{ item }}</p>
          </div>
        </div>
      </div>
      <ul v-for="(item, index) in localData" :key="index">
        <li id="list-number">#{{ index + 1 }}</li>
        <li><span>Origem:</span> {{ item.SellerCEP }}</li>
        <li><span>Destino:</span> {{ item.RecipientCEP }}</li>
        <li><span>Valor declarado:</span>R$ {{ item.ShipmentInvoiceValue }}</li>

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
      <BaseButton class="close-icon" @click="close" />
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
  },
};
</script>


<style scoped>
li {
  list-style: none;
}
ul {
  border-bottom: 1px solid #02aeef;
}
ul,
.shipping-array {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
}
li span {
  display: none;
}
/* .delete {
  background-color: #3c4151;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 4px;
} */

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
/* .delete-icon {
  opacity: 1;
  width: 24px;
  height: 24px;
  background-image: url("@/assets/delete-icon.png");
} */

.filter {
  width: 100vw;
  position: absolute;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.323);
  z-index: 1;
  top: -3px;
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
.modal {
  background-color: white;
  padding: 22px;
  border-radius: 8px;
  width: auto;
  overflow-y: auto;
  z-index: 2;
  position: absolute;
  min-height: 254px;
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

@media (max-width: 940px) {
  ul,
  .shipping-array {
    display: inline-flex;
    flex-direction: column;
    padding: 0;
    align-items: start;
    padding-bottom: 16px;
    margin-right: 16px;
  }
  ul:last-child {
    display: block;
  }
  .shipping-array {
    padding-top: 16px;
  }
  li {
    font-size: 12px;
    font-weight: 400;
    display: flex;
    margin-right: 12px;
  }

  li span {
    font-weight: 300;
    display: flex;
  }

  .modal-header {
    display: none;
  }
}
</style>
