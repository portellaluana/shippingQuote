<template>
  <div id="shippingForm">
    <form @submit.prevent="handleData">
      <div class="container-cep">
        <div class="container-input">
          <label for="SellerCEP">Origem*</label>
          <input
            v-if="tipo === 'Lojista'"
            v-model="form.SellerCEP"
            class="normal"
            id="SellerCEP"
          />
        </div>
        <div class="container-input">
          <label for="destino">Destino*</label>
          <input
            v-model="form.RecipientCEP"
            label="Destino*"
            class="normal"
            id="destino"
          />
        </div>

        <div class="container-input">
          <label for="Valor">Valor*</label>
          <input
            v-model="form.declared_value"
            type="number"
            placeholder="R$"
            id="Valor"
          />
        </div>
      </div>

      <div v-if="tipo === 'Lojista'">
        <div
          v-for="(produto, index) in produtos"
          :key="index"
          class="container-details"
          :style="
            index !== 0
              ? { borderTop: '1px solid #028ecc', paddingTop: '16px' }
              : {}
          "
        >
          <div class="container-input-small">
            <label for="categoria">Categoria</label>
            <input v-model="produto.category" type="string" id="categoria" />
          </div>

          <div class="container-input-small">
            <label for="sku">SKU</label>
            <input v-model="produto.sku" type="string" id="sku" />
          </div>

          <div class="container-input-small">
            <label for="quantidade">Quantidade</label>
            <input v-model="produto.quantity" type="number" id="quantidade" />
          </div>

          <div class="container-input-small">
            <label for="peso">Peso</label>
            <input
              v-model="produto.Weight"
              type="number"
              placeholder="(kg)"
              label="Peso*"
              id="peso"
            />
          </div>

          <div class="container-input-small">
            <label for="volume">Volume</label>
            <input
              v-model="produto.Width"
              type="number"
              placeholder="(cm)"
              id="volume"
            />
          </div>

          <div class="container-input-small">
            <label for="altura">Altura</label>
            <input
              v-model="produto.height"
              type="number"
              placeholder="(cm)"
              id="altura"
            />
          </div>

          <div class="container-input-small">
            <label for="comprimento">Comprimento*</label>
            <input
              v-model="produto.length"
              type="number"
              placeholder="(cm)"
              id="comprimento"
            />
          </div>

          <button
            v-if="index !== 0"
            @click="removerProduto(index)"
            class="delete-button"
          />
        </div>
      </div>

      <div class="button-container">
        <BaseButton type="submit" class="primary-btn">Fazer cotação</BaseButton>
      </div>
      <BaseButton class="secondary-btn" @click.prevent="adicionarProduto">
        Adicionar mais produtos
      </BaseButton>
    </form>

    <ShippingQuoteList :shippingServices="filteredShippingServices" />
  </div>
</template>

<script>
import { getShippingQuote } from "../services/shippingService";
import BaseButton from "./BaseButton.vue";
import ShippingQuoteList from "./ShippingQuoteList.vue";

