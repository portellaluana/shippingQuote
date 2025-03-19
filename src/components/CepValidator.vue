<template>
  <div>
    <div v-if="showError" class="error-message">
      <p>CEP inválido.</p>
    </div>
  </div>
</template>

<script>
import { getCepInfo } from "../services/shippingService";

export default {
  props: {
    cep: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showError: false,
    };
  },
  watch: {
    cep(newCep) {
      if (newCep.length === 8) {
        this.validateCep(newCep);
      } else {
        this.showError = false;
      }
    },
  },
  methods: {
    async validateCep(cep) {
      try {
        const response = await getCepInfo(cep);

        if (response && response.Message === "CEP não encontrado") {
          this.showError = true;
        } else {
          this.showError = false;
        }
      } catch (error) {
        console.error("Erro ao validar o CEP:", error);
        this.showError = true;
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
p {
  margin: 4px 0 0 0;
}
</style>
