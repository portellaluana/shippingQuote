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
          v-model="form.Weight"
          type="number"
          placeholder="Peso (kg)"
          label="Peso"
          classe="small"
        />
        <BaseInput
          v-model="form.Width"
          type="number"
          placeholder="Largura (cm)"
          label="Volume"
          classe="small"
        />
        <BaseInput
          v-model="form.Height"
          type="number"
          placeholder="Altura (cm)"
          classe="small"
        />
        <BaseInput
          v-model="form.Length"
          type="number"
          placeholder="Comprimento (cm)"
          classe="small"
        />
        <BaseInput
          v-model="form.declared_value"
          type="number"
          placeholder="Valor em Reais"
          classe="small"
        />
      </div>

      <div class="button-container">
        <BaseButton type="submit">Fazer cotação</BaseButton>
      </div>
    </form>

    <div v-if="filteredShippingServices.length" class="result">
      <section class="container-cotacao">
        <h2>Últimas Cotações de Frete</h2>
        <div>
          <label for="filter">Mostrar: </label>
          <select id="filter" v-model="filterCount" @change="applyFilter">
            <option value="5">Últimas 5</option>
            <option value="10">Últimas 10</option>
            <option value="20">Últimas 20</option>
          </select>
        </div>
      </section>
      <ul>
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
    };
  },
  created() {
    const storedQuotes =
      JSON.parse(localStorage.getItem("shippingQuotes")) || [];
    this.shippingServices = storedQuotes;

    this.applyFilter();
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await getShippingQuote(this.form);
        console.log(response);

        if (
          response.ShippingSevicesArray &&
          Array.isArray(response.ShippingSevicesArray)
        ) {
          const newShippingServices = response.ShippingSevicesArray;

          const storedQuotes =
            JSON.parse(localStorage.getItem("shippingQuotes")) || [];

          storedQuotes.unshift(...newShippingServices);

          const limitedQuotes = storedQuotes.slice(0, 100);

          localStorage.setItem("shippingQuotes", JSON.stringify(limitedQuotes));

          this.shippingServices = limitedQuotes;

          this.applyFilter();
        } else {
          console.error(
            "Dados de cotação de frete não encontrados ou formato inválido."
          );
        }
      } catch (error) {
        console.error("Erro ao fazer cotação de frete:", error);
      }
    },

    applyFilter() {
      this.filteredShippingServices = this.shippingServices.slice(
        0,
        this.filterCount
      );
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
ul {
  padding: 0;
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
