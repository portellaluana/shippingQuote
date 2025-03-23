<template>
  <div>
    <div v-if="showError" class="error-message">
      <p>CEP inválido ou não encontrado.</p>
    </div>
    <div v-if="cepValid" class="cep-message">
      <p>{{ infoCep }}</p>
    </div>
  </div>
</template>

<script>
import { getCepInfo } from "../services/shipping";

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
      cepValid: false,
      infoCep: "",
    };
  },
  watch: {
    cep(newCep) {
      if (newCep.length === 8) {
        this.validateCep(newCep);
      } else if (newCep.length === 0) {
        this.showError = false;
        this.cepValid = false;
        this.infoCep = "";
      }
    },
  },
  methods: {
    async validateCep(cep) {
      if (!cep) {
        return;
      }

      try {
        const response = await getCepInfo(cep);

        if (response && response.Message === "CEP não encontrado") {
          this.showError = true;
          this.cepValid = false;
        } else {
          this.showError = false;
          this.cepValid = true;
          this.infoCep = response.Street || response.City + "-" + response.UF;
        }
      } catch (error) {
        console.error("Erro ao validar o CEP:", error);
        this.showError = true;
        this.cepValid = false;
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 12px;
  margin: 0 !important;
  opacity: 0.5;
}

.cep-message {
  color: #3c4151;
  opacity: 0.5;
  font-size: 12px;
  margin-top: 4px;
  height: 17px;
}

p {
  margin: 4px 0 0 0;
  font-size: 11px;
}
</style>
