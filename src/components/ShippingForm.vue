<template>
  <div id="shippingForm">
    <form @submit.prevent="handleSubmit">
      <div class="container-cep">
        <BaseInput
          v-if="tipo === 'Lojista'"
          v-model="form.SellerCEP"
          label="Origem*"
          classe="normal"
        />
        <BaseInput
          v-model="form.RecipientCEP"
          label="Destino*"
          classe="normal"
        />
      </div>

      <div v-if="tipo === 'Lojista'">
        <div
          v-for="(produto, index) in produtos"
          :key="index"
          class="container-details"
          :style="index !== 0 ? { borderTop: '1px solid #028ecc' } : {}"
        >
          <BaseInput
            v-model="produto.category"
            type="string"
            label="Categoria"
            classe="small"
          />
          <BaseInput
            v-model="produto.sku"
            type="string"
            label="SKU"
            classe="small"
          />
          <BaseInput
            v-model="produto.quantity"
            type="number"
            label="Quantidade"
            classe="small"
          />
          <BaseInput
            v-model="produto.Weight"
            type="number"
            placeholder="(kg)"
            label="Peso*"
            classe="small"
          />
          <BaseInput
            v-model="produto.Width"
            type="number"
            placeholder="(cm)"
            label="Volume*"
            classe="small"
          />
          <BaseInput
            v-model="produto.height"
            label="Altura*"
            type="number"
            placeholder="(cm)"
            classe="small"
          />
          <BaseInput
            v-model="produto.length"
            label="Comprimento*"
            type="number"
            placeholder="(cm)"
            classe="small"
          />
          <BaseInput
            label="Valor*"
            v-model="produto.declared_value"
            type="number"
            placeholder="R$"
            classe="small"
          />
        </div>
      </div>

      <div class="button-container">
        <BaseButton class="secondary-btn" @click.prevent="adicionarProduto">
          Adicionar mais produtos
        </BaseButton>
        <BaseButton type="submit" class="primary-btn">Fazer cotação</BaseButton>
      </div>
    </form>

    <div v-if="filteredShippingServices.length" class="result">
      <section class="container-cotacao">
        <h2>Últimas Cotações de Frete</h2>
      </section>
      <ul
        class="shipping-list"
        :style="{
          maxHeight: filteredShippingServices.length > 5 ? '100px' : 'auto',
          overflowY: filteredShippingServices.length > 5 ? 'auto' : 'visible',
        }"
      >
        <li v-for="(service, index) in filteredShippingServices" :key="index">
          {{ index + 1 }}. {{ service.index }}{{ service.ServiceDescription }}:
          R$
          {{ service.ShippingPrice }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getShippingQuote } from "../services/shippingService";
import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";

export default {
  components: {
    BaseInput,
    BaseButton,
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
      filterCount: 5,
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

      console.log("Adicionando produto");

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

    async handleSubmit() {
      try {
        const response = await getShippingQuote(this.form);
        console.log(response);

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
  gap: 8px;
}

.container-details {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: space-between;
  padding: 10px 0 16px 0;
}

.button-container {
  text-align: center;
}

h2 {
  text-align: left;
  margin: 0;
  font-size: 16px;
}

.container-cotacao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

h6 {
  font-size: 14px;
  margin: 16px 0 4px 0;
}

ul.shipping-list {
  padding: 0;
  max-height: 100px;
  overflow-y: auto;
  transition: max-height 0.3s ease;
}

ul.shipping-list.no-scroll {
  max-height: none;
  overflow-y: visible;
}

ul.shipping-list {
  padding: 0;
  max-height: 100px;
  overflow-y: auto;
  cursor: pointer;
}

ul.shipping-list {
  padding: 0;
  max-height: 100px;
  overflow-y: auto;
}

ul.shipping-list::-webkit-scrollbar {
  width: 8px;
}

ul.shipping-list::-webkit-scrollbar-thumb {
  background-color: #028ecc;
  border-radius: 10px;
}

ul.shipping-list::-webkit-scrollbar-thumb:hover {
  background-color: #028ecc;
}

ul.shipping-list::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

li {
  list-style: none;
  text-align: left;
}

@media (max-width: 768px) {
  .container-cep {
    flex-direction: column;
  }
}

@media (min-width: 1080px) {
  .container-details {
  }
}
</style>
