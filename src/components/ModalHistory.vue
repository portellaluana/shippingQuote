<template>
  <div v-if="showModal" class="modal">
    <div v-if="localData && localData.length > 0">
      <div class="modal-container">
        <div class="modal-title">
          <h4>Histórico de cotações</h4>
        </div>
        <div class="modal-header-items">
          <div class="header-item">
            <input
              type="checkbox"
              v-model="selectAll"
              @change="toggleSelectAll"
            />
          </div>
          <div v-for="(item, index) in itens" :key="index">
            <p class="header-item">{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div v-for="(item, index) in localData" :key="index">
          <div
            class="modal-content-item"
            :class="{ 'no-border': index === localData.length - 1 }"
          >
            <input
              type="checkbox"
              class="input-checkbox"
              v-model="selectedItems"
              :value="item"
              @change="checkSelection"
            />
            <div class="container-cep">
              <p id="list-number">#{{ index + 1 }}</p>
              <div class="content-cep">
                <p><span>Origem:</span> {{ item.SellerCEP }}</p>
                <p><span>Destino:</span> {{ item.RecipientCEP }}</p>
                <p>
                  <span>Valor declarado:</span>R$
                  {{ item.ShipmentInvoiceValue }}
                </p>
              </div>
              <div class="shipping-items">
                <div
                  v-for="(shippingItem, itemIndex) in item.ShippingItemArray"
                  :key="itemIndex"
                  class="history-item"
                >
                  <div>
                    <p><span>Quantidade:</span> {{ shippingItem.Quantity }}</p>
                  </div>
                  <div>
                    <p><span>Peso:</span> {{ shippingItem.Weight }}</p>
                  </div>
                  <div>
                    <p><span>Largura:</span> {{ shippingItem.Width }}</p>
                  </div>
                  <div>
                    <p><span>Altura:</span> {{ shippingItem.Height }}</p>
                  </div>
                  <div>
                    <p><span>Comprimento:</span> {{ shippingItem.Length }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BaseButton class="close-icon" @click="close" />
      <div v-if="actionsVisible" class="actions">
        <div class="delete">
          <BaseButton class="delete-icon" @click="deleteSelectedItems" />
        </div>
        <div class="selected">
          <span v-if="selectedItems.length === 1"
            >Deletar cotação selecionada</span
          >
          <span v-else-if="selectedItems.length > 1"
            >Deletar cotações selecionadas</span
          >
        </div>
      </div>
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
        "Origem",
        "Destino",
        "Valor",
        "Quantidade",
        "Peso",
        "Largura",
        "Altura",
        "Comprimento",
      ],
      selectedItems: [],
      selectAll: false,
      actionsVisible: false,
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
      this.selectedItems = [];
      this.selectAll = false;
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedItems = this.localData;
      } else {
        this.selectedItems = [];
      }
      this.checkSelection();
    },
    checkSelection() {
      this.actionsVisible = this.selectedItems.length > 0;
      this.selectAll = this.selectedItems.length === this.localData.length;
    },
    deleteSelectedItems() {
      let existingHistory =
        JSON.parse(localStorage.getItem("quote-history")) || [];

      this.selectedItems.forEach((selectedItem) => {
        const index = existingHistory.findIndex(
          (item) =>
            item.SellerCEP === selectedItem.SellerCEP &&
            item.RecipientCEP === selectedItem.RecipientCEP
        );
        if (index !== -1) {
          existingHistory.splice(index, 1);
        }
      });

      localStorage.setItem("quote-history", JSON.stringify(existingHistory));

      this.selectedItems.forEach((selectedItem) => {
        const index = this.localData.findIndex(
          (item) =>
            item.SellerCEP === selectedItem.SellerCEP &&
            item.RecipientCEP === selectedItem.RecipientCEP
        );
        if (index !== -1) {
          this.localData.splice(index, 1);
        }
      });

      this.selectedItems = [];
      this.actionsVisible = false;
    },
  },
};
</script>



<style scoped>
.actions {
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 270px;
  height: 40px;
  background-color: transparent;
  gap: 8px;
  position: absolute;
  bottom: 16px;
  right: -50%;
  left: -50%;
}
.delete {
  background-color: #3c4151;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 4px;
}
.selected {
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  width: 220px;
  font-size: 11px;
  color: white;
  font-weight: 800;
  text-transform: uppercase;
  height: 40px;
  background-color: #3c4151;
}

.close-icon,
.delete-icon {
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.delete-icon {
  opacity: 1;
  width: 24px;
  height: 24px;
  background-image: url("@/assets/delete-icon.png");
}

.close-icon {
  opacity: 0.5;
  background-color: transparent;
  width: 12px;
  height: 12px;
  position: absolute;
  top: 12px;
  right: 12px;
  background-image: url("@/assets/close-icon.png");
}

input {
  margin: 0;
}

.content-cep,
.container-cep {
  display: flex;
}
.content-cep {
  margin: 12px 0;
}

.content-cep p span {
  display: none;
}

.input-checkbox {
  width: 13px;
  height: 13px;
}

.shipping-items {
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
}

.history-item {
  display: flex;
  margin: 5px;
  width: 100%;
  min-width: 500px;
}

.history-item > div > p > span {
  display: none;
}

.history-item,
.modal-content-item {
  display: flex;
  align-items: center;
}
.modal-content- {
  margin: 0;
}
.modal-content-item > p,
.history-item > div {
  width: 100px;
  display: flex;
  justify-content: left;
}
.modal-content-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #02aeef;
}

.modal-content-item.no-border {
  border-bottom: none;
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
  width: 87px;
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
}
.modal-header-items > div {
  width: 100px;
  display: flex;
}
.modal-header-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header-items h3 {
  margin: 0;
}

.modal-header-items button {
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

@media (max-width: 940px) {
  .history-item div p span,
  .modal-content-item div p span {
    display: flex;
    font-weight: 400;
    margin-right: 8px;
  }
  .modal-content-item div p {
    font-weight: 800;
    width: auto;
  }
  .shipping-items {
    width: auto;
    display: inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .content-cep {
    display: flex;
    margin: 0;
    flex-wrap: wrap;
  }
  .container-cep {
    display: inline-flex;
    flex-direction: column;
    align-items: start;
    margin: 12px 0;
  }
  #list-number {
    width: auto;
  }
  .modal-header-items {
    display: none;
  }
  .input-checkbox {
    margin-right: 16px;
  }

  .modal-content-item div p {
    margin-right: 16px;
  }
  .history-item,
  .history-item div,
  .shipping-items {
    width: auto;
    max-width: 100%;
    min-width: max-content;
  }
  .history-item {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
