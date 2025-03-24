<template>
  <div v-if="showModal" class="modal">
    <div v-if="data && data.length > 0">
      <div class="modal-container">
        <div class="modal-title">
          <h4>Histórico de cotações</h4>
        </div>
        <div class="modal-header">
          <div v-for="(item, index) in itens" :key="index">
            <p class="header-item">{{ item }}</p>
          </div>
        </div>
        <div>
          <div v-for="(item, index) in data" :key="index" class="modal-content">
            <div class="modal-content-item">
              <p class="list-number">#{{ index + 1 }}</p>
              <p>{{ item.SellerCEP }}</p>
              <p>{{ item.RecipientCEP }}</p>
              <p>{{ item.ShipmentInvoiceValue }}</p>
              <div
                v-for="(shippingItem, shippingIndex) in item.ShippingItemArray"
                :key="shippingIndex"
                class="history-item"
              >
                <p>{{ shippingItem.Quantity }}</p>
                <p>{{ shippingItem.Weight }}</p>
                <p>{{ shippingItem.Width }}</p>
                <p>{{ shippingItem.Height }}</p>
                <p>{{ shippingItem.Length }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button @click="close">Fechar</button>
    </div>
  </div>

  <div v-if="showModal" class="filter" @click="close"></div>
</template>
  
  <script>
export default {
  data() {
    return {
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
      currentItemIndex: 0,
    };
  },
  props: {
    showModal: Boolean,
    data: Array,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
  
  <style scoped>
.history-item,
.modal-content-item {
  display: flex;
}
.modal-content-item > p {
  width: 100px;
}
.filter {
  width: 100vw;
  position: absolute;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.323);
  z-index: 1;
  top: 0;
}
p {
  display: flex;
  font-size: 10px;
  width: 100px;
}
.list-number {
  font-size: 14px;
  font-weight: 800;
  color: #3c41512e;
  margin: 0;
  padding: 0;
  width: 100px;
}
.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  overflow-y: auto;
  z-index: 2;
  position: absolute;
}
.history-item,
.modal-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0 auto;
  align-content: center;
}

.header-item {
  font-size: 11px;
  text-transform: uppercase;
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

.modal-body {
  margin-top: 20px;
}

.modal-body h4 {
  margin: 10px 0 5px 0;
}

.modal-body p {
  margin: 5px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table th {
  background-color: #f4f4f4;
}
</style>
  