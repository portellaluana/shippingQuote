<template>
  <div class="filter">
    <div class="cep-search">
      <button class="close-button" />
      <div>
        <label for="estado">Estado (UF)</label>
        <select
          v-model="estado"
          @change="fetchCidades(estado)"
          id="estado"
          required
        >
          <option value="">Selecione o Estado</option>
          <option v-for="uf in estados" :key="uf" :value="uf">{{ uf }}</option>
        </select>
      </div>

      <div v-if="cidades && cidades.length > 0">
        <label for="cidade">Cidade</label>
        <select v-model="cidade" @change="fetchCepInfo" id="cidade" required>
          <option value="">Selecione a Cidade</option>
          <option
            v-for="cidade in cidades"
            :key="cidade.id"
            :value="cidade.nome"
          >
            {{ cidade.nome }}
          </option>
        </select>
      </div>

      <div>
        <label for="rua">Rua</label>
        <input
          type="text"
          id="rua"
          v-model="rua"
          @input="fetchCepInfo"
          placeholder="Digite o nome da rua"
        />
      </div>

      <div v-if="cepInfo">
        <p><strong>CEP:</strong> {{ cepInfo.CEP }}</p>
      </div>

      <BaseButton type="submit" class="primary-btn" @click.prevent="fetchCep">
        Usar CEP
      </BaseButton>

      <div v-if="errorMessage" class="error">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCidades, getCep } from "@/services/shippingService";
import BaseButton from "./BaseButton.vue";

export default {
  components: {
    BaseButton,
  },

  data() {
    return {
      estado: "",
      cidade: "",
      rua: "",
      cidades: [],
      cepInfo: null,
      errorMessage: "",
      estados: [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
      ],
    };
  },

  methods: {
    async fetchCidades(uf) {
      try {
        const cidadesResponse = await getCidades(uf);
        this.cidades = Array.isArray(cidadesResponse) ? cidadesResponse : [];
      } catch (error) {
        this.errorMessage = "Erro ao buscar as cidades. Tente novamente.";
        this.cidades = [];
      }
    },

    async fetchCep() {
      if (this.estado && this.cidade && this.rua) {
        try {
          const cepData = await getCep(this.estado, this.cidade, this.rua);
          this.cepInfo = cepData;
          console.log(cepData);
        } catch (error) {
          this.errorMessage = "Erro ao buscar o CEP.";
        }
      }
    },
  },
};
</script>


  <style scoped>
.filter {
  width: 100vw;
  position: absolute;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.323);
}
.cep-search {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: none;
  border-radius: 5px;
  background-color: white;
  width: 500px;
  height: 500px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error {
  color: red;
  font-weight: bold;
}

.close-button {
  width: 12px;
  height: 12px;
  background-image: url("@/assets/delete-button.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  bottom: 17px;
  left: 254px;
  border: none;
  padding: 5px 0;
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
  opacity: 0.5;
}
</style>
  