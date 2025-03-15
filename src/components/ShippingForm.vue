<template>
  <div id="shippingForm">
    <form @submit.prevent="handleSubmit">
      <div class="container-cep">
        <BaseInput
          aria-label="Origem"
          v-model="form.cep_origin"
          placeholder="CEP de Origem"
          label="Origem"
          classe="normal"
        />
        <BaseInput
          classe="normal"
          v-model="form.cep_destination"
          placeholder="CEP de Destino"
          label="Destino"
        />
      </div>
      <div class="container">
        <div>
          <BaseInput
            classe="small"
            v-model="form.weight"
            type="number"
            placeholder="Peso (kg)"
            label="Peso"
          />
        </div>
        <div class="container-volume">
          <BaseInput
            classe="small"
            v-model="form.width"
            type="number"
            placeholder="Largura (cm)"
            label="Volume"
          />
          <BaseInput
            classe="small"
            v-model="form.height"
            type="number"
            placeholder="Altura (cm)"
          />
          <BaseInput
            classe="small"
            v-model="form.length"
            type="number"
            placeholder="Comprimento (cm)"
          />
          <BaseInput
            classe="small"
            v-model="form.declared_value"
            type="number"
            placeholder="Valor em Reais"
          />
          <BaseButton type="submit">Obter Cotação</BaseButton>
        </div>
      </div>
    </form>

    <div v-if="shippingServices.length">
      <h2>Cotações de Frete</h2>
      <ul>
        <li v-for="(service, index) in shippingServices" :key="index">
          {{ service.Carrier }}: R$ {{ service.Price }}
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
  data() {
    return {
      form: {
        cep_origin: "",
        cep_destination: "",
        weight: "",
        width: "",
        height: "",
        length: "",
        declared_value: "",
      },
      shippingServices: [],
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const services = await getShippingQuote(this.form);
        this.shippingServices = services;
      } catch (error) {
        console.error("Erro ao obter cotação de frete:", error);
      }
    },
  },
};
</script>
<style scoped>
#shippingForm {
  background-color: white;
}
.container,
.container-cep {
  display: flex;
  max-width: 1080px;
  gap: 16px;
  width: 100%;
}
.container-ceps {
  width: 100%;
}
.container-cep {
  width: 50%;
}
form {
  justify-content: left;
}
.container-volume {
  display: flex;
  align-items: end;
  gap: 16px;
  width: 100%;
  justify-content: space-between;
}
</style>