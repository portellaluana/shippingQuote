<template>
  <div class="filter">
    <div class="cep-search">
      <div>
        <label for="estado">Estado (UF)</label>
        <select v-model="estado" @change="fetchCidades" id="estado" required>
          <option value="">Selecione o Estado</option>
          <option v-for="uf in estados" :key="uf" :value="uf">{{ uf }}</option>
        </select>
      </div>

      <div v-if="cidades.length > 0">
        <label for="cidade">Cidade</label>
        <select v-model="cidade" @change="fetchCepInfo" id="cidade" required>
          <option value="">Selecione a Cidade</option>
          <option v-for="cidade in cidades" :key="cidade" :value="cidade">
            {{ cidade }}
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
        <p><strong>Estado:</strong> {{ cepInfo.UF }}</p>
        <p><strong>Cidade:</strong> {{ cepInfo.City }}</p>
        <p><strong>Bairro:</strong> {{ cepInfo.District }}</p>
        <p><strong>Rua:</strong> {{ cepInfo.Street }}</p>
      </div>

      <div v-if="errorMessage" class="error">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { fetchCidades, getCepInfo } from "@/services/shippingService";

export default {
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
    async fetchCidades() {
      try {
        this.cidades = await fetchCidades(); // Agora não precisa passar o estado
      } catch (error) {
        this.errorMessage = "Erro ao buscar as cidades. Tente novamente.";
      }
    },
    async fetchCepInfo() {
      if (this.cidade && this.rua) {
        try {
          const cepData = await getCepInfo(this.cidade); // Ajuste aqui para a lógica de buscar o CEP correto
          this.cepInfo = cepData;
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
</style>
  