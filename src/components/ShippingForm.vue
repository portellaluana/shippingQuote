<template>
  <div id="shippingForm">
    <form @submit.prevent="handleData">
      <div class="container-cep">
        <div class="container-input">
          <div class="container-header-input">
            <label for="SellerCEP">Origem*</label>
            <BaseButton type="submit" class="link-btn" @click="openModal">
              Pesquisar CEP
            </BaseButton>
          </div>
          <BaseInput
            required
            v-model="formattedSellerCEP"
            v-mask="'#####-###'"
            class="normal"
            id="SellerCEP"
            type="text"
            maxlength="8"
            @blur="validateSellerCep"
          />
          <div class="container-cep-text">
            <CepValidator ref="sellerCepValidator" :cep="form.SellerCEP" />
          </div>
        </div>

        <div class="container-input">
          <div class="container-header-input">
            <label for="destino">Destino*</label>
            <BaseButton type="submit" class="link-btn" @click="openModal">
              Pesquisar CEP
            </BaseButton>
          </div>
          <BaseInput
            required
            v-model="formattedRecipientCEP"
            v-mask="'#####-###'"
            class="normal"
            id="destino"
            type="text"
            maxlength="8"
            @blur="validateRecipientCep"
          />
          <div class="container-cep-text">
            <CepValidator
              ref="recipientCepValidator"
              :cep="form.RecipientCEP"
            />
          </div>
        </div>

        <div class="container-input">
          <label for="Valor">Valor*</label>
          <BaseInput
            required
            v-model="form.declared_value"
            type="text"
            placeholder="R$"
            id="Valor"
            class="valor"
            @input="formatValue"
          />
        </div>
      </div>

      <ul id="quote-list" :style="quoteListStyle">
        <li
          v-for="(produto, index) in produtos"
          :key="index"
          class="container-details"
        >
          <div class="list-number">
            <p>#{{ index + 1 }}</p>
          </div>

          <div class="container-input-small">
            <label for="quantidade">Quantidade*</label>
            <BaseInput
              required
              v-model="produto.quantity"
              class="input-small"
              type="number"
              id="quantidade"
            />
          </div>
          <div class="container-input-small">
            <label for="peso">Peso*</label>
            <BaseInput
              required
              v-model="produto.weight"
              class="input-small"
              type="number"
              placeholder="(kg)"
              label="Peso*"
              id="peso"
              @focus="onFocus"
              @blur="onBlur"
            />
          </div>
          <div class="container-input-small">
            <label for="largura">Largura*</label>
            <BaseInput
              required
              v-model="produto.width"
              class="input-small"
              type="number"
              placeholder="(cm)"
              id="largura"
            />
          </div>
          <div class="container-input-small">
            <label for="altura">Altura*</label>
            <BaseInput
              required
              v-model="produto.height"
              class="input-small"
              type="number"
              placeholder="(cm)"
              id="altura"
            />
          </div>
          <div class="container-input-small">
            <label for="comprimento">Comprimento*</label>
            <BaseInput
              required
              v-model="produto.length"
              class="input-small"
              type="number"
              placeholder="(cm)"
              id="comprimento"
            />
          </div>
          <button
            v-if="index !== 0"
            @click="removerProduto(index)"
            class="close-icon"
          />
        </li>
      </ul>

      <div class="button-container">
        <BaseButton type="submit" class="primary-btn" :disabled="isFormInvalid">
          Fazer cotação
        </BaseButton>
      </div>
      <div class="container-botoes">
        <BaseButton class="secondary-btn" @click.prevent="adicionarProduto">
          Adicionar mais produtos
        </BaseButton>
        <BaseButton
          class="primary-btn-text"
          @click.prevent="openModalHistorico"
        >
          Ver histórico de cotação
        </BaseButton>
      </div>
    </form>
    <ShippingQuoteList :shippingServices="shippingServices" />
  </div>
</template>

<script>
import { postShippingQuote } from "../services/shipping";
import BaseButton from "./BaseButton.vue";
import ShippingQuoteList from "./ShippingQuoteList.vue";
import CepValidator from "./CepValidator.vue";
import BaseInput from "./BaseInput.vue";
import formatter from "../utils/formatterCurrency.js";
import _ from "lodash";

