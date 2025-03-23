<template>
  <div class="cep-search">
    <button class="close-button" @click="closeModal" />
    <div class="container-uf-cidade">
      <div class="container-estado">
        <label for="estado">Estado (UF)*</label>
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

      <div class="container-cidade">
        <label for="cidade">Cidade*</label>
        <select
          v-model="cidade"
          :disabled="!estado"
          @change="fetchCepInfo"
          id="cidade"
          required
        >
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
    </div>

    <div class="container">
      <label for="rua">Rua*</label>
      <BaseInput
        required
        v-model="rua"
        id="rua"
        @input="fetchCepInfo"
        placeholder="Digite o nome da rua"
      />
    </div>

    <CEPList
      v-if="cepInfo.length > 0"
      :cepInfo="cepInfo"
      @close-modal="closeModal"
    />

    <BaseButton type="submit" class="primary-btn" @click.prevent="fetchCep">
      Buscar CEP
    </BaseButton>

    <div v-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
  <div class="filter" @click="closeModal"></div>
</template>


<script>
import { getCidades, getCep } from "@/services/shipping";
import BaseButton from "./BaseButton.vue";
import CEPList from "./CEPList.vue";
import { estados } from "@/utils/estados";
import BaseInput from "./BaseInput.vue";

export default {
  components: {
    BaseButton,
    CEPList,
    BaseInput,
  },

  data() {
    return {
      estado: "",
      cidade: "",
      rua: "",
      cidades: [],
      cepInfo: [],
      errorMessage: "",
      estados,
    };
  },

  methods: {
    closeModal() {
      this.$emit("close-modal");
    },

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
          if (Array.isArray(cepData) && cepData.length > 0) {
            this.cepInfo = cepData.map((item) => ({
              cep: item.cep,
              logradouro: item.logradouro,
              bairro: item.bairro,
              localidade: item.localidade,
              uf: item.uf,
            }));
          } else {
            this.errorMessage = "Nenhum CEP encontrado para essa busca.";
            this.cepInfo = [];
          }
        } catch (error) {
          if (error.response && error.response.status === 500) {
            this.errorMessage = "Erro 500: Tente novamente mais tarde.";
          } else {
            this.errorMessage =
              "Erro na requisição de CEP. Tente novamente mais tarde.";
          }
        }
      }
    },

    handleEscKey(event) {
      if (event.key === "Escape") {
        this.closeModal();
      }
    },
  },

  mounted() {
    document.addEventListener("keydown", this.handleEscKey);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleEscKey);
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}

label {
  font-size: 11px;
  margin: 0;
  margin-bottom: 4px;
  text-align: left;
}
.filter {
  width: 100vw;
  position: absolute;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.323);
  z-index: 1;
  top: 0;
}
.cep-search {
  margin: 0 auto;
  padding: 20px;
  border: none;
  border-radius: 5px;
  background-color: white;
  height: auto;
  z-index: 2;
  position: absolute;
  min-width: 430px;
}

.primary-btn {
  margin-top: 8px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input,
select {
  background: #f1f5f9;
  border-radius: 4px;
  border: none;
  padding: 8px;
  font-size: 14px;
  outline: none;
  color: #3c4151;
  width: 100%;
  margin-bottom: 16px;
}

input {
  box-sizing: border-box;
}

input:focus,
select:focus {
  outline: 1px solid #028ecc;
}

.error {
  color: #3c4151;
  font-weight: 400;
  font-size: 14px;
}

.close-button {
  width: 12px;
  height: 12px;
  background-image: url("@/assets/delete-button.png");
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  padding: 5px 0;
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
  opacity: 0.5;
  display: flex;
  justify-self: end;
  margin-bottom: 8px;
}
.container-estado,
.container-cidade {
  width: 50%;
}
.container-uf-cidade {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
@media (max-width: 940px) {
  .cep-search {
    min-width: 230px;
  }
  .container-uf-cidade {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
  }
  .container-estado,
  .container-cidade {
    width: 100%;
  }
}
</style>
