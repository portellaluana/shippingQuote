<template>
  <div id="shippingForm">
    <form @submit.prevent="handleData">
      <div class="container-cep">
        <div class="container-input">
          <label for="SellerCEP">Origem*</label>
          <input
            v-model="form.SellerCEP"
            class="normal"
            id="SellerCEP"
            type="number"
          />
          <CepValidator :cep="form.SellerCEP" />
        </div>

        <div class="container-input">
          <label for="destino">Destino*</label>
          <input
            v-model="form.RecipientCEP"
            class="normal"
            id="destino"
            type="number"
          />
          <CepValidator :cep="form.RecipientCEP" />
        </div>

        <div class="container-input">
          <label for="Valor">Valor*</label>
          <input
            v-model="form.declared_value"
            type="number"
            placeholder="R$"
            id="Valor"
            class="valor"
          />
        </div>
      </div>

      <div>
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
            <input
              class="input-small"
              v-model="produto.category"
              type="string"
              id="categoria"
            />
          </div>
          <div class="container-input-small">
            <label for="sku">SKU</label>
            <input
              class="input-small"
              v-model="produto.sku"
              type="string"
              id="sku"
            />
          </div>
          <div class="container-input-small">
            <label for="quantidade">Quantidade</label>
            <input
              class="input-small"
              v-model="produto.quantity"
              type="number"
              id="quantidade"
            />
          </div>
          <div class="container-input-small">
            <label for="peso">Peso</label>
            <input
              class="input-small"
              v-model="produto.Weight"
              type="number"
              placeholder="(kg)"
              label="Peso*"
              id="peso"
            />
          </div>
          <div class="container-input-small">
            <label for="largura">Largura</label>
            <input
              class="input-small"
              v-model="produto.Width"
              type="number"
              placeholder="(cm)"
              id="largura"
            />
          </div>
          <div class="container-input-small">
            <label for="altura">Altura</label>
            <input
              class="input-small"
              v-model="produto.height"
              type="number"
              placeholder="(cm)"
              id="altura"
            />
          </div>
          <div class="container-input-small">
            <label for="comprimento">Comprimento*</label>
            <input
              class="input-small"
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
        <BaseButton type="submit" class="primary-btn" :disabled="isFormInvalid">
          Fazer cotação
        </BaseButton>
      </div>
      <BaseButton class="secondary-btn" @click.prevent="adicionarProduto">
        Adicionar mais produtos
      </BaseButton>
    </form>
    <ShippingQuoteList :shippingServices="shippingServices" />
  </div>
</template>

<script>
import { postShippingQuote } from "../services/shippingService";
import BaseButton from "./BaseButton.vue";
import ShippingQuoteList from "./ShippingQuoteList.vue";
import CepValidator from "./CepValidator.vue";

export default {
  components: {
    BaseButton,
    ShippingQuoteList,
    CepValidator,
  },
  data() {
    return {
      form: {
        SellerCEP: "",
        RecipientCEP: "",
        declared_value: "",
      },
      shippingServices: [],

      produtos: [
        {
          Weight: "",
          Width: "",
          Height: "",
          Length: "",
          declared_value: "",
          category: "",
          sku: "",
          quantity: "",
        },
      ],
      isAddingProduct: false,
    };
  },

  computed: {
    isFormInvalid() {
      const isSellerCepInvalid = this.isCepInvalid(this.form.SellerCEP);
      const isRecipientCepInvalid = this.isCepInvalid(this.form.RecipientCEP);
      const isDeclaredValueInvalid = !this.form.declared_value;
      return (
        isSellerCepInvalid || isRecipientCepInvalid || isDeclaredValueInvalid
      );
    },
  },

  methods: {
    isCepInvalid(cep) {
      return cep.length === 8 && !/^[0-9]{8}$/.test(cep);
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
      if (this.isFormInvalid) {
        return;
      }

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

      const response = await postShippingQuote(requestData);
      this.shippingServices = response.ShippingSevicesArray || [];
    },
  },
};
</script>




<style scoped>
#shippingForm {
  padding: 20px;
  border-radius: 8px;
  background-color: white;
}

.container-cep {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.container-cliente {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.container-details {
  display: flex;
  width: 100%;
  gap: 6px;
  justify-content: space-between;
  position: relative;
  margin-top: 16px;
  max-height: 500px;
  overflow-y: auto;
  padding: 1px;
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

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"]::-ms-clear {
  display: none;
}

input[type="number"]::placeholder {
  text-align: right;
}
input[type="number"].valor::placeholder {
  text-align: left;
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
  .container-details {
    flex-wrap: wrap;
  }
}
@media (min-width: 768px) {
  .input-small {
    width: 82%;
  }
}
</style>