export default {
  components: {
    BaseButton,
    ShippingQuoteList,
    CepValidator,
    BaseInput,
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
          weight: "",
          width: "",
          height: "",
          length: "",
          quantity: "",
        },
      ],
      isAddingProduct: false,
    };
  },

  computed: {
    quoteListStyle() {
      if (this.produtos.length > 3) {
        return {
          maxHeight: "200px",
          overflowY: "auto",
          paddingRight: "16px",
          overflowX: "hidden",
        };
      }
      return {};
    },
    formattedSellerCEP: {
      get() {
        return this.applyMask(this.form.SellerCEP);
      },
      set(newValue) {
        if (this.form.SellerCEP !== this.removeMask(newValue)) {
          this.form.SellerCEP = this.removeMask(newValue);
        }
      },
    },
    formattedRecipientCEP: {
      get() {
        return this.applyMask(this.form.RecipientCEP);
      },
      set(newValue) {
        if (this.form.RecipientCEP !== this.removeMask(newValue)) {
          this.form.RecipientCEP = this.removeMask(newValue);
        }
      },
    },

    isFormInvalid() {
      const isSellerCepInvalid = this.isCepInvalid(this.form.SellerCEP);
      const isRecipientCepInvalid = this.isCepInvalid(this.form.RecipientCEP);
      const isDeclaredValueInvalid = !this.form.declared_value;

      const isAnyProductInvalid = this.produtos.some((produto) => {
        return (
          !produto.weight ||
          !produto.width ||
          !produto.height ||
          !produto.length ||
          !produto.quantity
        );
      });

      return (
        isSellerCepInvalid ||
        isRecipientCepInvalid ||
        isDeclaredValueInvalid ||
        isAnyProductInvalid
      );
    },
  },

  methods: {
    formatValue: _.debounce(function () {
      let rawValue = this.form.declared_value.replace(/[^\d]/g, "");
      let numericValue = parseFloat(rawValue) / 100;
      this.form.declared_value = formatter.currencyBrazil(numericValue);
    }, 100),

    openModalHistorico() {
      this.$emit("open-modal-historico");
    },

    openModal() {
      this.$emit("show-modal");
    },

    isCepInvalid(cep) {
      return cep.length === 8 && !/^[0-9]{8}$/.test(cep);
    },

    applyMask(cep) {
      return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    },

    removeMask(cep) {
      return cep.replace(/\D/g, "");
    },

    adicionarProduto() {
      if (this.isAddingProduct) return;
      this.isAddingProduct = true;

      this.produtos.push({
        quantity: "",
        weight: "",
        width: "",
        height: "",
        length: "",
      });

      setTimeout(() => {
        this.isAddingProduct = false;
      }, 200);
    },

    removerProduto(index) {
      this.produtos.splice(index, 1);
    },

    validateSellerCep() {
      this.$refs.sellerCepValidator.validateCep(this.form.SellerCEP);
    },

    validateRecipientCep() {
      this.$refs.recipientCepValidator.validateCep(this.form.RecipientCEP);
    },

    async handleData() {
      if (this.isFormInvalid) {
        return;
      }

      const rawValue = this.form.declared_value.replace(/[^\d]/g, "");
      const numericValue = parseFloat(rawValue) / 100;

      const requestData = {
        SellerCEP: this.form.SellerCEP,
        RecipientCEP: this.form.RecipientCEP,
        ShipmentInvoiceValue: numericValue,
        ShippingServiceCode: null,
        ShippingItemArray: this.produtos.map((produto) => ({
          Height: produto.height,
          Length: produto.length,
          Quantity: produto.quantity,
          Weight: produto.weight,
          Width: produto.width,
        })),
        RecipientCountry: "BR",
      };
      console.log(requestData);

      const response = await postShippingQuote(requestData);

      this.shippingServices = response.ShippingSevicesArray || [];

      const existingHistory =
        JSON.parse(localStorage.getItem("quote-history")) || [];

      existingHistory.push(requestData);

      localStorage.setItem("quote-history", JSON.stringify(existingHistory));
    },
    onBlur() {
      this.isFocused = false;
    },
  },
};
</script>

<style scoped>
.container-header-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#shippingForm {
  padding: 20px;
  border-radius: 8px;
  background-color: white;
}

.container-cep {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  height: 70px;
  gap: 8px;
}

.container-cep-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.container-details {
  display: flex;
  width: 100%;
  height: 82px;
  gap: 6px;
  justify-content: space-between;
  position: relative;
  max-height: 500px;
  overflow-y: auto;
  padding: 1px;
  align-items: center;
}

.button-container {
  text-align: center;
}

.close-icon {
  width: 12px;
  height: 12px;
  background-image: url("@/assets/close-icon.png");
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
  opacity: 0.5;
}

.container-input {
  display: inline-flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}

.container-input-small {
  display: inline-flex;
  flex-direction: column;
  text-align: left;
  height: 62px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  align-self: end;
}

label {
  font-size: 11px;
  margin: 0 0 4px 0;
}

.hits {
  color: #3c4151;
  opacity: 0.5;
  font-size: 12px;
  margin-top: 4px;
  height: 17px;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

ul::-webkit-scrollbar {
  width: 8px;
}

ul::-webkit-scrollbar-thumb {
  background-color: #02aeef;
  border-radius: 10px;
}

ul::-webkit-scrollbar-thumb:hover {
  background-color: #02aeef;
}

ul::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

li {
  display: flex;
  justify-content: space-between;
  text-align: left;
  border-bottom: 1px solid #02aeef;
  padding: 8px 0 16px 0;
  align-items: baseline;
}

li:last-child {
  border-bottom: none;
}
.list-number p {
  font-size: 14px;
  font-weight: 800;
  color: #3c41512e;
  margin: 0;
}
.container-botoes {
  display: flex;
  justify-content: space-between;
}
@media (max-width: 940px) {
  .close-icon {
    top: 20px;
    right: 10px;
  }
  .container-botoes {
    display: inline-flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  ul {
    max-height: 400px !important;
    overflow: hidden auto !important;
    margin-bottom: 16px;
    padding: 0 !important;
  }

  li {
    padding: 0 !important;
  }

  .container-cep {
    flex-direction: column;
    height: 172px;
    gap: 0;
  }
  input {
    font-size: 12px;
  }
  .container-input-small,
  .container-input {
    width: 100%;
  }
  .list-number p {
    position: inherit;
    padding-top: 0;
  }
  .container-details {
    height: 356px;
    flex-wrap: wrap;
    padding-top: 14px !important;
  }
  #shippingForm {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    height: auto;
  }
  .quote-list {
    max-height: 500px;
    overflow: hidden auto;
    padding-right: 16px;
  }
}
</style>