export default {
  components: {
    BaseButton,
    ShippingQuoteList,
  },
  props: {
    tipo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {
        SellerCEP: "",
        RecipientCEP: "",
        Weight: "",
        Width: "",
        Height: "",
        Length: "",
        declared_value: "",
        category: "",
        sku: "",
        quantity: "",
      },
      shippingServices: [],
      filteredShippingServices: [],
      filterCount: 3,
      produtos: [
        {
          category: "",
          sku: "",
          quantity: "",
          Weight: "",
          Width: "",
          height: "",
          length: "",
          declared_value: "",
        },
      ],
      isAddingProduct: false,
    };
  },

  created() {
    this.loadStoredQuotes();
  },

  methods: {
    loadStoredQuotes() {
      const storedQuotes =
        JSON.parse(localStorage.getItem("shippingQuotes")) || [];
      this.shippingServices = storedQuotes;
      this.applyFilter();
    },

    adicionarProduto() {
      if (this.isAddingProduct) return;
      this.isAddingProduct = true;

      this.produtos.push({
        category: "",
        sku: "",
        quantity: "",
        Weight: "",
        Width: "",
        height: "",
        length: "",
        declared_value: "",
      });

      setTimeout(() => {
        this.isAddingProduct = false;
      }, 200);
    },

    removerProduto(index) {
      this.produtos.splice(index, 1);
    },

    async handleData() {
      const requestData = {
        SellerCEP: this.form.SellerCEP,
        RecipientCEP: this.form.RecipientCEP,
        ShipmentInvoiceValue: this.form.declared_value,
        ShippingServiceCode: null,
        ShippingItemArray: this.produtos.map((produto) => ({
          Height: produto.height,
          Length: produto.length,
          Quantity: produto.quantity,
          Weight: produto.Weight,
          Width: produto.Width,
          SKU: produto.sku,
          Category: produto.category,
        })),
        RecipientCountry: "BR",
      };

      const storedData = JSON.parse(localStorage.getItem("shippingData")) || [];
      storedData.push(requestData);

      localStorage.setItem("shippingData", JSON.stringify(storedData));

      await this.handleSubmit();
    },
    async handleSubmit() {
      try {
        const response = await getShippingQuote();
        if (
          response.ShippingSevicesArray &&
          Array.isArray(response.ShippingSevicesArray)
        ) {
          const newShippingServices = response.ShippingSevicesArray;
          this.storeShippingServices(newShippingServices);
        } else {
          console.error(
            "Dados de cotação de frete não encontrados ou formato inválido."
          );
        }
      } catch (error) {
        console.error("Erro ao fazer cotação de frete:", error);
      }
    },
    storeShippingServices(newShippingServices) {
      const storedQuotes =
        JSON.parse(localStorage.getItem("shippingQuotes")) || [];
      storedQuotes.unshift(...newShippingServices);
      const limitedQuotes = storedQuotes.slice(0, 100);
      localStorage.setItem("shippingQuotes", JSON.stringify(limitedQuotes));
      this.shippingServices = limitedQuotes;
      this.applyFilter();
    },
    applyFilter() {
      this.filteredShippingServices = this.shippingServices;
      if (this.produtos.length >= this.filterCount) {
        this.$nextTick(() => {
          const container = document.querySelector(".container-details");
          if (container) {
            container.style.overflowY = "auto";
          }
        });
      }
    },
    changeFilterCount(count) {
      this.filterCount = count;
      this.applyFilter();
    },
  },
};
</script>


<style scoped>
#shippingForm {
  padding: 20px;
  border-radius: 8px;
}

.container-cep {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.container-details {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: space-between;
  position: relative;
  margin-top: 16px;
  max-height: 500px; /* Altura máxima para permitir o scroll */
  overflow-y: auto; /* Ativa o scroll vertical */
}

.button-container {
  text-align: center;
}

h6 {
  font-size: 14px;
  margin: 16px 0 4px 0;
}

.delete-button {
  width: 12px;
  height: 12px;
  background-image: url("@/assets/delete-button.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 8px;
  right: 0;
  border: none;
  padding: 5px 0;
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
}

.container-input {
  display: inline-flex;
  flex-direction: column;
  text-align: left;
  width: 47%;
}

.container-input-small {
  display: inline-flex;
  flex-direction: column;
  text-align: left;
  width: 20%;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  align-self: end;
}

label {
  font-size: 12px;
  margin: 8px 0 4px 0;
}

input {
  background: #f1f5f9;
  border-radius: 4px;
  border: none;
  padding: 8px;
  font-size: 14px;
  outline: none;
}

input:focus {
  outline: 1px solid #028ecc;
}

.normal {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .container-cep {
    flex-direction: column;
  }
  input {
    font-size: 12px;
  }
  .container-input-small,
  .container-input {
    width: 100%;
  }
  label {
    font-size: 10px;
  }
}
</style>