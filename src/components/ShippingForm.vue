<template>
  <div id="shippingForm">
    <form @submit.prevent="handleSubmit">
      <div class="container">
        <BaseInput
          v-if="tipo === 'Lojista'"
          v-model="form.SellerCEP"
          placeholder="CEP de Origem"
          label="Origem"
          classe="normal"
        />
        <BaseInput
          v-model="form.RecipientCEP"
          placeholder="CEP de Destino"
          label="Destino"
          classe="normal"
        />
      </div>

      <div v-if="tipo === 'Lojista'" class="container">
        <BaseInput
          v-for="field in lojistaFields"
          :key="field.name"
          v-model="form[field.name]"
          :type="field.type"
          :placeholder="field.placeholder"
          :label="field.label"
          :classe="field.classe"
        />
      </div>

      <div class="button-container">
        <BaseButton type="submit">Fazer cotação</BaseButton>
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
      },
      shippingServices: [],
      filteredShippingServices: [],
      filterCount: 5,
      lojistaFields: [
        {
          name: "Weight",
          type: "number",
          placeholder: "Peso (kg)",
          label: "Peso",
          classe: "small",
        },
        {
          name: "Width",
          type: "number",
          placeholder: "Largura (cm)",
          label: "Volume",
          classe: "small",
        },
        {
          name: "Height",
          type: "number",
          placeholder: "Altura (cm)",
          classe: "small",
        },
        {
          name: "Length",
          type: "number",
          placeholder: "Comprimento (cm)",
          classe: "small",
        },
        {
          name: "declared_value",
          type: "number",
          placeholder: "Valor em Reais",
          label: "Valor",
          classe: "small",
        },
      ],
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

.container {
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.button-container {
  text-align: center;
  margin-top: 16px;
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
  .container {
    flex-direction: column;
  }
}
</style>
