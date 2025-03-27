<template>
  <div>
    <div v-if="status === 'error'" class="error-message">
      <p>CEP inválido ou não encontrado.</p>
    </div>
    <div v-if="status === 'ok'" class="cep-message">
      <p>{{ infoCep }}</p>
    </div>
  </div>
</template>

<script>
import { getCepInfo } from "../services/cep";

export default {
  props: {
    cep: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      status: "",
      infoCep: "",
    };
  },
  watch: {
    cep(newCep) {
      if (newCep.length === 8) {
        this.validateCep(newCep);
      } else if (newCep.length === 0) {
        this.status = "";
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
          this.status = "error";
        } else {
          this.status = "ok";
          this.infoCep = response.Street || response.City + "-" + response.UF;
        }
      } catch (error) {
        console.error("Erro ao validar o CEP:", error);
        this.status = "error";
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: #ff355a;
  font-size: 12px;
  margin: 0 !important;
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
